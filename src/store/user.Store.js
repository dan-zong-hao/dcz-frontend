import { makeAutoObservable } from 'mobx'
import { http } from '../utils'

class UserStore {
  userInfo = ""
  constructor() {
    makeAutoObservable(this)
  }
  getUserInfo = async () => {
    // 调用接口获取数据
    const res = await http.get('/secret')
    // console.log(res)
    this.userInfo = res
  }
}

export default UserStore