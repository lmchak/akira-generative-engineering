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

  const createMarkerLabel = (index) => ({
    text: `${index + 1}`,
    color: '#FFFFFF',
    fontSize: '14px',
    fontWeight: 'bold'
  });

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
              label={createMarkerLabel(index)}
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