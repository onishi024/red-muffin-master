import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Header from '../presentations/Header'

const mapStateToProps = state => ({
  app_bar_open: state.reducers.app_bar_open,
  group_select_open: state.reducers.group_select_open,
})

const mapDispatchToProps = dispatch => ({
  onClickAppBar: () => dispatch(Actions.onClickAppBar()),
  onClickGroup: () => dispatch(Actions.onClickGroup())
})

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
