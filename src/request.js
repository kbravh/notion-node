const axios = require('axios').default
const Block = require('./block')
const Page = require('./page')
const Collection = require('./collection')

const defaultOptions = {
  "limit": 100000,
  "cursor": {
    "stack": []
  },
  "chunkNumber": 0,
  "verticalColumns": false,
}

class RequestClient {
  constructor(token) {
    this.token = token || ''
    this.authorizedRequest = function (endpoint, request) {
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

  /**
   * 
   * @param {string} token - The Notion token_v2 cookie used to authenticate with the API
   */
  setToken(token) {
    this.token = token
  }

  /**
   * Request one or more records from Notion.
   * @param {{table: string, id: string} or []} requestedRecords - Records to be requested.
   */
  async getRecordValues(requestedRecords) {
    let recordPairs
    if (Array.isArray(requestedRecords)) {
      recordPairs = requestedRecords.map(({
        table,
        id
      }) => ({
        table,
        id
      }))
    } else {
      recordPairs = [{
        table: requestedRecords.table,
        id: requestedRecords.id
      }]
    }
    return this.authorizedRequest(`/getRecordValues`, {
      requests: recordPairs
    }).then(response => response.results)
  }

  /**
   * Returns the corresponding object if the block was found, otherwise null.
   * @param {string} blockId - The ID or URL of the block to fetch.
   * @param {string} blockType - The type of block to be retrieved.
   * @returns {Block or null}
   */
  async getBlock(blockId, blockType) {
    return await this.getRecordValues({
      id: blockId,
      table: blockType
    })
      .then(([block]) => {
        switch(blockType){
          case "collection":
            return new Collection(this, block)
          case "block":
            return new Block(this, block)
          default:
            return null
        }
      })
  }

  /**
   * Returns a Page object if the page was found, otherwise null.
   * @param {string} pageId - The ID or URL of the page to fetch.
   * @returns {Page or null}
   */
  async getPage(pageId) {
    return await this.authorizedRequest(`/loadPageChunk`, {
      ...defaultOptions,
      pageId,
    })
      .then(response => response.recordMap)
      .then(recordMap => recordMap.block)
      .then(data => data ? new Page(this, data) : null)
  }
}

module.exports = RequestClient