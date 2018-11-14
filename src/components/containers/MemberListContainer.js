import { connect } from 'react-redux'
import * as Actions from '../../actions'
import MemberList from '../presentations/MemberList'

const mapStateToProps = state => ({
  show_hided_issue: state.reducers.show_hided_issue,
  parent_issue_rows: state.reducers.parent_issue_rows,
  sub_issue_rows: state.reducers.sub_issue_rows,
  selected_group_id: state.reducers.selected_group_id,
  selected_year: state.reducers.selected_year,
  current_id: state.reducers.current_id,
  group_users: state.reducers.groupUsers,
  assigned_projectlist_open: state.reducers.assigned_projectlist_open,
  selected_member: state.reducers.selected_member,
  transition_issue: state.reducers.transition_issue,
})

const mapDispatchToProps = dispatch => ({
  onoffAssignedProjectList: () => dispatch(Actions.onoffAssignedProjectList()),
  setSelectedMember: (assigned_id) => dispatch(Actions.setSelectedMember(assigned_id)),
  onToggleHide: () => dispatch(Actions.onToggleHide()),
  setTransitionIssue: (transition_issue) => dispatch(Actions.setTransitionIssue(transition_issue))
})

const MemberListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberList)

export default MemberListContainer
