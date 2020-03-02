import * as config from './backendAPIRequestsConfig'

export async function getItems() {
  const url = config.baseURL + "/items"
  let { data } = await config.fetchWrapper.get(url)
  return data
}
