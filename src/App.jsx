import './App.css'
import { store, connect, appContext } from './redux'

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
const 幺儿子 = connect(state => {
  return { group: state.group }
})(({ group }) => {
  console.log('幺儿子')
  return <section>幺儿子{group.name}</section>
}
)

const User = connect(state => {
  return { user: state.user }
})(({ user }) => {
  console.log('User')
  return <div>User:{user.name}</div>
})

const UserModifier = connect(null, (dispatch) => {
  return { updateUser: (attr) => dispatch({ type: 'updateUser', payload: attr }) }
})(({ updateUser, state }) => {
  console.log('UserModifier')
  const onChange = (e) => {
    updateUser({ name: e.target.value })
  }
  return (
    <div>
      <input value={state.user.name}
        onChange={onChange} />
    </div>
  )
})

export default App
