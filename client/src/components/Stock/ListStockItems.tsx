import { Input, Table, Button, Space, Popconfirm } from "antd";
import React, { useState } from "react";
import { useAllStocks } from "../../services/queries/stockQueries";
// import { StockInfo } from "../../../../shared/types/Stock";
export interface StockInfo{
  stockId?: string;
  productId?: string;
  uniqueProductIds?: string[];
  productName?: string;
  category?: string;
  unit?: string;
  models?: string;
  brand?: string;
  supplier?: string;
  inQty?: number;
  outQty?: number;
  stock?: number;
}


const ListStockItems = () => {
  const [searchValue, setSearchValue] = useState("");

  const allStockQeries = useAllStocks();

  const data = allStockQeries.data
    ? allStockQeries.data.map((queryResult: StockInfo) => {
        return {
          key: queryResult.productId,
          productId: queryResult.productId,
          productname: queryResult.productName,
          catagory: queryResult.category,
          unit: queryResult.unit,
          supplier: queryResult.supplier,
          intqty: queryResult.inQty,
          outqty: queryResult.outQty,
          remqty: queryResult.stock,
        };
      })
    : [];

  const handleSearch = (value: string) => {
    setSearchValue(value);
    // const filteredData = data.filter((entry) =>
    //   entry.productname.toLowerCase().includes(value.toLowerCase())
    // );
    // setDataSource(filteredData);
  };


  const columns = [
    {
      title: "Product ID",
      dataIndex: "productId",
      key: "productId",
    },
    {
      title: "Product Name",
      dataIndex: "productname",
      key: "productname",
    },
    {
      title: "Category",
      dataIndex: "catagory",
      key: "catagory",
    },
    {
      title: "Unit",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Supplier",
      dataIndex: "supplier",
      key: "supplier",
    },
    {
      title: "In Qty",
      dataIndex: "intqty",
      key: "intqty",
    },
    {
      title: "Out Qty",
      dataIndex: "outqty",
      key: "outqty",
    },
    {
      title: "Remaining Qty",
      dataIndex: "remqty",
      key: "remqty",
    },
    
  ];

  const handleEdit = (key: string) => {
    console.log("Edit clicked for row with key:", key);
  };

  return (
    <>
      <Input
        style={{ marginBottom: 10, float: "right", width: 200 }}
        placeholder="Search Name"
        value={searchValue}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Table columns={columns} dataSource={data} />
    </>
  );
};

export default ListStockItems;
