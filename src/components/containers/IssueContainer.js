import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Issue from '../presentations/Issue'

const mapStateToProps = (state, ownProps) => ({
  id: ownProps.match.params.id,
  issue_rows: state.reducers.issue_rows,
  issue_cost_rows: state.reducers.issue_cost_rows,
  groupUsers: state.reducers.groupUsers
})

const mapDispatchToProps = dispatch => ({
  onClickChangeIssueSubmit: issue_cost_rows => dispatch(Actions.onClickChangeIssueSubmit(issue_cost_rows))
})

const IssueContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Issue)

export default IssueContainer
