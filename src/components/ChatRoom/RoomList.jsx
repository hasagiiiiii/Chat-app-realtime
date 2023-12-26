import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Collapse, Typography } from "antd";
import React from "react";
import styled from "styled-components";

import { AppContext } from "../../Context/AppProvider";
const { Panel } = Collapse;

const PanelStyled = styled(Panel)`
  &&& {
    .ant-collapse-header,
    p {
      color: white;
    }

    .ant-collapse-content-box {
      padding: 0 40px;
    }
    .add-room {
      color: white;
      padding: 0;
    }
  }
`;
const LinkStyled = styled(Typography.Link)`
  display: block;
  margin-bottom: 5px;
  color: white;
`;
const RoomList = () => {
  const { rooms, setAddRoomVisible, setSelectedRoomId } =
    React.useContext(AppContext);
  const hanldeAddRoom = () => {
    setAddRoomVisible(true);
  };
  return (
    <Collapse ghost defaultActiveKey={["1"]}>
      <PanelStyled header="Danh sách các phòng" key="1">
        {rooms.map((room) => (
          <LinkStyled key={room.id} onClick={() => setSelectedRoomId(room.id)}>
            {room.name}
          </LinkStyled>
        ))}
        {/* <LinkStyled>Room2</LinkStyled>
        <LinkStyled>Room3</LinkStyled>
        <LinkStyled>Room4</LinkStyled> */}
        <Button
          type="text"
          icon={<PlusSquareOutlined />}
          className="add-room"
          onClick={hanldeAddRoom}
        >
          Them Phong
        </Button>
      </PanelStyled>
    </Collapse>
  );
};

export default RoomList;
