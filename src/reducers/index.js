import * as ActionTypes from '../constants/ActionTypes'
import configs from '../configs/inner_table'

const initState = {
  app_bar_open: false,
  group_select_open: false,
  groups: [],
  groupUsers: [],
  selected_group_id: 10,
  years: [],
  selected_year: '2017',
  selected_identifier: 'a',
  selected_name: '債権開発',
  selected_project_id: 1,
  show_hided_issue: true,
  selected_issue: '0',
  issues: [],
  issue_rows: [],
  parent_issue_rows: [],
  sub_issue_rows: [],
  projects: [],
  snackbar_open: false,
  current_id: 0,
  isLoading: false,
  assigned_projectlist_open: false,
  selected_member: null,
  time_entries: [],
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    //API
    case ActionTypes.SET_GROUPS: {
      const groups = action.payload.groups
      return {...state, groups}
    }
    case ActionTypes.SET_GROUP_USERS: {
      const groupUsers = action.payload.groupUsers
      return {...state, groupUsers}
    }
    case ActionTypes.SET_YEARS: {
      const years = action.payload.years
      return {...state, years}
    }
    case ActionTypes.SET_PROJECTS: {
      console.log("SET_PROJECTS");
      const selected_project_id = action.payload.projects_id
      console.log(selected_project_id);
      return {...state, selected_project_id}
    }
    case ActionTypes.SET_ISSUE_ROWS: {
      const parent_issue_rows = action.payload.parent_issue_rows
      const sub_issue_rows = action.payload.sub_issue_rows
      const isLoading = false
      console.log("parent_issue_rows: ",parent_issue_rows)
      console.log("sub_issue_rows: ",sub_issue_rows)
      return {...state, parent_issue_rows, sub_issue_rows, isLoading}
    }
    case ActionTypes.SET_PARENT_ISSUE_ROWS: {
      const parent_issue_rows = action.payload.issue_rows
      const isLoading = false
      console.log("parent_issue_rows: ",parent_issue_rows)
      return {...state, parent_issue_rows, isLoading}
    }
    case ActionTypes.SET_SUB_ISSUE_ROWS: {
      const sub_issue_rows = action.payload.issue_rows
      const isLoading = false
      console.log("sub_issue_rows: ",sub_issue_rows)
      return {...state, sub_issue_rows, isLoading}
    }
    case ActionTypes.SET_ISLOADING: {
      const isLoading = action.payload.bool
      return {...state, isLoading}
    }
    case ActionTypes.SET_TIME_ENTRIES: {
      const time_entries = action.payload.time_entries
      return {...state, time_entries}
    }
    //Header
    case ActionTypes.CLICK_APP_BAR: {
      const app_bar_open = !state.app_bar_open
      return {...state, app_bar_open}
    }
    case ActionTypes.SELECT_GROUP: {
      const selected_group_id = action.payload.selected_group_id
      const selected_project = configs.filter( function(item) {
        return item.group_id === selected_group_id
      })
      const selected_name = selected_project[0].name
      return {...state, selected_name ,selected_group_id}
    }
    case ActionTypes.SELECT_YEAR: {
      const selected_year = action.payload.selected_year
      return {...state, selected_year}
    }
    //IssueList
    case ActionTypes.TOGGLE_HIDE: {
      const show_hided_issue = !state.show_hided_issue
      return {...state, show_hided_issue}
    }
    case ActionTypes.TOGGLE_ISSUE_HIDE: {
      const current_id = action.payload.id
      const toggled_bool = action.payload.bool
      const parent_issue_rows = state.parent_issue_rows.map(parent_issue_row => {
        if (parent_issue_row.id === current_id) {
          parent_issue_row.hide = toggled_bool
        }
        return parent_issue_row
      })
      return {...state, parent_issue_rows, current_id}
    }
    case ActionTypes.ONOFF_SNACKBAR: {
      const snackbar_open = !state.snackbar_open
      return {...state, snackbar_open}
    }

    //Issue
    case ActionTypes.CHANGE_ISSUE: {
      const issue_cost_rows = action.payload.issue_cost_rows
      return {...state, issue_cost_rows}
    }

    //MemberList
    case ActionTypes.ONOFF_ASSIGNEDPROJECTLIST: {
      const assigned_projectlist_open = !state.assigned_projectlist_open
      return {...state, assigned_projectlist_open}
    }
    case ActionTypes.SELECT_MEMBER: {
      const selected_member = action.payload.assigned_id
      return {...state, selected_member}
    }

    //other
    default:
      return state
  }
}

export default reducer
