import { getItemsToBrowse, processItemDataFromBackendAPI, postBrowsingDecision } from './browsingAPIRequests'
import * as config from '../apiRequests/apiRequestsConfig/apiRequestsConfig'
import * as userAccountActions from '../userAccount/userAccountSlice'

const mockData = {
  data: {
    items: [
      {
        id: 1,
        image_url: 'https://www.ikea.com/us/en/images/products/sagstua-bed-frame__0783215_PE761511_S5.JPG?f=s',
        created_at: '2020-03-02T22:15:33.322Z',
        updated_at: '2020-03-02T22:15:33.322Z',
        name: 'SAGSTUA',
        price: '149.00',
        description: 'Bed frame, black, Full',
        more_info_url: 'https://www.ikea.com/us/en/p/sagstua-bed-frame-black-s59268898/'
      },
      {
        id: 2,
        image_url: 'https://www.ikea.com/us/en/images/products/malm-bed-frame-high__0637598_PE698416_S5.JPG?f=s',
        created_at: '2020-03-02T22:15:33.333Z',
        updated_at: '2020-03-02T22:15:33.333Z',
        name: 'MALM',
        price: '199.00',
        description: 'Bed frame, high, black-brown, Luröy, Queen',
        more_info_url: 'https://www.ikea.com/us/en/p/malm-bed-frame-high-black-brown-luroey-s69009475/'
      },
      {
        id: 3,
        image_url: 'https://www.ikea.com/us/en/images/products/buskbo-armchair__0700959_PE723853_S5.JPG?f=s',
        created_at: '2020-03-02T22:15:33.346Z',
        updated_at: '2020-03-02T22:15:33.346Z',
        name: 'BUSKBO',
        price: '130.00',
        description: 'Armchair, rattan',
        more_info_url: 'https://www.ikea.com/us/en/p/buskbo-armchair-rattan-70434311/'
      }
    ]
  }
}

describe("getItemsToBrowse", () => {

  let getReturnValue = Promise.resolve(mockData)

  beforeEach(() => {
    config.fetchWrapper.getWithParams = jest.fn()
    config.fetchWrapper.getWithParams.mockReturnValueOnce(getReturnValue)
    userAccountActions.getToken = jest.fn()
    userAccountActions.getToken.mockReturnValueOnce("xyz")
  })

  afterEach(() => {
    config.fetchWrapper.getWithParams.mockRestore()
    userAccountActions.getToken.mockRestore()
  })

  it("calls `getWithParams` on the configured fetchWrapper", () => {
    getItemsToBrowse()

    expect(config.fetchWrapper.getWithParams.mock.calls.length).toEqual(1)
  })

  it("passes to `getWithParams` an items url based on the configured base URL", () => {
    getItemsToBrowse()

    expect(config.fetchWrapper.getWithParams.mock.calls[0][0]).toEqual(config.baseURL + "/browsing")
  })

  it("returns the data fetched by the fetchWrapper's `getWithParams` call", () => {
    const returnValue = getItemsToBrowse()

    expect(returnValue).toEqual(getReturnValue)
  })

})

describe("processFromBackendAPI()", () => {

  it("processes the API's raw data for a list of items into data comsumable by the frontend", () => {
    const result = processItemDataFromBackendAPI(mockData)

    const expectedResults = [
      {
        id: 1,
        imageURL: 'https://www.ikea.com/us/en/images/products/sagstua-bed-frame__0783215_PE761511_S5.JPG?f=s',
        name: 'SAGSTUA',
        price: '149.00',
        description: 'Bed frame, black, Full',
        moreInfoURL: 'https://www.ikea.com/us/en/p/sagstua-bed-frame-black-s59268898/'
      },
      {
        id: 2,
        imageURL: 'https://www.ikea.com/us/en/images/products/malm-bed-frame-high__0637598_PE698416_S5.JPG?f=s',
        name: 'MALM',
        price: '199.00',
        description: 'Bed frame, high, black-brown, Luröy, Queen',
        moreInfoURL: 'https://www.ikea.com/us/en/p/malm-bed-frame-high-black-brown-luroey-s69009475/'
      },
      {
        id: 3,
        imageURL: 'https://www.ikea.com/us/en/images/products/buskbo-armchair__0700959_PE723853_S5.JPG?f=s',
        name: 'BUSKBO',
        price: '130.00',
        description: 'Armchair, rattan',
        moreInfoURL: 'https://www.ikea.com/us/en/p/buskbo-armchair-rattan-70434311/'
      }
    ]

    expect(result).toEqual(expectedResults)
  })
})

describe("postBrowsingDecision", () => {

  let params
  let mockData
  
  beforeEach(() => {
    config.fetchWrapper.post = jest.fn()
    params = {
      token: "xyz",
      item_id: "1",
      liked: true
    }
    mockData = {data: {}} 
    config.fetchWrapper.post.mockReturnValueOnce(Promise.resolve(mockData))
  })

  it("calls the post() method of the fetchWrapper", () => {
    postBrowsingDecision(params)

    expect(config.fetchWrapper.post.mock.calls.length).toEqual(1)
  })

  it("calls the post() method with the cofigured baseURL to /browsing", () => {
    postBrowsingDecision(params)

    const expectedURL = config.baseURL + "/browsing"
    expect(config.fetchWrapper.post.mock.calls[0][0]).toEqual(expectedURL)
  })

  it("passes the params to the post() method of fetchwapper after prefixing a 'browsing' key", () => {
    postBrowsingDecision(params)

    const expectedParams = {browsing: params}
    expect(config.fetchWrapper.post.mock.calls[0][1]).toEqual(expectedParams)
  })

  it("parses the return data to return a simple object with no errors if the data returns no errors", () => {
    mockData = {
      headers: "stuff",
      data: {},
      metaData: {
        statusCode: 200
      }
    }
    config.fetchWrapper.post = jest.fn()
    config.fetchWrapper.post.mockReturnValueOnce(Promise.resolve(mockData))

    return postBrowsingDecision(params).then(result => {
      expect(result.errors).toBeUndefined()
    })

  })

  it("parses the return data to return a simple object with an error field if the data returns errors", () => {
    mockData = {
      headers: "stuff",
      data: {
        errors: "Something went wrong"
      },
      metaData: {
        statusCode: 200
      }
    }
    config.fetchWrapper.post = jest.fn()
    config.fetchWrapper.post.mockReturnValueOnce(Promise.resolve(mockData))

    return postBrowsingDecision(params).then(result => {
      expect(result.errors).toEqual(mockData.data.errors)
    })
  })

})