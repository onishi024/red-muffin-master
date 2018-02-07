import * as ActionTypes from '../constants/ActionTypes'

const initState = {
  app_bar_open: false,
  group_select_open: false,
  groups: [],
  selected_group_id: '0',
  show_hided_issue: false,
  selected_issue: '0',
  issues: [],
  issue_rows: [
    {id: 1, kind: "開発委託", ankenno: "JK16-00001-ANKO", taskcode: "JKM00001", subcode: "", ankenname: "戦車を探す", estimate: 10, hide: false},
    {id: 2, kind: "開発委託", ankenno: "JK16-00002-ANKO", taskcode: "JKM00002", subcode: "", ankenname: "聖グロリアーナ練習試合", estimate: 20, hide: false},
    {id: 3, kind: "開発委託", ankenno: "JK16-00003-ANKO", taskcode: "JKM00003", subcode: "", ankenname: "第1回戦 サンダース大学付属高校", estimate: 30, hide: true},
    {id: 4, kind: "作業依頼", ankenno: "JK16-00004-ANKO", taskcode: "JKM00004", subcode: "", ankenname: "第2回戦 プラウダ高校", estimate: 40, hide: false},
    {id: 5, kind: "作業依頼", ankenno: "JK16-00005-ANKO", taskcode: "JKM00005", subcode: "", ankenname: "第3回戦 アンツィオ高校", estimate: 50, hide: false},
    {id: 6, kind: "作業依頼", ankenno: "JK16-00006-ANKO", taskcode: "JKM00006", subcode: "", ankenname: "第4回戦 黒森峰女学園", estimate: 60, hide: true},
    {id: 7, kind: "障害対応", ankenno: "JK16-00007-ANKO", taskcode: "JKM00007", subcode: "", ankenname: "エキシビジョン 知波単学園", estimate: 70, hide: false},
    {id: 8, kind: "障害対応", ankenno: "JK16-00008-ANKO", taskcode: "JKM00008", subcode: "", ankenname: "大学選抜戦", estimate: 80, hide: false},
    {id: 9, kind: "障害対応", ankenno: "JK16-00009-ANKO", taskcode: "JKM00009", subcode: "", ankenname: "BC自由学園戦", estimate: 90, hide: true}
  ],
  register_form: {
    kind: 0,
    ankenname: "",
    estimate: 0,
  },
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    //Header
    case ActionTypes.CLICK_APP_BAR: {
      const app_bar_open = !state.app_bar_open
      return {...state, app_bar_open}
    }
    case ActionTypes.CLICK_GROUP: {
      const group_select_open = !state.group_select_open
      return {...state, group_select_open}
    }
    //Issue
    case ActionTypes.TOGGLE_HIDE: {
      const show_hided_issue = !state.show_hided_issue
      return {...state, show_hided_issue}
    }
    case ActionTypes.TOGGLE_ISSUE_HIDE: {
      const toggled_id = Number(action.payload.id)
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
      issue_rows.push(
        {id: state.issue_rows.length+1, kind: form.kind, ankenno: "", taskcode: "", subcode: "", ankenname: form.ankenname, estimate: form.estimate, hide: false}
      )
      return {...state, issue_rows}
    }
    //other
    default:
      return state
  }
}

export default reducer
