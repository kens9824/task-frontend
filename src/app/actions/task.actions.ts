import { createAction, props } from '@ngrx/store';
import { Payload } from '../model/task.model';

export const ADD_TASK = 'Add Task';
export const UPDATE_TASK = 'Update Task';

export interface Action {
    type: string;
}

export const AddTask = createAction(
    ADD_TASK,
    props<{ payload: Payload }>()
);

export const UpdateTask = createAction(
    UPDATE_TASK,
    props<{ payload: Payload }>()
);
