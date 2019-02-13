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
      .then(_groupUsers => {
        let groupUsers = []
        for (let i in _groupUsers) {
          RedmineAPI.getUsers(_groupUsers[i].id)
          .then(user => groupUsers.push(
            {
              id: _groupUsers[i].id,
              name: _groupUsers[i].name,
              grade: user.custom_fields[0].value
            }
          ))
        }
        return groupUsers
      })
      .then(groupUsers => dispatch(Actions.setGroupUsers(groupUsers)))
  }

  if (action.type === ActionTypes.GET_USERS) {
    RedmineAPI.getUsers()
      .then(users => dispatch(Actions.setUsers(users)))
  }

  if (action.type === ActionTypes.GET_YEARS) {
    RedmineAPI.getProjects()
      .then(_projects => {
        let years = []
        for (let i in _projects) {
          if(years.indexOf(_projects[i].custom_fields[0].value) === -1){
            years.push(_projects[i].custom_fields[0].value)
          }
        }
        return years
      })
      .then(years => years.sort((a, b) => {return a > b ? 1 : -1}))
      .then(years => dispatch(Actions.setYears(years)))
  }

  if (action.type === ActionTypes.GET_PROJECTS) {
    const selected_name = getState().reducers.selected_name
    const selected_year = getState().reducers.selected_year
    RedmineAPI.getProjects()
      .then(_projects => {
        let selected_project_id
        for (let i in _projects) {
          if(_projects[i].name === selected_name && _projects[i].custom_fields[0].value === selected_year){
            selected_project_id = _projects[i].id
            return selected_project_id
          }
        }
        return selected_project_id
      })
      .then(projects => dispatch(Actions.setProjects(projects)))
      .then(() => {
        dispatch(Actions.getParentIssueRows())
        dispatch(Actions.getSubIssueRows())
      })
      // .then(() => dispatch(Actions.getIssueRows()))
  }

  if (action.type === ActionTypes.GET_ISSUE_ROWS) {
    console.log("GET_ISSUE_ROWS START");
    let selected_offset = 0
    const selected_project_id = getState().reducers.selected_project_id
    let parent_issue_rows = []
    let sub_issue_rows = []
    let return_count = 1
    function kurikaeshi_calc(){
      if (return_count === 0) {
        //レコードが0件だった場合、データを返す
        return dispatch(Actions.setIssueRows(parent_issue_rows,sub_issue_rows))
      }else{
        //レコードが１件以上ある場合、レコードを配列に格納
        RedmineAPI.getIssues(selected_project_id,selected_offset)
        .then(_issues => {
          selected_offset = selected_offset + _issues.length
          return_count = _issues.length
          _issues.map(issue => {
            if(issue.parent === undefined){
              parent_issue_rows.push({
                id: String(issue.id),
                ankenno: issue.custom_fields[0].value,
                naibukanrino: issue.custom_fields[1].value,
                title: issue.subject,
                assigned_id: issue.assigned_to ? issue.assigned_to.id : "",
                assigned_name: issue.assigned_to ? issue.assigned_to.name : "",
                parent: issue.parent ? String(issue.parent.id) : String(issue.id),
                es04: issue.custom_fields[2].value  ? parseFloat(issue.custom_fields[2].value)  : 0,
                es05: issue.custom_fields[3].value  ? parseFloat(issue.custom_fields[3].value)  : 0,
                es06: issue.custom_fields[4].value  ? parseFloat(issue.custom_fields[4].value)  : 0,
                es07: issue.custom_fields[5].value  ? parseFloat(issue.custom_fields[5].value)  : 0,
                es08: issue.custom_fields[6].value  ? parseFloat(issue.custom_fields[6].value)  : 0,
                es09: issue.custom_fields[7].value  ? parseFloat(issue.custom_fields[7].value)  : 0,
                es10: issue.custom_fields[8].value  ? parseFloat(issue.custom_fields[8].value)  : 0,
                es11: issue.custom_fields[9].value  ? parseFloat(issue.custom_fields[9].value)  : 0,
                es12: issue.custom_fields[10].value ? parseFloat(issue.custom_fields[10].value) : 0,
                es01: issue.custom_fields[11].value ? parseFloat(issue.custom_fields[11].value) : 0,
                es02: issue.custom_fields[12].value ? parseFloat(issue.custom_fields[12].value) : 0,
                es03: issue.custom_fields[13].value ? parseFloat(issue.custom_fields[13].value) : 0,
                hide: issue.custom_fields[26].value || issue.custom_fields[26].value === "1" ? true : false,
                note: issue.custom_fields[27].value
              })
            }else{
              sub_issue_rows.push({
                id: String(issue.id),
                ankenno: issue.custom_fields[0].value,
                naibukanrino: issue.custom_fields[1].value,
                title: issue.subject,
                assigned_id: issue.assigned_to ? issue.assigned_to.id : "",
                assigned_name: issue.assigned_to ? issue.assigned_to.name : "",
                parent: issue.parent ? String(issue.parent.id) : String(issue.id),
                es04: issue.custom_fields[2].value  ? parseFloat(issue.custom_fields[2].value)  : 0,
                es05: issue.custom_fields[3].value  ? parseFloat(issue.custom_fields[3].value)  : 0,
                es06: issue.custom_fields[4].value  ? parseFloat(issue.custom_fields[4].value)  : 0,
                es07: issue.custom_fields[5].value  ? parseFloat(issue.custom_fields[5].value)  : 0,
                es08: issue.custom_fields[6].value  ? parseFloat(issue.custom_fields[6].value)  : 0,
                es09: issue.custom_fields[7].value  ? parseFloat(issue.custom_fields[7].value)  : 0,
                es10: issue.custom_fields[8].value  ? parseFloat(issue.custom_fields[8].value)  : 0,
                es11: issue.custom_fields[9].value  ? parseFloat(issue.custom_fields[9].value)  : 0,
                es12: issue.custom_fields[10].value ? parseFloat(issue.custom_fields[10].value) : 0,
                es01: issue.custom_fields[11].value ? parseFloat(issue.custom_fields[11].value) : 0,
                es02: issue.custom_fields[12].value ? parseFloat(issue.custom_fields[12].value) : 0,
                es03: issue.custom_fields[13].value ? parseFloat(issue.custom_fields[13].value) : 0,
                hide: issue.custom_fields[26].value || issue.custom_fields[26].value === "1" ? true : false,
                note: issue.custom_fields[27].value
              })
            }
          })
        })
        //繰り返し処理を行う
        .then (() => {
          console.log("GET_ISSUE_ROWS DONE")
          kurikaeshi_calc()
        })
        // .then (() => kurikaeshi_calc())
      }
    }
    kurikaeshi_calc()
  }

  if (action.type === ActionTypes.GET_PARENT_ISSUE_ROWS) {
    console.log("GET_PARENT_ISSUE_ROWS START");
    const selected_project_id = getState().reducers.selected_project_id
    let issue_rows = []

    RedmineAPI.getParentIssuesCount(selected_project_id,0,1)
    .then(r => {
      let get_count = Math.floor(r / 100) + 1
      console.log(r)

      function get_issues(selected_offset) {
        console.log('selected_offset:',selected_offset)
        RedmineAPI.getParentIssues(selected_project_id,selected_offset)
        .then(_issues => {
          console.log('_issues:',_issues)
          _issues.map(issue => {
            issue_rows.push({
              id: String(issue.id),
              ankenno: issue.custom_fields[0].value,
              naibukanrino: issue.custom_fields[1].value,
              title: issue.subject,
              assigned_id: issue.assigned_to ? issue.assigned_to.id : "",
              assigned_name: issue.assigned_to ? issue.assigned_to.name : "",
              parent: issue.parent ? String(issue.parent.id) : String(issue.id),
              es04: issue.custom_fields[2].value  ? parseFloat(issue.custom_fields[2].value)  : 0,
              es05: issue.custom_fields[3].value  ? parseFloat(issue.custom_fields[3].value)  : 0,
              es06: issue.custom_fields[4].value  ? parseFloat(issue.custom_fields[4].value)  : 0,
              es07: issue.custom_fields[5].value  ? parseFloat(issue.custom_fields[5].value)  : 0,
              es08: issue.custom_fields[6].value  ? parseFloat(issue.custom_fields[6].value)  : 0,
              es09: issue.custom_fields[7].value  ? parseFloat(issue.custom_fields[7].value)  : 0,
              es10: issue.custom_fields[8].value  ? parseFloat(issue.custom_fields[8].value)  : 0,
              es11: issue.custom_fields[9].value  ? parseFloat(issue.custom_fields[9].value)  : 0,
              es12: issue.custom_fields[10].value ? parseFloat(issue.custom_fields[10].value) : 0,
              es01: issue.custom_fields[11].value ? parseFloat(issue.custom_fields[11].value) : 0,
              es02: issue.custom_fields[12].value ? parseFloat(issue.custom_fields[12].value) : 0,
              es03: issue.custom_fields[13].value ? parseFloat(issue.custom_fields[13].value) : 0,
              hide: issue.custom_fields[26].value || issue.custom_fields[26].value === "1" ? true : false,
              note: issue.custom_fields[27].value
            })
          })
          const _issue_rows = JSON.parse(JSON.stringify(issue_rows))
          dispatch(Actions.setParentIssueRows(_issue_rows))
        })
      }

      let apis = []
      for(let i = 0; i < get_count; i++) {
        let selected_offset = i * 100
        apis.push(get_issues(selected_offset))
      }

      Promise.all(
        apis
      )

      // .then(() => {
      //   dispatch(Actions.setParentIssueRows(issue_rows))
      // })
    })
  }

  if (action.type === ActionTypes.GET_SUB_ISSUE_ROWS) {
    console.log("GET_SUB_ISSUE_ROWS START");
    let selected_offset = 0
    const selected_project_id = getState().reducers.selected_project_id
    let issue_rows = []
    let return_count = 1
    function kurikaeshi_calc(){
      if (return_count === 0) {
        //レコードが0件だった場合、データを返す
        return dispatch(Actions.setSubIssueRows(issue_rows))
      }else{
        //レコードが１件以上ある場合、レコードを配列に格納
        RedmineAPI.getSubIssues(selected_project_id,selected_offset)
        .then(_issues => {
          selected_offset = selected_offset + _issues.length
          return_count = _issues.length
          _issues.map(issue => {
            issue_rows.push({
              id: String(issue.id),
              ankenno: issue.custom_fields[0].value,
              naibukanrino: issue.custom_fields[1].value,
              title: issue.subject,
              assigned_id: issue.assigned_to ? issue.assigned_to.id : "",
              assigned_name: issue.assigned_to ? issue.assigned_to.name : "",
              parent: issue.parent ? String(issue.parent.id) : String(issue.id),
              es04: issue.custom_fields[2].value  ? parseFloat(issue.custom_fields[2].value)  : 0,
              es05: issue.custom_fields[3].value  ? parseFloat(issue.custom_fields[3].value)  : 0,
              es06: issue.custom_fields[4].value  ? parseFloat(issue.custom_fields[4].value)  : 0,
              es07: issue.custom_fields[5].value  ? parseFloat(issue.custom_fields[5].value)  : 0,
              es08: issue.custom_fields[6].value  ? parseFloat(issue.custom_fields[6].value)  : 0,
              es09: issue.custom_fields[7].value  ? parseFloat(issue.custom_fields[7].value)  : 0,
              es10: issue.custom_fields[8].value  ? parseFloat(issue.custom_fields[8].value)  : 0,
              es11: issue.custom_fields[9].value  ? parseFloat(issue.custom_fields[9].value)  : 0,
              es12: issue.custom_fields[10].value ? parseFloat(issue.custom_fields[10].value) : 0,
              es01: issue.custom_fields[11].value ? parseFloat(issue.custom_fields[11].value) : 0,
              es02: issue.custom_fields[12].value ? parseFloat(issue.custom_fields[12].value) : 0,
              es03: issue.custom_fields[13].value ? parseFloat(issue.custom_fields[13].value) : 0,
              hide: issue.custom_fields[26].value || issue.custom_fields[26].value === "1" ? true : false,
              note: issue.custom_fields[27].value
            })
          })
        })
        //繰り返し処理を行う
        .then (() => {
          console.log("GET_SUB_ISSUE_ROWS DONE")
          kurikaeshi_calc()
        })
        // .then (() => kurikaeshi_calc())
      }
    }
    kurikaeshi_calc()
  }

  if (action.type === ActionTypes.GET_AROUND_ISSUE_ROWS) {
    console.log("GET_AROUND_ISSUE_ROWS START")
    const naibukanrino = action.payload.issue_rows[0].naibukanrino
     if(naibukanrino === ""){
      console.log("GET_AROUND_ISSUE_ROWS END")
      dispatch(Actions.setAroundIssueRows([]))
      return null
    }
     let counter = 0
    let around_issue_rows = []
     function getIssuesBusinessYearLoop() {
      RedmineAPI.getIssueBusinessYear(around_issue_rows[counter].project)
      .then(_project => {
        around_issue_rows[counter].business_year = _project.custom_fields[0].value
      })
      .then( () => {
        counter++
        return counter
      })
      .then(counter => {
        if(counter < around_issue_rows.length){
          getIssuesBusinessYearLoop()
        } else {
          dispatch(Actions.setAroundIssueRows(around_issue_rows))
        }
      })
    }
     RedmineAPI.getAroundIssues(naibukanrino)
    .then(_issues => {
      console.log("_issues",_issues);
      _issues.map(issue => {
        around_issue_rows.push({
          id: String(issue.id),
          project: String(issue.project.id),
          ankenno: issue.custom_fields[0].value,
          naibukanrino: issue.custom_fields[1].value,
          title: issue.subject,
          assigned_id: issue.assigned_to ? issue.assigned_to.id : "",
          assigned_name: issue.assigned_to ? issue.assigned_to.name : "",
          parent: issue.parent ? String(issue.parent.id) : String(issue.id),
          es04: issue.custom_fields[2].value  ? parseFloat(issue.custom_fields[2].value)  : 0,
          es05: issue.custom_fields[3].value  ? parseFloat(issue.custom_fields[3].value)  : 0,
          es06: issue.custom_fields[4].value  ? parseFloat(issue.custom_fields[4].value)  : 0,
          es07: issue.custom_fields[5].value  ? parseFloat(issue.custom_fields[5].value)  : 0,
          es08: issue.custom_fields[6].value  ? parseFloat(issue.custom_fields[6].value)  : 0,
          es09: issue.custom_fields[7].value  ? parseFloat(issue.custom_fields[7].value)  : 0,
          es10: issue.custom_fields[8].value  ? parseFloat(issue.custom_fields[8].value)  : 0,
          es11: issue.custom_fields[9].value  ? parseFloat(issue.custom_fields[9].value)  : 0,
          es12: issue.custom_fields[10].value ? parseFloat(issue.custom_fields[10].value) : 0,
          es01: issue.custom_fields[11].value ? parseFloat(issue.custom_fields[11].value) : 0,
          es02: issue.custom_fields[12].value ? parseFloat(issue.custom_fields[12].value) : 0,
          es03: issue.custom_fields[13].value ? parseFloat(issue.custom_fields[13].value) : 0,
          hide: issue.custom_fields[26].value || issue.custom_fields[26].value === "1" ? true : false,
          note: issue.custom_fields[27].value,
          business_year: ""
        })
      })
    })
    .then(() => {
      getIssuesBusinessYearLoop()
    })
  }

  if (action.type === ActionTypes.REGISTER_ISSUE) {
    console.log("REGISTER_ISSUE START");
    dispatch(Actions.setIsLoading(true))
    const form = action.payload.form
    const selected_project_id = Number(getState().reducers.selected_project_id)
    const issue = {
      issue: {
        project_id: selected_project_id,
        // project_id: action.payload.parent_row.project,
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
          {"id": 21, "value": ""}, //実績08月
          {"id": 22, "value": ""}, //実績09月
          {"id": 23, "value": ""}, //実績10月
          {"id": 24, "value": ""}, //実績11月
          {"id": 25, "value": ""}, //実績12月
          {"id": 26, "value": ""}, //実績01月
          {"id": 27, "value": ""}, //実績02月
          {"id": 28, "value": ""}, //実績03月
          {"id": 16, "value": "1"},  //表示フラグ
          {"id": 29, "value": ""}, //備考
        ]
      }
    }
    RedmineAPI.postIssue(issue)
    .then(result => {
      dispatch(Actions.getIssueRows())
    })
    .then(result => {
      dispatch(Actions.setIsLoading(false))
    })
  }

  if (action.type === ActionTypes.ISSUE_ADD_MEMBER) {
    console.log("issueAddMember start");
    dispatch(Actions.setIsLoading(true))
    const assigned = action.payload.assigned
    const selected_project_id = Number(getState().reducers.selected_project_id)
    let loopCount = 0
    let issue = []
    function loop() {
      if(loopCount === assigned.length) {
        dispatch(Actions.getSubIssueRows())
      }
      else {
        issue = {
          issue: {
            project_id: selected_project_id,
            tracker_id: 1,
            status_id: 1,
            priority_id: 2,
            subject: action.payload.parent_row.title,
            assigned_to_id: assigned[loopCount],
            parent_issue_id: action.payload.parent_row.id,
            custom_fields: [
              {"id": 2, "value": action.payload.parent_row.ankenno}, //案件番号
              {"id": 3, "value": action.payload.parent_row.naibukanrino},　//内部管理番号
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
              {"id": 21, "value": ""}, //実績08月
              {"id": 22, "value": ""}, //実績09月
              {"id": 23, "value": ""}, //実績10月
              {"id": 24, "value": ""}, //実績11月
              {"id": 25, "value": ""}, //実績12月
              {"id": 26, "value": ""}, //実績01月
              {"id": 27, "value": ""}, //実績02月
              {"id": 28, "value": ""}, //実績03月
              {"id": 16, "value": "0"},  //表示フラグ
              {"id": 29, "value": ""}, //備考
            ]
          }
        }
        RedmineAPI.postIssueMember(issue)
        .then(() => {
          loopCount++;
          loop()
        })
      }
    }
    loop()
  }

  if (action.type === ActionTypes.CHANGE_ISSUE) {
    console.log("CHANGE_ISSUE START");
    dispatch(Actions.setIsLoading(true))
    const change_data = action.payload.change_data
    const starting_issue_row = action.payload.starting_issue_row
    const change_rows = []

    for(let i=0; i<change_data.id.length; i++){
      if(change_rows.length === 0){
        change_rows.push({
          id: change_data.id[i],
          [change_data.key[i]]: change_data.value[i]
        })
      } else {
        for(let j=0; j<change_rows.length; j++){
          if(change_rows[j].id === change_data.id[i]){
            change_rows[j][change_data.key[i]] = change_data.value[i]
            break
        } else if(j === change_rows.length -1){
            change_rows.push({
              id: change_data.id[i],
              [change_data.key[i]]: change_data.value[i]
            })
          }
        }
      }
    }

    let i = 0
    function postIssueMemberLoop(){
      if (i > change_rows.length - 1 ) {
        // 全レコードをポストしたらループ終了
        dispatch(Actions.getAroundIssueRows(starting_issue_row))
        return dispatch(Actions.getIssueRows())
      }else{
        const custom_fields = [
          {"id": 4, "value": change_rows[i].es04 !== undefined ? change_rows[i].es04 : undefined},  //見積04月
          {"id": 5, "value": change_rows[i].es05 !== undefined ? change_rows[i].es05 : undefined},  //見積05月
          {"id": 6, "value": change_rows[i].es06 !== undefined ? change_rows[i].es06 : undefined},  //見積06月
          {"id": 7, "value": change_rows[i].es07 !== undefined ? change_rows[i].es07 : undefined},  //見積07月
          {"id": 8, "value": change_rows[i].es08 !== undefined ? change_rows[i].es08 : undefined},  //見積08月
          {"id": 9, "value": change_rows[i].es09 !== undefined ? change_rows[i].es09 : undefined},  //見積09月
          {"id": 10, "value": change_rows[i].es10 !== undefined ? change_rows[i].es10 : undefined}, //見積10月
          {"id": 11, "value": change_rows[i].es11 !== undefined ? change_rows[i].es11 : undefined}, //見積11月
          {"id": 12, "value": change_rows[i].es12 !== undefined ? change_rows[i].es12 : undefined}, //見積12月
          {"id": 13, "value": change_rows[i].es01 !== undefined ? change_rows[i].es01 : undefined}, //見積01月
          {"id": 14, "value": change_rows[i].es02 !== undefined ? change_rows[i].es02 : undefined}, //見積02月
          {"id": 15, "value": change_rows[i].es03 !== undefined ? change_rows[i].es03 : undefined}, //見積03月
          {"id": 17, "value": undefined}, //実績04月
          {"id": 18, "value": undefined}, //実績05月
          {"id": 19, "value": undefined}, //実績06月
          {"id": 20, "value": undefined}, //実績07月
          {"id": 21, "value": undefined}, //実績08月
          {"id": 22, "value": undefined}, //実績09月
          {"id": 23, "value": undefined}, //実績10月
          {"id": 24, "value": undefined}, //実績11月
          {"id": 25, "value": undefined}, //実績12月
          {"id": 26, "value": undefined}, //実績01月
          {"id": 27, "value": undefined}, //実績02月
          {"id": 28, "value": undefined}, //実績03月
          {"id": 29, "value": change_rows[i].note !== undefined ? change_rows[i].note : undefined}, //備考
        ]
        const issue = {
          issue: {
            custom_fields: custom_fields.filter(custom_fields => custom_fields.value !== undefined )
          }
        }
        RedmineAPI.putIssue(change_rows[i].id,issue)
        .then(() => {i = i + 1})
        .then(() => postIssueMemberLoop())
      }
    }
    postIssueMemberLoop()
  }

  if (action.type === ActionTypes.DELETE_ISSUE) {
    console.log("DELETE_ISSUE START");
    dispatch(Actions.setIsLoading(true))
    const id = action.payload.id
    let loopCount = 0
    function loop() {
      if(loopCount === id.length) {
        dispatch(Actions.getSubIssueRows())
      }
      else {
        RedmineAPI.deleteIssue(id[loopCount])
        .then(() => {
          loopCount++;
          loop()
        })
      }
    }
    loop()
  }

  if (action.type === ActionTypes.GET_TIME_ENTRIES) {
    console.log("GET_TIME_ENTRIES START")
    const id = getState().reducers.selected_project_id
    return RedmineAPI.getTimeEntries(id)
  }

  next(action)
}

export default APIMiddleware
