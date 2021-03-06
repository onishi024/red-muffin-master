import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Issue from '../presentations/Issue'

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  issue_rows: state.reducers.parent_issue_rows.concat(state.reducers.sub_issue_rows),
  issue_cost_rows: state.reducers.issue_cost_rows,
  groupUsers: state.reducers.groupUsers,
  isLoading: state.reducers.isLoading,
})

const mapDispatchToProps = dispatch => ({
  onClickChangeIssueSubmit: change_data => dispatch(Actions.onClickChangeIssueSubmit(change_data)),
  onClickAddMemberSubmit: (parent_row, assigned) => dispatch(Actions.onClickAddMemberSubmit(parent_row,assigned)),
  onClickRemoveMemberSubmit: id => dispatch(Actions.deleteIssue(id))
})

const IssueContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Issue)

export default IssueContainer
