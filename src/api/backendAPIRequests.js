import { baseURL, fetchWrapper } from './backendAPIRequestsConfig'

export async function getItems() {
  const url = baseURL + "/items"
  let { data } = await fetchWrapper.get(url)
  return data
}
