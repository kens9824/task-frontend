import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../../service/task.service';
import { AddTask, UpdateTask } from '../../actions/task.actions';
import { Task } from '../../model/task.model';
import { select, Store } from '@ngrx/store';
import { selectDoing, selectDoingList, selectDoneList, selectTodoList } from '../../selectors/todo';
import { timestamp } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})



export class HomeComponent implements OnInit {

  TotalTask: number = 0
  Todo: Task[] = []
  Done: Task[] = []
  Doing: Task[] = []

  newTask = new FormGroup({
    taskName: new FormControl(null, Validators.required),
    taskAssign: new FormControl(null, Validators.required),
  });

  constructor(private taskService: TaskService,
    private store: Store
  ) {
    this.initLoad()
  }

  initLoad() {
    this.taskService.getAllTask().subscribe((res: any) => {
      this.Todo = res.data.todo
      this.Done = res.data.done
      this.Doing = res.data.doing


      this.TotalTask = res.data.totalTask
    })
  }


  addTask() {

    if (this.newTask.valid) {
      this.taskService.addTask(this.newTask.value).subscribe((res) => {
        const data: Task = {
          taskName: this.newTask.value['taskName'] ?? "",
          taskAssign: this.newTask.value['taskAssign'] ?? "",
          status: "Todo"
        };
        this.store.dispatch(AddTask({ payload: { status: "Todo", data } }));
        this.newTask.reset()
        this.TotalTask += 1
      })
    }
  }


  drop(event: CdkDragDrop<any>) {

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      var taskId = event.container.data[event.currentIndex].id

      if (event.container.id == "cdk-drop-list-1") {
        this.changeStatus(taskId, "DOING")

        const data: Task = {
          taskName: event.container.data[event.currentIndex]['taskName'] ?? "",
          taskAssign: event.container.data[event.currentIndex]['taskAssign'] ?? "",
          status: "Todo",
          last_updated: event.container.data[event.currentIndex]['last_updated'],
          timestamp: event.container.data[event.currentIndex]['timestamp']
        };
        this.store.dispatch(UpdateTask({ payload: { status: "Doing", data } }));

      }
      else {

        const data: Task = {
          taskName: event.container.data[event.currentIndex]['taskName'] ?? "",
          taskAssign: event.container.data[event.currentIndex]['taskAssign'] ?? "",
          status: "Doing",
          last_updated: event.container.data[event.currentIndex]['last_updated'],
          timestamp: event.container.data[event.currentIndex]['timestamp']
        };
        this.store.dispatch(UpdateTask({ payload: { status: "Done", data } }));

        this.changeStatus(taskId, "DONE")
      }
    }
  }

  changeStatus(id: number, status: string) {
    var data = {
      status: status
    }

    this.taskService.changeStatusTask(id, data).subscribe((res) => {
      this.initLoad()
    })

  }

  ngOnInit(): void {
    this.store.pipe(select(selectTodoList)).subscribe((data) => {
      this.Todo = data;
    });

    this.store.pipe(select(selectDoingList)).subscribe((data) => {
      this.Doing = data;
    });

    this.store.pipe(select(selectDoneList)).subscribe((data) => {
      this.Done = data;
    })
  }
}
