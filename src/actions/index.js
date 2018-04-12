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

export const setIssueRows = issue_rows => ({
  type: ActionTypes.SET_ISSUE_ROWS,
  payload: {issue_rows}
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

//Register
export const onClickRegisterSubmit = form => {
  return {
    type: ActionTypes.REGISTER_ISSUE,
    payload: {
      form
    }
  }
}

//Issue
export const onClickChangeIssueSubmit = issue_cost_rows => {
  return {
    type: ActionTypes.CHANGE_ISSUE,
    payload: {
      issue_cost_rows
    }
  }
}
