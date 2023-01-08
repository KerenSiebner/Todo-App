const { Link, NavLink } = ReactRouterDOM
const {useEffect} = React

const { useSelector } = ReactRedux

import { LoginSignup } from './user/login-signup.jsx'
import { logout } from '../store/user.action.js'
import { loadTodos } from '../store/todo.action.js'

export function AppHeader() {
    const user = useSelector((storeState) => storeState.user)
    const todos = useSelector((storeState) => storeState.todos)

    useEffect(() => {
        loadTodos()
    }, [])

    function getUserProgress() {
        if (todos.length) {
            let doneTodos = todos.filter((todo) => todo.status === 'done')
            let toPrecentage = Math.ceil((doneTodos.length / todos.length) * 100)
            return toPrecentage
        }
    }

    function onLogout() {
        logout().then(() => {
            console.log('logged out seccussfully')
        })
    }

    return <header className="app-header">
        <Link to="/">
            <h3>MY TODOS</h3>
        </Link>
        <nav>
            {/* <NavLink to="/">Home</NavLink> */}
            {/* <NavLink to="/about">About</NavLink> */}
            <NavLink to="/todo">Todo</NavLink>
        </nav>
        {/* <section className='user-info'>
          <div className='todos-prog-bar'>
            <div
              className='prog-accomplished'
              style={{
                width: `${getUserProgress()}%`,
              }}></div>
            <span>{getUserProgress()}%</span>
          </div>
          <span>Hello, {user.fullname}</span>
          <button>
            <Link to='/user' className='nav-link'>
              Profile
            </Link>
          </button>
          <button onClick={onLogout}>Logout</button>
        </section> */}
      {/* {!user && (
        <section className='user-info'>
          <LoginSignup />
        </section>
      )} */}
    </header>
}
