import axios from 'axios'

const API_URL = 'http://localhost:5001/api/task'
// const API_URL = 'http://192.168.100.232:5001/api/task'

export const getTask = (token) => {
  return axios.get(`${API_URL}/`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const getTaskByid = (token, id) => {
  return axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const postTask = (token, updatedData) => {
  return axios.post(`${API_URL}/`, updatedData, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const updateTaskById = (token, id, updatedData) => {
  return axios.put(`${API_URL}/update/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const deleteTaskById = (token, id) => {
  return axios.delete(`${API_URL}/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

