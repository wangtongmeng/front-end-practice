import axios from './axios'
export default {
  getTaskList (state = 0) {
    return axios.get('/getTaskList', {
      params: {
        limit: 100,
        page: 1,
        state
      }
    })
  }
}