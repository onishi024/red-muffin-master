const apikey = 'af294843d18a02b78508156fbab3f526b4ae9974'

// const headers = {}
const headers = {'X-Redmine-API-Key' : apikey,
                 'Content-Type': 'application/json'}

const url = `http://127.0.0.1:8080/redmine/`

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
