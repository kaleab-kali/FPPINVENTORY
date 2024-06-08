import React from "react";
import { Card, Col, Flex, Row } from "antd";
import {
  UserOutlined,
  TeamOutlined,
  UserDeleteOutlined,
  ClockCircleOutlined,
  CaretDownOutlined,
  CaretUpOutlined,
} from "@ant-design/icons";
// import { HiOutlineUserGroup } from "react-icons/hi";
// import { LuUngroup } from "react-icons/lu";

// Dummy data (replace with actual data)
const dummyData = {
  totalWorkForce: 1000,
  presentWorkForce: 800,
  absentWorkForce: 200,
  lateArrivals: 50,
  lastUpdated: new Date(),
  workforceChange: 5,
  workforceChange2: -5,
  // Example: 5% decrease
};

const CardComp: React.FC = () => {
  const {
    totalWorkForce,
    presentWorkForce,
    absentWorkForce,
    lateArrivals,
    lastUpdated,
    workforceChange,
    workforceChange2,
  } = dummyData;

  const renderPercentageChange = (change: number): string => {
    const sign = change > 0 ? "+" : "";
    return `${sign}${change}%`;
  };

  const cardStyle = {
    background: "lightblue",
    color: "blue",
    padding: "7px",
    borderRadius: "30%",
  };

  return (
    <div style={{marginTop:"30px", marginLeft:"30px", marginRight:"30px"}}>
      <Row gutter={16}>
        <Col span={6}>
          <Card
            title={
              <>
                <TeamOutlined style={cardStyle} /> Total Items
              </>
            }
            bordered={false}
            headStyle={{ border: "none" }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: "-20px" }}
            >
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {totalWorkForce}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "red",
                  backgroundColor: "#FFC6C8",
                  borderRadius: "20%",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                <CaretDownOutlined />
                {renderPercentageChange(workforceChange2)}
              </div>
            </Flex>

            <div style={{ fontSize: "12px", color: "lightgray" }}>
              Update: {lastUpdated.toLocaleString()}
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={
              <>
                <UserOutlined style={cardStyle} /> Returned Items
              </>
            }
            bordered={false}
            headStyle={{ border: "none" }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: "-20px" }}
            >
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {presentWorkForce}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "green",
                  backgroundColor: "lightgreen",
                  borderRadius: "20%",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                <CaretUpOutlined />
                {renderPercentageChange(workforceChange)}
              </div>
            </Flex>

            <div style={{ fontSize: "12px", color: "lightgray" }}>
              Update: {lastUpdated.toLocaleString()}
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={
              <>
                <UserDeleteOutlined style={cardStyle} /> Items On Loan
              </>
            }
            bordered={false}
            headStyle={{ border: "none" }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: "-20px" }}
            >
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {absentWorkForce}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "green",
                  backgroundColor: "lightgreen",
                  borderRadius: "20%",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                <CaretUpOutlined />
                {renderPercentageChange(workforceChange)}
              </div>
            </Flex>

            <div style={{ fontSize: "12px", color: "lightgray" }}>
              Update: {lastUpdated.toLocaleString()}
            </div>
          </Card>
        </Col>
        <Col span={6}>
          <Card
            title={
              <>
                <ClockCircleOutlined style={cardStyle} /> Items Given
              </>
            }
            bordered={false}
            headStyle={{ border: "none" }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ marginTop: "-20px" }}
            >
              <div
                style={{
                  fontSize: "30px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}
              >
                {lateArrivals}
              </div>
              <div
                style={{
                  fontSize: "14px",
                  color: "red",
                  backgroundColor: "#FFC6C8",
                  borderRadius: "20%",
                  paddingRight: "10px",
                  paddingLeft: "10px",
                }}
              >
                <CaretDownOutlined />
                {renderPercentageChange(workforceChange2)}
              </div>
            </Flex>
            <div style={{ fontSize: "12px", color: "lightgray" }}>
              Update: {lastUpdated.toLocaleString()}
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default CardComp;
