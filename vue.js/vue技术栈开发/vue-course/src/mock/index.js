import Mock from 'mockjs'
import { getUserInfo } from './response/user'

Mock.mock(/\/getUserInfo/, {name: 'lison'})

export default Mock