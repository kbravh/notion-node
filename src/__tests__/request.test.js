const RequestClient = require('../request')

describe("Request client", () => {
  it("sets the token in constructor", () => {
    const client = new RequestClient("519dd")
    expect(client.token).toBe("519dd")
  })
  it("sets a token using setter", () => {
    const client = new RequestClient()
    client.setToken("76543qq")
    expect(client.token).toBe("76543qq")
  })
})