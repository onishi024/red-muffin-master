import * as ActionTypes from '../constants/ActionTypes'

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

export const onCheck = (id = null) => {
  return {
    type: ActionTypes.CHECK_ISSUE,
    payload: {
      id
    }
  }
}

export const onToggleHide = () => {
  console.log("onToggleHide");
  return {
    type: ActionTypes.TOGGLE_HIDE,
    payload: {}
  }
}

export const onToggleIssueHide = () => {
  console.log("onToggleIssueHide");
  return {
    type: ActionTypes.TOGGLE_ISSUE_HIDE,
    payload: {}
  }
}

export const onClickFunction = (selected_function = 0) => {
  return {
    type: ActionTypes.CLICK_FUNCTION,
    payload: {
      selected_function
    }
  }
}
