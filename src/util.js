/**
 * Returns either a validated UUID, or extracts the UUID from a URL
 * @param {string} identifier - URL or UUID
 */
const getId = identifier => {
  // UUIDs are hexadecimal, which means we should only have 0-9 and a-f.
  // They are usually hyphenated, but are not so in Notion URLs.
  // The 13th digit indicates the UUID version (1-5).
  // e.g. 123e4567-e89b-12d3-a456-426655440000
  const UUID_REGEX = /[0-9a-f]{8}-?[0-9a-f]{4}-?[1-5][0-9a-f]{3}-?[0-9a-f]{4}-?[0-9a-f]{12}/i
  let match = identifier && identifier.match(UUID_REGEX)
  let uuid = match && match[0] || null

  if(!uuid){
    throw new Error(`A valid UUID or Notion URL was not provided.`)
  }

  // Hyphenate the UUID if it is not already
  if(!uuid.includes(`-`)){
    uuid = uuid.replace(
      /([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})/,
      "$1-$2-$3-$4-$5")
  }

  return uuid
}

/* Markdown Utils */
/**
 * Converts a regular string into the Notion text format.
 * @param {string} text - the text to be converted to Notion format
 */
const plaintextToNotion = text => [[text]]

/**
 * Returns Notion formatted text in either plaintext format or in Markdown format.
 * @param {[]} text - the Notion formatted text to be parsed
 * @param {boolean} markdown - whether or not to return markdown. Defaults to false (plaintext)
 */
const parseNotionText = (text, markdown = false) => markdown ?
notionToMarkdown(text) || null :
notionToPlaintext(text) || null

/**
 * Returns Notion formatted text as plaintext.
 * @param {[]} notionArray - the Notion formatted text to be parsed
 */
const notionToPlaintext = notionArray => notionArray.map(([text]) => text).join('')

/**
 * Returns Notion formatted text as Markdown.
 * @param {[]} notionArray - the Notion formatted text to be parsed
 */
const notionToMarkdown = notionArray => notionArray.map(([text, modifiers]) => {
  let markdown = text
  if (modifiers){
    for (const [modifier] of modifiers) {
      switch (modifier) {
        case "b":
          markdown = `**${markdown}**`
          break
        case "i":
          markdown = `*${markdown}*`
          break
        case "c":
          markdown = `\`${markdown}\``
          break
        case "s":
          markdown = `~${markdown}~`
          break
        case "a":
        default:
          break
      }
    }
  }
  return markdown
}).join("")

module.exports = {
  getId,
  plaintextToNotion,
  parseNotionText,
  notionToPlaintext,
  notionToMarkdown
}