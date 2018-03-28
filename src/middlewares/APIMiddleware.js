import * as ActionTypes from '../constants/ActionTypes'
import * as RedmineAPI from '../api/RedmineAPI'
import * as Actions from '../actions'

const APIMiddleware = ({dispatch, getState}) => next => action => {

  if (action.type === ActionTypes.GET_GROUPS) {
    RedmineAPI.getGroups()
      .then(groups => dispatch(Actions.setGroups(groups)))
    console.log("g");
  }

  if (action.type === ActionTypes.GET_YEARS) {
    RedmineAPI.getProjects()
      .then(_projects => {
        let years = []
        const projects = _projects.map(project => {
          // console.log(project.custom_fields[0].value)
          if(years.indexOf(project.custom_fields[0].value) == -1){
            years.push(project.custom_fields[0].value)
          }
        })
        return years
      })
      .then(years => years.sort((a, b) => {return a > b ? 1 : -1}))
      .then(years => dispatch(Actions.setYears(years)))
    console.log("p");
  }

  if (action.type === ActionTypes.GET_PROJECTS) {
    console.log("action");
    RedmineAPI.getProjects()
      .then(projects => dispatch(Actions.setProjects(projects)))
  }

  if (action.type === ActionTypes.GET_ISSUE_ROWS) {
    const selected_group_id = getState().reducers.selected_group_id
    const selected_year = getState().reducers.selected_year
    console.log(selected_group_id)
    console.log(selected_year)
    RedmineAPI.getIssues()
      .then(console.log('setissues'))
      // .then(issue_rows => dispatch(Actions.setIssueRows(issue_rows)))
  }

  next(action)
}

export default APIMiddleware
