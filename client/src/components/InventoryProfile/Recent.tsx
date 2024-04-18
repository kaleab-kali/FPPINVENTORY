import React from 'react'
import { Card, Avatar, Flex } from "antd";
import { FaFirstOrder } from "react-icons/fa";
import { MdOutlineLibraryAdd } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import { CiExport } from "react-icons/ci";
import { HiDotsVertical } from "react-icons/hi";
const { Meta } = Card;
const Recent = () => {
  return (
    <div style={{ backgroundColor: "white" }}>
      <Card>
        <Flex
          gap="large"
          justify="space-between"
          align="center"
          vertical={false}
        >
          <Meta
            avatar={
              <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
            }
            title="Abebe Driba"
            description="Admin"
          />
          <HiDotsVertical />
        </Flex>
      </Card>
      <Card>
        <Meta title="Quick Actions" />
        <div style={{ color: "#5C6F88", fontSize: "14px", fontWeight: "bold" }}>
          <p>
            <FaFirstOrder />
            Create Order
          </p>
          <p>
            <MdOutlineLibraryAdd />
            Add Item
          </p>
          <p>
            <TbTruckDelivery />
            Add Supplier
          </p>
          <p>
            <CiExport />
            Export
          </p>
        </div>
      </Card>
      <Card>
        <Meta title="Recent Activity" />
        <h4>Restocked 4 Products</h4>
        <Flex vertical={false} gap="large" justify="center" align="center">
          <Avatar src="https://media.istockphoto.com/id/1421619596/photo/colorful-handcrafted-soaps.webp?b=1&s=170667a&w=0&k=20&c=BcPyttpEFTnaLg2b0XKPIaIiF3xMzhnvgEmguQVz7xE=" />
          <p>Sunlight Soap</p> <p>- 1m ago</p>
        </Flex>

        <h4>Given 2 Items</h4>
        <Flex vertical={false} gap="large" justify="center" align="center">
          <Avatar src="https://media.istockphoto.com/id/1421619596/photo/colorful-handcrafted-soaps.webp?b=1&s=170667a&w=0&k=20&c=BcPyttpEFTnaLg2b0XKPIaIiF3xMzhnvgEmguQVz7xE=" />
          <p>Sunlight Soap</p> <p>- 3m ago</p>
        </Flex>
        <h4>Given 1 Item</h4>
        <Flex vertical={false} gap="large" justify="center" align="center">
          <Avatar src="https://images.unsplash.com/photo-1560343090-f0409e92791a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8cHJvZHVjdHxlbnwwfHwwfHx8MA%3D%3D" />
          <p>Shoes</p> <p>- 12m ago</p>
        </Flex>
        <h4>Restocked 10 Products</h4>
        <Flex vertical={false} gap="large" justify="center" align="center">
          <Avatar src="https://media.istockphoto.com/id/173240129/photo/gun-with-clipping-path.webp?b=1&s=170667a&w=0&k=20&c=GfEthUuCO-EjpItsQ3bxRUYhQdjAbNbGxYAwpw_pcW4=" />
          <p>Pistol</p> <p>- 20m ago</p>
        </Flex>
      </Card>
    </div>
  );
}

export default Recent
