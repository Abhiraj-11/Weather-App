import React, { useState } from "react";
import { UilSearch , UilLocationPoint } from "@iconscout/react-unicons";

const Inputs = ({units, setUnits, setQuery}) => {
  const[city,setCity] = useState("");

  const handleSearchClick = () => {
    if(city!==""){
      setQuery({q:city});
    };
  };

  const handleLocationClick = () => {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({
          lat,
          lon
        });
      });
    };
  };

  const handleUnitsChnage = (e) => {
    const selectedUnit = e.currentTarget.name;
    if(units !== selectedUnit) setUnits(selectedUnit);
  };
  return (
    <div className="flex flex-row justify-center my-6">
      <div className="flex flex-row w-1/2 items-center justify-center space-x-4">
        <input
          value={city}
          onChange={(e)=> setCity(e.currentTarget.value)}
          type="text"
          placeholder="search...."
          className="text-xl font-light p-2 w-full shadow-xl focus:outline-none capitalize placeholder:lowercase"/>
      </div>
      <UilSearch onClick={handleSearchClick} size={30} className="text-white cursor-pointer transition ease-out hover:scale-125 mx-3 my-2" />
      <UilLocationPoint onClick={handleLocationClick} size={30} className="text-white cursor-pointer transition ease-out hover:scale-125 mx-1 my-2" />
      <div className="flex flex-row w-1/4 items-center justify-center">
        <button name="metric" onClick={handleUnitsChnage} className="text-2xl text-white font-light  transition ease-out hover:scale-125">°C</button>
        <p className="text-2xl text-white mx-2">|</p>
        <button name="imperial" onClick={handleUnitsChnage} className="text-2xl text-white font-light  transition ease-out hover:scale-125">°F</button>
      </div>
    </div>
  );
};

export default Inputs;
