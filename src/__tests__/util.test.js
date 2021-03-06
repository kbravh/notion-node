const { getId, plaintextToNotion, notionToPlaintext, notionToMarkdown, parseNotionText } = require('../util')

describe("ID parsing", () => {
  it("parses ID from URL", () => {
    expect(getId(`https://www.notion.so/Notes-97cb774b9af24c22bef6cb50745a79ae`)).toBe('97cb774b-9af2-4c22-bef6-cb50745a79ae')
  })
  it('rejects a bad URL', () => {
    expect(() => getId(`https://www.notion.so/Notes-97cb774b9af24cbef6cb50745a79ae`)).toThrow(`A valid UUID or Notion URL was not provided.`)
  })
  it('returns an ID', () => {
    expect(getId(`251aa556-7b6a-49ef-b08f-67e2d5fb3c0c`)).toBe('251aa556-7b6a-49ef-b08f-67e2d5fb3c0c')
  })
  it('rejects a badly formed ID', () => {
    expect(() => getId(`251aa556-7b6a-49ef-b08f`)).toThrow(`A valid UUID or Notion URL was not provided.`)
  })
  it('rejects an ID with a bad version number', () => {
    expect(() => getId(`251aa556-7b6a-69ef-b08f-67e2d5fb3c0c`)).toThrow(`A valid UUID or Notion URL was not provided.`)
  })
})

describe("Markdown Utils", () => {
  it("transforms plaintext to Notion format", () => {
    expect(plaintextToNotion("Text")).toStrictEqual([["Text"]])
  })
  it("transforms notion format to plaintext with modifiers", () => {
    expect(notionToPlaintext([["italics ", [["i"]]], ["bold", [["b"]]]])).toBe("italics bold")
  })
  it("transforms notion format to plaintext without modifiers", () => {
    expect(notionToPlaintext([["italics "], ["bold"]])).toBe("italics bold")
  })
  it("transforms notion format to markdown with modifiers", () => {
    expect(notionToMarkdown([["bold italics in a codebox",[["b"],["i"],["c"]]]])).toBe('`***bold italics in a codebox***`')
  })
  it("transforms notion format to markdown without modifiers", () => {
    expect(notionToMarkdown([["bold italics in a codebox"]])).toBe('bold italics in a codebox')
  })
  it("defaults to plaintext if not given a markdown indicator", () => {
    expect(parseNotionText([["italics ", [["i"]]], ["bold", [["b"]]]])).toBe("italics bold")
  })
  it("transforms to markdown if given the markdown indicator", () => {
    expect(parseNotionText([["bold italics in a codebox",[["b"],["i"],["c"]]]], true)).toBe("`***bold italics in a codebox***`")
  })
})