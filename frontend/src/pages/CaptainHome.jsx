import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import "remixicon/fonts/remixicon.css";
import ConfimRidePopUp from "../components/ConfimRidePopUp";
import { CaptainDataContext } from "../context/CaptainContext";
import { SocketContext } from "../context/SocketContext";
import { pick } from "../../node_modules/engine.io-client/build/esm-debug/util";

const CaptainHome = () => {
  const [isRidePopUpOpen, setIsRidePopUpOpen] = useState(false);

  const [pickUp, setpickUp] = useState("");
  const [destination, setDestination] = useState("");
  const [ride, setRide] = useState();

  const ridePopUpRef = useRef(null);

  const [loading, setLoading] = useState(true);

  const [isConfimRidePopupOpen, setIsConfimRidePopupOpen] = useState(false);

  const comfirmRidePopUpRef = useRef(null);

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  socket.on("new-ride", (data) => {
    console.log("data", data);
    setIsRidePopUpOpen(true);
  });

  useEffect(() => {
    console.log("captain", captain);
    if (!captain?._id) return;

    socket.emit("join", { userType: "captain", userId: captain._id });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          console.log({
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
          socket.emit("update-location-captain", {
            userId: captain._id,
            location: {
              ltd: position.coords.latitude,
              lng: position.coords.longitude,
            },
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();
    setLoading(false); // Set loading to false once the data is fetched
  }, [captain]);

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
          ride={ride}
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
