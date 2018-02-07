import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Issue from '../presentations/Issue'

const mapStateToProps = state => ({
  selected_function: state.reducers.selected_function,
  show_hided_issue: state.reducers.show_hided_issue,
  issue_rows: state.reducers.issue_rows
})

const mapDispatchToProps = dispatch => ({
  onToggleHide: () => dispatch(Actions.onToggleHide()),
  onToggleIssueHide: (id, bool) => dispatch(Actions.onToggleIssueHide(id, bool))
})

const IssueContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Issue)

export default IssueContainer
