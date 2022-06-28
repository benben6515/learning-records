import { combineReducers } from 'redux'
import { todosReducer } from './todos'
import { Todo } from '../ts/interfaces'

export interface StoreState {
  todos: Todo[]
}

export const reducers = combineReducers<StoreState>({
  todos: todosReducer
})
