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

export async function postBrowsingDecision(params) {
    const url = config.baseURL + "/browsing"
    const data = {browsing: params}
    let rawData = await config.fetchWrapper.post(url, data)
    return processDecisionData(rawData)
}

function processDecisionData(rawData) {
  const decisionData = rawData.data
  if (decisionData.errors !== undefined) {
    return {errors: decisionData.errors}
  } else {
    return {}
  }
}

