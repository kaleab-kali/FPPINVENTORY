import React, { useState } from "react";
import { Modal, Button, Form, Input, Row, Col, message ,Select } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import UnitForm from "../Units/UnitForm";
import CategoryForm from "./CategoryForm";
// import { useCreateCategory } from "../../services/mutations/categoryMutation";
// import { CategoryInfo } from "../../../../shared/types/Category";
// import { UnitInfo } from "../../../../shared/types/Unit";
// import { useAllUnits } from "../../services/queries/unitQueries";

// const AddCatagory = () => {
//   const [visible, setVisible] = useState(false);
//   const [form] = Form.useForm();

//   const createCategoryMutation = useCreateCategory();

//   const getAllUnitsQuery = useAllUnits();
//   console.log("All Units Query:", getAllUnitsQuery.data);
//   const unitSource = getAllUnitsQuery.data ? getAllUnitsQuery.data.map((queryResult: UnitInfo) => {
//     return {
//       key: queryResult.unitID,
//       id: queryResult.unitID,
//       name: queryResult.unitName,
//       standard: queryResult.standard,
//     };
//   }) : [];

//   console.log("Source:", unitSource);

  

//   const showModal = () => {
//     setVisible(true);
//   };

//   const handleCancel = () => {
//     setVisible(false);
//   };

//   return (
//     <>
//       <Button
//         type="primary"
//         style={{ float: "right", marginBottom: "20px" }}
//         icon={<PlusCircleOutlined />}
//         onClick={showModal}
//       >
//         Add Catagory
//       </Button>
//       <Modal
//         title="Add Catagory"
//         visible={visible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText="Add Category"
//       >
//         <Form form={form} layout="vertical" name="addCatagoryForm">
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="name"
//                 label="Name"
//                 rules={[{ required: true, message: "Please enter the name" }]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//             <Col span={12}>
//               <Form.Item
//                 name="unit"
//                 label="Unit of Measurment"
//                 rules={[
//                   { required: true, message: "Please enter the mobile number" },
//                 ]}
//               >
//                 <Select
//                   placeholder="Select a unit"
//                   allowClear
//                 >
//                   {unitSource.map((unit) => {
//                     return (
//                       <Select.Option key={unit.id} value={unit.name}>
//                         {unit.name}
//                       </Select.Option>
//                     );
//                   })}
//                 </Select>
                
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default AddCatagory;


const AddCategory: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <>
      <Button
        type="primary"
        style={{ float: "right", marginBottom: "20px" }}
        icon={<PlusCircleOutlined />}
        onClick={showModal}
      >
        Add Unit
      </Button>
      <CategoryForm visible={visible} onCancel={handleCancel} />
    </>
  );
};

export default AddCategory;


