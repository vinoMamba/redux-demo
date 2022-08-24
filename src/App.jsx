import './App.css'
import { groupConnect } from './connect/groupConnect'
import { userConnect } from './connect/userConnect'
import { createStore, appContext } from './redux'


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

const store = createStore(reducer, {
  user: { name: 'vino', age: 18 },
  group: { name: 'frontend' }
})

function App() {
  return (
    <appContext.Provider value={store}>
      <大儿子 />
      <二儿子 />
      <幺儿子 />
    </appContext.Provider>
  )
}
const 大儿子 = () => {
  console.log('大儿子')
  return <section>大儿子<User /></section>
}
const 二儿子 = () => {
  console.log('二儿子')
  return <section>二儿子<UserModifier /></section>
}
const 幺儿子 = groupConnect(({ group }) => {
  console.log('幺儿子')
  return <section>幺儿子{group.name}</section>
})

const User = userConnect(({ user }) => {
  console.log('User')
  return <div>User:{user.name}</div>
})

const UserModifier = userConnect(({ updateUser, user }) => {
  console.log('UserModifier')
  const onChange = (e) => {
    updateUser({ name: e.target.value })
  }
  return (
    <div>
      <input value={user.name}
        onChange={onChange} />
    </div>
  )
})

export default App
