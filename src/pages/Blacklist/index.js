import React from "react";
import { Avatar, List, Result } from "antd";
import blacklist from "../../assets/blacklist";

const Blacklist = () => {
  return (
    <>
      <Result
        status="warning"
        title="公示有违规操作的用户，已经停止他们登录本系统，请各位用户引以为戒！"
      />
      <List
            itemLayout="horizontal"
            dataSource={blacklist}
            bordered
            style={{color:"red"}}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src="https://danzonghao.oss-cn-beijing.aliyuncs.com/pic/avatar.png" />}
                  title={'学号：'+ item.username}
                  description={item.description}
                />
              </List.Item>
            )}
          />
    </>
  );
};

export default Blacklist;
