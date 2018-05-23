import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Register from '../presentations/Register'

const mapStateToProps = state => ({
  register_form: state.reducers.register_form,
  group_users: state.reducers.groupUsers,
  isLoading: state.reducers.isLoading,
})

const mapDispatchToProps = dispatch => ({
  onClickRegisterConfirm: form => dispatch(Actions.onClickRegisterConfirm(form)),
})

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Register)

export default RegisterContainer
