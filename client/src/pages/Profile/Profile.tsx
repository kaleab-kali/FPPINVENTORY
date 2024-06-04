import React, { useState } from "react";
import {
  Layout,
  Card,
  Avatar,
  List,
  Button,
  Typography,
  Space,
  Badge,
  Modal,
  Form,
  Input,
  Tooltip,
  Divider,
} from "antd";
import {
  UserOutlined,
  PhoneOutlined,
  MailOutlined,
  EditOutlined,
  ClockCircleOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  CheckCircleOutlined,
  BellOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import "./Profile.css";
import { useProfile } from "../../services/queries/profileQueries";
import { useUpdateSelfPassword } from "../../services/mutations/staffMutation";
import { useEmployeeProfile } from "../../services/queries/employeeQueries";
import { useAuth } from "../../context/AuthContext";
const { Content } = Layout;
const { Text, Title } = Typography;

const profileData = {
  name: "John Doe",
  role: "Inventory Admin",
  location: "Addis Ababa, Ethiopia",
  email: "john.doe@inventory.com",
  phone: "+251 912 345 678",
  company: "Inventory Management Co.",
  social: {
    facebook: "https://facebook.com",
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
};

const messages = [
  {
    id: 1,
    sender: "Employee A",
    text: "Report submitted.",
    time: "15 min ago",
    status: "read",
  },
  {
    id: 2,
    sender: "Manager B",
    text: "Meeting at 3 PM.",
    time: "2 h ago",
    status: "unread",
  },
  {
    id: 3,
    sender: "Employee C",
    text: "Inventory updated.",
    time: "Yesterday",
    status: "read",
  },
  {
    id: 4,
    sender: "Employee D",
    text: "Request for approval.",
    time: "5 min ago",
    status: "unread",
  },
];

const activities = [
  {
    id: 1,
    date: "January 2nd, 04:35 AM",
    description: "Approved new inventory stock.",
  },
  {
    id: 2,
    date: "January 4th, 06:19 AM",
    description: "Reviewed monthly report.",
  },
  {
    id: 3,
    date: "January 5th, 12:34 AM",
    description: "Updated system settings.",
  },
];

const tasks = [
  { id: 1, task: "Check inventory levels", status: "completed" },
  { id: 2, task: "Review new orders", status: "pending" },
  { id: 3, task: "Update supplier information", status: "in-progress" },
];

const notifications = [
  { id: 1, notification: "New user registered", time: "10 min ago" },
  { id: 2, notification: "Inventory low alert", time: "1 h ago" },
  { id: 3, notification: "System maintenance scheduled", time: "3 h ago" },
];

const teamMembers = [
  { id: 1, name: "Alice Smith", role: "Stock Manager", status: "online" },
  {
    id: 2,
    name: "Bob Johnson",
    role: "Inventory Specialist",
    status: "offline",
  },
  { id: 3, name: "Carol White", role: "Logistics Coordinator", status: "away" },
];

// const statusMap: Record<
//   string,
//   "success" | "default" | "warning" | "processing" | "error"
// > = {
//   read: "default",
//   unread: "processing",
// };

const taskStatusMap: Record<string, "success" | "default" | "warning"> = {
  completed: "success",
  pending: "default",
  "in-progress": "warning",
};

const Profile: React.FC = () => {
  // const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const  {user} = useAuth()
  const staffProfile = useProfile()
  const employee = useEmployeeProfile(user?.employeeId||'');

  // const profile = staffProfile.data;

  const profile = user?.type === "invstaff" ? staffProfile.data : employee.data;
  console.log(employee.data);
  const updateSelfPassword = useUpdateSelfPassword() 
   const [isModalVisible, setIsModalVisible] = useState(false);

   const showModal = () => {
     setIsModalVisible(true);
   };

   const handleCancel = () => {
     setIsModalVisible(false);
   };

   const handleFinish = (values: any) => {
     console.log("Received values: ", values);
     // Handle the form submission logic here
     const updateValues = {...values, email: profile?.email}
     updateSelfPassword.mutate(updateValues)
     setIsModalVisible(false);
   };
  // const showModal = () => {
  //   form.setFieldsValue(profile); // Set form fields to current profile data
  //   setIsModalVisible(true);
  // };

  // const handleCancel = () => {
  //   setIsModalVisible(false);
  // };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // setProfile(values);
        setIsModalVisible(false);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <Layout className="layout">
      <Content className="content">
        <Space direction="vertical" size="large" style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Card
              className="profile-card"
              hoverable
              style={{ width: "70%" }}
              // extra={
              //   <Tooltip title="Edit Profile">
              //     <EditOutlined
              //       onClick={showModal}
              //       style={{ fontSize: "18px" }}
              //     />
              //   </Tooltip>
              // }
            >
              <Space size="large">
                <Avatar
                  size={130}
                  src={`http://localhost:7000/${profile?.photo}`}
                  // shape="square"
                />
                <div>
                  <Title level={4}>
                    {profile?.firstName + " " + profile?.lastName}
                  </Title>
                  <Text type="secondary">{profile?.role}</Text>
                  <br />
                  <Text type="secondary">{profile?.title}</Text>
                  <br />
                  <Space size="middle">
                    <Text>
                      <MailOutlined /> {profile?.email}
                    </Text>
                    <Text>
                      <PhoneOutlined />{" "}
                      {user?.type === "invstaff"
                        ? profile?.phoneNumber
                        : profile?.phoneNumber.prefix +
                          " " +
                          profile?.phoneNumber.number}
                    </Text>
                    <Text>{profile?.company}</Text>
                  </Space>
                </div>
              </Space>
            </Card>
            <Space size="small">
              <div className="current-plan">
                <Title level={4} style={{ color: "#9254de" }}>
                  <img
                    src="Waving Hand Medium Skin Tone.png"
                    alt="Waving Hand Medium Skin Tone"
                    width="25"
                    height="25"
                  />{" "}
                  Welcome {profile?.firstName}
                </Title>
                {user?.type === "invstaff" ? (
                  <>
                    <Text>Click Here to Change your Password</Text>
                    <br />
                    <br />

                    <Button type="primary" onClick={showModal}>
                      Change Password
                    </Button>
                  </>
                ) : (
                  <div style={{ display: "flex" }}>
                    <h3>{profile?.gender}</h3>
                    <Text>Gender</Text>
                    <h3>{profile?.empId}</h3>
                    <Text>ID</Text>
                  </div>
                )}
              </div>
              <Modal
                title="Change Password"
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={null}
              >
                <Form layout="vertical" onFinish={handleFinish}>
                  <Form.Item
                    name="currentPassword"
                    label="Current Password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your current password",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="newPassword"
                    label="New Password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your new password",
                      },
                      {
                        pattern:
                          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                        message:
                          "Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character",
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={["newPassword"]}
                    rules={[
                      {
                        required: true,
                        message: "Please confirm your new password",
                      },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (
                            !value ||
                            getFieldValue("newPassword") === value
                          ) {
                            return Promise.resolve();
                          }
                          return Promise.reject(
                            new Error("The two passwords do not match")
                          );
                        },
                      }),
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Change Password
                    </Button>
                  </Form.Item>
                </Form>
              </Modal>
            </Space>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Card
              title="Latest Messages"
              className="message-card"
              extra={<Button type="link">+</Button>}
              style={{ width: "30%" }}
            >
              <List
                itemLayout="horizontal"
                dataSource={messages}
                renderItem={(item) => (
                  <List.Item
                    className={
                      item.status === "unread"
                        ? "message-unread"
                        : "message-read"
                    }
                  >
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={<a href="#">{item.sender}</a>}
                      description={item.text}
                    />
                    <Text>{item.time}</Text>
                  </List.Item>
                )}
              />
            </Card>
            <Card
              title="Recent Activity"
              className="activity-card"
              style={{ width: "35%" }}
            >
              <List
                itemLayout="vertical"
                dataSource={activities}
                renderItem={(item) => (
                  <List.Item>
                    <ClockCircleOutlined style={{ color: "#9254de" }} />
                    <Text strong>{item.date}</Text>
                    <br />
                    <Text type="secondary">{item.description}</Text>
                  </List.Item>
                )}
              />
            </Card>
            <Card
              title="Tasks"
              className="tasks-card"
              extra={<Button type="link">+</Button>}
              style={{ width: "30%" }}
            >
              <List
                itemLayout="horizontal"
                dataSource={tasks}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta title={item.task} />
                    <Badge
                      status={taskStatusMap[item.status]}
                      text={item.status}
                    />
                  </List.Item>
                )}
              />
            </Card>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Card
              title="Notifications"
              className="notifications-card"
              extra={<Button type="link">+</Button>}
              style={{ width: "48%" }}
            >
              <List
                itemLayout="horizontal"
                dataSource={notifications}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta title={item.notification} />
                    <Text>{item.time}</Text>
                  </List.Item>
                )}
              />
            </Card>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <Card
              title="Team Members"
              className="team-card"
              extra={<Button type="link">+</Button>}
              style={{ width: "100%" }}
            >
              <List
                itemLayout="horizontal"
                dataSource={teamMembers}
                renderItem={(item) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={<Avatar icon={<UserOutlined />} />}
                      title={item.name}
                      description={item.role}
                    />
                    <Badge
                      status={
                        item.status === "online"
                          ? "success"
                          : item.status === "offline"
                          ? "default"
                          : "warning"
                      }
                    />
                  </List.Item>
                )}
              />
            </Card>
          </div>
        </Space>

        {/* <Modal
          title="Edit Profile"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form form={form} layout="vertical" initialValues={profile}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="role"
              label="Role"
              rules={[{ required: true, message: "Please input your role!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="location"
              label="Location"
              rules={[
                { required: true, message: "Please input your location!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="phone"
              label="Phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="company"
              label="Company"
              rules={[
                { required: true, message: "Please input your company!" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name={["social", "facebook"]} label="Facebook">
              <Input />
            </Form.Item>
            <Form.Item name={["social", "twitter"]} label="Twitter">
              <Input />
            </Form.Item>
            <Form.Item name={["social", "linkedin"]} label="LinkedIn">
              <Input />
            </Form.Item>
          </Form>
        </Modal> */}
      </Content>
    </Layout>
  );
};

export default Profile;
