const RequestClient = require('./request')
const {getId} = require('./util')

class Notion {
  constructor(token) {
    this.token = token || process.env.NOTION_TOKEN
    this.requestClient = new RequestClient(token)
  }

  /**
   * Sets the token for the request client to access private Notion pages
   * @param {string} token - The token_v2 cookie from the Notion web app
   */
  setToken(token) {
    this.requestClient.setToken(token)
  }

  /**
   * Returns a Page object that represents an entire Notion page
   * with all of its contents.
   * @param {string} id - The URL or ID of the Notion page
   */
  getPage(id) { 
    const parsedId = getId(id)
    return this.requestClient.getPage(parsedId)
  }

  /**
   * Returns a Block object or one of its sub-blocks that represents
   * a single Notion block.
   * @param {string} id_or_url - The URL of ID of the Notion block
   */
  getBlock(id_or_url) {
    if (typeof id_or_url !== "string"){
      throw `The ID or URL must be a string`
    }
    const parsedId = getId(id_or_url)
    return this.requestClient.getBlock(parsedId, 'block')
  }

  /**
   * Returns an array of Block objects or one of its sub-blocks that
   * represents each Notion ID passed in.
   * @param {[string]} ids - An array of Notion block IDs or URLs
   */
  getBlocks(ids) {
    if(!Array.isArray(ids)){
      throw `You must pass in an array of IDs or URLs`
    }
    const parsedIds = ids.map(id => getId(id))
    return this.requestClient.getBlocks(parsedIds)
  }
}

module.exports = Notion