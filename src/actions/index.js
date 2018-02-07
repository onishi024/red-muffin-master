import * as ActionTypes from '../constants/ActionTypes'

//Header
export const onClickAppBar = () => ({
  type: ActionTypes.CLICK_APP_BAR,
  payload: {}
})

export const onClickGroup = () => {
  return {
    type: ActionTypes.CLICK_GROUP,
    payload: {}
  }
}

//Issue
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
