import React from "react";

const RidePopUp = (props) => {
  return (
    <div>
      <h5
        onClick={() => {
          props.setIsRidePopUpOpen(false);
        }}
        className="text-center "
      >
        <i className="text-2xl ri-arrow-down-s-line"></i>
      </h5>
      <h1 className="text-xl font-bold mb-1 p-3">New Ride Available</h1>
      <div className="border-t border-gray-300"></div> {/* Horizontal line */}
      <div className="mt-2 p-4 rounded-lg bg-gray-50 flex flex-row  items-center justify-left px-3">
        <img
          className="z-1 h-11 rounded-full object-cover border-2 border-white"
          src="https://img.freepik.com/premium-photo/ai-human-avatar-characters-male-model_1166271-38.jpg"
          alt=""
        />
        <div className="px-8">
          <h1 className="font-semibold text-lg">Sarvesh Khamkar</h1>
        </div>
        <div>
          <h3 className="pl-4 font-semibold text-2xl">₹120.20</h3>
          <p className="pl-4 text-sm">5 Rs/km</p>
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
      <button
        onClick={() => {
          props.setIsRidePopUpOpen(false);
          props.setIsConfimRidePopupOpen(true);
        }}
        className="bg-[#a5de64] w-full text-white font-semibold mb-2 rounded px-4 py-4 mt-3 md-0"
      >
        Accept
      </button>
      <button
        onClick={() => {
          props.setIsRidePopUpOpen(false);
        }}
        className="bg-[#313131] w-full text-white font-semibold mb-4 rounded px-4 py-4 mt-3 md-0"
      >
        Ignore
      </button>
    </div>
  );
};

export default RidePopUp;
