import { Alert, Avatar, Button, Form, Input, Tooltip } from "antd";
import React from "react";
import styled from "styled-components";
import { UserAddOutlined } from "@ant-design/icons/lib/icons";
import Message from "./Message";
import { AppContext } from "../../Context/AppProvider";
import { addDocument } from "../../firebase/service";
import { AuthContext } from "../../Context/AuthProvider";
import useFireStore from "../../hooks/useFireStore";
const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  .header {
    &_info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &_title {
      margin: 0;
      font-size: bold;
    }
    &_description {
      font-size: 12px;
    }
  }
`;
const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;
const WrapperStyled = styled.div`
  height: 100%;
`;
const ContentStyled = styled.div`
  height: calc(100% - 56px) !important;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
const FormStyled = styled(Form)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rbg(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
  }
`;
const MessageListStyled = styled.div``;
const ChatWindow = () => {
  const { SelectedRoom, members, setInviteeMemberVisible } =
    React.useContext(AppContext);
  const { uid, photoURL, displayName } = React.useContext(AuthContext);
  const [inputValue, setInputValue] = React.useState("");
  const [form] = Form.useForm();

  const handleInputValueChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleOnSubmit = () => {
    addDocument("message", {
      text: inputValue,
      uid,
      photoURL,
      roomId: SelectedRoom.id,
      displayName,
    });

    form.resetFields(["message"]);
  };

  const Condition = React.useMemo(
    () => ({
      fieldName: "roomId",
      operator: "==",
      compareValue: SelectedRoom.id,
    }),
    [SelectedRoom.id]
  );
  const messages = useFireStore("message", Condition);
  console.log(messages);
  return (
    <WrapperStyled>
      {SelectedRoom.id ? (
        <div style={{ height: "100%" }}>
          <HeaderStyled>
            <div className="header_info">
              <p className="header_title">{SelectedRoom.name}</p>
              <span className="header_des">{SelectedRoom.description}</span>
            </div>
            <ButtonGroupStyled>
              <Button
                onClick={() => setInviteeMemberVisible(true)}
                icon={<UserAddOutlined />}
              >
                Moi
              </Button>
              <Avatar.Group size="small" maxCount={2}>
                {members.map((member) => (
                  <Tooltip key={member.id} title="A">
                    <Avatar src={member.photoURL}>
                      {member.photoURL
                        ? ""
                        : member.displayName.charAt(0).toUpperCase()}
                    </Avatar>
                  </Tooltip>
                ))}
              </Avatar.Group>
            </ButtonGroupStyled>
          </HeaderStyled>
          <ContentStyled>
            <MessageListStyled>
              {messages.map((mes) => (
                <Message
                  key={mes.uid}
                  text={mes.text}
                  photoURL={null}
                  displayName={mes.displayName}
                  createdAt={mes.createAt.seconds}
                />
              ))}
              {/* <Message
                text="Test"
                photoURL={null}
                displayName="Trung"
                createdAt={312312}
              />
              <Message
                text="Test"
                photoURL={null}
                displayName="Trung"
                createdAt={312312}
              /> */}
            </MessageListStyled>

            <FormStyled form={form}>
              <Form.Item name="message">
                <Input
                  onChange={handleInputValueChange}
                  onPressEnter={handleOnSubmit}
                  bordered={false}
                  placeholder="Nhập tin nhắn"
                  autoComplete="off"
                />
              </Form.Item>
              <Button onClick={handleOnSubmit} type="primary">
                Gửi
              </Button>
            </FormStyled>
          </ContentStyled>
        </div>
      ) : (
        <Alert message="Hãy chọn một phòng" type="info" showIcon closable />
      )}
    </WrapperStyled>
  );
};

export default ChatWindow;
