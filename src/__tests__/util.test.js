const { getId, plaintextToNotion } = require('../util')

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
})