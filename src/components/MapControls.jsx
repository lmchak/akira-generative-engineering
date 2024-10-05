import React from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const FilterCheckbox = ({ id, label, checked, onCheckedChange }) => (
  <div className="flex items-center space-x-2">
    <Checkbox id={id} checked={checked} onCheckedChange={onCheckedChange} />
    <label htmlFor={id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
      {label}
    </label>
  </div>
);

const MapControls = ({ searchQuery, setSearchQuery, handleSearch, filters, handleFilterChange }) => (
  <div>
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
  </div>
);

export default MapControls;