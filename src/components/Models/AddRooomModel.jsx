import React from "react";
import { Form, Input, Modal } from "antd";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/service";
import { AuthContext } from "../../Context/AuthProvider";
const AddRooomModel = () => {
  const { isAddRoomVisible, setAddRoomVisible } = React.useContext(AppContext);
  const { uid } = React.useContext(AuthContext);
  const [form] = Form.useForm();
  // function hanldeOk
  const handleOk = () => {
    // add new rooms in firestore
    addDocument("rooms", { ...form.getFieldValue(), members: [uid] });

    // clear form
    form.resetFields();

    setAddRoomVisible(false);
  };
  //function hanldeCencel
  const handleCencel = () => {
    setAddRoomVisible(false);
  };

  return (
    <div>
      <Modal
        title="tao phong"
        visible={isAddRoomVisible}
        onOk={handleOk}
        onCancel={handleCencel}
      >
        <Form form={form}>
          <Form.Item label="Ten phong" name="name">
            <Input placeholder="Nhap ten Phong" />
          </Form.Item>
          <Form.Item label="mota" name="description">
            <Input.TextArea placeholder="Nhap mo ta" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddRooomModel;
