import { TodoPreview } from "./todo-preview.jsx"

export function TodoList({ todos, onRemoveTodo, onEditTodo, addToTodot }) {
    return <ul className="todo-list">
        {todos.map(todo =>
            <li className="todo-preview" key={todo._id}>
                <TodoPreview todo={todo} />
                {/* <div> */}
                    <button onClick={() => { onRemoveTodo(todo._id) }}>x</button>
                    {/* <button onClick={() => { onEditTodo(todo) }}>Edit</button> */}
                {/* </div> */}

            </li>)}
    </ul>
}