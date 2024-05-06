import React from "react";
import { Card, Typography,Statistic,Row,Col,Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Content } = Layout;

const { Text, Paragraph, Title } = Typography;

const Stat = () => {
  // Define the text content here
  const totalEmployees = 452;
  const newEmployeesText = "2 new employees added!";

  return (
    <>
    <Title
      level={4}
      style={{ padding: "10px 30px", marginBottom: "0", marginTop: 15 }}
    >
      Employee Statistics
    </Title>
    <Layout>
      <Content>
        <div
          className="site-layout-background"
          style={{ padding: "0 24px", minHeight: 360 }}
        >
          <Row gutter={{ xs: 16, sm: 32, md: 64, lg: 200 }}>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card bordered={false} style={{ width: 200, marginBottom:"20px" }}>
                <Statistic
                  title="Employee"
                  value={2000}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card bordered={false} style={{ width: 200, marginBottom:"20px" }}>
                <Statistic
                  title="Active Employee"
                  value={1500}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card bordered={false} style={{ width: 200, marginBottom:"20px" }}>
                <Statistic
                  title="On Leave"
                  value={56}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card bordered={false} style={{ width: 200, marginBottom:"20px" }}>
                <Statistic
                  title="Shift Employee"
                  value={240}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={8} lg={4}>
              <Card bordered={false} style={{ width: 200, marginBottom:"20px" }}>
                <Statistic
                  title="Retired"
                  value={100}
                  valueStyle={{ color: "#3f8600" }}
                  prefix={<UserOutlined />}
                />
              </Card>
            </Col>
          </Row>
          {/* <Row  gutter={16}>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Card bordered={false}>
                <Column {...columnConfig} />
              </Card>
            </Col>
            <Col xs={24} sm={24} md={12} lg={12}>
              <Card bordered={false}>
                <Pie {...pieConfig} />
              </Card>
            </Col>
          </Row> */}
        </div>
      </Content>
    </Layout>
  </>
  );
};

export default Stat;
