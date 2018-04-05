import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Register from '../presentations/Register'

const mapStateToProps = state => ({
  register_form: state.reducers.register_form,
  group_users: state.reducers.groupUsers,
})

const mapDispatchToProps = dispatch => ({
  onClickRegisterSubmit: form => dispatch(Actions.onClickRegisterSubmit(form))
})

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

export default RegisterContainer
