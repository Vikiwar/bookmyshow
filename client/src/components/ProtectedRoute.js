import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { GetCurrentUser } from "../api/users";
import { setUser } from "../redux/userSlice";
import {
  HomeOutlined,
  LogoutOutlined,
  ProfileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { message, Layout, Menu } from "antd";
const { Header, Content, Footer, Sider } = Layout;

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const navItems = [
    { key: "home", label: "Home", icon: <HomeOutlined /> },
    {
      key: "user",
      label: `${user ? user.name : ""}`,
      icon: <UserOutlined />,
      children: [
        { key: "profile", label: "My Profile", icon: <ProfileOutlined /> },
        { key: "logout", label: "Log Out", icon: <LogoutOutlined /> },
      ],
    },
  ];

  const handleMenuClick = ({ key }) => {
    if (key === "home") {
      navigate("/");
    } else if (key === "profile") {
      if (user.role === "admin") {
        navigate("/admin");
      } else if (user.role === "partner") {
        navigate("/partner");
      } else {
        navigate("/profile");
      }
    } else if (key === "logout") {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  const getValidUser = async () => {
    try {
      dispatch(showLoading());
      const response = await GetCurrentUser();
      dispatch(setUser(response.data));
      dispatch(hideLoading());
    } catch (error) {
      console.log(error);
      message.error(error.message);
      dispatch(hideLoading());
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getValidUser();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    user && (
      <>
        <Layout>
          <Header
            className="d-flex justify-content-between"
            style={{
              position: "sticky",
              top: 0,
              zIndex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <h3 className="demo-logo text-white m-0" style={{ color: "white" }}>
              Book My Show
            </h3>
            <Menu
              theme="dark"
              mode="horizontal"
              items={navItems}
              onClick={handleMenuClick}
            />
          </Header>
          <div style={{ padding: 24, minHeight: 380, background: "#fff" }}>
            {children}
          </div>
        </Layout>
      </>
    )
  );
};

export default ProtectedRoute;
