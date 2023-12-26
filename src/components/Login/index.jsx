import React from "react";
import { getAdditionalUserInfo, signInWithPopup } from "firebase/auth";
import { auth, provider } from "../../firebase/config";
import { Row, Col, Button, Typography } from "antd";
import { addDocument, generateKeywords } from "../../firebase/service";
const { Title } = Typography;

const Login = () => {
  const handleFbLogin = async () => {
    const data = await signInWithPopup(auth, provider); // xác thực người dùng
    console.log(data);
    const checkNewUser = getAdditionalUserInfo(data).isNewUser; //getAdditionalUserInfo lấy thông tin người dùng check xem có phải mới
    if (checkNewUser) {
      //mới thì add doc vào collection
      addDocument("users", {
        displayName: data.user.displayName,
        email: data.user.email,
        photoURL: data.user.photoURL,
        uid: data.user.uid,
        providerId: data.providerId,
        keywords: generateKeywords(data.user.displayName),
      });
    }
  };

  return (
    <div>
      <Row justify="center" style={{ height: 800 }}>
        <Col span={8}>
          <Title style={{ textAlign: "center" }} level={3}>
            Fun Chat
          </Title>
          <Button style={{ width: "100%", marginBottom: "5" }}>
            Đăng nhập bằng Google
          </Button>
          <Button
            onClick={handleFbLogin}
            style={{ width: "100%", marginBottom: "5" }}
          >
            Đăng nhập bằng FaceBook
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
