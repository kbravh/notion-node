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

exports.getId = getId