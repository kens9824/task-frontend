import { createReducer, on } from "@ngrx/store";
import { State, Task } from "../model/task.model";
import { AddTask, UpdateTask } from './../actions/task.actions';

export const initialState: State = {
    Todo: [],
    Done: [],
    Doing: [],
}

export const reducer = createReducer(
    initialState,
    on(AddTask, (state, action) => {
        return  { ...state, [action.payload.status]: [...state[action.payload.status], ...[action.payload.data]] };
     }),
     on(UpdateTask, (state, action) => {        
        const index = state[action.payload.status].findIndex((value: Task) => value.id === action.payload.data.id);
            state[action.payload.status].splice(index, 1);
            state[action.payload.data.status].push(action.payload.data);
            return { ...state, [action.payload.status]: [...state[action.payload.status]], [action.payload.data.status]: [...state[action.payload.data.status]] };
     })
  );