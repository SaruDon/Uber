import React from "react";

const DriverDetails = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setIsDriverDetailsOpen(true);
        }}
        className="text-center "
      >
        <i className="text-2xl ri-arrow-down-s-line"></i>
      </h5>
      <h1 className="text-2xl font-bold mb-5">Driver Details</h1>
      <div>
        <div className="flex items-center justify-between">
          <div className="flex flex-row">
            <img
              className="z-1 h-12 rounded-full object-cover border-2 border-white"
              src="https://media.istockphoto.com/id/1216596950/photo/portrait-of-driver-smiling.jpg?s=1024x1024&w=is&k=20&c=KdQJa9lg1pbW5pM2JnWf7c8WHsHbEBYUzcsTmww58Z0="
              alt=""
            />
            <img
              className="z-0 absolute left-16 h-12 rounded-full object-cover border-2 border-white"
              src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
              alt=""
            />
          </div>
          <div className="px-3 text-right">
            <h2 className="text-lg font-medium">Mangesh Dhonde</h2>
            <h2 className="text-2xl font-semibold">MH 05 CM 0069</h2>
            <h2 className="text-sm ">Swfit Dzire</h2>
          </div>
        </div>
      </div>
      <div className="flex flex-rows border-spacing-7 mt-3 m-1">
        <h3 className="font-medium text-xl p-5">
          <i className="fron ri-map-pin-4-fill"></i>
        </h3>
        <div>
          <h3 className="text-xl pt-2 font-semibold m-1">562/11A</h3>
          <h2 className="text-lg">Kaikondrahali ,Bengluru, Karnataka</h2>
        </div>
      </div>
      <div className="border-t border-gray-300"></div> {/* Horizontal line */}
      <div className="flex flex-rows m-1">
        <h3 className="font-medium text-xl p-5">
          <i className="ri-square-fill"></i>{" "}
        </h3>
        <div>
          <h3 className="text-xl pt-2 font-semibold">562/11A</h3>
          <h2 className="text-lg">
            Kaikondrahali ,Bengluru, Karnataka Kaikondrahali ,Bengluru,
            Karnataka
          </h2>
        </div>
      </div>
      <div className="border-t border-gray-300"></div> {/* Horizontal line */}
      <div className="flex flex-rows m-1">
        <h3 className="font-medium text-xl p-5">
          <i class="ri-cash-line"></i>{" "}
        </h3>
        <div>
          <h3 className="text-xl pt-2 font-semibold">₹193.20</h3>
          <h2 className="text-lg">Cash</h2>
        </div>
      </div>
    </div>
  );
};

export default DriverDetails;
