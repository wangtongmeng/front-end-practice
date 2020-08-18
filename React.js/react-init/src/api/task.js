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
  },
  addTask (task, time) {
    return axios.post('/addTask', {
      task,
      time
    })
  },
  removeTask (id) {
    return axios.get('/removeTask', {
      params: {
        id
      }
    })
  },
  completeTask (id) {
    return axios.get('/completeTask', {
      params: {
        id
      }
    })
  }
}