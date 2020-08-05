const { notionToPlaintext, notionToMarkdown } = require('./util')
const multiclass = require('@kbravh/multi-class')

class Block {
  constructor(requestClient, block) {
    this.requestClient = requestClient
    this.block = block
  }

  /**
   * Returns the raw Notion data that makes up this Block.
   * 
   */
  getData() { return this.block }

  /**
   * Returns the Notion ID of this Block.
   */
  getId() { return this.block.value.id }

  /**
   * Returns this Block's type in the Notion ecosystem.
   */
  getType() { return this.block.value.type }

  /**
   * Will return the parent item, which will be the corresponding item type.
   */
  async getParent() {
    return this.requestClient.getBlock(this.block.value?.parent_id, this.block.value?.parent_table)
  }
}

class BasicTextBlock extends Block {
  /**
   * Returns the text attached to this block.
   * @param {boolean} markdown - determines whether or not the text will be returned as markdown or plaintext. Defaults to false (plaintext).
   */
  getText(markdown = false) {
    return markdown ?
      notionToMarkdown(this.block.value.properties?.title) || null :
      notionToPlaintext(this.block.value.properties?.title) || null
  }
}

class BasicMediaBlock extends Block {
  /**
   * Returns the source URL for the media
   */
  getSource() { return this.block.value?.properties?.source?.[0]?.[0] }

  /**
   * Returns the format of the media
   */
  getFormat() { return this.block.value?.format }
}

class ContainerBlock extends Block{
  constructor(requestClient, block){
    super(requestClient, block)
  }

  /**
   * Returns the set of Blocks that this block contains.
   */
  getContent(){return this.requestClient.getBlocks(this.block.value?.content)}
}

class AbstractBlock extends BasicMediaBlock {}

class AudioBlock extends BasicMediaBlock {}

class BookmarkBlock extends Block {
  /**
   * Returns the link in the bookmark.
   */
  getLink() { return this.block.value?.properties?.link?.[0]?.[0] }

  /**
   * Returns the title of the site in the bookmark.
   */
  getTitle() { return this.block.value?.properties?.title?.[0]?.[0] }

  /**
   * Returns the description of the site in the bookmark.
   */
  getDescription() { return this.block.value?.properties?.description?.[0]?.[0] }

  /**
   * Returns the favicon of the site in the bookmark.
   */
  getIcon() { return this.block.value?.format?.bookmark_icon }

  /**
   * Returns the cover (open graph image) of the site in the bookmark.
   */
  getCover() { return this.block.value?.format?.bookmark_cover }
}

class BreadcrumbBlock extends Block {}

class BulletedListBlock extends BasicTextBlock {}

class CalloutBlock extends BasicTextBlock {
  /**
   * Returns the icon attached to the callout block. If it is a custom icon, it will return a URL. If it is an emoji, it will return it directly.
   */
  getIcon() { return this.block.value?.format?.page_icon }
}

class CodeBlock extends BasicTextBlock {
  /**
   * Returns the language assigned to the code block.
   */
  getLanguage() { return this.block.value?.properties?.language?.[0]?.[0] }
}

class CodepenBlock extends BasicMediaBlock {}

class ColumnBlock extends ContainerBlock {
  /**
   * Returns the layout ratio for column. 
   */
  getRatio(){return this.block.value?.format?.column_ratio}
}

class ColumnListBlock extends ContainerBlock {}

class DividerBlock extends Block {}

class DriveBlock extends Block {
  /**
   * Returns the link to the Drive file
   */
  getLink() { return this.block.value?.format?.drive_properties?.url }

  /**
   * Returns the icon of the Drive file
   */
  getIcon() { return this.block.value?.format?.drive_properties?.icon }

  /**
   * Returns the title of the Drive file
   */
  getTitle() { return this.block.value?.format?.drive_properties?.title }

  /**
   * Returns the thumbnail of the Drive file
   */
  getThumbnail() { return this.block.value?.format?.drive_properties?.thumbnail }

