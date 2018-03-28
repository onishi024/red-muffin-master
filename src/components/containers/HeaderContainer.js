import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Header from '../presentations/Header'

const mapStateToProps = state => ({
  app_bar_open: state.reducers.app_bar_open,
  group_select_open: state.reducers.group_select_open,
  groups: state.reducers.groups,
  selected_group_id: state.reducers.selected_group_id,
  years: state.reducers.years,
  selected_year: state.reducers.selected_year,
})

const mapDispatchToProps = dispatch => ({
  onClickAppBar: () => dispatch(Actions.onClickAppBar()),
  onClickGroup: value => Promise.all([dispatch(Actions.onClickGroup(value))]).then(dispatch(Actions.getIssueRows())),
  onClickYear: value => dispatch(Actions.onClickYear(value)),
  onClickIssueList: () => dispatch(Actions.onClickIssueList())
})

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
