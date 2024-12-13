import React from "react";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import { Avatar } from "@mui/material";

function MapLink({ p }) {
  const lat = p.Lat;
  const lon = p.Lon;

  // Construct the OpenStreetMap URL with the appropriate parameters
  const mapUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=19/${lat}/${lon}`;

  return (
    <div>
      <a href={mapUrl} target="_blank" rel="noopener noreferrer">
        <Avatar sx={{bgcolor: "primary.main"}}>
          <FmdGoodIcon />
        </Avatar>
      </a>
    </div>
  );
}

export default MapLink;
