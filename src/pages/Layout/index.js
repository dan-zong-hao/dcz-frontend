import { Badge, Layout, Menu, Popconfirm, Avatar, Tag } from "antd";
import { Outlet, Link, useLocation } from "react-router-dom";
import { observer } from "mobx-react-lite";
import React, { useState } from 'react';
import {
  HomeOutlined,
  DiffOutlined,
  LogoutOutlined,
  StopOutlined
} from "@ant-design/icons";
import "./index.scss";
import axios from "axios";
import { useStore } from "../../store";
import { useEffect } from "react";

const { Header, Sider } = Layout;

const GeekLayout = () => {
  const { pathname } = useLocation();
  const { userStore } = useStore();
  const { ticketStore } = useStore()
  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    userStore.getUserInfo();
    ticketStore.getTicketInfo();
  }, [userStore, ticketStore]);

  // 确定退出
  const onConfirm = () => {
    axios
      .get("/api/logout")
      .then(response => {
        console.log(response)
        if(response.status === 200) {
          const redirectUrl = response.data;
          window.location.href = redirectUrl;
        } else {
          console.log(response)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
      // window.location.reload(true)
    
  };


  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <Tag color="purple">您的票数还剩 <strong>{ticketStore.ticket}</strong> 票</Tag>
          <Badge count={ticketStore.ticket}>
            <Avatar shape="square" size="large" src="https://danzonghao.oss-cn-beijing.aliyuncs.com/pic/avatar.png" />
          </Badge>
          <span className="user-name"> {userStore.userInfo}</span>
          <span className="user-logout">
            <Popconfirm
              onConfirm={onConfirm}
              title="是否确认退出？"
              okText="退出"
              cancelText="取消"
            >
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background" collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          {/* 高亮原理：defaultSelectedKeys === item key */}
          {/* 获取当前激活的path路径？ */}
          {/* 
             defaultSelectedKeys: 初始化渲染的时候生效一次
             selectedKeys: 每次有值更新时都会重新渲染视图
          */}
          <Menu
            mode="inline"
            theme="dark"
            defaultSelectedKeys={pathname}
            selectedKeys={pathname}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item icon={<HomeOutlined />} key="/">
              <Link to="/">项目概览</Link>
            </Menu.Item>
            <Menu.Item icon={<DiffOutlined />} key="/rank">
              <Link to="/rank">投票统计</Link>
            </Menu.Item>
            <Menu.Item icon={<StopOutlined />} key="/blacklist">
              <Link to="/blacklist">小黑屋</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由出口 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  );
};

export default observer(GeekLayout);
