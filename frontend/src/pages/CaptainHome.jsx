import React from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import "remixicon/fonts/remixicon.css";
import ConfimRidePopUp from "../components/ConfimRidePopUp";
import ConfirmRide from "../components/ConfirmRide";

const CaptainHome = () => {
  const [isRidePopUpOpen, setIsRidePopUpOpen] = useState(true);

  const ridePopUpRef = useRef(null);

  const [isConfimRidePopupOpen, setIsConfimRidePopupOpen] = useState(false);

  const comfirmRidePopUpRef = useRef(null);

  useGSAP(() => {
    if (isRidePopUpOpen) {
      gsap.to(ridePopUpRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [isRidePopUpOpen]);

  useGSAP(() => {
    if (isConfimRidePopupOpen) {
      gsap.to(comfirmRidePopUpRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(comfirmRidePopUpRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [isConfimRidePopupOpen]);

  return (
    <div className="h-screen">
      <div className="fixed p-3 top-0 w-full flex items-center justify-between">
        <img
          className="w-20"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
          alt="uber logo"
        />
        <Link to={"/home"}>
          <i className="ri-logout-box-r-line text-2xl"></i>{" "}
          {/* Adjust icon size as needed */}
        </Link>
      </div>

      <div className="h-3/5 w-screen  object-cover">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="z-0 2/5 mt-8 absolute bottom-0">
        <CaptainDetails />
      </div>

      <div
        ref={ridePopUpRef}
        className="fixed translate-y-full bg-white w-full px-3 bottom-0 py-8"
      >
        <RidePopUp
          setIsRidePopUpOpen={setIsRidePopUpOpen}
          setIsConfimRidePopupOpen={setIsConfimRidePopupOpen}
        />
      </div>

      <div
        ref={comfirmRidePopUpRef}
        className="fixed h-screen translate-y-full bg-white w-full px-3 bottom-0 py-8"
      >
        <ConfimRidePopUp
          setIsConfimRidePopupOpen={setIsConfimRidePopupOpen}
          setIsRidePopUpOpen={setIsRidePopUpOpen}
        />
      </div>
    </div>
  );
};

export default CaptainHome;
