import React from "react";

const ConfirmRide = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setIsConfrimRideOpen(false);
        }}
        className="text-center "
      >
        <i className="text-2xl ri-arrow-down-s-line"></i>
      </h5>
      <h1 className="text-2xl font-bold mb-5">Confirm your ride</h1>
      <div className="flex align-middle m-1">
        <img
          className="w-13"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_491,w_872/v1670024849/assets/61/03ac6c-6d62-4043-9dc9-f5dca076914a/original/takeTrips_1.png"
          alt=""
        />
      </div>
      <div className="flex flex-rows border-spacing-7 mt-3 m-1">
        <h3 className="font-medium text-xl p-5">
          <i className="fron ri-map-pin-4-fill"></i>
        </h3>
        <div>
          <h3 className="text-xl pt-2 font-semibold m-1">562/11A</h3>
          <h2 className="text-lg">
            {props.pickup !== undefined ? props.pickup : "N/A"}
          </h2>
        </div>
      </div>
      <div className="border-t border-gray-300"></div> {/* Horizontal line */}
      <div className="flex flex-rows m-1">
        <h3 className="font-medium text-xl p-5">
          <i className="ri-square-fill"></i>{" "}
        </h3>
        <div>
          <h3 className="text-xl pt-2 font-semibold">562/11A</h3>
          {props.destination !== undefined ? props.destination : "N/A"}
        </div>
      </div>
      <div className="border-t border-gray-300"></div> {/* Horizontal line */}
      <div className="flex flex-rows m-1">
        <h3 className="font-medium text-xl p-5">
          <i className="ri-cash-line"></i>{" "}
        </h3>
        <div>
          <h3 className="text-xl pt-2 font-semibold">
            {props?.amountPayable !== undefined
              ? props.amountPayable.toFixed(1)
              : "N/A"}
          </h3>
          <h2 className="text-lg">Cash</h2>
        </div>
      </div>
      <button
        onClick={() => {
          props.createRide();
          props.setIsConfrimRideOpen(false);
          props.setIsWaitForDriverOpen(true);
        }}
        className="bg-[#a5de64] w-full text-white font-semibold mb-7 rounded px-4 py-2 mt-7 md-0"
      >
        Confim
      </button>
    </div>
  );
};

export default ConfirmRide;
