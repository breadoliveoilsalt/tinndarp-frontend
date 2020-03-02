import * as config from './backendAPIRequestsConfig'

export async function getItems() {
  const url = config.baseURL + "/items"
  let { rawData } = await config.fetchWrapper.get(url)
  return processFromBackendAPI(rawData)
}

export function processFromBackendAPI(rawData) {
  return {
    name: rawData.name,
    imageURL: rawData.image_url,
    description: rawData.description,
    price: rawData.price,
    moreInfoURL: rawData.more_info_url
  }

}
