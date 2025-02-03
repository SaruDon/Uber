import React, { useState } from "react";
import { Link } from "react-router-dom";
import FinishRide from "../components/FinishRide";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const CaptainRiding = () => {
  const [isFinishRideOpen, setIsFinishRideOpen] = useState(false);
  const finishRideRef = useRef(null);

  useGSAP(() => {
    if (isFinishRideOpen) {
      gsap.to(finishRideRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [isFinishRideOpen]);

  return (
    <div className="h-screen ">
      <div className="fixed p-3 top-0 w-full flex items-center justify-between">
        <img
          className="w-20"
          src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
          alt="uber logo"
        />
        <Link to={"/captain-home"}>
          <i className="bg-white p-2 rounded-full ri-logout-box-r-line text-2xl"></i>{" "}
          {/* Adjust icon size as needed */}
        </Link>
      </div>
      <div className="h-5/6 w-screen bottom-0  object-cover ">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>
      <div className="h-1/6 w-screen p-1 my-1 rounded-full">
        <h2 className="text-center text-3xl font-semibold">Lonavla Station</h2>
        <h4 className="text-center text-xl font-medium py-1 mb-2">4 Km away</h4>
        <button
          onClick={() => {
            setIsFinishRideOpen(true);
          }}
          className="bg-[#a5de64] w-full px-4 py-2 my-2 text-white font-semibold  rounded "
        >
          Finish Ride
        </button>
      </div>

      <div
        ref={finishRideRef}
        className="fixed h-screen translate-y-full bg-white w-full px-3 bottom-0 py-8"
      >
        <FinishRide setIsFinishRideOpen={setIsFinishRideOpen} />
      </div>
    </div>
  );
};

export default CaptainRiding;
