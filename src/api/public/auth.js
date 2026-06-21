import { apiCall, axios } from '..'

export const login = async ({ username, password }) => {
  return apiCall(() =>
    axios.post('/users/login', { username, password }),
  )
}
