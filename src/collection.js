const { parseNotionText } = require('./util')
const { Block } = require('./block')

class Collection extends Block {

  /**
   * Returns this Block's type in the Notion ecosystem.
   */
  getType() { return "collection" }

  /**
   * Returns the title of this collection.
   * @param {boolean} markdown - determines whether or not the text will be returned as markdown or plaintext. Defaults to false (plaintext).
   */
  getTitle(markdown = false) { return parseNotionText(this.block.value?.name, markdown) }

  /**
   * Returns the description of this collection.
   * @param {boolean} markdown - determines whether or not the text will be returned as markdown or plaintext. Defaults to false (plaintext).
   */
  getDescription(markdown = false) { return parseNotionText(this.block.value?.description, markdown) }

  /**
   * Returns the emoji icon assigned to the page. If a custom icon is assigned, returns a link to it.
   */
  getIcon() { return this.collection.value?.icon }

  /**
   * Returns a link to the cover if it exists.
   */
  getCover() { return this.collection.value?.cover }
}

module.exports = Collection