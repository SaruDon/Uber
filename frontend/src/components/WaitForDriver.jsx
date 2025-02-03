import React from "react";

const WaitForDriver = () => {
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
          src="https://images.squarespace-cdn.com/content/v1/529fb134e4b0dbf53fa8fa91/1519937527346-JLB1VYUKZXBCOEDDZIDG/05_.gif"
          alt=""
        />
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

export default WaitForDriver;
