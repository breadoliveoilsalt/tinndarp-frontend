import axios from 'axios'

const fetchWrapper =  {
  get: async (url) => {
    return axios.get(url)
  },
  post: async (url, params) => {
    return axios({
      method: "post",
      url: url,
      data: params
    })
  }
}

export default fetchWrapper
