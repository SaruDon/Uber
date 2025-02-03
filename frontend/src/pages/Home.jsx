import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useState, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import WaitForDriver from "../components/WaitForDriver";
import DriverDetails from "../components/DriverDetails";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);
  const [isConfrimRideOpen, setIsConfrimRideOpen] = useState(false);
  const [isWaitForDriverOpen, setIsWaitForDriverOpen] = useState(false);
  const [isDriverDetailsOpen, setIsDriverDetailsOpen] = useState(true);

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const waitForDriverRef = useRef(null);
  const driverDetailsRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (isPanelOpen) {
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
  }, [isPanelOpen]);

  useGSAP(() => {
    if (isVehiclePanelOpen) {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [isVehiclePanelOpen]);

  useGSAP(() => {
    if (isConfrimRideOpen) {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRideRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [isConfrimRideOpen]);

  useGSAP(() => {
    if (isWaitForDriverOpen) {
      gsap.to(waitForDriverRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(waitForDriverRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [isWaitForDriverOpen]);

  useGSAP(() => {
    if (isDriverDetailsOpen) {
      gsap.to(driverDetailsRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(driverDetailsRef.current, {
        transform: "translateY(100%)",
      });
    }
  }, [isDriverDetailsOpen]);

  useEffect(() => {
    // This will ensure the panel state is updated before the animation runs
  }, [isPanelOpen, isVehiclePanelOpen]);

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
            {isPanelOpen ? (
              <i
                onClick={() => {
                  setIsPanelOpen(false);
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
                setIsPanelOpen(true);
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
                setIsPanelOpen(true);
                setDestination(e.target.value);
              }}
              type="text"
              placeholder="Enter your destination"
              className="bg-[#eee] px-12 py-4 mt-5 mb-3 text-base rounded-lg w-full"
            />
          </form>
        </div>

        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            isPanelOpen={isPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
            vehiclePanel={isVehiclePanelOpen}
            setVehiclePanel={setIsVehiclePanelOpen}
          />
        </div>

        <div
          ref={vehiclePanelRef}
          className="fixed translate-y-full bg-white w-full px-3 bottom-0 py-8"
        >
          <VehiclePanel
            setIsConfrimRideOpen={setIsConfrimRideOpen}
            setIsVehiclePanelOpen={setIsVehiclePanelOpen}
          />
        </div>

        <div
          ref={confirmRideRef}
          className="fixed translate-y-full bg-white w-full px-3 bottom-0 py-8"
        >
          <ConfirmRide
            setIsConfrimRideOpen={setIsConfrimRideOpen}
            setIsWaitForDriverOpen={setIsWaitForDriverOpen}
          />
        </div>

        <div
          ref={waitForDriverRef}
          className="fixed translate-y-full bg-white w-full px-3 bottom-0 py-8"
        >
          <WaitForDriver
            setIsWaitForDriverOpen={setIsWaitForDriverOpen}
            setIsConfrimRideOpen={setIsConfrimRideOpen}
          />
        </div>

        <div
          ref={driverDetailsRef}
          className="fixed translate-y-full bg-white w-full px-3 bottom-0 py-8"
        >
          <DriverDetails setIsDriverDetailsOpen={setIsDriverDetailsOpen} />
        </div>
      </div>
    </div>
  );
};

export default Home;
