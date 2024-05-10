import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Layout,
  Typography,
  DatePicker,
  Checkbox,
} from "antd";
import moment from "moment";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useCreateProduct } from "../../services/mutations/productMutation";
import { ProductInfo } from "../../../../shared/types/Product";
import { useAllUnits } from "../../services/queries/unitQueries";
import { useAllCategorys } from "../../services/queries/categoryQueries";
import { useAllSuppliers } from "../../services/queries/supplierQueries";
import { UnitInfo } from "../../../../shared/types/Unit";
import { CategoryInfo } from "../../../../shared/types/Category";
import { SupplierInfo } from "../../../../shared/types/Supplier";

dayjs.extend(customParseFormat);

// const { Content } = Layout;
const { Option } = Select;
const { Title } = Typography;

const InventoryRegistrationForm: React.FC = () => {
  const [form] = Form.useForm();

  const createProductMutation = useCreateProduct();
  const getAllUnitsQuery = useAllUnits();
  const getAllCategorysQuery = useAllCategorys();
  const getAllSuppliersQuery = useAllSuppliers();

  const unitSource = getAllUnitsQuery.data ? getAllUnitsQuery.data.map((queryResult: UnitInfo) => { 
    return {
      key: queryResult.id,
      id: queryResult.id,
      name: queryResult.unitName,
      standard: queryResult.standard,
    };
  }) : [];

  const categorySource = getAllCategorysQuery.data ? getAllCategorysQuery.data.map((queryResult: CategoryInfo) => {
    return {
      key: queryResult.id,
      id: queryResult.id,
      category: queryResult.categoryName,
    };
  }) : [];

  const supplierSource = getAllSuppliersQuery.data ? getAllSuppliersQuery.data.map((queryResult: SupplierInfo) => {
    console.log("Query result supplier:", queryResult);
    return {
      key: queryResult.sid,
      sid: queryResult.sid,
      name: queryResult.name,
      mnumber: queryResult.mobileNumber,
      email: queryResult.email,
      address: queryResult.address,
    };
  }) : [];
  console.log("Supplier Source:", supplierSource);

  const onFinish = (values: any) => {
    // console.log("Form data:", values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("model", values.model);
    formData.append("brand", values.brand);
    formData.append("supplier", values.supplier);
    formData.append("manufacturedate", values.manufacturedate);
    formData.append("expirationdate", values.expirationdate);
    formData.append("quantity", values.quantity);
    formData.append("wight", values.wight);
    formData.append("price", values.price);
    formData.append("category", values.category);
    formData.append("unit", values.unit);
    formData.append("purchasedate", values.purchasedate);
    formData.append("returnable", values.returnable);
    formData.append("description", values.description);

    const returnableValue = formData.get("returnable") as string;
    const returnable = returnableValue === "true" ? true : false;

    const productInfo: ProductInfo = {
      name: formData.get("name") as string,
      models: formData.get("model") as string,
      brand: formData.get("brand") as string,
      supplier: formData.get("supplier") as string,
      manufactureDate: new Date(formData.get("manufacturedate") as string),
      expirationDate: new Date(formData.get("expirationdate") as string),
      quantity: parseInt(formData.get("quantity") as string),
      unitPrice: parseFloat(formData.get("price") as string),
      category: formData.get("category") as string,
      unit: formData.get("unit") as string,
      purchaseDate: new Date(formData.get("purchasedate") as string),
      returnable: returnable,
      discription: formData.get("description") as string,
    };
    // console.log("Product info:", productInfo);
    createProductMutation.mutate(productInfo);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    // console.log("Changed values:", changedValues);
    console.log("All values:", allValues);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
      >
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter name" }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="model"
              label="model"
              rules={[{ required: true, message: "Please enter model" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="brand"
              label="Brand"
              rules={[{ required: true, message: "Please enter quantity" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="supplier"
              label="Supplier"
              rules={[{ required: true, message: "please enter the supplier" }]}
            >
              <Select
                  placeholder="Select a supplier"
                  allowClear
                >
                  {supplierSource.map((supplier: { sid: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
                    return (
                      <Select.Option key={supplier.sid} value={supplier.name}>
                        {supplier.name}
                      </Select.Option>
                    );
                  })}
                </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="manufacturedate" label="Manufacture Date">
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="expirationdate" label="Expiration Date">
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="quantity"
              label="Quantity"
              rules={[{ required: true, message: "Please enter quantity" }]}
            >
              <Input type="number" placeholder="Enter quantity" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="wight" label="Wight/Dimention(LxW)">
              <Input type="number" placeholder="Enter quantity" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="price"
              label="Unit Price"
              rules={[{ required: true, message: "Please enter price" }]}
            >
              <Input type="number" placeholder="Enter price" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select
                  placeholder="Select a category"
                  allowClear
                >
                  {categorySource.map((category: { id: React.Key | null | undefined; category: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
                    return (
                      <Select.Option key={category.id} value={category.category}>
                        {category.category}
                      </Select.Option>
                    );
                  })}
                </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="unit"
              label="Unit"
              rules={[
                { required: true, message: "Please select Unit of measurment" },
              ]}
            >
              <Select
                  placeholder="Select a unit"
                  allowClear
                >
                  {unitSource.map((unit: { id: React.Key | null | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => {
                    return (
                      <Select.Option key={unit.id} value={unit.name}>
                        {unit.name}
                      </Select.Option>
                    );
                  })}
                </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="purchasedate" label="Purchase Date">
              <DatePicker style={{ width: "100%" }} format="DD/MM/YYYY" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              label="Returnable"
              name="returnable"
              valuePropName="checked"
            >
              <Checkbox>yes</Checkbox>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="description"
              label="Description/Note"
              rules={[{ required: true, message: "Please enter description" }]}
            >
              <Input.TextArea placeholder="Enter description" />
            </Form.Item>
          </Col>
          <Col span={8}></Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InventoryRegistrationForm;
