import React from "react";
import { Layout, Row, Col,} from "antd";
import image from '../../assets/fpp.jpg'
const { Header: AntdHeader } = Layout;
// const { Search } = Input;

const Header: React.FC = () => {
  return (
    <AntdHeader
      style={{
        background: "white",
        zIndex: 1,
        position: "sticky",
        top: 0,
        width: "100%",
        display: "flex",
        border: "1px",
        borderBottomStyle: "solid",
        borderColor: "#F4F5FC",
      }}
    >
      <Row>
        <Col span={12} style={{ padding: "6px 2px" }}>
          <img
            src={image}
            alt="Company Logo"
            style={{ height: "50px", borderRadius: "50px" }}
          />
        </Col>
      </Row>
    </AntdHeader>
  );
};

export default Header;
