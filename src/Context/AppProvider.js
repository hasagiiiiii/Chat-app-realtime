import React from "react";
import useFireStore from "../hooks/useFireStore";
import { AuthContext } from "./AuthProvider";

export const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isAddRoomVisible, setAddRoomVisible] = React.useState(false);
  const [isInviteMemberVisible, setInviteeMemberVisible] =
    React.useState(false);
  const [selectedRoomId, setSelectedRoomId] = React.useState("");
  const us = React.useContext(AuthContext);
  // loc xem member co cac room nao
  const roomCondition = React.useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareValue: us.uid,
    };
  }, [us.uid]);
  const rooms = useFireStore("rooms", roomCondition);

  // find ra room da lua chon
  const SelectedRoom = React.useMemo(
    () => rooms.find((room) => room.id === selectedRoomId) || {},
    [rooms, selectedRoomId]
  );

  const membersCondition = React.useMemo(() => {
    return {
      fieldName: "uid",
      operator: "in",
      compareValue: SelectedRoom.members,
    };
  }, [SelectedRoom.members]);
  const members = useFireStore("users", membersCondition);
  return (
    <AppContext.Provider
      value={{
        rooms,
        isAddRoomVisible,
        isInviteMemberVisible,
        setAddRoomVisible,
        selectedRoomId,
        setSelectedRoomId,
        setInviteeMemberVisible,
        SelectedRoom,
        members,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
