import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://ecommerce-cms-ryan.herokuapp.com'
})

export default instance
