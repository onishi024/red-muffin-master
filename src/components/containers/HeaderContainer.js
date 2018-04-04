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

  onClickGroup: value =>
    Promise.resolve()
      .then(() => {dispatch(Actions.onClickGroup(value))})
      .then(() => {dispatch(Actions.getProjects())}),
      // .then(projects => dispatch(Actions.setProjects(projects)))
      // .then(() => {dispatch(Actions.getIssueRows())}),

  onClickYear: value =>
    Promise.resolve()
      .then(() => {dispatch(Actions.onClickYear(value))})
      .then(() => {dispatch(Actions.getProjects())})
      .then(() => {dispatch(Actions.getIssueRows())}),

  onClickIssueList: () => dispatch(Actions.onClickIssueList())
})

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
