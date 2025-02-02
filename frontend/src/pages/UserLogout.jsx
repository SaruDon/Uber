import React, { useRef } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const UserLogout = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const isLogout = useRef(false);

  useEffect(() => {
    if (!isLogout.current) {
      isLogout.current = true; // Set flag to true to prevent duplicate execution

      axios
        .get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("response", response);
            localStorage.removeItem("token");
            navigate("/login");
          }
        });
    }
  }, [token, navigate]);

  return <div>UserLogout</div>;
};

export default UserLogout;
