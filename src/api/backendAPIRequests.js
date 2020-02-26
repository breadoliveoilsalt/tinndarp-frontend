import axios from 'axios'

export async function getItems() {
  let { data } = await axios.get("https://tinndarp-backend.herokuapp.com/items")
  return data
}
