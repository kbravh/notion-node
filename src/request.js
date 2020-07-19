const axios = require('axios').default

class RequestClient {
  constructor(token){
    this.token = token || ''
    this.authorizedRequest = function(endpoint, request){
      return axios({
        baseURL: `https://www.notion.so/api/v3`,
        url: endpoint,
        method: "POST",
        headers: {
          cookie: `token_v2=${this.token};`
        },
        data: request,
      })
      .then(response => response.data)
      .catch((error) => console.error(error));
    }
  }

  setToken (token){
    this.token = token
  }
}

module.exports = RequestClient