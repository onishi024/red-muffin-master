import { connect } from 'react-redux'
import * as Actions from '../../actions'
import Calendar from '../presentations/Calendar'

const mapStateToProps = (state, ownProps) => ({
  group_users: state.reducers.groupUsers,
  time_entries: state.reducers.time_entries,
})

const mapDispatchToProps = dispatch => ({
  getTimeEntries: () => dispatch(Actions.getTimeEntries()),
})

const CalendarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar)

export default CalendarContainer
