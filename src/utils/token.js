// 封装ls存取token

const key = 'pc-key'
const key2 = 'projectList'

const setToken = (token) => {
  return window.localStorage.setItem(key, token)
}

const getToken = () => {
  return window.localStorage.getItem(key)
}

const removeToken = () => {
  return window.localStorage.removeItem(key)
}

const setprojectList = (projectList) => {
  return window.localStorage.setItem(key2, projectList)
}

const getprojectList = () => {
  return window.localStorage.getItem(key2)
}

export {
  setToken,
  getToken,
  removeToken,
  setprojectList,
  getprojectList
}