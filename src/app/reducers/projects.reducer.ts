import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, Action } from '@ngrx/store';

export interface ProjectEntity {
  id: string;
  name: string;
}

export interface ProjectState extends EntityState<ProjectEntity> {

}

export const adapter = createEntityAdapter<ProjectEntity>();

const initialState = adapter.getInitialState();


const reducerFunction = createReducer(
  initialState
);

export function reducer(state: ProjectState = initialState, action: Action): ProjectState {
  return reducerFunction(state, action);
}



