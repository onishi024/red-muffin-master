import { connect } from 'react-redux'
// import * as Actions from '../../actions'
import MemberList from '../presentations/MemberList'

const mapStateToProps = state => ({
  show_hided_issue: state.reducers.show_hided_issue,
  issue_rows: state.reducers.issue_rows,
  selected_group_id: state.reducers.selected_group_id,
  selected_year: state.reducers.selected_year,
  current_id: state.reducers.current_id,
  group_users: state.reducers.groupUsers
})

// const mapDispatchToProps = dispatch => ({
//   getIssueRows: (event) => dispatch(Actions.getIssueRows(event)),
//   onToggleHide: () => dispatch(Actions.onToggleHide()),
//   onToggleIssueHide: (id, bool) => dispatch(Actions.onToggleIssueHide(id, bool)),
//   onoffSnackBar: () => dispatch(Actions.onoffSnackBar()),
// })

const MemberListContainer = connect(
  mapStateToProps
  // mapDispatchToProps
)(MemberList)

export default MemberListContainer
