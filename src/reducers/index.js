import * as ActionTypes from '../constants/ActionTypes'
import configs from '../configs/inner_table'

const initState = {
  app_bar_open: false,
  group_select_open: false,
  groups: [],
  groupUsers: [],
  selected_group_id: 153,
  years: [],
  selected_year: '2018',
  selected_identifier: 'c2018',
  selected_name: '基幹開発3（顧客）',
  selected_project_id: 20,
  show_hided_issue: true,
  selected_issue: '0',
  issues: [],
  issue_rows: [],
  parent_issue_rows: [],
  sub_issue_rows: [],
  around_issue_rows: [],
  projects: [],
  snackbar_open: false,
  current_id: 0,
  isLoading: false,
  assigned_projectlist_open: false,
  selected_member: null,
  time_entries: [],
  transition_issue: null,
  filter_flg: false,
  filter_flg_naibukanrino: false,
  filter_flg_title: false,
  filter_flg_assignedName: false,
  input_value: null,
  input_value_naibukanrino: null,
  input_value_title: null,
  input_value_assignedName: null,
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
    case ActionTypes.SET_AROUND_ISSUE_ROWS: {
      const around_issue_rows = action.payload.issue_rows
      // const isLoading = false
      console.log("around_issue_rows: ",around_issue_rows)
      console.log("GET_AROUND_ISSUE_ROWS END")
      // return {...state, around_issue_rows, isLoading}
      return {...state, around_issue_rows}
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
      console.log('SELECT_YEAR START')
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
    case ActionTypes.FILTER_ISSUE_ROWS: {
      let filter_flg = state.filter_flg
      let input_value = action.payload.value
      if(input_value === null){
      }else{
          filter_flg = true
        }
      return {...state, filter_flg, input_value}
    }
    case ActionTypes.FILTER_NAIBUKANRINO: {
      let filter_flg_naibukanrino = state.filter_flg_naibukanrino
      let input_value_naibukanrino = action.payload.value
      if(input_value_naibukanrino === null){
      }else{
          filter_flg_naibukanrino = true
        }
      return {...state, filter_flg_naibukanrino, input_value_naibukanrino}
    }
    case ActionTypes.FILTER_TITLE: {
      let filter_flg_title = state.filter_flg_title
      let input_value_title = action.payload.value
      if(input_value_title === null){
      }else{
          filter_flg_title = true
        }
      return {...state, filter_flg_title, input_value_title}
    }
    case ActionTypes.FILTER_ASSIGNEDNAME: {
      let filter_flg_assignedName = state.filter_flg_assignedName
      let input_value_assignedName = action.payload.value
      if(input_value_assignedName === null){
      }else{
          filter_flg_assignedName = true
        }
      return {...state, filter_flg_assignedName, input_value_assignedName}
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
    case ActionTypes.TRANSITION_ISSUE: {
      const transition_issue = action.payload.transition_issue
      return {...state, transition_issue}
    }

    //other
    default:
      return state
  }
}

export default reducer
