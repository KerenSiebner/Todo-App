import { TodoPreview } from "./todo-preview.jsx"

export function TodoList({ todos, onRemoveTodo,onToggleTodoStatus, onEditTodo}) {
    return <ul className="todo-list">
        <div className="todo-list-header">
            <div>Task</div>
            <div>Status</div>
        </div>
        {todos.map(todo =>
            <li className="todo-preview" key={todo._id}>
                <TodoPreview 
                todo={todo} 
                onRemoveTodo={onRemoveTodo}
                onDoneTodo={onToggleTodoStatus} />
                {/* <div> */}
                {/* <button onClick={() => { onEditTodo(todo) }}>Edit</button> */}
                {/* </div> */}

            </li>)}
    </ul>
}