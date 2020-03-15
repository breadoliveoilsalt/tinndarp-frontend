import * as config from './apiRequestsConfig/apiRequestsConfig'

export async function postSignUp(credentials) {
  const url = config.baseURL + "/sign_up"
  const data = {user: credentials}
  let rawData = await config.fetchWrapper.post(url, data)
  return process(rawData)
}

export async function postLogIn(credentials) {
  const url = config.baseURL + "/log_in"
  const data = {user: credentials}
  let rawData = await config.fetchWrapper.post(url, data)
  return process(rawData)
}

//TEST
export async function getAuthenticateUserToken(token) {
  const url = config.baseURL + "/authenticate_user_token"
  const data = {user: {token: token}}
  const rawData = await config.fetchWrapper.getWithParams(url, data)
  return process(rawData)
}

const process = (rawData) => {
  if (rawData.data.errors) {
    return {
      loggedIn: false,
      errors: rawData.data.errors
    }
  } else if (rawData.data.logged_in === "true") {
    return {
      loggedIn: true,
      token: rawData.data.token
    }
  } else {
    return {
      errors: "Sorry, something appears to have gone wrong."
    }
  }
}
