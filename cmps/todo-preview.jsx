export function TodoPreview({ todo }) {
    return <article>
        <div> 
            <input 
            type="checkbox" />
             <span>{todo.txt}</span> <span className={todo.status}>{todo.status}</span>
             </div>
    </article>
}