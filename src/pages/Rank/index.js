import { Bar } from "@ant-design/plots";
import { Spin } from "antd";
import { SocketRankServer } from "../../utils/socket";
import { useEffect, useState, useRef } from "react";
// import projectList_1 from "https://danzonghao.oss-accelerate.aliyuncs.com/dcz-static/project_1.js";
import projectList_1 from "../../../src/assets/project_1.js";
// const projectList_1 = require("https://danzonghao.oss-accelerate.aliyuncs.com/dcz-static/project_1.js")

const DemoBar = () => {
  const [rank, setRank] = useState([{ project_id: "null", ticket: 0 }]);
  const [config, setConfig] = useState({
    data: rank,
    xField: "ticket",
    yField: "project_id",
    seriesField: "project_id",
    legend: {
      position: "top-left",
    },
    height: 800,
  });
  const [loading, setLoading] = useState(true);
  const currentDataRef = useRef([]);

  useEffect(() => {
    const handleServerResponse = (res) => {
      const responseSize = new Blob([JSON.stringify(res)]).size;
      console.log(`Received response of size: ${responseSize} bytes`);

      const newRank = res.data.slice(0, 10).map((item) => ({
        project_id: projectList_1[item[0]] || "Unknown", // Assuming item[0] is project_id, replace with correct mapping
        ticket: item[1],
      }));

      // Check if new data is different from current data
      const isDifferent =
        JSON.stringify(newRank) !== JSON.stringify(currentDataRef.current);
      if (isDifferent) {
        currentDataRef.current = newRank;
        setLoading(false);
        setRank(newRank);
        setConfig((prevConfig) => ({
          ...prevConfig,
          data: newRank,
          yAxis: {
            label: {
              formatter: (value) => {
                // 如果标签值的长度超过5个字符，则在末尾添加省略号
                if (String(value).length > 7) {
                  return String(value).substring(0, 7) + "...";
                }
                return value;
              },
            },
          },
          seriesField: "project_id",
          legend: {
            position: "top-left",
          },
        }));
      }
    };

    // 添加事件监听器
    SocketRankServer.on("server_response", handleServerResponse);

    // 在组件卸载时清除事件监听器
    return () => {
      SocketRankServer.off("server_response", handleServerResponse);
    };
  }, [rank]);
  // console.log(config)

  return (
    <>
      <h1 style={{ fontSize: 20 }}>十大最受欢迎项目</h1>
      <Spin
        className="Spin"
        spinning={loading}
        size="large"
        style={{ height: 800 }}
      >
        <Bar {...config} />
      </Spin>
    </>
  );
};

export default DemoBar;
