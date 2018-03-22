import * as ActionTypes from '../constants/ActionTypes'
import * as RedmineAPI from '../api/RedmineAPI'
import * as Actions from '../actions'

const APIMiddleware = ({dispatch}) => next => action => {

  if (action.type === ActionTypes.GET_GROUPS) {
    RedmineAPI.getGroups()
      .then(groups => dispatch(Actions.setGroups(groups)))
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
        console.log(years)
        return years
      })
      .then(years => years.sort((a, b) => {return a > b ? 1 : -1}))
      .then(years => dispatch(Actions.setYears(years)))
  }

  if (action.type === ActionTypes.GET_ISSUE_ROWS) {
    RedmineAPI.getIssues()
      .then(console.log('setissues'))
      // .then(issue_rows => dispatch(Actions.setIssueRows(issue_rows)))
  }

  next(action)
}

export default APIMiddleware
