import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";
import { ProductInfo } from "../../../../shared/types/Product";
import { useAllProducts } from "../../services/queries/productQueries";
import { useNavigate } from 'react-router-dom';
import exp from "constants";
import { useAuth } from "../../context/AuthContext";
import { ColumnsType } from "antd/es/table";

const ListTable: React.FC = () => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const {user} = useAuth()
  const allProductsQuery = useAllProducts();

  const Source = allProductsQuery.data
    ? allProductsQuery.data.map(
        (queryResult: ProductInfo) => {
          return {
            key: queryResult.productID,
            productID: queryResult.productID,
            name: queryResult.name,
            model: queryResult.models,
            brand: queryResult.brand,
            suppliername: queryResult.supplier,
            catagory: queryResult.category,
            unit: queryResult.unit,
            quantity: queryResult.quantity,
            price: queryResult.unitPrice,
            manufactureDate: queryResult.manufactureDate,
            expirationDate: queryResult.expirationDate,
            returnable: queryResult.returnable,
            discription: queryResult.discription,
            purchaseDate: queryResult.purchaseDate,   
          };
        }
      )
    : [];

  console.log("Source:", Source);
  const filteredData = Source.filter((entry: { name: string; }) =>
    entry.name?.toLowerCase().includes(searchValue.toLowerCase())
  );



  const handleSearch = (value: string) => {
    setSearchValue(value);
  
  };

  const handleDelete = (key: string) => {
    
    // setDataSource(filteredDataSource);
  };

  const columns:ColumnsType = [
    {
        title: "PID",
        dataIndex: "productID",
        key: "productID",
      },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Supplier Name",
      dataIndex: "suppliername",
      key: "suppliername"
    },
    {
      title: "Catagory",
      dataIndex: "catagory",
      key: "catagory",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    
    // {
    //   title: "Action",
    //   key: "action",
    //   render: (text: string, record: any) => (
    //     <Space size="middle">
    //       <Button type="primary" onClick={() => handleEdit(record)}>Edit</Button>
    //       <Popconfirm
    //         title="Are you sure to delete this row?"
    //         onConfirm={() => handleDelete(record.key)}
    //         okText="Yes"
    //         cancelText="No"
    //       >
    //         <Button type="dashed">Delete</Button>
    //       </Popconfirm>
    //     </Space>
    //   ),
    // },
  ];
  if (user?.role === "invmanager") {
    columns.push({
      title: "Action",
      key: "action",
      render: (text: string, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this row?"
            onConfirm={() => handleDelete(record.key)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed">Delete</Button>
          </Popconfirm>
        </Space>
      ),
    });
  }

  const handleEdit = (record: ProductInfo) => {
    console.log("Edit clicked for row with key:", record);
    
    console.log("Source:", Source);

    const productToEdit = Source.find((product:any) => product.productID === record.productID);
    console.log("Product to edit:", productToEdit);
    
    navigate("/product/registration", { state: { product: productToEdit } });
  };

  return (
    <>
      <Input
        style={{ marginBottom: 10 , float: "right", width: 200}}
        placeholder="Search Name"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table columns={columns} dataSource={filteredData} />
    </>
  );
};

export default ListTable;
