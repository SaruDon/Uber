import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { useContext } from "react";
import { useState, useEffect } from "react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../../components/User/LocationSearchPanel";
import VehiclePanel from "../../components/User/VehiclePanel";
import ConfirmRide from "../../components/User/ConfirmRide";
import WaitForDriver from "../../components/User/WaitForDriver";
import DriverDetails from "../../components/User/DriverDetails";
import axios from "axios";
import { SocketContext } from "../../context/SocketContext";
import { UserDataContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");

  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isVehiclePanelOpen, setIsVehiclePanelOpen] = useState(false);
  const [isConfrimRideOpen, setIsConfrimRideOpen] = useState(false);
  const [isWaitForDriverOpen, setIsWaitForDriverOpen] = useState(false);
  const [isDriverDetailsOpen, setIsDriverDetailsOpen] = useState(false);

  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestedLocations, setpickupSuggestedLocations] = useState([]);
  const [destinationSuggestedLocations, setDestinationSuggestedLocations] =
    useState([]);

  const [fare, setFare] = useState();
  const [amountPayable, setAmountPayable] = useState();
  const [vehicleType, setVehicleType] = useState(null);
  const [ride, setRide] = useState();

  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  const navigate = useNavigate();

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user._id });
  }, [user]);

  const panelRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const confirmRideRef = useRef(null);
  const waitForDriverRef = useRef(null);
  const driverDetailsRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  socket.on("ride-confirmed", (ride) => {
    setRide(ride);
    setIsWaitForDriverOpen(false);
    setIsDriverDetailsOpen(true);
  });

  socket.on("ride-started", (ride) => {
    setIsDriverDetailsOpen(false);
    navigate("/riding", { state: { ride } }); // Updated navigate to include ride data
  });

  // const handlePickupChange = async (e) => {
  //   const value = e.target.value;

  //   // Don't call API if input is empty
  //   if (!value.trim()) {
  //     return;
  //   }

  //   try {
  //     const response = await axios.get(
  //       `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
  //       {
  //         params: { address: value }, // ✅ Sent as query parameter
  //         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  //       }
  //     );
  //     setpickupSuggestedLocations(response.data);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { address: e.target.value }, // ✅ Sent as query parameter
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setpickupSuggestedLocations(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        {
          params: { address: e.target.value }, // ✅ Sent as query parameter
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setDestinationSuggestedLocations(response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  async function findATrip() {
    setIsPanelOpen(false);
    setIsVehiclePanelOpen(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/ride/get-fare`,
        {
          params: { pickup, destination }, // ✅ Sent as query parameter
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("response", response.data);
      setFare(response.data);
    } catch (error) {}
  }

  async function createRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/ride/create`,
        { pickup, destination, vehicleType },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
        // ✅ Sent as query parameter
      );
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  }

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
          <div className="flex flex-row justify-between items-center w-full mt-2">
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
                handlePickupChange(e);
                setActiveField("pickup");
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
                handleDestinationChange(e);
                setActiveField("destination");
                setIsPanelOpen(true);
                setDestination(e.target.value);
              }}
              type="text"
              placeholder="Enter your destination"
              className="bg-[#eee] px-12 py-4 mt-5 mb-3 text-base rounded-lg w-full"
            />
            <button
              onClick={() => {
                findATrip();
              }}
              className="bg-[#3d3d3d] w-full text-white font-semibold rounded px-4 py-4 my-2 text-center"
            >
              <p className="text-white">Find Trip</p>
            </button>
          </form>
        </div>

        <div ref={panelRef} className="h-0 bg-white">
          <LocationSearchPanel
            suggestions={
              activeField === "pickup"
                ? pickupSuggestedLocations
                : destinationSuggestedLocations
            }
            activeField={activeField}
            setPickup={setPickup}
            setDestination={setDestination}
            isPanelOpen={isPanelOpen}
            setIsPanelOpen={setIsPanelOpen}
            vehiclePanel={isVehiclePanelOpen}
            setIsVehiclePanel={setIsVehiclePanelOpen}
          />
        </div>

        <div
          ref={vehiclePanelRef}
          className="fixed translate-y-full bg-white w-full px-3 bottom-0 py-8"
        >
          <VehiclePanel
            setAmountPayable={setAmountPayable}
            fare={fare}
            setVehicleType={setVehicleType}
            setIsConfrimRideOpen={setIsConfrimRideOpen}
            setIsVehiclePanelOpen={setIsVehiclePanelOpen}
          />
        </div>

        <div
          ref={confirmRideRef}
          className="fixed translate-y-full bg-white w-full px-3 bottom-0 py-8"
        >
          <ConfirmRide
            createRide={createRide}
            amountPayable={amountPayable}
            pickup={pickup}
            destination={destination}
            setIsConfrimRideOpen={setIsConfrimRideOpen}
            setIsWaitForDriverOpen={setIsWaitForDriverOpen}
          />
        </div>

        <div
          ref={waitForDriverRef}
          className="fixed translate-y-full bg-white w-full px-3 bottom-0 py-8"
        >
          <WaitForDriver
            amountPayable={amountPayable}
            pickup={pickup}
            destination={destination}
            setIsWaitForDriverOpen={setIsWaitForDriverOpen}
            setIsConfrimRideOpen={setIsConfrimRideOpen}
          />
        </div>

        <div
          ref={driverDetailsRef}
          className="fixed translate-y-full bg-white w-full px-3 bottom-0 py-8"
        >
          <DriverDetails
            ride={ride}
            setIsDriverDetailsOpen={setIsDriverDetailsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
