import { Avatar, Form, Modal, Select, Spin } from "antd";
import { debounce } from "lodash";
import React from "react";
import { AppContext } from "../../Context/AppProvider";
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase/config";

const DebounceSelect = ({ fetchOptions, debounceTimeout = 300, ...props }) => {
  const [fetching, setFetching] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const debounceFetcher = React.useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);
      //promise
      fetchOptions(value, props.currentMember).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions, props.currentMember]);
  return (
    <Select
      labelInValue
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {
        // Custom [{label: , value,photoURL}]
        options.map((opt) => (
          <Select.Option key={opt.value} title={opt.label} value={opt.value}>
            <Avatar src={opt.photoURL}>
              {opt.photoURL ? "" : opt.displayName?.charAt(0).toUpperCase()}
            </Avatar>
            {`${opt.label}`}
          </Select.Option>
        ))
      }
    </Select>
  );
};
const fetchUserList = async (search, currentMember) => {
  // const dataSearch = query(
  //   collection(db, "users"),
  //   where("keywords", "array-contains", search),
  //   orderBy("displayName"),
  //   limit(20)
  // )
  // .then((snapshot) => {
  //     return snapshot.docs.map((doc) => ({
  //       label: doc.data().displayName,
  //       value: doc.data().uid,
  //       photoURL: doc.data().photoURL,
  //     }));
  //   });
  const dataSearch = getDocs(
    query(
      collection(db, "users"),
      where("keywords", "array-contains", search),
      orderBy("displayName"),
      limit(20)
    )
  )
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoURL: doc.data().photoURL,
        }))
        .filter((opt) => !currentMember.includes(opt.value));
    })
    .catch((error) => {
      console.error("Lỗi khi lấy dữ liệu người dùng:", error);
    });
  return dataSearch;
};
const InviteModals = () => {
  const [value, setValue] = React.useState([]);

  const {
    isInviteMemberVisible,
    setInviteeMemberVisible,
    selectedRoomId,
    SelectedRoom,
  } = React.useContext(AppContext);
  const [form] = Form.useForm();
  // function hanldeOk
  const handleOk = () => {
    // update members in current rooms
    const roomRef = doc(db, "rooms", selectedRoomId);

    // clear form
    updateDoc(roomRef, {
      ...SelectedRoom,
      members: [...SelectedRoom.members, ...value.map((val) => val.value)],
    }).then(() => console.log("success"));
    form.resetFields();
    setInviteeMemberVisible(false);
  };

  //function hanldeCencel
  const handleCencel = () => {
    setInviteeMemberVisible(false);
  };
  return (
    <div>
      <Modal
        title="tao phong"
        visible={isInviteMemberVisible}
        onOk={handleOk}
        onCancel={handleCencel}
      >
        <Form form={form}>
          <DebounceSelect
            mode="multiple"
            label="Tên các thành viên"
            placeholder="Nhập tên thành viên"
            value={value}
            fetchOptions={fetchUserList}
            onChange={(newValue) => setValue(newValue)}
            style={{ width: "100%" }}
            currentMember={SelectedRoom.members}
          />
        </Form>
      </Modal>
    </div>
  );
};

export default InviteModals;
