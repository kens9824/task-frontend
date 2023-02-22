import { Injectable } from '@angular/core';
import { CommonService } from './common.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private commonService: CommonService, private httpClient: HttpClient,

  ) { }

  addTask(data: any) {
    return this.httpClient.post(this.commonService.envUrl() + 'task', data);
  }

  getAllTask() {
    return this.httpClient.get(this.commonService.envUrl() + 'task');
  }

  changeStatusTask(id:number,data:any) {
    return this.httpClient.put(this.commonService.envUrl() + 'task/' + id,data);
  }
}
