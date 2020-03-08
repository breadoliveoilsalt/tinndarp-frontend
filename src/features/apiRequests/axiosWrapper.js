import axios from 'axios'

const fetchWrapper =  {
  get: async (url) => {
    return await axios.get(url)
  }
}

export default fetchWrapper
