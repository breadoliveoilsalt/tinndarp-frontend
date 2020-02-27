import { getItems } from './backendAPIRequests'
import * as config from './backendAPIRequestsConfig'

describe("getItems", () => {

  let getMock
  let getReturnValue = Promise.resolve({data: ["some data"]})

  beforeEach(() => {
    getMock = jest.fn()
    getMock.mockReturnValueOnce(getReturnValue)
    config.fetchWrapper.get = getMock
  })

  it("calls `get` on the configured fetchWrapper", () => {
    getItems()

    expect(getMock.mock.calls.length).toEqual(1)
  })

  it("passes to `get` an items url based on the configured base URL", () => {
    getItems()

    expect(getMock.mock.calls[0][0]).toEqual(config.baseURL + "/items")
  })

  it("returns the data fetched by the fetchWrapper's `get` call", () => {
    const returnValue = getItems()

    expect(returnValue).toEqual(getReturnValue)
  })
})
