import { useEffect } from 'react'
import { createContext, useState, useContext } from 'react'
import './App.css'

const appContext = createContext(null)

const store = {
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

function App() {
  return (
    <appContext.Provider value={store}>
      <大儿子 />
      <二儿子 />
      <幺儿子 />
    </appContext.Provider>
  )
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
const connect = (Component) => {
  return (props) => {
    const { state, setState } = useContext(appContext)
    //render
    const [, update] = useState({})
    useEffect(() => {
      store.subscribe(() => {
        update({})
      })
    }, [])
    // dispatch 规范 setState 流程
    const dispatch = (action) => {
      setState(reducer(state, action))
    }
    return <Component {...props} dispatch={dispatch} state={state} />
  }
}

const 大儿子 = () => {
  console.log('大儿子')
  return <section>大儿子<User /></section>
}
const 二儿子 = () => {
  console.log('二儿子')
  return <section>二儿子<UserModifier /></section>
}
const 幺儿子 = () => {
  console.log('幺儿子')
  return <section>幺儿子</section>
}
const User = connect(({ state }) => {
  console.log('User')
  return <div>User:{state.user.name}</div>
})

const UserModifier = connect(({ dispatch, state }) => {
  console.log('UserModifier')
  const onChange = (e) => {
    dispatch({ type: 'updateUser', payload: { name: e.target.value } })
  }
  return (
    <div>
      <input value={state.user.name}
        onChange={onChange} />
    </div>
  )
})

export default App
