import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FinishRide = (props) => {
  const navigate = useNavigate();

  async function endRide() {
    try {
      console.log("Hello");
      console.log("props.rideData._id", props.rideData._id);
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/end-ride`,
        {
          rideId: props.rideData._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log("response", response);
      if (response.status === 200) {
        navigate("/captain-home");
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center text-lg p-4">
      <img
        className="w-20 mb-4"
        src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
        alt="uber logo"
      />
      <h1 className="text-2xl font-semibold mb-4">Finish Ride Details</h1>
      <div className="mt-2 p-4 rounded-lg bg-gray-50 flex flex-row items-center justify-center px-6 w-full max-w-md">
        <img
          className="z-1 h-11 rounded-full object-cover border-2 border-white"
          src="https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg"
          alt="Driver"
        />
        <div className="px-4">
          <h1 className="font-semibold text-lg">
            {props?.rideData?.user?.fullname?.firstName || ""}
            {props?.rideData?.user?.fullname?.lastName || ""}
          </h1>
        </div>
        <div>
          <h3 className="pl-4 font-semibold text-2xl">
            ₹{props?.rideData?.fare.toFixed(1)}
          </h3>
          <p className="pl-4 text-sm">5 Rs/km</p>
        </div>
      </div>
      <div className="w-full max-w-md mt-4">
        <div className="flex items-center space-x-4">
          <i className="ri-map-pin-4-fill text-xl"></i>
          <div>
            <h3 className="text-xl font-semibold">562/11A</h3>
            <h2 className="text-lg">{props?.rideData?.pickup}</h2>
          </div>
        </div>
        <div className="border-t border-gray-300 my-2"></div>{" "}
        {/* Horizontal line */}
        <div className="flex items-center space-x-4">
          <i className="ri-square-fill text-xl"></i>
          <div>
            <h3 className="text-xl font-semibold">562/11A</h3>
            <h2 className="text-lg">{props?.rideData?.destination}</h2>
          </div>
        </div>
        <div className="border-t border-gray-300"></div> {/* Horizontal line */}
        <div className="flex items-center space-x-4">
          <h3 className="font-medium text-xl">
            <i className="ri-cash-line"></i>{" "}
          </h3>
          <div>
            <h3 className="text-xl pt-2 font-semibold">
              ₹{props?.rideData?.fare.toFixed(1)}
            </h3>
            <h2 className="text-lg">Cash</h2>
          </div>
        </div>
      </div>

      <div className="flex">
        <button
          onClick={() => {
            props.setIsFinishRideOpen(false);
          }}
          className="bg-[#3d3d3d] w-1/2 text-white font-semibold rounded px-4 py-6 text-center"
        >
          <p className="text-red-400">Cancel</p>
        </button>
        <button
          onClick={endRide}
          className="bg-[#a5de64] w-1/2 ml-2 text-white font-semibold rounded px-4 py-4 flex items-center justify-center text-center"
        >
          Complete Ride
        </button>
      </div>
      <div className="w-full max-w-md mt-4"></div>
    </div>
  );
};

export default FinishRide;
