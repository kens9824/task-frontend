import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';



import { AppComponent } from './app.component';
import { reducer } from './reducers/task.reducer';


const routes: Routes = [
  {
    path: "",
    loadChildren: () =>
      import("./main/main.module").then(
        (m) => m.MainModule
      ),
  }
];

@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot({
      demoStore: reducer
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [],
  exports: [RouterModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
