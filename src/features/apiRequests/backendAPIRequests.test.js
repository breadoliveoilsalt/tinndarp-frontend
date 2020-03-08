import { getItems, processFromBackendAPI } from './backendAPIRequests'
import * as config from './backendAPIRequestsConfig'

const mockData = {data: [
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
]}

describe("getItems", () => {

  let getMock
  let getReturnValue = Promise.resolve(mockData)

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

describe("processFromBackendAPI()", () => {

  it("processes the API's raw data for a list of items into data comsumable by the frontend", () => {
    const result = processFromBackendAPI(mockData)

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
