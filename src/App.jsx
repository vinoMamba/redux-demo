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
