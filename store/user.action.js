import { userService } from '../services/user.service.js'
import { store, SET_USER, UPDATE_USER } from '../store/user.reducer'

// User

export function update(user) {
  return userService
    .update(user)
    .then((user) => {
      store.dispatch({ type: UPDATE_USER, user })
      return user
    })
    .catch((err) => {
      console.error('Cannot login:', err)
      throw err
    })
}

export function login(credentials) {
  return userService
    .login(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user })
      return user
    })
    .catch((err) => {
      console.error('Cannot login:', err)
      throw err
    })
}

export function signup(credentials) {
  return userService
    .signup(credentials)
    .then((user) => {
      store.dispatch({ type: SET_USER, user })
      return user
    })
    .catch((err) => {
      console.error('Cannot signup:', err)
      throw err
    })
}

export function logout() {
  return userService
    .logout()
    .then(() => {
      store.dispatch({ type: SET_USER, user: null })
    })
    .catch((err) => {
      console.error('Cannot logout:', err)
      throw err
    })
}
