const {subBlocks: {BasicTextBlock, ContainerBlock}, Block} = require('./block')
const multiclass = require('@kbravh/multi-class')

class Page extends multiclass(BasicTextBlock, ContainerBlock)  {
  /**
   * Returns the raw data for this entire page and its contents. Useful for rendering pages (for example, with react-notion).
   */
  getFullPageData() {return this.requestClient.getFullPageData(this.getId())}

  /**
   * Returns the title of this page.
   * @param {boolean} markdown - determines whether or not the text will be returned as markdown or plaintext. Defaults to false (plaintext).
   */
  getTitle(markdown = false) {return this.getText(markdown)}
  
  /**
   * Returns a link to the cover if it exists.
   */
  getCover() {return this.block.value?.format?.page_cover}

  /**
   * Returns the cover image position as a decimal number from 0 to 1.
   */
  getCoverPosition(){return this.block.value?.format?.page_cover_position}

  /**
   * Returns the emoji icon assigned to the page. If a custom icon is assigned, returns a link to it.
   */
  getIcon() {return this.block.value?.format?.page_icon}
}

module.exports = Page