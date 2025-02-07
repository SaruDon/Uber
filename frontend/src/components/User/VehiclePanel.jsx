import React from "react";

const VehiclePanel = (props) => {
  const submit = (e) => {
    props.setIsVehiclePanelOpen(false);
  };

  return (
    <div>
      <h5
        onClick={() => {
          props.setIsVehiclePanelOpen(false);
        }}
        className="text-center "
      >
        <i className="text-2xl ri-arrow-down-s-line"></i>
      </h5>
      <h1 className="text-2xl font-bold mb-5">Choose a Vehicle</h1>

      <div
        onClick={() => {
          props.setVehicleType("car");
          props.setAmountPayable(props.fare.car);
          props.setIsVehiclePanelOpen(false);
          props.setIsConfrimRideOpen(true);
        }}
        className="flex mb-2 w-full active:border-2 border-black p-3 rounded-xl items-center justify-between"
      >
        <img
          className="h-14 m-4"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_552,w_552/v1555367310/assets/30/51e602-10bb-4e65-b122-e394d80a9c47/original/Final_UberX.png"
          alt=""
        />
        <div>
          <div className="flex flex-row">
            <h4 className="font-medium text-xl">Uber Go</h4>
            <h3 className="mx-3 font-medium text-l">
              <i className="ri-user-fill"></i> 4
            </h3>
          </div>

          <h5 className="font-medium text-l">2 mins away</h5>
          <p className="font-medium text-l">Affordable,Compact rides</p>
        </div>
        <h2 className="text-2xl font-semibold">
          {props.fare?.car !== undefined ? props.fare.car.toFixed(1) : "N/A"}
        </h2>{" "}
      </div>

      <div
        onClick={() => {
          props.setVehicleType("bike");
          props.setAmountPayable(props.fare.bike);
          props.setIsVehiclePanelOpen(false);
          props.setIsConfrimRideOpen(true);
        }}
        className="flex mb-2 w-full active:border-2 border-black p-3 rounded-xl items-center justify-between"
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648177797/assets/fc/ddecaa-2eee-48fe-87f0-614aa7cee7d3/original/Uber_Moto_312x208_pixels_Mobile.png"
          alt=""
        />
        <div>
          <div className="flex flex-row">
            <h4 className="font-medium text-xl">Uber Moto</h4>
            <h3 className="mx-3 font-medium text-l">
              <i className="ri-user-fill"></i> 1
            </h3>
          </div>

          <h5 className="font-medium text-l">2 mins away</h5>
          <p className="font-medium text-l">Affordable moter cycle rides </p>
        </div>
        <h2 className="text-2xl font-semibold">
          {props.fare?.bike !== undefined ? props.fare.bike.toFixed(1) : "N/A"}
        </h2>{" "}
      </div>

      <div
        onClick={() => {
          props.setVehicleType("auto");
          props.setAmountPayable(props.fare.auto);
          props.setIsVehiclePanelOpen(false);
          props.setIsConfrimRideOpen(true);
        }}
        className="flex mb-2 w-full active:border-2 border-black p-3 rounded-xl items-center justify-between"
      >
        <img
          className="h-14"
          src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
          alt=""
        />
        <div>
          <div className="flex flex-row">
            <h4 className="font-medium text-xl">Uber Auto</h4>
            <h3 className="mx-3 font-medium text-l">
              <i className="ri-user-fill"></i> 3
            </h3>
          </div>

          <h5 className="font-medium text-l">2 mins away</h5>
          <p className="font-medium text-l">Affordable auto cycle rides </p>
        </div>
        <h2 className="text-2xl font-semibold">
          {props.fare?.auto !== undefined ? props.fare.auto.toFixed(1) : "N/A"}
        </h2>{" "}
      </div>
    </div>
  );
};

export default VehiclePanel;
