import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action, on } from '@ngrx/store';
import * as actions from '../actions/todo-item.actions';
export interface TodoEntity {
  id: string;
  name: string;
  dueDate?: string;
  project?: string;
  completed: boolean;
}

export interface TodosState extends EntityState<TodoEntity> {

}

export const adapter = createEntityAdapter<TodoEntity>();

// const initialState = adapter.getInitialState();
const initialState: TodosState = {
  ids: ['1', '2', '3', '4'],
  entities: {
    1: { id: '1', name: 'Make Tacos', completed: false },
    2: { id: '2', name: 'Clean Garage', project: 'Home', completed: false },
    3: { id: '3', name: 'Fix Gutters', project: 'Home', dueDate: '2021-02-24T20:39:47.830Z', completed: false },
    4: { id: '4', name: 'Mow Lawn', dueDate: '2021-05-15T20:39:47.830Z', completed: false }
  }
};

const reducerFunction = createReducer(
  initialState,
  on(actions.todoItemAdded, (state, action) => adapter.addOne(action.payload, state)),
  on(actions.todoItemMarkedComplete, actions.todoItemMarkedIncomplete,
    (state, action) => adapter.updateOne({
      id: action.item.id,
      changes: {
        completed: !action.item.completed
      }
    }, state)
  )
);

export function reducer(state: TodosState = initialState, action: Action): TodosState {
  return reducerFunction(state, action);
}



