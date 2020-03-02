import { getItems } from './backendAPIRequests'
import * as config from './backendAPIRequestsConfig'

describe("getItems", () => {

  let getMock
  let getReturnValue = Promise.resolve({data: ["some data"]})

  beforeEach(() => {
    config.fetchWrapper.get = jest.fn()
    config.fetchWrapper.get.mockReturnValueOnce(getReturnValue)
  })

  it("calls `get` on the configured fetchWrapper", () => {
    getItems()

    expect(config.fetchWrapper.get.mock.calls.length).toEqual(1)
  })

  it("passes to `get` an items url based on the configured base URL", () => {
    getItems()

    expect(config.fetchWrapper.get.mock.calls[0][0]).toEqual(config.baseURL + "/items")
  })

  it("returns the data fetched by the fetchWrapper's `get` call", () => {
    const returnValue = getItems()

    expect(returnValue).toEqual(getReturnValue)
  })
})
