const RequestClient = require('./request')
const {getId} = require('./util')

class Notion {
  constructor(token) {
    this.token = token || process.env.NOTION_TOKEN
    this.requestClient = new RequestClient(token)
  }

  setToken(token) {
    this.requestClient.setToken(token)
  }

  getPage(id) { 
    const parsedId = getId(id)
    return this.requestClient.getPage(parsedId)
  }

  getBlock(id) {
    const parsedId = getId(id)
    return this.requestClient.getBlock(parsedId, 'block')
  }
}

module.exports = Notion