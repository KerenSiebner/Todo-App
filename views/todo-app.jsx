const { useEffect, useState } = React
const { useSelector, useDispatch } = ReactRedux

import { TodoList } from '../cmps/todo-list.jsx'
import { TodoFilter } from '../cmps/todo-filter.jsx'

import { todoService } from '../services/todo.service.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { loadTodos, removeTodo, saveTodo, setFilter } from '../store/todo.action.js'
import { ADD_TO_LIST } from '../store/store.js'


export function TodoApp() {

    const [todo, setTodo] = useState(todoService.getEmptyTodo())
    const todos = useSelector((storeState) => storeState.todoModule.todos)
    const filterBy = useSelector((storeState) => storeState.filterBy)

    const dispatch = useDispatch()

    useEffect(() => {
        loadTodos(filterBy)
    }, [filterBy])

    function onRemoveTodo(todo) {
        removeTodo(todo._id)
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
                setTodo({...todo, txt:''})
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

    function onSetFilter(filterBy){
        console.log('filterBy', filterBy)
        loadTodos(filterBy)
    }

    function onToggleTodoStatus(todo) {
        todo.status = todo.status === 'active' ? 'done' : 'active'
        saveTodo(todo)
        //   .then(() => {
        //     const activity = {
        //       activity: `${todo.status.charAt(0).toUpperCase() + todo.status.substring(1)}: ${todo.txt
        //         }`,
        //       createdAt: Date.now(),
        //       type: todo.status,
        //     }
    
        //     userService.addActivity(activity)
        //   })
          .catch((err) => {
            showErrorMsg('Cannot change todo status', err)
          })
      }

    return <section className='todo-main-container'>
        <main>
            <form 
            action="add-todo" 
            className="add-todo" 
            onSubmit={onAddTodo}>
                <input type="text"
                    placeholder='What needs to be done?'
                    name='txt'
                    id='txt'
                    value={todo.txt}
                    onChange={handleChange}
                />
                <button className='add-btn'>+</button>
            </form>
            <TodoFilter onSetFilter={onSetFilter}/>
            <TodoList
                todos={todos}
                onRemoveTodo={onRemoveTodo}
                onEditTodo={onEditTodo}
                addToList={addToList}
                onToggleTodoStatus={onToggleTodoStatus}
            />
        </main>
    </section>

}