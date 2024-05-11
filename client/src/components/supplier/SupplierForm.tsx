// import React from "react";
// import { Modal, Form, Input, Row, Col, Button, message } from "antd";
// import { SupplierInfo } from "../../../../shared/types/Supplier";
// import { useCreateSupplier } from "../../services/mutations/supplierMutation";

// interface SupplierFormProps {
//   visible: boolean;
//   onCancel: () => void;
// }

// const SupplierForm: React.FC<SupplierFormProps> = ({ visible, onCancel }) => {
//   const [form] = Form.useForm();
//   const createSupplierMutation = useCreateSupplier();

//   const onFinish = async (values: any) => {
//     try {
//       await form.validateFields();

//       const formData = new FormData();
//       formData.append("name", values.name);
//       formData.append("mnumber", values.mnumber);
//       formData.append("email", values.email);
//       formData.append("address", values.address);

//       const supplierInfo: SupplierInfo = {
//         sid: "",
//         name: formData.get("name") as string,
//         mobileNumber: formData.get("mnumber") as string,
//         email: formData.get("email") as string,
//         address: formData.get("address") as string,
//       };

//       createSupplierMutation.mutate(supplierInfo);

//       message.success("Supplier added successfully!");
//       form.resetFields();
//       onCancel(); // Close the modal after submission
//     } catch (error) {
//       console.error("Validation failed:", error);
//     }
//   };

//   return (
//     <Modal
//       title="Add Supplier"
//       visible={visible}
//       onCancel={onCancel}
//       footer={null}
//     >
//       <Form form={form} layout="vertical" onFinish={onFinish}>
//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               name="name"
//               label="Name"
//               rules={[{ required: true, message: "Please enter the name" }]}
//             >
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="mnumber"
//               label="Mobile Number"
//               rules={[
//                 { required: true, message: "Please enter the mobile number" },
//               ]}
//             >
//               <Input />
//             </Form.Item>
//           </Col>
//         </Row>

//         <Row gutter={16}>
//           <Col span={12}>
//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[{ required: true, message: "Please enter the email" }]}
//             >
//               <Input />
//             </Form.Item>
//           </Col>
//           <Col span={12}>
//             <Form.Item
//               name="address"
//               label="Address"
//               rules={[{ required: true, message: "Please enter the address" }]}
//             >
//               <Input />
//             </Form.Item>
//           </Col>
//         </Row>
//         <Form.Item>
//           <Button type="primary" htmlType="submit">
//             Add Supplier
//           </Button>
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// export default SupplierForm;

import React, { useState } from "react";
import { Modal, Form, Input, Row, Col, Button, message,notification, } from "antd";
import { SupplierInfo } from "../../../../shared/types/Supplier";
import { useCreateSupplier, useUpdateSupplier } from "../../services/mutations/supplierMutation";

type NotificationType = "success" | "info" | "warning" | "error";

interface SupplierFormProps {
  initialValues?: SupplierInfo; // Pass initial values for editing
  visible: boolean;
  onCancel: () => void;
}

const SupplierForm: React.FC<SupplierFormProps> = ({
  initialValues,
  visible,
  onCancel,
}) => {
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [spinning, setSpinning] = useState<boolean>(false);
  const showLoader = () => {
    setSpinning(true);
    setTimeout(() => {
      setSpinning(false);
    }, 3000);
  };
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    notification[type]({
      message: message,
      description: description,
    });
  };
  const createSupplierMutation = useCreateSupplier();
  const updateEmployeeMutuation = useUpdateSupplier({
    onSuccess: () => {
      openNotificationWithIcon(
        "success",
        "Employee updated",
        `You have successfully updated's information`
      );
    //   setEditGeneralModalVisible(false); // Close modal after success
    //   setSpinning(false);
    },
    onMutate: () => {
      showLoader();
    },
  });

  const onFinish = async (values: any) => {
    try {
      await form.validateFields();

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("mnumber", values.mnumber);
      formData.append("email", values.email);
      formData.append("address", values.address);

      const supplierInfo: SupplierInfo = {
        sid: initialValues?.sid || "", // For editing, use the initial SID
        name: formData.get("name") as string,
        mobileNumber: formData.get("mnumber") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
      };

      createSupplierMutation.mutate(supplierInfo);

      message.success("Supplier added successfully!");
      form.resetFields();
      onCancel(); // Close the modal after submission
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };

  return (
    <Modal
      title={initialValues ? "Edit Supplier" : "Add Supplier"}
      visible={visible}
      onCancel={onCancel}
      footer={null}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={initialValues}
        onFinish={onFinish}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              rules={[{ required: true, message: "Please enter the name" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="mnumber"
              label="Mobile Number"
              rules={[
                { required: true, message: "Please enter the mobile number" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
              rules={[{ required: true, message: "Please enter the email" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              rules={[
                { required: true, message: "Please enter the address" },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {initialValues ? "Update Supplier" : "Add Supplier"}
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SupplierForm;

