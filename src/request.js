const axios = require('axios').default
const { Block, subBlocks } = require('./block')
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
   * Returns the corresponding Block object if the block was found, otherwise null.
   * @param {string} blockId - The ID of the block to fetch.
   * @param {string} blockType - The type of block to be retrieved.
   * @returns {Block or null}
   */
  async getBlock(blockId, blockType = "block") {
    return await this.getRecordValues({
      id: blockId,
      table: blockType
    })
    .then(([block]) => this.resultToBlock(block))
  }

  /**
   * Returns an array of Block objects. If a block wasn't found, it will be null.
   * @param {[string]} ids - The ID of the block to fetch.
   */
  async getBlocks(ids) {
    let requestedRecords = ids.map(id => ({
      id,
      table: `block`
    }))
    return this.getRecordValues(requestedRecords)
    .then(results => results.map(block => this.resultToBlock(block)))
  }

  /**
   * Converts a Notion block json representation
   * into the corresponding Block object.
   * @param {{}} block - The block result from the getRecordValues functions
   */
  resultToBlock(block) {
    switch (block?.value?.type || "block") {
      case "block":
        return new Block(this, block)
      case "abstract":
        return new subBlocks.AbstractBlock(this, block)
      case "audio":
        return new subBlocks.AudioBlock(this, block)
      case "bookmark":
        return new subBlocks.BookmarkBlock(this, block)
      case "breadcrumb":
        return new subBlocks.BreadcrumbBlock(this, block)
      case "bulleted_list":
        return new subBlocks.BulletedListBlock(this, block)
      case "callout":
        return new subBlocks.CalloutBlock(this, block)
      case "code":
        return new subBlocks.CodeBlock(this, block)
      case "codepen":
        return new subBlocks.CodepenBlock(this, block)
      case "collection":
        return new Collection(this, block)
      case "column":
        return new subBlocks.ColumnListBlock(this, block)
      case "column_list":
        return new subBlocks.ColumnListBlock(this, block)
      case "drive":
        return new subBlocks.DriveBlock(this, block)
      case "embed":
        return new subBlocks.EmbedBlock(this, block)
      case "equation":
        return new subBlocks.EquationBlock(this, block)
      case "factory":
        return new subBlocks.FactoryBlock(this, block)
      case "figma":
        return new subBlocks.FigmaBlock(this, block)
      case "file":
        return new subBlocks.FileBlock(this, block)
      case "gist":
        return new subBlocks.GistBlock(this, block)
      case "header":
        return new subBlocks.HeaderBlock(this, block)
      case "image":
        return new subBlocks.ImageBlock(this, block)
      case "invision":
        return new subBlocks.InvisionBlock(this, block)
      case "miro":
        return new subBlocks.MiroBlock(this, block)
      case "numbered_list":
        return new subBlocks.NumberedListBlock(this, block)
      case "page":
        return new Page(this, block)
      case "pdf":
        return new subBlocks.PDFBlock(this, block)
      case "sub_header":
        return new subBlocks.SubHeaderBlock(this, block)
      case "sub_sub_header":
        return new subBlocks.SubSubHeaderBlock(this, block)
      case "table_of_contents":
        return new subBlocks.TOCBlock(this, block)
      case "text":
        return new subBlocks.TextBlock(this, block)
      case "to_do":
        return new subBlocks.TodoBlock(this, block)
      case "toggle":
        return new subBlocks.ToggleBlock(this, block)
      case "tweet":
        return new subBlocks.TweetBlock(this, block)
      case "typeform":
        return new subBlocks.TypeformBlock(this, block)
      case "quote":
        return new subBlocks.QuoteBlock(this, block)
      case "video":
        return new subBlocks.VideoBlock(this, block)
      case "whimsical":
        return new subBlocks.WhimsicalBlock(this, block)
      default:
        console.log(JSON.stringify(block, null, 2))
        return null
    }
  }

  /**
   * Returns a Page object if the page was found, otherwise null.
   * @param {string} pageId - The ID or URL of the page to fetch.
   * @returns {Page or null}
   */
  async getFullPageData(pageId) {
    return await this.authorizedRequest(`/loadPageChunk`, {
      ...defaultOptions,
      pageId,
    })
      .then(response => response.recordMap)
      .then(recordMap => recordMap.block)
  }
}

module.exports = RequestClient