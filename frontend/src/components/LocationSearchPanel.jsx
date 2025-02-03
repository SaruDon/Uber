import React from "react";
import "remixicon/fonts/remixicon.css";

const LocationSearchPanel = (props) => {
  // array of locations

  const locations = [
    "Kumar Resort Lonavala Valvan highway Thane to kalwa",
    "Kumar Resort Lonavala Valvan highway Thane to kalwa",
    "Kumar Resort Lonavala Valvan highway Thane to kalwa",
    "Kumar Resort Lonavala Valvan highway Thane to kalwa",
  ];

  return (
    <div>
      {locations.map((element, indx) => {
        return (
          <div
            key={indx}
            onClick={() => {
              props.setVehiclePanel(true);
              props.setIsPanelOpen(false);
            }}
            className=" p-3 flex items-center justify-start px-2 my-4 gap-4  active:border-2 border-black rounded-xl "
          >
            <h2 className="bg-[#eee] gap-4  h-8 flex items-center justify-center w-12 rounded-lg">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <h4 className="pl-3 text-lg font-medium">{element}</h4>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSearchPanel;
