import React from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/config";
import { Spin } from "antd";

export const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  let navigate = useNavigate();
  const [user, setUser] = React.useState({});
  const [isLoading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unSubcribed = auth.onAuthStateChanged((user) => {
      //onAuthStateChanged kiểm tra trạng thái của xác thực của người dùng
      if (user) {
        const { displayName, email, uid, photoURL } = user;
        setUser({ displayName, email, uid, photoURL });
        setLoading(false);
        navigate("/"); // điều hướng tới "/"
        return;
      }
      setLoading(false);
      navigate("/login");
    });
    // clean up function
    return () => {
      unSubcribed();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={user}>
      {isLoading ? <Spin /> : children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
