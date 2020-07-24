const {notionToPlaintext, notionToMarkdown} = require('./util')

class Block {
  constructor(requestClient, block){
    this.requestClient = requestClient
    this.block = block
  }

  getData() {return this.block}
  getText(markdown = false) {return markdown ? this.block.value.properties && this.block.value.properties.title && notionToMarkdown(this.block.value.properties.title) || null : this.block.value.properties && this.block.value.properties.title && notionToPlaintext(this.block.value.properties.title) || null}
  getId() {return this.block.value.id}
  getType() {return this.block.value.type}
}

module.exports = Block