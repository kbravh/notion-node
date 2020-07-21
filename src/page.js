class Page {
  constructor(requestClient, block){
    this.requestClient = requestClient
    this.rawData = block
    let id = Object.keys(this.rawData)[0]
    this.block = this.rawData[id].value
  }

  /**
   * Returns the raw data for this block. Useful for rendering pages.
   */
  getData() {return this.rawData}

  /**
   * Returns the ID of the Notion block 
   */
  getID() {return this.block.id}

  /**
   * Returns the block type. Page, collection, text, &c.
   */
  getType() {return this.block.type}

  /**
   * Returns the title of the page. This will not include any Markdown styling.
   */
  getTitle() {return this.block.properties && this.block.properties.title[0] && this.block.properties.title[0][0] || null}
  
  /**
   * Returns a list of IDs of children blocks.
   */
  getContent() {return this.block.content || null}

  /**
   * Returns a link to the cover if it exists.
   */
  getCover() {return this.block.format && this.block.format.page_cover || null}

  /**
   * Returns the emoji icon assigned to the page. If a custom icon is assigned, returns a link to it.
   */
  getIcon() {return this.block.format && this.block.format.page_icon || null}

  /**
   * Will return the parent item, which will be the corresponding item type.
   */
  async getParent() {return this.requestClient.getBlock(this.block.parent_id, this.block.parent_table)}
}

module.exports = Page