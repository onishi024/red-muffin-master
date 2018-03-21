import * as ActionTypes from '../constants/ActionTypes'
import * as RedmineAPI from '../api/RedmineAPI'
import * as Actions from '../actions'

const APIMiddleware = ({dispatch}) => next => action => {

  if (action.type === ActionTypes.GET_GROUPS) {
    RedmineAPI.getGroups()
      .then(groups => dispatch(Actions.setGroups(groups)))
  }

  next(action)
}

export default APIMiddleware