  /**
   * Returns all of the properties of the drive file
   */
  getDriveProperties() { return this.block.value?.format?.drive_properties }
}

class EmbedBlock extends BasicMediaBlock {}

class EquationBlock extends BasicTextBlock {}

class FactoryBlock extends Block {
  /**
   * Returns the text command of the template button
   */
  getText() { return this.block.value?.properties?.[0]?.[0] }
}

class FigmaBlock extends BasicMediaBlock {}

class FileBlock extends Block {
  /**
   * Returns the filename
   */
  getTitle() { return this.block.value?.properties?.title?.[0]?.[0] }

  /**
   * Returns the prettified size of the file
   */
  getSize() { return this.block.value?.properties?.size?.[0]?.[0] }

  /**
   * Returns the URL of the file
   */
  getSource() { return this.block.value?.properties?.source?.[0]?.[0] }
}

class FramerBlock extends Block {}

class GistBlock extends Block {
  /**
   * Returns the link to the gist
   */
  getSource() { return this.block.value?.properties?.source?.[0]?.[0] }
}

class HeaderBlock extends BasicTextBlock {}

class ImageBlock extends BasicMediaBlock {}

class InvisionBlock extends BasicMediaBlock {}

class MiroBlock extends BasicMediaBlock {}

class NumberedListBlock extends BasicTextBlock {}

class PDFBlock extends BasicMediaBlock {}

class QuoteBlock extends BasicTextBlock {}

class SubHeaderBlock extends BasicTextBlock {}

class SubSubHeaderBlock extends BasicTextBlock {}

class TOCBlock extends Block {}

class TextBlock extends BasicTextBlock {}

class TodoBlock extends BasicTextBlock {
  // /**
  //  * Returns the state of the checkbox. 
  //  * TODO - If true or false is passed, sets the checkbox.
  //  * @param {boolean} checked - If set to true or false, sets the checkbox.
  //  */
  // isChecked(checked) {
  //   if (typeof checked === "boolean") {
  //     // update checked to Yes or No
  //   }
  //   else return this.block?.value?.properties?.checked?.[0]?.[0] == "Yes"
  // }

  /**
   * Returns the state of the checkbox. 
   * @param {boolean} checked - If set to true or false, sets the checkbox.
   */
  isChecked(checked) { return this.block?.value?.properties?.checked?.[0]?.[0] == "Yes" }
}

class ToggleBlock extends multiclass(BasicTextBlock, ContainerBlock) {}

class TweetBlock extends Block {
  /**
   * Returns the URL of the tweet
   */
  getSource() { return this.block.value?.properties?.source?.[0]?.[0] }
}

class TypeformBlock extends BasicMediaBlock {}

class VideoBlock extends BasicMediaBlock {}

class WhimsicalBlock extends BasicMediaBlock {}

const subBlocks = {
  AbstractBlock,
  AudioBlock,
  BasicMediaBlock,
  BasicTextBlock,
  BookmarkBlock,
  BreadcrumbBlock,
  BulletedListBlock,
  CalloutBlock,
  CodeBlock,
  CodepenBlock,
  ColumnBlock,
  ColumnListBlock,
  ContainerBlock,
  DividerBlock,
  DriveBlock,
  EmbedBlock,
  EquationBlock,
  FactoryBlock,
  FigmaBlock,
  FileBlock,
  FramerBlock,
  GistBlock,
  HeaderBlock,
  ImageBlock,
  InvisionBlock,
  MiroBlock,
  NumberedListBlock,
  PDFBlock,
  QuoteBlock,
  SubHeaderBlock,
  SubSubHeaderBlock,
  TextBlock,
  TOCBlock,
  TodoBlock,
  ToggleBlock,
  TweetBlock,
  TypeformBlock,
  VideoBlock,
  WhimsicalBlock
}

module.exports = { Block, subBlocks }