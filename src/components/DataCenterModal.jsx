import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const DataCenterModal = ({ selectedMarker, closeModal }) => (
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
);

export default DataCenterModal;