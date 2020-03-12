import * as config from './backendAPIRequestsConfig'
import { postCreateAccount, postLogIn } from './createAccountAPIRequest'

describe("postCreateAccount()", () => {

  const userCredentials = {
    email: "someEmail@email.com",
    password: "password"
  }

  let mockData = {
    data: {
      loggedIn: true,
      token: "xyz"
    }
  }

  beforeEach(() => {
    config.fetchWrapper.post = jest.fn()
    config.fetchWrapper.post.mockReturnValueOnce(Promise.resolve(mockData))
  })

  it("calls the post() method of the fetchWrapper", () => {
    postCreateAccount(userCredentials)

    expect(config.fetchWrapper.post.mock.calls.length).toEqual(1)
  })

  it("calls the post() method with the cofigured baseURL to /sign_up", () => {
    postCreateAccount(userCredentials)

    const expectedURL = config.baseURL + "/sign_up"
    expect(config.fetchWrapper.post.mock.calls[0][0]).toEqual(expectedURL)
  })

  it("passes the userCreditials to the post() method of fetchwapper after prefixing a 'user' key", () => {
    postCreateAccount(userCredentials)

    const expectedParams = {user: userCredentials}
    expect(config.fetchWrapper.post.mock.calls[0][1]).toEqual(expectedParams)
  })

  it("parses the return data to return a simple object with errors if the data returns errors about creating an account", () => {
    mockData = {
      headers: "stuff",
      data: {
        loggedIn: false,
        errors: ["Things went wrong", "Sure did"]
      },
      metaData: {
        statusCode: 200
      }
    }
    config.fetchWrapper.post = jest.fn()
    config.fetchWrapper.post.mockReturnValueOnce(Promise.resolve(mockData))

    return postCreateAccount(userCredentials).then( result => {
      const expectedResult = {
          loggedIn: false,
          errors: ["Things went wrong", "Sure did"]
      }
      expect(result).toEqual(expectedResult)
    })

  })

  it("parses the return data to return a simple object with a loggedIn status and token if the data does not have errors about creating an account", () => {
    mockData = {
      headers: "stuff",
      data: {
        loggedIn: true,
        token: "xyz"
      },
      metaData: {
        statusCode: 200
      }
    }
    config.fetchWrapper.post = jest.fn()
    config.fetchWrapper.post.mockReturnValueOnce(Promise.resolve(mockData))

    return postCreateAccount(userCredentials).then( result => {
      const expectedResult = {
          loggedIn: true,
          token: "xyz"
      }
      expect(result).toEqual(expectedResult)
    })

  })

})

describe("postLogIn()", () => {

  const userCredentials = {
    email: "someEmail@email.com",
    password: "password"
  }

  let mockData = {
    data: {
      loggedIn: true,
      token: "xyz"
    }
  }

  beforeEach(() => {
    config.fetchWrapper.post = jest.fn()
    config.fetchWrapper.post.mockReturnValueOnce(Promise.resolve(mockData))
  })

  it("calls the post() method of the fetchWrapper", () => {
    postLogIn(userCredentials)

    expect(config.fetchWrapper.post.mock.calls.length).toEqual(1)
  })

  it("calls the post() method with the cofigured baseURL to /log_in", () => {
    postLogIn(userCredentials)

    const expectedURL = config.baseURL + "/log_in"
    expect(config.fetchWrapper.post.mock.calls[0][0]).toEqual(expectedURL)
  })

  it("passes the userCreditials to the post() method of fetchwapper after prefixing a 'user' key", () => {
    postLogIn(userCredentials)

    const expectedParams = {user: userCredentials}
    expect(config.fetchWrapper.post.mock.calls[0][1]).toEqual(expectedParams)
  })

  it("parses the return data to return a simple object with errors if the data returns errors about creating an account", () => {
    mockData = {
      headers: "stuff",
      data: {
        loggedIn: false,
        errors: ["Invalid log in credentials."]
      },
      metaData: {
        statusCode: 200
      }
    }
    config.fetchWrapper.post = jest.fn()
    config.fetchWrapper.post.mockReturnValueOnce(Promise.resolve(mockData))

    return postLogIn(userCredentials).then( result => {
      const expectedResult = {
          loggedIn: mockData.data.loggedIn,
          errors: mockData.data.errors
      }
      expect(result).toEqual(expectedResult)
    })

  })

  it("parses the return data to return a simple object with a loggedIn status and token if the data does not have errors about creating an account", () => {
    mockData = {
      headers: "stuff",
      data: {
        loggedIn: true,
        token: "xyz"
      },
      metaData: {
        statusCode: 200
      }
    }
    config.fetchWrapper.post = jest.fn()
    config.fetchWrapper.post.mockReturnValueOnce(Promise.resolve(mockData))

    return postLogIn(userCredentials).then( result => {
      const expectedResult = {
          loggedIn: mockData.data.loggedIn,
          token: mockData.data.token
      }
      expect(result).toEqual(expectedResult)
    })

  })

})
