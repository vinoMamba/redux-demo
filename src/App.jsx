import { createContext, useState, useContext } from 'react'
import './App.css'

const appContext = createContext(null)

function App() {
  const [appState, setAppState] = useState({
    user: { name: 'vino', age: 20 }
  })
  const contextValue = { appState, setAppState }
  return (
    <appContext.Provider value={contextValue}>
      <大儿子 />
      <二儿子 />
      <幺儿子 />
    </appContext.Provider>
  )
}

const 大儿子 = () => <section>大儿子<User /></section>
const 二儿子 = () => <section>二儿子<UserModifier /></section>
const 幺儿子 = () => <section>幺儿子</section>
const User = () => {
  const contextValue = useContext(appContext)
  return <div>User:{contextValue.appState.user.name}</div>

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

const UserModifier = () => {
  const { appState, setAppState } = useContext(appContext)
  const onChange = (e) => {
    setAppState(reducer(appState, { type: 'updateUser', payload: { name: e.target.value } }))
  }
  return <div>
    <input value={appState.user.name}
      onChange={onChange} />
  </div>
}

export default App
