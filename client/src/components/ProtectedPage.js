import { message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetLoggedInUserInfo } from "../apicalls/users";
import { SetLoading } from "../redux/loadersSlice";
import { SetCurrentUser } from "../redux/usersSlice";
import { getLoggedInUserName } from "../utils/helpers";

function ProtectedPage({ children }) {
  const { currentUser } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetLoggedInUserInfo();
      dispatch(SetLoading(false));
      if (response.success) {
        message.success(response.message);
        dispatch(SetCurrentUser(response.data));
      } else {
        dispatch(SetLoading(true));
        throw new Error(response.message);
      }
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const handleRefresh = () => {
      if (localStorage.getItem("token")) {
        getCurrentUser();
      }
    };

    window.addEventListener("beforeunload", handleRefresh);

    return () => {
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, []);

  return (
    currentUser && (
      <div>
        {/* header */}
        <div className="flex justify-between items-center bg-primary text-white px-5 py-3">
          <div onClick={() => navigate("/")} className="cursor-pointer">
            <h1 className="text-4xl mb-2">BLOODLIFE</h1>
            <span className="text-xs">{currentUser.userType.toUpperCase()}</span>
          </div>

          <div className="flex items-center gap-1">
            <i class="ri-shield-user-line"></i>
            <div className="flex flex-col">
              <span
                className="mr-5 text-md  cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {getLoggedInUserName(currentUser).toUpperCase()}
              </span>
            </div>

            <i
              className="ri-logout-box-r-line ml-5 cursor-pointer gap-1"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/login");
              }}
            ></i>
            <div className="flex flex-col">
              <span
                className="mr-5 text-md  cursor-pointer"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                LOGOUT
              </span>
            </div>
          </div>
        </div>

        {/* body */}
        <div className="px-5 py-5">{children}</div>
      </div>
    )
  );
}

export default ProtectedPage;
