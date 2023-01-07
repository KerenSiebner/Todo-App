
import {storageService} from './async-storage.service.js'
import {utilService} from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'todoDB'

_createTodos()

export const todoService = {
    query,
    getById,
    save,
    remove,
    getEmptyTodo
}


function query() {
    // return axios.get(BASE_URL).then(res => res.data)
    return storageService.query(STORAGE_KEY)
}
function getById(todoId) {
    return storageService.get(STORAGE_KEY, todoId)
}
function remove(todoId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, todoId)
}
function save(todo) {
    if (todo._id) {
        return storageService.put(STORAGE_KEY, todo)
    } else {
        // when switching to backend - remove the next line
        // todo.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, todo)
    }
}

function getEmptyTodo() {
    return { 
        txt:'',
        status: 'active',  
    }
}

function _createTodos(){
    let todos = utilService.loadFromStorage(STORAGE_KEY) || []
    if (!todos || !todos.length) {
      todos = []
      todos.push({txt: "Work on Redux", status: "active", _id: utilService.makeId()})
      todos.push({txt: "Practice Node js", status: "done", _id: utilService.makeId()})
      todos.push({txt: "Work hard, but also find time to relax", status: "active", _id: utilService.makeId()})
  
      utilService.saveToStorage(STORAGE_KEY, todos)
    }
  }

