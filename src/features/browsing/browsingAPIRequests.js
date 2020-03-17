import * as config from '../apiRequests/apiRequestsConfig/apiRequestsConfig'

export async function getItems() {
  const url = config.baseURL + "/items"
  let rawData = await config.fetchWrapper.get(url)
  return processItemDataFromBackendAPI(rawData)
}

export function processItemDataFromBackendAPI(rawData) {
  const rawItemListData = rawData.data
  let processedData = []
  rawItemListData.forEach(rawItemData => cherrypickItemData(rawItemData, processedData))
  return processedData
}

function cherrypickItemData(rawItemData, processedData) {
  const newObject = {
    id: rawItemData.id,
    name: rawItemData.name,
    imageURL: rawItemData.image_url,
    description: rawItemData.description,
    price: rawItemData.price,
    moreInfoURL: rawItemData.more_info_url
  }

  processedData.push(newObject)
}


