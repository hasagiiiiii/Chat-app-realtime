import React from "react";
import { Col, Row } from "antd";
import SideBar from "./SideBar";
import ChatWindow from "./ChatWindow";
const Chatroom = () => {
  return (
    <div>
      <Row>
        <Col span={6}>
          <SideBar />
        </Col>
        <Col span={18}>
          <ChatWindow />
        </Col>
      </Row>
    </div>
  );
};

export default Chatroom;
