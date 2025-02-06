import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// Checks if User is login or not!
const UserProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.status === 200) {
          setUser(response.data);
        } else {
          throw new Error("Invalid res status");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserProfile();
  }, [token, navigate]);

  if (isLoading) {
    return <>Loading...</>; // Render loading state
  }

  return <div>{children}</div>;
};

export default UserProtectWrapper;
