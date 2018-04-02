import * as ActionTypes from '../constants/ActionTypes'
import configs from '../configs/inner_table'

const initState = {
  app_bar_open: false,
  group_select_open: false,
  groups: [],
  selected_group_id: 12,
  years: [],
  selected_year: '2017',
  selected_project_id: '4',
  show_hided_issue: false,
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
  projects: []
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    //API
    case ActionTypes.SET_GROUPS: {
      const groups = action.payload.groups
      return {...state, groups}
    }
    case ActionTypes.SET_YEARS: {
      const years = action.payload.years
      return {...state, years}
    }
    case ActionTypes.SET_PROJECTS: {
      const projects_id = action.payload.projects_id
      console.log(projects_id)
      return {...state, projects_id}
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
      console.log('selectgroup')
      const selected_group_id = state.selected_group_id
      const configs = configs
      const selected_project_id = configs.filter(selected_group_id == configs.value)
      console.log(selected_project_id)
      return {...state, selected_project_id}
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
      const toggled_id = action.payload.id
      const toggled_bool = action.payload.bool
      const issue_rows = state.issue_rows.map(issue_row => {
        if (issue_row.id === toggled_id) {
          issue_row.hide = toggled_bool
        }
        return issue_row
      })
      return {...state, issue_rows}
    }
    //Register
    case ActionTypes.REGISTER_ISSUE: {
      const form = action.payload.form
      const issue_rows = state.issue_rows
      const kindRow = ["開発委託", "作業依頼", "障害対応(無償)", "常駐支援", "その他無償作業"]
      issue_rows.push(
        {id: state.issue_rows.length+1, kind: kindRow[form.kind], ankenno: "", taskcode: "", subcode: "", ankenname: form.ankenname, estimate: form.estimate, hide: false}
      )
      return {...state, issue_rows}
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
