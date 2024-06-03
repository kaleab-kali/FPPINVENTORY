import React, { useState } from "react";
import { Table, Input, Select, Space } from "antd";
import { ColumnsType } from "antd/es/table";

const { Search } = Input;
const { Option } = Select;

interface StaffData {
  key: string;
  firstName: string;
  lastName: string;
  role: string;
  employmentDate: string;
  phoneNumber: string;
  photo: string;
}

interface TableProps {
  data: StaffData[];
}

const StaffTable: React.FC<TableProps> = ({ data }) => {
  const [searchText, setSearchText] = useState("");
  const [filteredRole, setFilteredRole] = useState("");

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleRoleFilterChange = (value: string) => {
    setFilteredRole(value);
  };

  const filteredData = data.filter((item) => {
    const matchesSearchText =
      item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchText.toLowerCase());

    const matchesRole = filteredRole ? item.role === filteredRole : true;

    return matchesSearchText && matchesRole;
  });

  const columns: ColumnsType<StaffData> = [
    {
      title: "Photo",
      dataIndex: "photo",
      key: "photo",
      render: (text) => (
        <img src={text} alt="staff" style={{ width: 50, height: 50 }} />
      ),
    },
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Employment Date",
      dataIndex: "employmentDate",
      key: "employmentDate",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
  ];

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Search
          placeholder="Search by name"
          onSearch={handleSearch}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ width: 200 }}
        />
        <Select
          placeholder="Filter by role"
          onChange={handleRoleFilterChange}
          allowClear
          style={{ width: 200 }}
        >
          <Option value="invmanager">Inventory Manager</Option>
          <Option value="stockmanager">Stock Manager</Option>
          <Option value="personnel">Personnel</Option>
        </Select>
      </Space>
      <Table columns={columns} dataSource={filteredData} />
    </div>
  );
};

export default Table;
