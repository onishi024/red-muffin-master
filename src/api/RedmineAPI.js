import env from '../configs/env'

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
  fetch(url + `projects.json`,
    {method: 'GET',
     headers: headers})
  .then(response => response.json())
  .then(json => json.projects)

export const getIssues = () =>
  fetch(url + `issues.json?limit=1000`,
    {method: 'GET',
     headers: headers})
  .then(response => response.json())
  .then(json => {
    console.log("GET ISSUES DONE");
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

 export const postIssueMember = issue => {
   fetch(url + `issues.json`,
     {method: 'POST',
      headers: headers,
      body: JSON.stringify(issue)})
    }
