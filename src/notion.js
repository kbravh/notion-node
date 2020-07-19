const RequestClient = require('./request')

class Notion {
  constructor(token){
    this.token = token || process.env.NOTION_TOKEN
    this.requestClient = new RequestClient(token)
  }

  setToken (token){
    this.requestClient.setToken(token)
  }
}

module.exports = Notion