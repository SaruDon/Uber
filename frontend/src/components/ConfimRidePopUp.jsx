import React, { useState } from "react";
import { Link } from "react-router-dom";

const ConfimRidePopUp = (props) => {
  const [otp, setOtpt] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center text-lg p-4">
      <img
        className="w-20 mb-4"
        src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
        alt="uber logo"
      />
      <h1 className="text-2xl font-semibold mb-4">Ride Details</h1>

      <div className="mt-2 p-4 rounded-lg bg-gray-50 flex flex-row items-center justify-center px-6 w-full max-w-md">
        <img
          className="z-1 h-11 rounded-full object-cover border-2 border-white"
          src="https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg"
          alt="Driver"
        />
        <div className="px-4">
          <h1 className="font-semibold text-lg">Sarvesh Khamkar</h1>
        </div>
        <div>
          <h3 className="pl-4 font-semibold text-2xl">₹120.20</h3>
          <p className="pl-4 text-sm">5 Rs/km</p>
        </div>
      </div>

      <div className="w-full max-w-md mt-4">
        <div className="flex items-center space-x-4">
          <i className="ri-map-pin-4-fill text-xl"></i>
          <div>
            <h3 className="text-xl font-semibold">562/11A</h3>
            <h2 className="text-lg">Kaikondrahali, Bengaluru, Karnataka</h2>
          </div>
        </div>
        <div className="border-t border-gray-300 my-2"></div>{" "}
        {/* Horizontal line */}
        <div className="flex items-center space-x-4">
          <i className="ri-square-fill text-xl"></i>
          <div>
            <h3 className="text-xl font-semibold">562/11A</h3>
            <h2 className="text-lg">Kaikondrahali, Bengaluru, Karnataka</h2>
          </div>
        </div>
      </div>

      <form
        action=""
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <input
          value={otp}
          type="number"
          placeholder="Enter OTP"
          onChange={() => {
            setOtpt(otp);
          }}
          className="bg-[#eee] px-12 py-4 mt-5 mb-3 text-base rounded-lg w-full"
        />

        <div className="flex">
          <button
            onClick={() => {
              props.setIsRidePopUpOpen(false);
              props.setIsConfimRidePopupOpen(false);
            }}
            className="bg-[#3d3d3d] w-1/2 text-white font-semibold rounded px-4 py-6 text-center"
          >
            <p className="text-red-400">Cancel</p>
          </button>
          <Link
            to="/captain-riding"
            onClick={() => {
              props.setIsRidePopUpOpen(false);
              props.setIsConfimRidePopupOpen(false);
            }}
            className="bg-[#a5de64] w-1/2 ml-2 text-white font-semibold rounded px-4 py-4 flex items-center justify-center text-center"
          >
            Start Ride
          </Link>
        </div>
      </form>

      <div className="w-full max-w-md mt-4"></div>
    </div>
  );
};

export default ConfimRidePopUp;
