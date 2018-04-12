import * as ActionTypes from '../constants/ActionTypes'
import * as RedmineAPI from '../api/RedmineAPI'
import * as Actions from '../actions'

const APIMiddleware = ({dispatch, getState}) => next => action => {

  if (action.type === ActionTypes.GET_GROUPS) {
    RedmineAPI.getGroups()
      .then(groups => dispatch(Actions.setGroups(groups)))
  }

  if (action.type === ActionTypes.GET_GROUP_USERS) {
    Promise.resolve()
      .then(() => RedmineAPI.getGroupUsers(getState().reducers.selected_group_id))
      .then(groupUsers => dispatch(Actions.setGroupUsers(groupUsers)))
  }

  if (action.type === ActionTypes.GET_YEARS) {
    RedmineAPI.getProjects()
      .then(_projects => {
        let years = []
        _projects.map(project => {
          if(years.indexOf(project.custom_fields[0].value) == -1){
            years.push(project.custom_fields[0].value)
          }
        })
        return years
      })
      .then(years => years.sort((a, b) => {return a > b ? 1 : -1}))
      .then(years => dispatch(Actions.setYears(years)))
  }

  if (action.type === ActionTypes.GET_PROJECTS) {
    const selected_identifier = getState().reducers.selected_identifier
    const selected_year = getState().reducers.selected_year
    RedmineAPI.getProjects()
      .then(_projects => {
        let selected_project_id = []
        const projects = _projects.map(project => {
          if(project.identifier == selected_identifier && project.custom_fields[0].value == selected_year){
            selected_project_id.push(project.id)
          }
        })
        return selected_project_id
      })
      .then(projects => dispatch(Actions.setProjects(projects)))
      .then(() => dispatch(Actions.getIssueRows()))
  }

  if (action.type === ActionTypes.GET_ISSUE_ROWS) {
    const selected_project_id = getState().reducers.selected_project_id
    RedmineAPI.getIssues()
      .then(_issues => {
        return _issues.filter(issue => (issue.project.id == selected_project_id))
          .map(issue => {
            return {
              id: String(issue.id),
              ankenno: issue.custom_fields[0].value,
              naibukanrino: issue.custom_fields[1].value,
              title: issue.subject,
              assigned: issue.assigned_to.name,
              estimate: 10,
              hide: issue.custom_fields[26].value == 1 ? true : false
            }
          })
      })
      .then(issue_rows => dispatch(Actions.setIssueRows(issue_rows)))
  }

  if (action.type === ActionTypes.REGISTER_ISSUE) {
    const form = action.payload.form
    const selected_project_id = Number(getState().reducers.selected_project_id)
    const issue = {
      issue: {
        project_id: selected_project_id,
        tracker_id: 1,
        status_id: 1,
        priority_id: 2,
        subject: form.title,
        assigned_to_id: form.assigned,
        custom_fields: [
          {"id": 2, "value": form.ankenno}, //案件番号
          {"id": 3, "value": form.naibukanrino},　//内部管理番号
          {"id": 4, "value": ""},  //見積04月
          {"id": 5, "value": ""},  //見積05月
          {"id": 6, "value": ""},  //見積06月
          {"id": 7, "value": ""},  //見積07月
          {"id": 8, "value": ""},  //見積08月
          {"id": 9, "value": ""},  //見積09月
          {"id": 10, "value": ""}, //見積10月
          {"id": 11, "value": ""}, //見積11月
          {"id": 12, "value": ""}, //見積12月
          {"id": 13, "value": ""}, //見積01月
          {"id": 14, "value": ""}, //見積02月
          {"id": 15, "value": ""}, //見積03月
          {"id": 17, "value": ""}, //実績04月
          {"id": 18, "value": ""}, //実績05月
          {"id": 19, "value": ""}, //実績06月
          {"id": 20, "value": ""}, //実績07月
          {"id": 22, "value": ""}, //実績08月
          {"id": 24, "value": ""}, //実績09月
          {"id": 25, "value": ""}, //実績10月
          {"id": 26, "value": ""}, //実績11月
          {"id": 27, "value": ""}, //実績12月
          {"id": 28, "value": ""}, //実績01月
          {"id": 29, "value": ""}, //実績02月
          {"id": 30, "value": ""}, //実績03月
          {"id": 16, "value": 1},  //表示フラグ
          {"id": 31, "value": ""}, //備考フラグ
        ]
      }
    }
    console.log(issue);
    Promise.resolve()
      .then(RedmineAPI.postIssue(issue))
      .then(dispatch(Actions.getIssueRows()))
  }

  next(action)
}

export default APIMiddleware
