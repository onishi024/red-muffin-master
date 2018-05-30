import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Member from '../presentations/Member'

const mapStateToProps = state => ({
  issue_rows: state.reducers.issue_rows,
  selected_member: state.reducers.selected_member
})

const mapDispatchToProps = dispatch => ({
  onoffAssignedProjectList: () => dispatch(Actions.onoffAssignedProjectList()),
  setSelectedMember: (assigned_id) => dispatch(Actions.setSelectedMember(assigned_id)),
})

const MemberContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Member)

export default MemberContainer
