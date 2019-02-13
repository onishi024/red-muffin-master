import { connect } from 'react-redux'
import * as Actions from '../../actions'
import IssueList from '../presentations/IssueList'

const mapStateToProps = state => ({
  selected_function: state.reducers.selected_function,
  show_hided_issue: state.reducers.show_hided_issue,
  parent_issue_rows: state.reducers.parent_issue_rows,
  sub_issue_rows: state.reducers.sub_issue_rows,
  selected_group_id: state.reducers.selected_group_id,
  selected_year: state.reducers.selected_year,
  snackbar_open: state.reducers.snackbar_open,
  current_id: state.reducers.current_id,
  filter_flg: state.reducers.filter_flg,
  filter_flg_naibukanrino: state.reducers.filter_flg_naibukanrino,
  filter_flg_title:state.reducers.filter_flg_title,
  filter_flg_assignedName:state.reducers.filter_flg_assignedName,
  input_value: state.reducers.input_value,
  input_value_naibukanrino: state.reducers.input_value_naibukanrino,
  input_value_title: state.reducers.input_value_title,
  input_value_assignedName: state.reducers.input_value_assignedName,
})

const mapDispatchToProps = dispatch => ({
  getIssueRows: (event) => dispatch(Actions.getIssueRows(event)),
  onToggleHide: () => dispatch(Actions.onToggleHide()),
  onToggleIssueHide: (id, bool) => dispatch(Actions.onToggleIssueHide(id, bool)),
  onoffSnackBar: () => dispatch(Actions.onoffSnackBar()),
  filterIssueRows: (event, value) => dispatch(Actions.filterIssueRows(event, value)),
  filterNaibukanrino: (event, value) => dispatch(Actions.filterNaibukanrino(event, value)),
  filterTitle: (event, value) => dispatch(Actions.filterTitle(event, value)),
  filterAssignedName: (event, value) => dispatch(Actions.filterAssignedName(event, value)),
})

const IssueListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(IssueList)

export default IssueListContainer
