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
  issue_cost_rows: [
    {id:  "1", issue_id: "1", subname: "", member_id: "0", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
    {id:  "2", issue_id: "1", subname: "", member_id: "1", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
    {id:  "3", issue_id: "1", subname: "", member_id: "2", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
    {id:  "4", issue_id: "2", subname: "", member_id: "0", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
    {id:  "5", issue_id: "2", subname: "", member_id: "1", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
    {id:  "6", issue_id: "2", subname: "", member_id: "2", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
    {id:  "7", issue_id: "3", subname: "", member_id: "0", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
    {id:  "8", issue_id: "3", subname: "", member_id: "1", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
    {id:  "9", issue_id: "3", subname: "", member_id: "2", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
    {id: "10", issue_id: "4", subname: "", member_id: "0", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
    {id: "11", issue_id: "4", subname: "", member_id: "1", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
    {id: "12", issue_id: "4", subname: "", member_id: "2", pc04: 10, pc05: 20, pc06: 30, pc07: 10, pc08: 20, pc09: 30, pc10: 10, pc11: 20, pc12: 30, pc01: 10, pc02: 20, pc03: 30 },
  ],
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
    //Header
    case ActionTypes.CLICK_APP_BAR: {
      const app_bar_open = !state.app_bar_open
      return {...state, app_bar_open}
    }
    case ActionTypes.SELECT_GROUP: {
      const selected_group_id = action.payload.selected_group_id
      const selected_project = configs.filter( function(item) {
        return item.group_id == selected_group_id
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
      const snackbar_open = true
      console.log(current_id)
      return {...state, issue_rows, snackbar_open, current_id}
    }
    //Issue
    case ActionTypes.CHANGE_ISSUE: {
      const issue_cost_rows = action.payload.issue_cost_rows
      return {...state, issue_cost_rows}
    }
    //other
    default:
      return state
  }
}

export default reducer
