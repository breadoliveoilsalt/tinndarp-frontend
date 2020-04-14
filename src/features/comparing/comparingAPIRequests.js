import * as config from '../apiRequests/apiRequestsConfig/apiRequestsConfig'

export async function getItemsInCommonWith(params) {
  const url = config.baseURL + "/comparing"
  const strongParams = {
    comparing: params
  }
  const rawData = await config.fetchWrapper.getWithParams(url, strongParams)
  return process(rawData)
}

function process(rawData) {
  if (rawData.data.errors !== undefined) {
    return { errors: rawData.data.errors }
  } else {
    return {
      userEmail: rawData.data.user_email,
      successfulComparisonTo: rawData.data.successful_comparison_to,
      commonItems: cherrypickItemData(rawData.data.common_items)
    }
  }
}

function cherrypickItemData(rawListOfItems) {
  return rawListOfItems.map( rawItemData => {
    return {
      id: rawItemData.id,
      name: rawItemData.name,
      imageURL: rawItemData.image_url,
      description: rawItemData.description,
      price: rawItemData.price,
      moreInfoURL: rawItemData.more_info_url
    }
  })
}