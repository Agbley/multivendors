import { message } from "antd";
import React, { useEffect, useState } from "react";
import { GetCurrentUser } from "../apicalls/users";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLoader } from "../redux/loadersSlice";
import { setUser } from "../redux/usersSlice";

function ProtectedPage({ children }) {
  // const [user, setUser] = useState(null);
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validateToken = async () => {
    try {
      dispatch(setLoader(true));
      const response = await GetCurrentUser();
      dispatch(setLoader(false));
      if (response.success) {
        dispatch(setUser(response.data));
      } else {
        navigate("/login");
        message.error(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      navigate("/login");
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      validateToken();
    } else {
      navigate("/login");
      //   message.error("Please login to continue");
    }
  }, []);
  return (
    <div>
      {user && (
        <div>
          {/* Header */}
          <div className="flex justify-between items-center bg-primary p-5">
            <h1
              className="text-2xl text-white cursor-pointer"
              onClick={() => navigate("/")}
            >
              Multi-Vendor-Marketplace
            </h1>
            <div className="bg-white py-2 px-5 rounded flex gap-1 items-center">
              <i className="ri-shield-user-fill"></i>
              <span
                className="cursor-pointer uppercase"
                onClick={() => {
                  if (user.role === "user") {
                    navigate("/profile");
                  } else {
                    navigate("/admin");
                  }
                }}
              >
                {user.name}
              </span>
              <i
                className="ri-logout-circle-line ml-10 cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              ></i>
            </div>
          </div>

          {/* Body */}
          <div className="p-5">{children}</div>
        </div>
      )}
    </div>
  );
}

export default ProtectedPage;
