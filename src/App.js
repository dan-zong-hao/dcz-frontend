import {
  unstable_HistoryRouter as HistoryRouter,
  Routes,
  Route,
} from "react-router-dom";
import { history } from "./utils";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./App.css";
// import { AuthComponent } from '@/components/AuthComponent'
import { lazy, Suspense } from "react";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
// 按需导入组件
// const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import("./pages/Layout"));
const Home = lazy(() => import("./pages/Home"));
const Rank = lazy(() => import("./pages/Rank"));
const Blacklist = lazy(() => import("./pages/Blacklist"));
const NotFound = lazy(() => import("./pages/NotFound"));
// const Publish = lazy(() => import('./pages/Publish'))

function App() {
  return (
    // 路由配置

    <HistoryRouter history={history}>
      <div className="App">
        <Suspense
          fallback={
            <div
              style={{
                textAlign: "center",
                marginTop: 200,
              }}
            >
              <Spin indicator={antIcon} />
              {/* 校外用户请使用globalprotect或者aTrust登入校园网进行使用 */}
            </div>
          }
        >
          <Routes>
            {/* 创建路由path和组件对应关系 */}
            {/* Layout需要鉴权处理的 */}
            {/* 这里的Layout不一定不能写死 要根据是否登录进行判断 */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />}></Route>
              {/* <Route path='article' element={<Article />}></Route> */}
              <Route path="rank" element={<Rank />}></Route>
              <Route path="blacklist" element={<Blacklist />}></Route>
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* <Route path='/login' element={<Login />}></Route> */}
          </Routes>
        </Suspense>
      </div>
    </HistoryRouter>
  );
}

export default App;
