import React from 'react'
import Table from '../../components/InventoryProfile/Table'
import Recent from '../../components/InventoryProfile/Recent'
import { Col, Row } from "antd";
const InventoryProfilePage = () => {
  return (
    <div>
      <Row>
        <Col flex={3}>
          <Table />
        </Col>
        <Col flex={2}>
          <Recent />
        </Col>
      </Row>
    </div>
  );
}

export default InventoryProfilePage