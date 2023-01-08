const { useState, useEffect, useRef } = React

import { utilService } from '../services/util.service.js'
import { todoService } from '../services/todo.service.js'

export function TodoFilter({ onSetFilter }) {
    const [filterByToEdit, setFilterByToEdit] = useState(todoService.getDefaultFilter())

    // onSetFilter = useRef(utilService.debounce(onSetFilter))
    // const elInputRef = useRef(null)

    useEffect(() => {
        // elInputRef.current.focus()
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    function handleChange({ target }) {
        // let { value, name: field, type } = target
        // // value = (type === 'number') ? +value : value
        // setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
        const field = target.name
        const value = target.value
        console.log('field, value', field, value)
        console.log('filterByToEdit', filterByToEdit)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return <section className="todo-filter">
        {/* <form onSubmit={onSubmitFilter}> */}
            <select
                name="status"
                id="status"
                defaultValue={filterByToEdit.status}
                onChange={handleChange}
            >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="done">Done</option>
            </select>
            <input
                type="text"
                placeholder="Search"
                value={filterByToEdit.searchTxt}
                name='searchTxt'
                id='searchtxt'
                onChange={handleChange}
            />
            {/* <button>Filter</button> */}
        {/* </form> */}
    </section>
}