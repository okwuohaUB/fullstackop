import axios from 'axios'


const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (personObject) => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => response.data)
}

const update = (id, personObject) => {
  const request = axios.put(`${baseUrl}/${id}`, personObject)
  return request.then(response => response.data)
}


const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// Export the functions
export default { getAll, create, update, remove }   