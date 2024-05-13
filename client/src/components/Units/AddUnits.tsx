// import React, { useState } from "react";
// import { Modal, Button, Form, Input, Row, Col, message } from "antd";
// import { PlusCircleOutlined } from "@ant-design/icons";
// import { useCreateUnit } from "../../services/mutations/unitMutation";
// import { UnitInfo } from "../../../../shared/types/Unit";


// const AddUnits = () => {
//   const createUnitMutuation = useCreateUnit();
//   const [visible, setVisible] = useState(false);
//   const [form] = Form.useForm();

//   const showModal = () => {
//     setVisible(true);
//   };

//   const handleCancel = () => {
//     setVisible(false);
//   };

//   const handleOk = async () => {
//      // Log the complete form data
//      const values = form.getFieldsValue(true);
//      // handleFormData(values);
     
//      try {
//        await form.validateFields();
 
//        const formData = new FormData();
//        formData.append("name", values.name);
//         formData.append("Standard", values.Standard);
 
//        const unitInfo: UnitInfo = {
//          id: "",
//          unitName: formData.get("name") as string,
//         standard: formData.get("Standard") as string,
//        };

//        createUnitMutuation.mutate(unitInfo);
//        message.success("Form submitted successfully!");
//      } catch (error) {
//        console.error("Validation failed:", error);
//      }
 
//   };

//   return (
//     <>
//       <Button
//         type="primary"
//         style={{ float: "right", marginBottom: "20px" }}
//         icon={<PlusCircleOutlined />}
//         onClick={showModal}
//       >
//         Add Units
//       </Button>
//       <Modal
//         title="Add Units"
//         visible={visible}
//         onOk={handleOk}
//         onCancel={handleCancel}
//         okText="Add unit"
//       >
//         <Form form={form} layout="vertical" name="addUnitsForm">
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
//                 name="Standard"
//                 label="Standard"
//                 rules={[
//                   { required: true, message: "Please enter the Standard" },
//                 ]}
//               >
//                 <Input />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default AddUnits;


import React, { useState } from "react";
import { Button } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import UnitForm from "./UnitForm";

const AddUnit: React.FC = () => {
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
      <UnitForm visible={visible} onCancel={handleCancel} />
    </>
  );
};

export default AddUnit;

