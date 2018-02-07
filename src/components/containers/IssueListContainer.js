import { connect } from 'react-redux'
import * as Actions from '../../actions'
import IssueList from '../presentations/IssueList'

const mapStateToProps = state => ({
  selected_function: state.reducers.selected_function,
  show_hided_issue: state.reducers.show_hided_issue,
  issue_rows: state.reducers.issue_rows
})

const mapDispatchToProps = dispatch => ({
  onToggleHide: () => dispatch(Actions.onToggleHide()),
  onToggleIssueHide: (id, bool) => dispatch(Actions.onToggleIssueHide(id, bool))
})

const IssueListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueList)

export default IssueListContainer
