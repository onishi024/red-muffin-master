import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Issue from '../presentations/Issue'

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  issue_rows: state.reducers.parent_issue_rows.concat(state.reducers.sub_issue_rows),
  issue_cost_rows: state.reducers.issue_cost_rows,
  groupUsers: state.reducers.groupUsers,
  isLoading: state.reducers.isLoading,
  around_issue_rows: state.reducers.around_issue_rows,
  selected_year: state.reducers.selected_year,
  around_issue_rows: state.reducers.around_issue_rows,
})

const mapDispatchToProps = dispatch => ({
  onClickChangeIssueSubmit: (change_data, starting_issue_row) => dispatch(Actions.onClickChangeIssueSubmit(change_data, starting_issue_row)),
  onClickAddMemberSubmit: (parent_row, assigned) => dispatch(Actions.onClickAddMemberSubmit(parent_row,assigned)),
  onClickRemoveMemberSubmit: id => dispatch(Actions.deleteIssue(id)),
  getAroundIssueRows: issue_rows => dispatch(Actions.getAroundIssueRows(issue_rows)),
})

const IssueContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Issue)

export default IssueContainer
