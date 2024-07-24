// 把所有的模块做统一处理
// 导出一个统一的方法 useStore
import React from "react"
import UserStore from "./user.Store"
import TicketStore from "./ticket.Store"
import ViewsStore from "./views.Store"

import { configure } from "mobx"
configure({
  enforceActions: "never",
})


class RootStore {
  constructor() {
    this.userStore = new UserStore()
    this.ticketStore = new TicketStore()
    this.viewsStore = new ViewsStore()
    // ...
  }
}

// 实例化根
// 导出useStore context
const rootStore = new RootStore()
const context = React.createContext(rootStore)

const useStore = () => React.useContext(context)

export { useStore }