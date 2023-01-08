import { removeTodo } from "../store/todo.action"

export function TodoPreview({ todo ,onRemoveTodo, onDoneTodo }) {

    function removeTodo(){
        onRemoveTodo(todo)
    }

    function doneTodo(ev) {
        ev.stopPropagation()
        onDoneTodo(todo)
      }

    return <div className="todo-item">
            <button onClick={()=>{removeTodo}} className="remove-todo">x</button>
            <input type="checkbox" className="checkbox" onChange={doneTodo}/>
            <div className={`todo-txt todo-txt-${todo.status}`}>{todo.txt}</div> 
            <div className={`todo-${todo.status} todo-status`}>{todo.status}</div>
        </div>

}