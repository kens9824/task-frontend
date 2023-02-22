import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../service/common.service';
import {DragDropModule} from '@angular/cdk/drag-drop';




const routes: Routes = [

  {
    path: "",
    component: HomeComponent,
  }

];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),

  ], 
  providers: [CommonService]
})
export class MainModule { }
