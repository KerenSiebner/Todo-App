import { userService } from "../services/user.service.js"

export const SET_TODOS = 'SET_TODOS'
export const REMOVE_TODO = 'REMOVE_TODO'
export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const SET_USER = 'SET_USER'
export const UPDATE_USER = 'UPDATE_USER'

const { createStore } = Redux

const initialState = {
    todos: [],
    user: userService.getLoggedinUser()
}

function appReducer(state = initialState, action) {
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

        // User
        case SET_USER:
            return { ...state, user: action.user }
        default:
            return { ...state }
    }
}

export const store = createStore(appReducer)

// For debug only!
store.subscribe(() => {
    console.log('Current state is:', store.getState())
})
