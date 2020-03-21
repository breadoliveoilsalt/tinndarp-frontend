import * as config from '../apiRequests/apiRequestsConfig/apiRequestsConfig'
import { getItemsInCommonWith } from './comparingAPIRequests'

describe("getItemsInCommonWith()", () => {

  const params = {
    token: "xyz",
    compare_to: "tommy@tommy.com"
  }

  const item1 = {
    name: "SAGSTUA",
    image_url: "https://www.ikea.com/us/en/images/products/sagstua-bed-frame__0783215_PE761511_S5.JPG?f=s",
    price: "149.00",
    description: "Bed frame, black, Full",
    more_info_url: "https://www.ikea.com/us/en/p/sagstua-bed-frame-black-s59268898/"
  }

  const item2 = {
    name: "MALM",
    image_url: "https://www.ikea.com/us/en/images/products/malm-bed-frame-high__0637598_PE698416_S5.JPG?f=s",
    price: "199.00",
    description: "Bed frame, high, black-brown, Luröy, Queen",
    more_info_url: "https://www.ikea.com/us/en/p/malm-bed-frame-high-black-brown-luroey-s69009475/"
  }

  const mockData = {
    data: {
      user_email: "billy@billy.com",
      successful_comparison_to: "tommy@tommy.com",
      common_items: [item1, item2]
    }
  }

  beforeEach(() => {
    config.fetchWrapper.getWithParams = jest.fn()
    config.fetchWrapper.getWithParams.mockReturnValueOnce(Promise.resolve(mockData))
  })

  afterEach(() => {
    config.fetchWrapper.getWithParams.mockRestore()
  })

  it("calls the getWithParams() method of the fetchWrapper", () => {
    getItemsInCommonWith(params)

    expect(config.fetchWrapper.getWithParams.mock.calls.length).toEqual(1)
  })

  it("calls the getWithParams() method with the cofigured baseURL to a /comparing path", () => {
    getItemsInCommonWith(params)

    const expectedURL = config.baseURL + "/comparing"
    expect(config.fetchWrapper.getWithParams.mock.calls[0][0]).toEqual(expectedURL)
  })

  it("passes the params to the getWithParams() method of fetchwapper as the value of a comparing key", () => {
    getItemsInCommonWith(params)

    const expectedParams = {
      comparing: params 
    }
      
    expect(config.fetchWrapper.getWithParams.mock.calls[0][1]).toEqual(expectedParams)
  })

})