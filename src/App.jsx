import "./App.css";
import Login from "./components/Login";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Chatroom from "./components/ChatRoom";
import AuthProvider from "./Context/AuthProvider";
import AppProvider from "./Context/AppProvider";
import AddRooomModel from "./components/Models/AddRooomModel";
import InviteModals from "./components/Models/InviteMemberModels";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppProvider>
          <Routes>
            <Route Component={Chatroom} path="/" />
            <Route Component={Login} path="/login" />
          </Routes>
          <AddRooomModel />
          <InviteModals />
        </AppProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
