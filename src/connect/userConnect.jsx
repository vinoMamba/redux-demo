import { connect } from "../redux"

const mapUserStateToProps = (state) => ({ user: state.user })

const mapUserDispatchToProps = (dispatch) => {
  return { updateUser: (attr) => dispatch({ type: 'updateUser', payload: attr }) }
}

export const userConnect = (Component) => connect(mapUserStateToProps, mapUserDispatchToProps)(Component)
