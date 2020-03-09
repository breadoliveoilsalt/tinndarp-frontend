import * as config from './backendAPIRequestsConfig'

// TEST!
export async function postCreateAccount(credentials) {
  const url = config.baseURL + "/sign_up"
  const data = {user: credentials}
  let rawData = await config.fetchWrapper.post(url, data)
  return process(rawData)
}

const process = (rawData) => {
  return rawData.data
}
