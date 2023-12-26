import { Avatar, Button, Typography } from "antd";
import React from "react";
import styled from "styled-components";
import { AuthContext } from "../../Context/AuthProvider";
import { auth } from "../../firebase/config";
const WrapperInfor = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgba(82, 38, 83);

  .user {
    color: white;
    margin-left: 5px;
  }
`;
const UserInfo = () => {
  const us = React.useContext(AuthContext); // lấy user trong kho chung của authContext
  // React.useEffect(() => {
  //   // có sự thay đổi ở collection thì onSnapshot sẽ được thực thi
  //   onSnapshot(collection(db, "users"), (snapShot) => {
  //     const data = snapShot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }));
  //     console.log({ data, snapShot });
  //   });
  // });

  return (
    <WrapperInfor>
      <div>
        <Avatar src={us.photoURL}>
          {us.photoURL ? "" : us.displayName?.charAt(0).toUpperCase()}
        </Avatar>
        <Typography.Text className="user">{us.displayName}</Typography.Text>
      </div>
      <Button ghost onClick={() => auth.signOut()}>
        Đăng xuất
      </Button>
    </WrapperInfor>
  );
};

export default UserInfo;
