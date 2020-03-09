import axios from 'axios'

// TEST - can I get rid of this async stuff? and make functions consistent?
const fetchWrapper =  {
  get: async (url) => {
    return await axios.get(url)
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
