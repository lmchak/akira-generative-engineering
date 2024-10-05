import { useState, useEffect, useCallback, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { supabase } from '@/lib/supabase';
import MapControls from "./MapControls";
import DataCenterModal from "./DataCenterModal";

const mapContainerStyle = { width: "100%", height: "600px" };
const center = { lat: 1.4927, lng: 103.7414 };
const libraries = ["places"];

const Map = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapCenter, setMapCenter] = useState(center);
  const [markers, setMarkers] = useState([]);
  const [filters, setFilters] = useState({ colocation: false, selfBuild: false, earlyStage: false });
  const [error, setError] = useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const apiKey = useMemo(() => import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", []);
  const { isLoaded, loadError } = useLoadScript({ googleMapsApiKey: apiKey, libraries });

  const [map, setMap] = useState(null);

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => setMap(null), []);

  useEffect(() => {
    fetchDataCenters();
  }, []);

  const fetchDataCenters = async () => {
    try {
      const { data, error } = await supabase.from('johor_dc').select('*');
      if (error) throw error;
      setMarkers(data.map(dc => ({ lat: parseFloat(dc.LAT), lng: parseFloat(dc.LONG), info: dc })));
    } catch (error) {
      console.error('Error fetching data centers:', error);
      setError('Failed to fetch data centers. Please try again later.');
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery || !isLoaded) return;

    setError(null);
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === "OK" && results[0]) {
        const { lat, lng } = results[0].geometry.location;
        setMapCenter({ lat: lat(), lng: lng() });
        map?.panTo({ lat: lat(), lng: lng() });
        map?.setZoom(12);
      } else {
        setError(`Geocoding failed: ${status}. Please check your API key and ensure Geocoding API is enabled.`);
      }
    });
  };

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterName]: !prevFilters[filterName] }));
  };

  if (loadError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>Failed to load Google Maps. Please check your API key and try again.</AlertDescription>
      </Alert>
    );
  }

  const dataCenterIcon = useCallback((index) => ({
    url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="40" viewBox="0 0 30 40">
        <path d="M15 0C6.75 0 0 6.75 0 15c0 10.0425 15 25 15 25s15-14.9575 15-25c0-8.25-6.75-15-15-15z" fill="#4285F4"/>
        <circle cx="15" cy="15" r="7.5" fill="white"/>
        <text x="15" y="19" font-family="Arial" font-size="12" fill="#4285F4" text-anchor="middle">${index + 1}</text>
        <g transform="translate(9.75, 9.75) scale(0.525)">
          <rect x="2" y="2" width="20" height="8" rx="2" ry="2" fill="none" stroke="#4285F4" stroke-width="2"/>
          <rect x="2" y="14" width="20" height="8" rx="2" ry="2" fill="none" stroke="#4285F4" stroke-width="2"/>
          <line x1="6" y1="6" x2="6.01" y2="6" stroke="#4285F4" stroke-width="2"/>
          <line x1="6" y1="18" x2="6.01" y2="18" stroke="#4285F4" stroke-width="2"/>
        </g>
      </svg>
    `)}`,
    scaledSize: isLoaded ? new window.google.maps.Size(30, 40) : null,
    anchor: isLoaded ? new window.google.maps.Point(15, 40) : null,
  }), [isLoaded]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Center Map</h1>
      <MapControls
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        filters={filters}
        handleFilterChange={handleFilterChange}
      />
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
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.info.DC}
              onClick={() => setSelectedMarker(marker)}
              icon={dataCenterIcon(index)}
            />
          ))}
        </GoogleMap>
      ) : (
        <div className="bg-gray-200 h-[600px] rounded-lg flex items-center justify-center">
          <p className="text-xl text-gray-600">
            {apiKey ? "Loading map..." : "Google Maps API key is missing. Please add it to your .env file."}
          </p>
        </div>
      )}
      <DataCenterModal selectedMarker={selectedMarker} closeModal={() => setSelectedMarker(null)} />
    </div>
  );
};

export default Map;
