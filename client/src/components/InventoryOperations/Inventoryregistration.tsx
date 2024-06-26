import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  // Typography,
  Checkbox,
  message,
} from "antd";
import moment from "moment";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { useCreateProduct,useUpdateProduct } from "../../services/mutations/productMutation";
import { ProductInfo } from "../../../../shared/types/Product";
import { useAllUnits } from "../../services/queries/unitQueries";
import { useAllCategorys } from "../../services/queries/categoryQueries";
import { useAllSuppliers } from "../../services/queries/supplierQueries";
import { UnitInfo } from "../../../../shared/types/Unit";
import { CategoryInfo } from "../../../../shared/types/Category";
import { SupplierInfo } from "../../../../shared/types/Supplier";

dayjs.extend(customParseFormat);

// const { Content } = Layout;
// const { Option } = Select;
// const { Title } = Typography;

interface InventoryRegistrationFormProps {
  initialValues?: any;
}
const InventoryRegistrationForm: React.FC<InventoryRegistrationFormProps> = ({ initialValues }) => {
  // initialValues ? console.log("Initial Values:", initialValues) : console.log("Initial Values: No initial values");

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const createProductMutation = useCreateProduct();
  const updateProductMutation = useUpdateProduct();
  const getAllUnitsQuery = useAllUnits();
  const getAllCategorysQuery = useAllCategorys();
  const getAllSuppliersQuery = useAllSuppliers();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        name: initialValues.name,
        model: initialValues.model,
        brand: initialValues.brand,
        supplier: initialValues.suppliername,
        manufacturedate: moment(initialValues.manufactureDate),
        expirationdate: moment(initialValues.expirationDate),
        quantity: initialValues.quantity,
        wight: initialValues.wight,
        price: initialValues.price,
        category: initialValues.catagory,
        unit: initialValues.unit,
        purchasedate: moment(initialValues.purchaseDate),
        returnable: Boolean(initialValues.returnable),
        description: initialValues.discription,
      });
      console.log("Initial Values after edit dispaly:", initialValues);
    } else {
      form.resetFields();

    }} , [initialValues, form]);

  const unitSource = getAllUnitsQuery.data ? getAllUnitsQuery.data.map((queryResult: UnitInfo) => { 
    return {
      key: queryResult.unitID,
      id: queryResult.unitID,
      name: queryResult.unitName,
      standard: queryResult.standard,
    };
  }) : [];

  const categorySource = getAllCategorysQuery.data ? getAllCategorysQuery.data.map((queryResult: CategoryInfo) => {
    return {
      key: queryResult.catID,
      id: queryResult.catID,
      category: queryResult.categoryName,
    };
  }) : [];

  const supplierSource = getAllSuppliersQuery.data ? getAllSuppliersQuery.data.map((queryResult: SupplierInfo) => {
    // console.log("Query result supplier:", queryResult);
    return {
      key: queryResult.sid,
      sid: queryResult.sid,
      name: queryResult.name,
      mnumber: queryResult.mobileNumber,
      email: queryResult.email,
      address: queryResult.address,
    };
  }) : [];
  

  const onFinish = (values: any) => {
    // console.log("Form data:", values);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("model", values.model);
    formData.append("brand", values.brand);
    formData.append("supplier", values.supplier);
    formData.append("quantity", values.quantity);
    formData.append("wight", values.wight);
    formData.append("category", values.category);
    formData.append("unit", values.unit);
    formData.append("returnable", values.returnable);

    const returnableValue = formData.get("returnable") as string;
    const returnable = returnableValue === "true" ? true : false;

    const productInfo: ProductInfo = {
      productID: initialValues?.productID || "",
      name: formData.get("name") as string,
      models: formData.get("model") as string,
      brand: formData.get("brand") as string,
      supplier: formData.get("supplier") as string,
      quantity: parseInt(formData.get("quantity") as string),
      category: formData.get("category") as string,
      unit: formData.get("unit") as string,
      returnable: returnable,
    };
  
    if(initialValues){
      console.log("Update product mutation:", productInfo);
      updateProductMutation.isPending ? message.loading("Updating product...") :
      updateProductMutation.mutate(productInfo);
      navigate("/product/view");

    }else{
      createProductMutation.mutate(productInfo);
    }
    
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    // console.log("Changed values:", changedValues);
    // console.log("All values:", allValues);
  };

  return (
    <>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        initialValues={initialValues}
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
              <Select placeholder="Select a supplier" allowClear>
                {supplierSource.map(
                  (supplier: {
                    sid: React.Key | null | undefined;
                    name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => {
                    return (
                      <Select.Option key={supplier.sid} value={supplier.name}>
                        {supplier.name}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="wight" label="Wight/Dimention(LxW)">
              <Input type="number" placeholder="Enter quantity" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="category"
              label="Category"
              rules={[{ required: true, message: "Please select category" }]}
            >
              <Select placeholder="Select a category" allowClear>
                {categorySource.map(
                  (category: {
                    id: React.Key | null | undefined;
                    category:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => {
                    return (
                      <Select.Option
                        key={category.id}
                        value={category.category}
                      >
                        {category.category}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item
              name="unit"
              label="Unit"
              rules={[
                { required: true, message: "Please select Unit of measurment" },
              ]}
            >
              <Select placeholder="Select a unit" allowClear>
                {unitSource.map(
                  (unit: {
                    id: React.Key | null | undefined;
                    name:
                      | string
                      | number
                      | boolean
                      | React.ReactElement<
                          any,
                          string | React.JSXElementConstructor<any>
                        >
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | null
                      | undefined;
                  }) => {
                    return (
                      <Select.Option key={unit.id} value={unit.name}>
                        {unit.name}
                      </Select.Option>
                    );
                  }
                )}
              </Select>
            </Form.Item>
          </Col>

          <Col span={3}>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Returnable"
              name="returnable"
              valuePropName="checked"
            >
              <Checkbox>yes</Checkbox>
            </Form.Item>
          </Col>
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update Product" : "Add Product"}
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InventoryRegistrationForm;
