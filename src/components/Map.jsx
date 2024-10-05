import { useState, useEffect, useCallback, useMemo } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { supabase } from '@/lib/supabase';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const mapContainerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 1.4927,
  lng: 103.7414,
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
  const [dataCenters, setDataCenters] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);

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

  useEffect(() => {
    fetchDataCenters();
  }, []);

  const fetchDataCenters = async () => {
    try {
      const { data, error } = await supabase
        .from('johor_dc')
        .select('*');

      if (error) throw error;
      setDataCenters(data);
      setMarkers(data.map(dc => ({
        lat: parseFloat(dc.LAT),
        lng: parseFloat(dc.LONG),
        info: dc
      })));
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
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const closeModal = () => {
    setSelectedMarker(null);
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
            <Marker
              key={index}
              position={{ lat: marker.lat, lng: marker.lng }}
              title={marker.info.DC}
              onClick={() => handleMarkerClick(marker)}
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

      <Dialog open={!!selectedMarker} onOpenChange={closeModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedMarker?.info.DC}</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <div className="space-y-2">
              <p><strong>Operator:</strong> {selectedMarker?.info.OPERATOR}</p>
              <p><strong>Facility Name:</strong> {selectedMarker?.info['FACILITY NAME']}</p>
              <p><strong>Address:</strong> {selectedMarker?.info.ADDRESS}</p>
              <p><strong>Market:</strong> {selectedMarker?.info.MARKET}</p>
              <p><strong>Region:</strong> {selectedMarker?.info.REGION}</p>
              <p><strong>Status:</strong> {selectedMarker?.info.STATUS}</p>
              <p><strong>Year:</strong> {selectedMarker?.info.YEAR}</p>
              <p><strong>Total Live Capacity:</strong> {selectedMarker?.info['TOTAL LIVE CAPACITY (MW)']} MW</p>
              <p><strong>2023 Capacity:</strong> {selectedMarker?.info['2023 CAPACITY (MW)']} MW</p>
              <p><strong>2024 Capacity:</strong> {selectedMarker?.info['2024 CAPACITY (MW)']} MW</p>
              <p><strong>2025 Capacity:</strong> {selectedMarker?.info['2025 CAPACITY (MW)']} MW</p>
              <p><strong>Planned Capacity:</strong> {selectedMarker?.info['PLANNED CAPACITY (MW)']} MW</p>
            </div>
          </DialogDescription>
        </DialogContent>
      </Dialog>
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
