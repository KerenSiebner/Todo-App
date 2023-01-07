const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter
const { Provider } = ReactRedux
import { store } from "./store/store.js"


import { AppHeader } from "./cmps/app-header.jsx"
import { About } from "./views/about.jsx"
import { Home } from "./views/home.jsx"
import { TodoApp } from "./views/todo-app.jsx"
// import { TodoEdit } from "./views/todo-edit.jsx"
// import { TodoDetails } from "./views/todo-details.jsx"



export function App() {
    return <Provider store={store}>
        <Router>
            <section className="app">
                <AppHeader />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/todo" element={<TodoApp />} />
                    {/* <Route path="/todo/edit" element={<TodoEdit />} /> */}
                    {/* <Route path="/todo/edit/:todoId" element={<TodoEdit />} /> */}
                    {/* <Route path="/todo/details" element={<TodoDetails />} /> */}
                </Routes>
            </section>
        </Router>
    </Provider>
}
