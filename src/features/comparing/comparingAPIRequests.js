import * as config from '../apiRequests/apiRequestsConfig/apiRequestsConfig'

export async function getItemsInCommonWith(params) {
  const url = config.baseURL + "/comparing"
  const strongParams = {
    comparing: params
  }
  const rawData = await config.fetchWrapper.getWithParams(url, strongParams)
  return process(rawData)
}