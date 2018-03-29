const apikey = 'ff0614e4aad8cd0209502a3012008992d0a5252c'

// const headers = {}
const headers = {'X-Redmine-API-Key' : apikey,
                 'Content-Type': 'application/json'}

const url = `http://127.0.0.1/redmine/`

//redmine/datakind.json
export const getGroups = () =>
  fetch(url + `groups.json`,
    {method: 'GET',
     headers: headers})
  .then(response => response.json())
  .then(json => json.groups)

export const getProjects = () =>
  fetch(url + `projects.json`,
    {method: 'GET',
     headers: headers})
  .then(response => response.json())
  .then(json => json.projects)

export const getIssues = () =>
  fetch(url + `issues.json`,
    {method: 'GET',
     headers: headers})
  .then(response => response.json())
  .then(json => json.issues)
