import { connect } from "../redux"

const mapGroupStateToProps = (state) => ({ group: state.group })


export const groupConnect = (Component) => connect(mapGroupStateToProps)(Component)
