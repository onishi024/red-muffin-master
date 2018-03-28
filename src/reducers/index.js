import * as ActionTypes from '../constants/ActionTypes'

const initState = {
  app_bar_open: false,
  group_select_open: false,
  groups: [],
  selected_group_id: 12,
  years: [],
  selected_year: '2017',
  show_hided_issue: false,
  selected_issue: '0',
  issues: [],
  issue_rows: [
    // {id: "1", kind: "開発委託", ankenno: "JK16-00001-ANKO", taskcode: "JKM00001", subcode: "", ankenname: "戦車を探す", estimate: 10, hide: false},
    // {id: "2", kind: "開発委託", ankenno: "JK16-00002-ANKO", taskcode: "JKM00002", subcode: "", ankenname: "聖グロリアーナ練習試合", estimate: 20, hide: false},
    // {id: "3", kind: "開発委託", ankenno: "JK16-00003-ANKO", taskcode: "JKM00003", subcode: "", ankenname: "第1回戦 サンダース大学付属高校", estimate: 30, hide: true},
    // {id: "4", kind: "作業依頼", ankenno: "JK16-00004-ANKO", taskcode: "JKM00004", subcode: "", ankenname: "第2回戦 プラウダ高校", estimate: 40, hide: false},
    // {id: "5", kind: "作業依頼", ankenno: "JK16-00005-ANKO", taskcode: "JKM00005", subcode: "", ankenname: "第3回戦 アンツィオ高校", estimate: 50, hide: false},
    // {id: "6", kind: "作業依頼", ankenno: "JK16-00006-ANKO", taskcode: "JKM00006", subcode: "", ankenname: "第4回戦 黒森峰女学園", estimate: 60, hide: true},
    // {id: "7", kind: "障害対応", ankenno: "JK16-00007-ANKO", taskcode: "JKM00007", subcode: "", ankenname: "エキシビジョン 知波単学園", estimate: 70, hide: false},
    // {id: "8", kind: "障害対応", ankenno: "JK16-00008-ANKO", taskcode: "JKM00008", subcode: "", ankenname: "大学選抜戦", estimate: 80, hide: false},
    // {id: "9", kind: "障害対応", ankenno: "JK16-00009-ANKO", taskcode: "JKM00009", subcode: "", ankenname: "BC自由学園戦", estimate: 90, hide: true}
  ],
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
      const projects = action.payload.projects
      console.log(projects)
      return {...state, projects}
    }
    case ActionTypes.GET_ISSUE_ROWS: {
      console.log('getissuerows')
      // const issue_rows = action.payload.issue_rows
      // return {...state, years}
    }
    case ActionTypes.SET_ISSUE_ROWS: {
      console.log('setissuerows')
      // const issue_rows = action.payload.issue_rows
      // return {...state, issue_rows}
    }
    //Header
    case ActionTypes.CLICK_APP_BAR: {
      const app_bar_open = !state.app_bar_open
      return {...state, app_bar_open}
    }
    case ActionTypes.SELECT_GROUP: {
      const selected_group_id = action.payload.selected_group_id
      return {...state, selected_group_id}
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
