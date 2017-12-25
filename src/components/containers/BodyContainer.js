import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Body from '../presentations/Body'

const mapStateToProps = state => ({
  selected_function: state.selected_function,
  show_hided_issue: state.show_hided_issue,
  checked_issue_id: state.checked_issue_id,
  issue_rows: state.issue_rows
})

const mapDispatchToProps = dispatch => ({
  onCheck: id => dispatch(Actions.onCheck(id)),
  onToggleHide: () => dispatch(Actions.onToggleHide()),
  onToggleIssueHide: () => dispatch(Actions.onToggleIssueHide())
})

const BodyContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Body)

export default BodyContainer
