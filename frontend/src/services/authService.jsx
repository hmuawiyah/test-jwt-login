import axios from 'axios'

const API_URL = 'http://localhost:5001/api/user'

export const register = (email, password) => {
  return axios.post(`${API_URL}/register`, { email, password })
}

export const login = (email, password) => {
  return axios.post(`${API_URL}/login`, { email, password })
}

export const getUser = (token) => {
  return axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const updateUserById = (token, id, updatedData) => {
  return axios.put(`${API_URL}/update/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

export const deleteUserById = (token, id) => {
  return axios.delete(`${API_URL}/delete/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })
}

