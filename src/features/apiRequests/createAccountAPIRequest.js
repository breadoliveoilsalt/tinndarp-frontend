import * as config from './backendAPIRequestsConfig'

export async function postCreateAccount(credentials) {
  const url = config.baseURL + "/sign_up"
  const data = {user: credentials}
  let rawData = await config.fetchWrapper.post(url, data)
  return process(rawData)
}

//TEST
export async function postLogIn(credentials) {
  const url = config.baseURL + "/log_in"
  const data = {user: credentials}
  let rawData = await config.fetchWrapper.post(url, data)
  return process(rawData)
}

const process = (rawData) => {
  if (rawData.data.errors) {
    return {
      loggedIn: false,
      errors: rawData.data.errors
    }
  } else if (rawData.data.logged_in) {
    return {
      loggedIn: rawData.data.logged_in,
      token: rawData.data.token
    }
  }
  return rawData.data
}

export default postCreateAccount
