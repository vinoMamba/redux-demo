import { useEffect, useState, useContext, createContext } from "react"

export const appContext = createContext(null)

const store = {
  state: undefined,
  reducer: undefined,
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
export const createStore = (reducer, initialState) => {
  store.state = initialState
  store.reducer = reducer
  return store
}



const changed = (data, newData) => {
  let changed = false
  Object.keys(data).forEach(key => {
    if (data[key] !== newData[key]) {
      changed = true
    }
  })
  return changed
}


// 创建connect
export const connect = (mapStateToProps, mapDispatchToProps) => (Component) => {
  return (props) => {
    // dispatch 规范 setState 流程
    const dispatch = (action) => { setState(store.reducer(state, action)) }
    const { state, setState } = useContext(appContext)
    //render
    const [, update] = useState({})
    const data = mapStateToProps ? mapStateToProps(state) : { state }
    const dispatchers = mapDispatchToProps ? mapDispatchToProps(dispatch) : { dispatch }
    useEffect(() => {
      //return 为了取消订阅
      return store.subscribe(() => {
        const newData = mapStateToProps ? mapStateToProps(store.state) : { state: store.state }
        if (changed(data, newData)) {
          update({})
        }
      })
    }, [mapStateToProps])
    return <Component {...props} {...data} {...dispatchers} />
  }
}
