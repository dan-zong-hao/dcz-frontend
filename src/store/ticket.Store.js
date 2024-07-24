import { makeAutoObservable } from 'mobx'
import { http } from '../utils'

class TicketStore {
  ticket = 0
  constructor() {
    makeAutoObservable(this)
  }
  getTicketInfo = async () => {
    // 调用接口获取数据
    const res = await http.get('/ticket')
    // console.log(res)
    this.ticket = res
  }
  updateTicket = () => {
    if( this.ticket > 0 ) {
      this.ticket--;
      return 1;
    } else {
      return 0;
    }
      
  }
}

export default TicketStore