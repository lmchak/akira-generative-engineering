import { useState, useCallback, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 40.7128,
  lng: -74.0060,
};

const libraries = ["places"];

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState(center);
  const [markers, setMarkers] = useState([]);
  const [filters, setFilters] = useState({
    colocation: false,
    selfBuild: false,
    earlyStage: false,
  });
  const [error, setError] = useState(null);

  const apiKey = useMemo(() => import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
    libraries,
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery || !isLoaded) return;

    setError(null);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        setMapCenter({ lat: lat(), lng: lng() });
        setMarkers([{ lat: lat(), lng: lng() }]);
        map?.panTo({ lat: lat(), lng: lng() });
        map?.setZoom(12);
      } else {
        setError(`Geocoding failed: ${status}. Please check your API key and ensure Geocoding API is enabled.`);
      }
    });
  };

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  if (loadError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Failed to load Google Maps. Please check your API key and try again.
          </AlertDescription>
        </Alert>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">How to set up Google Maps API:</h2>
          <ol className="list-decimal list-inside">
            <li>Go to the Google Cloud Console</li>
            <li>Create a new project or select an existing one</li>
            <li>Enable the Maps JavaScript API and Geocoding API for your project</li>
            <li>Create an API key with appropriate restrictions</li>
            <li>Add the API key to your .env file as VITE_GOOGLE_MAPS_API_KEY</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Center Map</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex-grow flex gap-2">
          <Input
            type="text"
            placeholder="Search for data centers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full"
          />
          <Button type="submit">Search</Button>
        </form>
      </div>
      <div className="flex flex-wrap gap-4 mb-6">
        <FilterCheckbox
          id="colocation"
          label="Colocation"
          checked={filters.colocation}
          onCheckedChange={() => handleFilterChange("colocation")}
        />
        <FilterCheckbox
          id="selfBuild"
          label="Self-build"
          checked={filters.selfBuild}
          onCheckedChange={() => handleFilterChange("selfBuild")}
        />
        <FilterCheckbox
          id="earlyStage"
          label="Early-stage Schemes"
          checked={filters.earlyStage}
          onCheckedChange={() => handleFilterChange("earlyStage")}
        />
      </div>
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {isLoaded && apiKey ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={mapCenter}
          zoom={10}
          onLoad={onLoad}
          onUnmount={onUnmount}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={marker} />
          ))}
        </GoogleMap>
      ) : (
        <div className="bg-gray-200 h-[600px] rounded-lg flex items-center justify-center">
          <p className="text-xl text-gray-600">
            {apiKey ? "Loading map..." : "Google Maps API key is missing. Please add it to your .env file."}
          </p>
        </div>
      )}
    </div>
  );
};

const FilterCheckbox = ({ id, label, checked, onCheckedChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <label
        htmlFor={id}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
};

export default Map;