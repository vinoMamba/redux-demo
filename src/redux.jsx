import { useEffect, useState, useContext, createContext } from "react"

export const appContext = createContext(null)

export const store = {
  state: {
    user: { name: 'vino', age: 20 }
  },
  setState(newState) {
    store.state = newState
    store.listeners.forEach(listener => listener(store.state))
  },
  listeners: [],
  subscribe(listener) {
    store.listeners.push(listener)
    //取消订阅
    return () => {
      const index = store.listeners.indexOf(listener)
      store.listeners.splice(index, 1)
    }
  }
}

//规范 state 创建流程
const reducer = (state, { type, payload }) => {
  if (type === 'updateUser') {
    return {
      ...state,
      user: {
        ...state.user,
        ...payload
      }
    }
  }
}

// 创建connect
export const connect = (selector) => (Component) => {
  return (props) => {
    const { state, setState } = useContext(appContext)
    //render
    const [, update] = useState({})
    const data = selector ? selector(state) : { state }
    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [])
    // dispatch 规范 setState 流程
    const dispatch = (action) => {
      setState(reducer(state, action))
    }
    return <Component {...props} {...data} dispatch={dispatch} />
  }
}
