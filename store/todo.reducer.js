import { todoService } from "../services/todo.service.js"

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_FILTER = 'SET_FILTER'

const initialState = {
    todos: [],
    filterBy: todoService.getDefaultFilter(),
}

export function todoReducer(state = initialState, action) {
    let todos

    switch (action.type) {
        case SET_TODOS:
            return { ...state, todos: action.todos }
        case REMOVE_TODO:
            todos = state.todos.filter(c => c._id !== action.todoId)
            return { ...state, todos }
        case ADD_TODO:
            todos = [...state.todos]
            todos.unshift(action.todo)
            return { ...state, todos: todos }
        case UPDATE_TODO:
            todos = state.todos.map(todo => todo._id === action.todo._id ? action.todo : todo)
            return { ...state, todos }
        case SET_FILTER:
            return {...state, filterBy: action.filterBy} 
        default:
            return { ...state }
    }
}