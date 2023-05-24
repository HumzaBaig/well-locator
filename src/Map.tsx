import React from "react";
import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const wells = [
  { id: 1, name: "Well 1", lat: 40.7128, lng: -74.006 },
  { id: 2, name: "Well 2", lat: 34.0522, lng: -118.2437 },
  // Add more wells as necessary
];

const Map = () => {
  const [selectedWell, setSelectedWell] = React.useState<{
    id: number;
    name: string;
    lat: number;
    lng: number;
  } | null>(null);

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={{ width: "100vw", height: "100vh" }}
        center={{ lat: 39.8283, lng: -98.5795 }}
        zoom={4}
        options={{
          zoomControl: true,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: window?.google?.maps?.MapTypeControlStyle?.DROPDOWN_MENU,
          },
        }}
      >
        {wells.map((well) => (
          <MarkerF
            key={well.id}
            position={{ lat: well.lat, lng: well.lng }}
            onClick={() => setSelectedWell(well)}
          />
        ))}

        {selectedWell && (
          <InfoWindow
            position={{ lat: selectedWell.lat, lng: selectedWell.lng }}
            onCloseClick={() => setSelectedWell(null)}
          >
            <div>
              <h2>{selectedWell.name}</h2>
              <p>Placeholder information for {selectedWell.name}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
