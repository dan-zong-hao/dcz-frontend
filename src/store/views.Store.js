import { makeAutoObservable } from 'mobx'
import { http } from '../utils'

class ViewsStore {
  views = {}
  constructor() {
    makeAutoObservable(this)
  }
  getViewsInfo = async () => {
    // 调用接口获取数据
    const res = await http.get('/views')
    // console.log(res)
    this.views = res
  }
  updateViews = (project_id) => {
    this.views[project_id]++;
  }
}

export default ViewsStore