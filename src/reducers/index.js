import * as ActionTypes from '../constants/ActionTypes'
import configs from '../configs/inner_table'

const initState = {
  app_bar_open: false,
  group_select_open: false,
  groups: [],
  groupUsers: [],
  selected_group_id: 13,
  years: [],
  selected_year: '2017',
  selected_identifier: 'd',
  selected_project_id: 4,
  show_hided_issue: true,
  selected_issue: '0',
  issues: [],
  issue_rows: [],
  members: [
    {id: "0", name: "未アサイン", grade: "-"}, //id:0は未アサイン固定
    {id: "1", name: "西住みほ", grade: "G3b"},
    {id: "2", name: "武部沙織", grade: "G3a"},
    {id: "3", name: "五十鈴華", grade: "G2b"},
    {id: "4", name: "秋山優花里", grade: "G2a"},
    {id: "5", name: "冷泉麻子", grade: "G1"},
  ],
  projects: [],
  snackbar_open: false,
  current_id: 0,
  isLoading: false,
  assigned_projectlist_open: false,
  selected_member: null
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
      const selected_project_id = action.payload.projects_id
      return {...state, selected_project_id}
    }
    case ActionTypes.SET_ISSUE_ROWS: {
      const issue_rows = action.payload.issue_rows
      return {...state, issue_rows}
    }
    case ActionTypes.SET_ISLOADING: {
      const isLoading = action.payload.bool
      return {...state, isLoading}
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
      const selected_identifier = selected_project[0].identifier
      return {...state, selected_identifier ,selected_group_id}
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
      const issue_rows = state.issue_rows.map(issue_row => {
        if (issue_row.id === current_id) {
          issue_row.hide = toggled_bool
        }
        return issue_row
      })
      return {...state, issue_rows, current_id}
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
