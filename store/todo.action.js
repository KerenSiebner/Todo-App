import { todoService } from '../services/todo.service.js'
import { store, REMOVE_TODO, SET_TODOS, ADD_TODO, UPDATE_TODO } from '../store/store.js'

export function loadTodos() {
    return todoService.query()
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