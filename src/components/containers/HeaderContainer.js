import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Header from '../presentations/Header'

const mapStateToProps = state => ({
  app_bar_open: state.app_bar_open,
  group_select_open: state.group_select_open,
})

const mapDispatchToProps = dispatch => ({
  onClickAppBar: () => dispatch(Actions.onClickAppBar()),
  onClickGroup: () => dispatch(Actions.onClickGroup()),
  onClickFunction: selected_function => dispatch(Actions.onClickFunction(selected_function))
})

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
