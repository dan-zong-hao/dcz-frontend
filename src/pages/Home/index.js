import "./index.scss";
import { EllipsisOutlined, setTwoToneColor } from "@ant-design/icons";
import { LikeTwoTone, LikeOutlined, SmileOutlined } from "@ant-design/icons";
import {
  Avatar,
  Col,
  Row,
  Drawer,
  Card,
  Descriptions,
  Image,
  message,
  Badge,
  Modal,
  Alert,
  Input,
} from "antd";
import { React, createElement } from "react";
import { useState, useEffect } from "react";
// import projectListDefault from "https://danzonghao.oss-cn-beijing.aliyuncs.com/dcz-static/project.js";
import projectListDefault from "../../../src/assets/project.js";
import axios from "axios";
import { http } from "../../utils";
import { useStore } from "../../store";
import Marquee from "react-fast-marquee";
import LazyLoad from "react-lazyload";

const { Search } = Input;
const { Meta } = Card;
const { confirm } = Modal;
setTwoToneColor("#ff5353");

const Home = () => {
  const [messageApi, contextHolder] = message.useMessage();

  const { ticketStore } = useStore();

  const { viewsStore } = useStore({});

  const [score, setScore] = useState({}); //这里score是一个数组

  const [likes, setLikes] = useState([]); //这里likes是一个数组

  const [projectList, setProjectList] = useState(projectListDefault);

  // 获取文章列表
  useEffect(() => {
    const getScore = async () => {
      const res = await http.get("/score");
      // console.log(res)
      setScore(res);
    };
    const getLikes = async () => {
      const res = await http.get("/user_likes");
      // console.log(res)
      setLikes(res);
    };
    viewsStore.getViewsInfo();
    getScore();
    getLikes();
  }, [viewsStore]);

  //这里需要获取一个票数score[]和一个特定每个用户对各个项目是否赞过的表likes[]
  //需要获取两张表

  const [open, setOpen] = useState(false);

  const openNotification = async (project_id) => {
    //前端的点赞数自动加1
    // 操作likes  控制点赞的状态
    let copy_likes = Object.assign([], likes);
    copy_likes.push(project_id);
    setLikes(copy_likes);
    // 操作score   控制票数的状态
    //这里需要深拷贝
    let copy_score = Object.assign({}, score);
    copy_score[project_id] = copy_score[project_id] + 1;
    setScore(copy_score);
    //还要改变store的状态
    ticketStore.updateTicket();
    //向后端发请求
    axios
      .get("/api/vote", {
        params: {
          // 这里的参数设置为URL参数（根据URL携带参数）
          id: project_id,
        },
      })
      .then(function (response) {
        // console.log(response.data);
        messageApi.open({
          type: "success",
          content: response.data.message,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const showConfirm = (project_id) => {
    confirm({
      title: "您要投出宝贵的一票吗? 投票后不能撤回",
      icon: <SmileOutlined style={{ color: "red" }} />,
      okText: "是",
      cancelText: "再想想",
      onOk() {
        // console.log(project_id)
        openNotification(project_id);
      },
      onCancel() {},
    });
  };

  const like = (project_id) => {
    setOpen(false);
    // console.log(project_id)
    if (likes.includes(project_id) === true && ticketStore.ticket > 0) {
      messageApi.open({
        type: "warning",
        content: "请勿重复投票！！！",
      });
    } else if (ticketStore.ticket <= 0) {
      messageApi.open({
        type: "warning",
        content: "票已经用完啦！！！",
      });
    } else {
      showConfirm(project_id);
    }
  };

  //关闭投票系统
  const closeSystem = () => {
    setOpen(false);
    // console.log(project_id)
    messageApi.open({
      type: "warning",
      content: "投票已经截止！！！",
      // content: "投票系统还未开启！！！",
    });
  };

  const [drawerTitle, setdrawerTitle] = useState("");
  const [leader, setleader] = useState("");
  const [teacher, setteacher] = useState("");
  const [intro, setintro] = useState("");
  const [member, setmember] = useState("");
  const [Innovation, setInnovation] = useState("");
  const [image1, setimage1] = useState("");

  const showDrawer = async (index) => {
    setOpen(true);
    setdrawerTitle(projectList[index][1]);
    setleader(projectList[index][3]);
    setmember(projectList[index][2]);
    setteacher(projectList[index][4]);
    setintro(projectList[index][5]);
    setInnovation(projectList[index][8]);
    setimage1(
      `https://danzonghao.oss-cn-beijing.aliyuncs.com/dcztp/${projectList[index][0]}poster.jpg`
    );
    // 这里更新views的值
    viewsStore.updateViews(projectList[index][0]);
    axios
      .get("/api/update_views", {
        params: {
          // 这里的参数设置为URL参数（根据URL携带参数）
          id: projectList[index][0],
        },
      })
      .then(function (response) {
        // console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const onClose = () => {
    setOpen(false);
  };

  // const pagination = (page, pageSize, array) => {
  //   var offset = (page - 1) * pageSize;
  //   return offset + pageSize >= array.length
  //     ? array.slice(offset, array.length)
  //     : array.slice(offset, offset + pageSize);
  // };

  const [visible, setVisible] = useState(false);
  const color = {
    文化创意: "cyan",
    空天科技: "green",
    数字教育: "purple",
    智慧生活: "volcano",
    大模型: "magenta",
    医疗健康: "pink",
    网络通信: "red",
    乡村振兴: "blue",
    未来城市: "yello",
    数字媒体: "black",
    "工业4.0": "gray",
    机器人: "orange",
  };

  // const menuitems = [
  //   {
  //     label: 'Navigation One',
  //     key: 'mail',
  //   },
  //   {
  //     label: 'Navigation Two',
  //     key: 'app',
  //     disabled: true,
  //   },
  //   {
  //     label: 'Navigation Three - Submenu',
  //     key: 'SubMenu',
  //   },

  // ];
  const onSearch = (value, _e, info) => {
    if (!value) {
      setProjectList(projectListDefault);
    } else {
      setProjectList(
        projectListDefault.filter((project) => {
          // 检查项目编号、项目名称、指导老师等所有信息是否包含搜索关键词
          return Object.values(project).some((value1) =>
            value1.toLowerCase().includes(value.toLowerCase())
          );
        })
      );
    }
  };

  return (
    <>
      {contextHolder}
      <Alert
        className="Alert"
        closable
        banner
        message={
          <Marquee pauseOnHover gradient={false} style={{ color: "red" }}>
            请各位用户不要试图刷票！！！工作人员会根据后台数据分析异常用户，将其加入黑名单并在小黑屋公示！！！
            {/* 本系统已经停止投票，仅用于项目展示，十大最受欢迎项目最终结果以投票统计页面为准 */}
          </Marquee>
        }
      />

      <Row gutter={[10, 30]}>
        <Search
          placeholder="支持项目名称、指导老师、项目成员等所有信息模糊匹配"
          onSearch={onSearch}
          enterButton
        />
        {projectList.map((project, index) => {
          // console.log(project, index);
          return (
            <Col
              className="gutter-row"
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={8}
              xxl={6}
              key={index}
            >
              <Badge.Ribbon
                text={`${project[6]}`}
                color={color[project[6]]}
                placement="start"
              >
                {/* <LazyLoad height={100} once> */}
                <Card
                  xs={{ width: "350px" }}
                  cover={
                    <img
                      src={`https://danzonghao.oss-cn-beijing.aliyuncs.com/dcztp/${project[0]}.jpg`}
                      alt="Project Cover"
                    />
                  }
                  actions={[
                    <span
                      className="changeButtonColor"
                      // onClick={() => like(project[0])}
                      onClick={closeSystem}
                    >
                      {createElement(
                        likes.includes(project[0]) ? LikeTwoTone : LikeOutlined
                      )}
                      {/* <span className="comment-action">{score[index]}</span> */}
                      <span
                        style={
                          likes.includes(project[0]) ? { color: "#ff5353" } : {}
                        }
                      >
                        {score[project[0]]}
                      </span>
                    </span>,

                    <EllipsisOutlined
                      key="ellipsis"
                      onClick={() => showDrawer(index)}
                    />,
                  ]}
                  // onClick={() => showDrawer(index)}
                  key={index}
                >
                  <Meta
                    className="meta-description"
                    avatar={
                      <Avatar
                        src={`https://danzonghao.oss-cn-beijing.aliyuncs.com/dcztp/${project[0]}.jpg`}
                      />
                    }
                    title={project[1]}
                    description={project[7] ? project[7] : "暂无"}
                  />
                </Card>
                {/* </LazyLoad> */}
              </Badge.Ribbon>
            </Col>
          );
        })}
      </Row>
      <Drawer
        title={drawerTitle}
        placement="right"
        onClose={onClose}
        visible={open}
      >
        <Image
          preview={{
            visible: false,
          }}
          width={325}
          src={image1}
          onClick={() => setVisible(true)}
        />
        <div
          style={{
            display: "none",
          }}
        >
          <Image.PreviewGroup
            preview={{
              visible,
              onVisibleChange: (vis) => setVisible(vis),
            }}
          >
            <Image src={image1} />
          </Image.PreviewGroup>
        </div>
        <Descriptions size="small" column={1}>
          <Descriptions.Item label="项目负责人">{leader}</Descriptions.Item>
          <Descriptions.Item label="项目组成员">{member}</Descriptions.Item>
          <Descriptions.Item label="指导老师">{teacher}</Descriptions.Item>
          <Descriptions.Item label="项目简介">{intro}</Descriptions.Item>
          <Descriptions.Item label="创新点">{Innovation}</Descriptions.Item>
        </Descriptions>
      </Drawer>
      {/* <Pagination
        onChange={onPageChange}
        defaultCurrent={1}
        total={50}
        style={{ marginTop: 30 }}
      /> */}
    </>
  );
};

export default Home;
