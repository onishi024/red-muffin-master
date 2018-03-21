const apikey = 'be6f265667a45a0860cd1694c8c6a23f1a0aa7bb'

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
