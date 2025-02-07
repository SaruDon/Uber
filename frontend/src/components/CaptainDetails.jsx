import React, { useContext } from "react";
import { CaptainDataContext } from "../context/CaptainContext";

const CaptainDetails = () => {
  const { captain } = useContext(CaptainDataContext);
  console.log("captain", captain);

  return (
    <div>
      <div className="flex flex-row  items-center justify-left px-3">
        <img
          className="z-1 h-11 rounded-full object-cover border-2 border-white"
          src="https://media.istockphoto.com/id/1216596950/photo/portrait-of-driver-smiling.jpg?s=1024x1024&w=is&k=20&c=KdQJa9lg1pbW5pM2JnWf7c8WHsHbEBYUzcsTmww58Z0="
          alt=""
        />
        <div className="px-8">
          <h1 className="font-semibold text-lg">
            {captain?.fullname !== undefined
              ? `${captain.fullname.firstname} ${captain.fullname.lastname}`
              : "N/A"}
          </h1>
          <h1>Basic Level</h1>
        </div>
        <div>
          <h3 className="pl-4 font-semibold text-2xl">
            ₹{captain?.earning.toFixed(1)}
          </h3>
          <p className="pl-4">Eraning</p>
        </div>
      </div>
      <div className="mt-4 border-t border-gray-300"></div>{" "}
      {/* Horizontal line */}
      <div className="flex flex-rows m-1"></div>
      <div
        className="mx-5 p-4 flex justify-center gap-5 items-center bg-gray-50 rounded-lg
        "
      >
        <div className="text-center ">
          <i className="text-3xl ri-time-fill"></i>
          <h1 className="text-xl font-semibold">10.2</h1>
          <h3>Hours online</h3>
        </div>
        <div className="text-center ">
          <i className="text-3xl ri-time-fill"></i>
          <h1 className="text-xl font-semibold">10.2</h1>
          <h3>Hours online</h3>
        </div>
        <div className="text-center ">
          <i className="text-3xl ri-time-fill"></i>
          <h1 className="text-xl font-semibold">10.2</h1>
          <h3>Hours online</h3>
        </div>
      </div>
    </div>
  );
};

export default CaptainDetails;
