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

const statusMap: Record<
  string,
  "success" | "default" | "warning" | "processing" | "error"
> = {
  read: "default",
  unread: "processing",
};

const taskStatusMap: Record<string, "success" | "default" | "warning"> = {
  completed: "success",
  pending: "default",
  "in-progress": "warning",
};

const Profile: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [profile, setProfile] = useState(profileData);

  const showModal = () => {
    form.setFieldsValue(profile); // Set form fields to current profile data
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        setProfile(values);
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
              justifyContent: "space-between",
            }}
          >
            <Card
              className="profile-card"
              hoverable
              style={{ width: "70%" }}
              extra={
                <Tooltip title="Edit Profile">
                  <EditOutlined
                    onClick={showModal}
                    style={{ fontSize: "18px" }}
                  />
                </Tooltip>
              }
            >
              <Space size="large">
                <Avatar size={64} icon={<UserOutlined />} />
                <div>
                  <Title level={4}>{profile.name}</Title>
                  <Text type="secondary">{profile.role}</Text>
                  <br />
                  <Text type="secondary">{profile.location}</Text>
                  <br />
                  <Space size="middle">
                    <Text>
                      <MailOutlined /> {profile.email}
                    </Text>
                    <Text>
                      <PhoneOutlined /> {profile.phone}
                    </Text>
                    <Text>{profile.company}</Text>
                  </Space>
                  <br />
                  <Space size="middle">
                    <a
                      href={profile.social.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FacebookOutlined
                        style={{ fontSize: "20px", color: "#3b5998" }}
                      />
                    </a>
                    <a
                      href={profile.social.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <TwitterOutlined
                        style={{ fontSize: "20px", color: "#1DA1F2" }}
                      />
                    </a>
                    <a
                      href={profile.social.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LinkedinOutlined
                        style={{ fontSize: "20px", color: "#0077b5" }}
                      />
                    </a>
                  </Space>
                </div>
              </Space>
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
              title="Latest Messages"
              className="message-card"
              extra={<Button type="link">+</Button>}
              style={{ width: "48%" }}
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
              style={{ width: "48%" }}
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
              style={{ width: "48%" }}
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

        <Modal
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
        </Modal>
      </Content>
    </Layout>
  );
};

export default Profile;
