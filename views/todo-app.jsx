const { useEffect, useState } = React
const { useSelector, useDispatch } = ReactRedux

import { TodoList } from '../cmps/todo-list.jsx'

import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadTodos, removeTodo, saveTodo } from '../store/todo.action.js'
import { ADD_TO_LIST } from '../store/store.js'


export function TodoApp() {
    const [todo, setTodo] = useState(todoService.getEmptyTodo())
    const todos = useSelector((storeState) => storeState.todos)

    const dispatch = useDispatch()

    useEffect(() => {
        loadTodos()
    }, [])

    function onRemoveTodo(todoId) {
        removeTodo(todoId)
            .then(() => {
                showSuccessMsg('Todo removed')
            })
            .catch(err => {
                showErrorMsg('Cannot remove todo')
            })
    }

    function onAddTodo(ev) {
        ev.preventDefault()
        saveTodo(todo)
            .then((savedTodo) => {
                showSuccessMsg(`Todo added (id: ${savedTodo._id})`)
            })
            .catch(err => {
                showErrorMsg('Cannot add todo')
            })
    }

    function handleChange({ target }) {
        let { name: field, value } = target
        setTodo((prevTodo) => ({ ...prevTodo, [field]: value }))
    }

    function onEditTodo(todo) {
        const price = +prompt('New price?')
        const todoToSave = { ...todo, price }

        saveTodo(todoToSave)
            .then((savedTodo) => {
                showSuccessMsg(`Todo updated to price: $${savedTodo.price}`)
            })
            .catch(err => {
                showErrorMsg('Cannot update todo')
            })
    }

    function addToList(todo) {
        console.log(`Adding ${todo.id} to List`)
        dispatch({ type: ADD_TO_LIST, todo })
        showSuccessMsg('Added to List')
    }
    return <section>
        <h3>Todos App</h3>
        <main>
            <form action="add-todo" onSubmit={onAddTodo}>
                <input type="text"
                    placeholder='What needs to be done?'
                    name='txt'
                    id='txt'
                    value={todo.txt}
                    onChange={handleChange}
                />
                <button>+</button>
            </form>
            <TodoList
                todos={todos}
                onRemoveTodo={onRemoveTodo}
                onEditTodo={onEditTodo}
                addToList={addToList}
            />
        </main>
    </section>

}