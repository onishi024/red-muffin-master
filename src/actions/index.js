import * as ActionTypes from '../constants/ActionTypes'

//API
export const getGroups = () => ({
  type: ActionTypes.GET_GROUPS
})

export const setGroups = groups => ({
  type: ActionTypes.SET_GROUPS,
  payload: {groups}
})

export const getGroupUsers = () => ({
  type: ActionTypes.GET_GROUP_USERS
})

export const setGroupUsers = groupUsers => ({
  type: ActionTypes.SET_GROUP_USERS,
  payload: {groupUsers}
})

export const getUsers = () => ({
  type: ActionTypes.GET_USERS
})

export const setUsers = users => ({
  type: ActionTypes.SET_USERS,
  payload: {users}
})

export const getYears = () => ({
  type: ActionTypes.GET_YEARS
})

export const setYears = years => ({
  type: ActionTypes.SET_YEARS,
  payload: {years}
})

export const getProjects = () => ({
  type: ActionTypes.GET_PROJECTS
})

export const setProjects = projects_id => ({
  type: ActionTypes.SET_PROJECTS,
  payload: {projects_id}
})

export const getIssueRows = () => ({
  type: ActionTypes.GET_ISSUE_ROWS,
})

export const setIssueRows = (parent_issue_rows,sub_issue_rows) => ({
  type: ActionTypes.SET_ISSUE_ROWS,
  payload: {parent_issue_rows,sub_issue_rows}
})

export const getParentIssueRows = () => ({
  type: ActionTypes.GET_PARENT_ISSUE_ROWS,
})

export const setParentIssueRows = issue_rows => ({
  type: ActionTypes.SET_PARENT_ISSUE_ROWS,
  payload: {issue_rows}
})

export const getSubIssueRows = () => ({
  type: ActionTypes.GET_SUB_ISSUE_ROWS,
})

export const setSubIssueRows = issue_rows => ({
  type: ActionTypes.SET_SUB_ISSUE_ROWS,
  payload: {issue_rows}
})

export const getAroundIssueRows = issue_rows => ({
  type: ActionTypes.GET_AROUND_ISSUE_ROWS,
  payload: {issue_rows},
})

export const setAroundIssueRows = issue_rows => ({
  type: ActionTypes.SET_AROUND_ISSUE_ROWS,
  payload: {issue_rows}
})

export const setIsLoading = bool => ({
  type: ActionTypes.SET_ISLOADING,
  payload: {bool}
})

export const deleteIssue = id => ({
  type: ActionTypes.DELETE_ISSUE,
  payload: {id}
})

export const getTimeEntries = () => ({
  type: ActionTypes.GET_TIME_ENTRIES
})

export const setTimeEntries = time_entries => ({
  type: ActionTypes.SET_TIME_ENTRIES,
  payload: {time_entries}
})

//Header
export const onClickAppBar = () => ({
  type: ActionTypes.CLICK_APP_BAR,
  payload: {}
})

export const onClickGroup = selected_group_id => {
  return {
    type: ActionTypes.SELECT_GROUP,
    payload: {selected_group_id}
  }
}

export const onClickYear = selected_year => {
  return {
    type: ActionTypes.SELECT_YEAR,
    payload: {selected_year}
  }
}

export const onClickIssueList = () => ({
  type: ActionTypes.GET_ISSUE_ROWS,
  payload: {}
})

//IssueList
export const onToggleHide = () => {
  return {
    type: ActionTypes.TOGGLE_HIDE,
    payload: {}
  }
}

export const onToggleIssueHide = (id, bool) => {
  return {
    type: ActionTypes.TOGGLE_ISSUE_HIDE,
    payload: {
      id, bool
    }
  }
}

export const onoffSnackBar = () => {
  return {
    type: ActionTypes.ONOFF_SNACKBAR,
    payload: {}
  }
}


//Register
export const onClickRegisterConfirm = form => {
  return {
    type: ActionTypes.REGISTER_ISSUE,
    payload: {
      form
    }
  }
}

//Issue
export const onClickChangeIssueSubmit = (change_data, starting_issue_row) => {
  return {
    type: ActionTypes.CHANGE_ISSUE,
    payload: {
      change_data, starting_issue_row
    }
  }
}

export const onClickAddMemberSubmit = (parent_row, assigned) => {
  return {
    type: ActionTypes.ISSUE_ADD_MEMBER,
    payload: {
      parent_row, assigned
    }
  }
}

//MemberList
export const onoffAssignedProjectList = () => {
  return {
    type: ActionTypes.ONOFF_ASSIGNEDPROJECTLIST,
    payload: {}
  }
}

export const setSelectedMember = (assigned_id) => {
  return {
    type: ActionTypes.SELECT_MEMBER,
    payload: {assigned_id}
  }
}
