import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "../model/task.model";


export const selectTodo = createFeatureSelector<State>('demoStore');

export const selectTodoList = createSelector(
  selectTodo,
  (state: State) => state.Todo
);

export const selectDoing = createFeatureSelector<State>('demoStore');

export const selectDoingList = createSelector(
  selectDoing,
  (state: State) => state.Doing
);

export const selectDone = createFeatureSelector<State>('demoStore');

export const selectDoneList = createSelector(
  selectDone,
  (state: State) => state.Done
);