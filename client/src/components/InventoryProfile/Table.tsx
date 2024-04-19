import React, { useEffect, useState } from 'react'
import { Input} from "antd";
import { Button, Flex } from "antd";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Table } from "antd";
import { IoSearch } from "react-icons/io5";
// import { Input, Button, Flex, Table } from "antd";
import { useNavigate } from "react-router-dom";
import {
  useAllItems,
  useItems,
  useItemIds
} from "../../services/queries/inventoryqueries";
import "./css.css"

interface DataType {
  key: React.Key;
  name: string;
  code: string;
  type: string;
  price: number;
  quantity: number;
  photo: string;
}




const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === "Disabled User", 
    name: record.name,
  }),
};

const ItemTable = () => {
  // const itemIdQuery = useItemIds();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleClick = () => {
    // Navigate to the registration page
    navigate("/inventory/registration");
  };
  const itemQueries = useAllItems();
  const [data, setData] = useState<DataType[]>(itemQueries.data || []);
  useEffect(() => {
    if (itemQueries.data) {
      setData(itemQueries.data);
    }
  }, [itemQueries.data]);
  const handleSearch = (value: string) => {
    const filteredData = itemQueries.data?.filter(
      (item: { name: string; }) =>
        item.name && item.name.toLowerCase().includes(value.toLowerCase())
    );
    setData(filteredData || []);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    // {
    //   title: "Code",
    //   dataIndex: "code",
    //   key: "code",
    // },
    // {
    //   title: "Type",
    //   dataIndex: "type",
    //   key: "type",
    // },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Category",
      dataIndex: "categoryId",
      key: "categoryId",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Image",
      dataIndex: "photo",
      key: "photo",
      render: (photo: string) => (
        <img
          src={`http://localhost:7000/uploads/${photo}`}
          alt="product"
          style={{ width: "50px", height: "50px" }}
        />
      ),
    },
  ];
  return (
    <div>
      <div style={{ backgroundColor: "#F4F5FC" }}>
        <Flex
          gap="large"
          align="center"
          justify="space-around"
          vertical={false}
          style={{ marginTop: "10px", marginBottom: "10px" }}
        >
          <h2>Inventory</h2>
          <div style={{ width: "350px" }}>
            <Input
              placeholder="Search Item"
              allowClear
              style={{ border: "2px solid transparent" }}
              prefix={<IoSearch />}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <Button
            type="primary"
            shape="round"
            icon={<IoIosAddCircleOutline size={20} />}
            size="large"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            onClick={handleClick}
          >
            Add New Item
          </Button>
        </Flex>
      </div>
      <div>
        <Table
          title={() => (
            <div style={{ fontSize: "24px", fontWeight: "bold" }}>
              Product List
            </div>
          )}
          rowSelection={{
            type: "checkbox",
            ...rowSelection,
          }}
          columns={columns}
          dataSource={data}
          rowClassName={() => "custom-row"}
        />
      </div>
    </div>
  );
}

export default ItemTable
