import { todoService } from '../services/todo.service.js'
import {store} from '../store/store.js'
import {REMOVE_TODO, SET_TODOS, ADD_TODO, UPDATE_TODO , SET_FILTER} from '../store/todo.reducer.js'

export function loadTodos(filterBy) {
    return todoService.query(filterBy)
        .then((todos) => {
            store.dispatch({ type: SET_TODOS, todos })
        })
        .catch(err => {
            console.log('Had issues loading todos', err)
            throw err
        })
}

export function removeTodo(todoId) {
    return todoService.remove(todoId)
        .then(() => {
            store.dispatch({ type: REMOVE_TODO, todoId })
        })
        .catch(err => {
            console.log('Had issues Removing todo', err)
            throw err
        })
}

export function setFilter(filterBy) {
    store.dispatch({ type: SET_FILTER, filterBy })
  }

export function saveTodo(todo) {
    const type = (todo._id) ? UPDATE_TODO : ADD_TODO
    return todoService.save(todo)
        .then(savedTodo => {
            store.dispatch({ type, todo: savedTodo })
            return savedTodo
        })
        .catch(err => {
            console.error('Cannot save todo:', err)
            throw err
        })
}