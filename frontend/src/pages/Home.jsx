import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useState, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [panelOpen, setPanelOpen] = useState(false);
  const [arrrowVisible, setarrrowVisible] = useState(false);

  const panelRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: "70%",
        duration: 0.5,
        ease: "power2.inOut",
      });
    } else {
      gsap.to(panelRef.current, {
        height: "0%",
        duration: 0.5,
        ease: "power2.inOut",
      });
    }
  }, [panelOpen]);

  useEffect(() => {
    // This will ensure the panel state is updated before the animation runs
  }, [panelOpen]);

  return (
    <div className="h-screen">
      <img
        className="w-20 absolute l-4 t-2"
        src="https://www.logo.wine/a/logo/Uber/Uber-Logo.wine.svg"
        alt="uber logo"
      />
      <div className="h-screen w-screen">
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="flex flex-col justify-end  h-screen  absolute top-0 w-full ">
        <div className="flex flex-col justify-center items-center h-[30%] bg-white p-3 relative rounded-3xl">
          <div className="flex flex-row justify-between items-center w-full">
            {/* "Find a trip" on the left */}
            <h4 className="text-2xl font-semibold p-2">Find a trip</h4>

            {/* Arrow icon on the right */}
            {panelOpen ? (
              <i
                onClick={() => {
                  setPanelOpen(false);
                }}
                className="ri-arrow-down-s-line"
              ></i>
            ) : (
              <p></p>
            )}
          </div>
          <form
            className="w-full"
            onSubmit={(e) => {
              submitHandler(e);
            }}
          >
            <div className="line absolute h-[21%] w-1 left-6 top-[50%] bg-black  rounded-full"></div>
            <input
              value={pickup}
              onChange={(e) => {
                setPanelOpen(true);
                console.log("panelOpen", panelOpen);
                setPickup(e.target.value);
              }}
              className="bg-[#eee] px-12 py-4  text-base rounded-lg w-full mt-5"
              type="text"
              placeholder="Add a pickup location"
            />
            <div className="line "></div>
            <input
              value={destination}
              onChange={(e) => {
                console.log("panelOpen", panelOpen);
                setPanelOpen(true);
                setDestination(e.target.value);
              }}
              type="text"
              placeholder="Enter your destination"
              className="bg-[#eee] px-12 py-4 mt-5 mb-3 text-base rounded-lg w-full"
            />
          </form>
        </div>
        <div ref={panelRef} className="h-0 bg-red-600"></div>
      </div>
    </div>
  );
};

export default Home;
