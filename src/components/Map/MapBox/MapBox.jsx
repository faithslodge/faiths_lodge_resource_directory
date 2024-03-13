import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";
import RecenterAuto from "./RecenterAuto";

const MapBox = () => {
  // Set the initial position and zoom level of the map
  const [filteredLat, setFilteredLat] = useState(44.985);
  const [filteredLong, setFilteredLong] = useState(-93.25);
  const zoom = 5;

  // import filtered store
  const orgList = useSelector((store) => store.filters);

  // Monitor filtered org list to calculated Lat and Long based on filtered results
  useEffect(() => {
    calcLatAvg();
    calcLongAvg();
  }, [orgList]);

  // Function to calculate latitude from orgs in filtered list
  function calcLatAvg() {
    let sum = 0;
    orgList.forEach((element) => {
      sum += Number(element.latitude);
    });
    setFilteredLat(sum / orgList?.length);
  }

  // Function to calculate longitude from orgs in filtered list
  function calcLongAvg() {
    let sum = 0;
    orgList.forEach((element) => {
      sum += Number(element.longitude);
    });
    setFilteredLong(sum / orgList?.length);
  }

  return (
    <MapContainer center={[filteredLat, filteredLong]} zoom={zoom} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {filteredLat && filteredLong && <RecenterAuto lat={filteredLat} lng={filteredLong} />}
      {orgList.map((org) => (
        <Marker key={org.id} position={[org?.latitude, org?.longitude]}>
          <Popup>
            {org.name} <br /> Link to Org Details
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapBox;
