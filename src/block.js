const { notionToPlaintext, notionToMarkdown } = require('./util')

class Block {
  constructor(requestClient, block) {
    this.requestClient = requestClient
    this.block = block
  }

  getData() { return this.block }
  getId() { return this.block.value.id }
  getType() { return this.block.value.type }
}

class BasicTextBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }

  /**
   * Returns the text attached to this block.
   * @param {boolean} markdown - determines whether or not the text will be returned as markdown or plaintext. Defaults to false.
   */
  getText(markdown = false) {
    return markdown ?
      notionToMarkdown(this.block.value.properties?.title) || null :
      notionToPlaintext(this.block.value.properties?.title) || null
  }
}

class BasicMediaBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }

  /**
   * Returns the source URL for the media
   */
  getSource() { return this.block.value?.properties?.source?.[0]?.[0] }

  /**
   * Returns the format of the media
   */
  getFormat() { return this.block.value?.format }
}

class AbstractBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class AudioBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class BookmarkBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }

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

class BreadcrumbBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class BulletedListBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class CalloutBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }

  /**
   * Returns the icon attached to the callout block. If it is a custom icon, it will return a URL. If it is an emoji, it will return it directly.
   */
  getIcon() { return this.block.value?.format?.page_icon }
}

class CodeBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }

  /**
   * Returns the language assigned to the code block.
   */
  getLanguage() { return this.block.value?.properties?.language?.[0]?.[0] }
}

class CodepenBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

// class ColumnBlock {
//   constructor(requestClient, block) {
//     super(requestClient, block)
//   }
// }

class ColumnListBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class DividerBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class DriveBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }

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

class EmbedBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class EquationBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class FactoryBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }

  /**
   * Returns the text command of the template button
   */
  getText() { return this.block.value?.properties?.[0]?.[0] }
}

class FigmaBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class FileBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }

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

class FramerBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class GistBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }

  /**
   * Returns the link to the gist
   */
  getSource() { return this.block.value?.properties?.source?.[0]?.[0] }
}

class HeaderBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class ImageBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class InvisionBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class MiroBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class NumberedListBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class PDFBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class QuoteBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class SubHeaderBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class SubSubHeaderBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class TOCBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class TextBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class TodoBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }

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

class ToggleBlock extends BasicTextBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
  // TODO - call out to requestClient.getBlocks and return the block objects
  getContents() { return this.block.value?.content }
}

class TweetBlock extends Block {
  constructor(requestClient, block) {
    super(requestClient, block)
  }

  /**
   * Returns the URL of the tweet
   */
  getSource() { return this.block.value?.properties?.source?.[0]?.[0] }
}

class TypeformBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class VideoBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

class WhimsicalBlock extends BasicMediaBlock {
  constructor(requestClient, block) {
    super(requestClient, block)
  }
}

const subBlocks = {
  AbstractBlock,
  AudioBlock,
  BookmarkBlock,
  BreadcrumbBlock,
  BulletedListBlock,
  CalloutBlock,
  CodeBlock,
  CodepenBlock,
  // ColumnBlock,
  ColumnListBlock,
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