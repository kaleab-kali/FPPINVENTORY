import React from "react";
import { Card, Typography, Statistic, Row, Col, Layout, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import CardComp from "../components/Stat/CardComp";
import ItemTable from "../components/InventoryProfile/Table";
import Recent from "../components/InventoryProfile/Recent";
import RecentInvoicesTable from "../components/Stat/Invocie";
import TopTakenItems from "../components/Stat/TopTakenItems";
import StockChart from "../components/Stat/StockChart";

const { Content } = Layout;

const { Text, Paragraph, Title } = Typography;

const Stat = () => {
  // Define the text content here
  const totalEmployees = 452;
  const newEmployeesText = "2 new employees added!";

  return (
    <>
      <CardComp />
      <Flex vertical={false} justify="space-around" style={{marginLeft:"20px", marginRight:"30px"}}>
        <Flex vertical>
          <h1 style={{ marginLeft: "20px" }}>Employee Structure</h1>
          <Flex vertical={false} align="center" justify="space-around">
            <div
              style={{
                backgroundColor: "white",
                marginRight: "10px",
                borderRadius: "30px",
              }}
            >
              <TopTakenItems />
            </div>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "30px",
              }}
            >
              <StockChart />
            </div>
          </Flex>
          <h1 style={{ marginLeft: "20px" }}>Recent In</h1>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "30px",
              marginTop: "10px",
              marginLeft: "5px",
              width: "850px",
            }}
          >
            <RecentInvoicesTable />
          </div>
          <h1 style={{ marginLeft: "20px" }}>Recent Out</h1>
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "30px",
              marginTop: "10px",
              marginLeft: "5px",
              width: "850px",
            }}
          >
            <RecentInvoicesTable />
          </div>
        </Flex>
        <div style={{ marginTop: "70px", marginLeft: "10px" }}>
          <Recent />
        </div>
      </Flex>
    </>
  );
};

export default Stat;
