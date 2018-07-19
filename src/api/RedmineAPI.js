import env from '../configs/env'

// const url = `http://localhost:8080/redmine/`
// const apikey = 'af294843d18a02b78508156fbab3f526b4ae9974'

const url = env.url
const apikey = env.apikey

const headers = {'X-Redmine-API-Key' : apikey,
                 'Content-Type': 'application/json'}

//redmine/datakind.json
export const getGroups = () =>
  fetch(url + `groups.json`,
    {method: 'GET',
     headers: headers})
  .then(response => response.json())
  .then(json => json.groups)

export const getGroupUsers = (id) =>
  fetch(url + `groups/` + id + `.json?include=users`,
    {method: 'GET',
     headers: headers})
  .then(response => response.json())
  .then(json => json.group.users)

export const getUsers = (id) =>
  fetch(url + `users/` + id + `.json`,
    {method: 'GET',
     headers: headers})
  // .then(response => console.log(response.json()))
  .then(response => response.json())
  .then(json => json.user)

export const getProjects = () =>
  fetch(url + `projects.json?limit=100`,
    {method: 'GET',
     headers: headers})
  .then(response => response.json())
  .then(json => json.projects)

export const getIssues = (selected_project_id,selected_offset) =>
  fetch(url + `issues.json?project_id=` + selected_project_id + `&offset=` + selected_offset + `&limit=100`,
    {method: 'GET',
     headers: headers})
  .then(response => response.json())
  .then(json => {
    // console.log("GET ISSUES DONE");
    return json.issues
  })

export const getParentIssues = (selected_project_id,selected_offset) =>
  fetch(url + `issues.json?project_id=` + selected_project_id + `&offset=` + selected_offset + `&limit=100&parent_id=!*`,
    {method: 'GET',
     headers: headers})
  .then(response => response.json())
  .then(json => {
    console.log("GET PARENT ISSUES DONE");
    return json.issues
  })

export const getParentIssuesCount = (selected_project_id,selected_offset,limit) =>
fetch(url + `issues.json?project_id=` + selected_project_id + `&offset=` + selected_offset + `&limit=` + limit + `&parent_id=!*`,
  {method: 'GET',
    headers: headers})
.then(response => response.json())
.then(json => {
  // console.log("GET ISSUES DONE");
  return json.total_count
})

export const getSubIssues = (selected_project_id,selected_offset) =>
  fetch(url + `issues.json?project_id=` + selected_project_id + `&offset=` + selected_offset + `&limit=100&parent_id=*`,
    {method: 'GET',
     headers: headers})
  .then(response => response.json())
  .then(json => {
    // console.log("GET ISSUES DONE");
    return json.issues
  })

export const postIssue = issue =>
  fetch(url + `issues.json`,
    {method: 'POST',
     headers: headers,
     body: JSON.stringify(issue)})
  .then((res, err) => {
    if (!err) {
      console.log("REGISTER_ISSUE DONE")
      return res
    } else {
      console.log("REGISTER_ISSUE ERROR OCCURED")
      return err
    }
  })

 export const postIssueMember = issue =>
   fetch(url + `issues.json`,
     {method: 'POST',
      headers: headers,
      body: JSON.stringify(issue)})
   .then((res, err) => {
     if (!err) {
       console.log("ADD_ISSUE_MEMBER DONE")
       return res
     } else {
       console.log("ADD_ISSUE_MEMBER ERROR OCCURED")
       return err
     }
   })

 export const putIssue = (id,issue) =>
   fetch(url + `issues/` + id + `.json`,
     {method: 'PUT',
      headers: headers,
      body: JSON.stringify(issue)})
   .then((res, err) => {
     if (!err) {
       console.log("CHANGE_ISSUE DONE")
       return res
     } else {
       console.log("CHANGE_ISSUE ERROR OCCURED")
       return err
     }
   })

 export const deleteIssue = id =>
   fetch(url + `issues/` + id + `.json`,
     {method: 'DELETE',
      headers: headers})
   .then((res, err) => {
     if (!err) {
       console.log("DELETE_ISSUE DONE")
       return res
     } else {
       console.log("DELETE_ISSUE ERROR OCCURED")
       return err
     }
   })
