const { notionToPlaintext, notionToMarkdown } = require('./util')

class Collection {
  constructor(requestClient, block){
    this.requestClient = requestClient
    this.collection = block
  }

  getRawData(){ return this.collection || null}
  getID(){ return this.collection.value.id || null}
  getName(){ return this.collection.value?.name?.[0]?.[0] || null}
  getDescription(){ return this.collection.value.description && this.collection.value.description[0] && this.collection.value.description[0][0] || null}
  getIcon(){ return this.collection.value.icon || null}
  getCover(){ return this.collection.value.cover || null}
  async getParent(){ return this.requestClient.getBlock(this.collection.value.parent_id, this.collection.value.parent_table)}
}

module.exports = Collection