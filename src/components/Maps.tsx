"use client";
import {
  useLoadScript,
  GoogleMap,
  MarkerF,
  CircleF,
} from "@react-google-maps/api";
import type { NextPage } from "next";
import { useEffect, useMemo, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";


const Home: NextPage = () => {
  const [lat, setLat] = useState(28.6366525930481);
  const [lng, setLng] = useState(-106.07661059120282);
  const [locations, setLocations] = useState([]);

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
  
  useEffect(() => {
    const getLocations = async () => {
      const response = await fetch("/api/locations", { cache: "no-store" });
      const data = await response.json();
      setLocations(data);
    };

    getLocations();
  }, []);

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
    <div className=" flex-col">
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

      <div className="w-[356px] h-[400px] xl:w-[650px] xl:h-[450px]">
        <GoogleMap
          options={mapOptions}
          zoom={16}
          center={mapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{ width: "100%", height: "100%", borderRadius: 8, overflow: "hidden", border: "2px solid #3F11A1" }}
          onLoad={(map) => console.log("Map Loaded")}
        >
          {locations.map((location, index) => (
            <MarkerF
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              onLoad={() => console.log("Marker Loaded")}
            />
          ))}
        </GoogleMap>
      </div>
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
        new window.google.maps.LatLng(28.5, -106.15), // Suroeste de Chihuahua
        new window.google.maps.LatLng(29.25, -105.5) // Noreste de Chihuahua
      ),
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
          className="relative p-2 bg-100 border border-gray-500 overflow-hidden w-full text-left cursor-pointer whitespace-nowrap overflow-ellipsis"
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });
  };

  return (
    <div className="rounded-md w-full">
      <input
        value={value}
        className="w-full p-2 border border-600 bg-200 rounded-md text-950 "
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Hospital Angeles"
      />

      {status === "OK" && (
        <ul className="absolute z-10 w-[356px] h-[400px] xl:w-[650px] xl:h-[450px] overflow-hidden rounded-b-lg border border-600">{renderSuggestions()}</ul>
      )}
    </div>
  );
};

export default Home;

{
  /* {[1000, 2500].map((radius, idx) => {
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
        })} */
}
