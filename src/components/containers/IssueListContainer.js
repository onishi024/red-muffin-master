import { connect } from 'react-redux'
import * as Actions from '../../actions'
import IssueList from '../presentations/IssueList'

const mapStateToProps = state => ({
  selected_function: state.reducers.selected_function,
  show_hided_issue: state.reducers.show_hided_issue,
  issue_rows: state.reducers.issue_rows,
  selected_group_id: state.reducers.selected_group_id,
  selected_year: state.reducers.selected_year,
  snackbar_open: state.reducers.snackbar_open,
  current_id: state.reducers.current_id
})

const mapDispatchToProps = dispatch => ({
  getIssueRows: (event) => dispatch(Actions.getIssueRows(event)),
  onToggleHide: () => dispatch(Actions.onToggleHide()),
  onToggleIssueHide: (id, bool) => dispatch(Actions.onToggleIssueHide(id, bool))
})

const IssueListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueList)

export default IssueListContainer
