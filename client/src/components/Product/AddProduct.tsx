import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PlusCircleOutlined } from '@ant-design/icons';

const AddProduct = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    
    navigate("/product/registration");
  };

  return (
    <>
      <Button
        type="primary"
        style={{ float: "right", marginBottom: "20px" }}
        icon={<PlusCircleOutlined />}
        onClick={handleButtonClick}
      >
        Add Product
      </Button>
    </>
  );
};

export default AddProduct;
