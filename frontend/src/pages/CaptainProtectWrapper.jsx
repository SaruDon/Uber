import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";

const CaptainProtectWrapper = ({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaptainProfile = async () => {
      if (!token) {
        navigate("/captain-login");
        return;
      }

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BASE_URL}/captain/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setCaptain(response.data);
          console.log("captainCapntainProtectedRoute", captain);
          setIsLoading(false);
        } else {
          throw new Error("Invalid response status");
        }
      } catch (error) {
        console.error("Error fetching captain profile:", error);
        localStorage.removeItem("token"); // Clear invalid token
        navigate("/captain-login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCaptainProfile();
  }, [token, navigate]);

  if (isLoading) {
    return <>Loading...</>; // Render loading state
  }
  return <div>{children}</div>;
};

export default CaptainProtectWrapper;
