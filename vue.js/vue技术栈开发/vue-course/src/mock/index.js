import Mock from 'mockjs'
import { getUserInfo } from './response/user'
import { getFileList, getFolderList } from './response/data'

const Random = Mock.Random

Mock.mock(/\/getUserInfo/, getUserInfo)
Mock.mock(/\/getFileList/, 'get', getFileList)
Mock.mock(/\/getFolderList/, 'get', getFolderList)

Mock.setup({
  timeout: 0 // 响应时间
})

Random.extend({
  fruit () {
    const fruit = ['apple', 'peach', 'lemon']
    return this.pick(fruit)
  }
})

export default Mock