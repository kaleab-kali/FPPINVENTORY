import React from 'react'
import { Input} from "antd";
import { Button, Flex } from "antd";
import { IoIosAddCircleOutline } from "react-icons/io";
import { Table } from "antd";
import { IoSearch } from "react-icons/io5";
import "./css.css"

interface DataType {
  key: React.Key;
  name: string;
  code: string;
  type: string;
  price: number;
  quantity: number;
  image: string;
}

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Code",
    dataIndex: "code",
    key: "code",
  },
  {
    title: "Type",
    dataIndex: "type",
    key: "type",
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image: string) => (
      <img
        src={image}
        alt="product"
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
];

const data: DataType[] = [
  {
    key: "1",
    name: "Product 1",
    code: "P001",
    type: "Type A",
    price: 10.99,
    quantity: 20,
    image:
      "https://media.istockphoto.com/id/1546442230/photo/front-view-skin-care-products-on-wooden-decorative-piece.webp?b=1&s=170667a&w=0&k=20&c=ODFMGn1FLGl-xXAqS-GDEUBmhnqTD9PZ85yhhD2fDnE=",
  },
  {
    key: "2",
    name: "Product 2",
    code: "P002",
    type: "Type B",
    price: 15.99,
    quantity: 15,
    image:
      "https://media.istockphoto.com/id/1495664030/photo/sneakers-on-dark-gray-concrete-background-texture-of-the-old-dark-stone-or-broken-brick-the.webp?b=1&s=170667a&w=0&k=20&c=X6_aRYTqlF8VA_apfu6fTmCS6PRmAhFQOUD81eXyDQk=",
  },
  {
    key: "3",
    name: "Product 3",
    code: "P003",
    type: "Type C",
    price: 20.99,
    quantity: 25,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    key: "1",
    name: "Product 1",
    code: "P001",
    type: "Type A",
    price: 10.99,
    quantity: 20,
    image:
      "https://media.istockphoto.com/id/1546442230/photo/front-view-skin-care-products-on-wooden-decorative-piece.webp?b=1&s=170667a&w=0&k=20&c=ODFMGn1FLGl-xXAqS-GDEUBmhnqTD9PZ85yhhD2fDnE=",
  },
  {
    key: "2",
    name: "Product 2",
    code: "P002",
    type: "Type B",
    price: 15.99,
    quantity: 15,
    image:
      "https://media.istockphoto.com/id/1495664030/photo/sneakers-on-dark-gray-concrete-background-texture-of-the-old-dark-stone-or-broken-brick-the.webp?b=1&s=170667a&w=0&k=20&c=X6_aRYTqlF8VA_apfu6fTmCS6PRmAhFQOUD81eXyDQk=",
  },
  {
    key: "3",
    name: "Product 3",
    code: "P003",
    type: "Type C",
    price: 20.99,
    quantity: 25,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D",
  },
];
const rowSelection = {
  onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record: DataType) => ({
    disabled: record.name === "Disabled User", // Column configuration not to be checked
    name: record.name,
  }),
};

const ItemTable = () => {
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
