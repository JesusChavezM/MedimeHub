"use client";
import { useLoadScript, GoogleMap, MarkerF, CircleF } from "@react-google-maps/api";
import type { NextPage } from "next";
import { useMemo, useState } from "react";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

const Home: NextPage = () => {
  const [lat, setLat] = useState(28.6366525930481);
  const [lng, setLng] = useState(-106.07661059120282);
  
  const libraries = useMemo(() => ["places"], []);
  const mapCenter = useMemo(() => ({ lat: lat, lng: lng }), [lat, lng]);

  const mapOptions = useMemo<google.maps.MapOptions>(
    () => ({
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    }),
    []
  );

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID as string,
    libraries: libraries as any,
  });

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center p-6 text-lg font-bold">
        <h1>Cargando ...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full h-full my-3">
        <PlacesAutocomplete
          onAddressSelect={(address) => {
            getGeocode({ address: address }).then((results) => {
              const { lat, lng } = getLatLng(results[0]);

              setLat(lat);
              setLng(lng);
            });
          }}
        />
      </div>
      <GoogleMap
        options={mapOptions}
        zoom={16}
        center={mapCenter}
        mapTypeId={google.maps.MapTypeId.ROADMAP}
        mapContainerStyle={{ width: "356px", height: "400px" }}
        onLoad={(map) => console.log("Map Loaded")}
      >
        <MarkerF
          position={mapCenter}
          onLoad={() => console.log("Marker Loaded")}
        />
      </GoogleMap>
    </div>
  );
};

const PlacesAutocomplete = ({
  onAddressSelect,
}: {
  onAddressSelect?: (address: string) => void;
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: { country: "mx" },
      bounds: new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(28.500, -106.150), // Suroeste de Chihuahua
        new window.google.maps.LatLng(29.250, -105.500)  // Noreste de Chihuahua
      )
    },
    debounce: 300,
    cache: 86400,
  });

  const renderSuggestions = () => {
    return data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
        description,
      } = suggestion;

      return (
        <li
          key={place_id}
          onClick={() => {
            setValue(description, false);
            clearSuggestions();
            onAddressSelect && onAddressSelect(description);
          }}
          className="p-2 bg-100 border-1 border-500 "
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  return (
    <div className="rounded-md">
      <input
        value={value}
        className="w-full p-2 border border-600 bg-200 rounded-md text-950"
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Hospital Angeles"
      />

      {status === "OK" && (
        <ul className="w-full overflow-x-hidden p-1">{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export default Home;





{/* {[1000, 2500].map((radius, idx) => {
          return (
            <CircleF
              key={idx}
              center={mapCenter}
              radius={radius}
              onLoad={() => console.log("Circle Load...")}
              options={{
                fillColor: radius > 1000 ? "red" : "green",
                strokeColor: radius > 1000 ? "red" : "green",
                strokeOpacity: 0.8,
              }}
            />
          );
        })} */}