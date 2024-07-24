// 先把所有的工具函数导出的模块在这里导入
// 然后再统一导出
import { http } from './http'
import {
  setToken,
  getToken,
  removeToken,
  setprojectList,
  getprojectList
} from './token'

import { history } from './history'

export {
  http,
  setToken,
  getToken,
  removeToken,
  setprojectList,
  getprojectList,
  history
}

// import {http} from '@/utils'