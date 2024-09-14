import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';

const ResourceManagement = () => {
  const [allocatedResources, setAllocatedResources] = useState([]);
  const [capacityForecast, setCapacityForecast] = useState(null);
  const [vendorStatus, setVendorStatus] = useState([]);

  const simulateResourceAllocation = () => {
    const resources = [
      { name: "John Doe", role: "Senior Engineer", availability: "80%", expertise: "Structural Design" },
      { name: "Jane Smith", role: "Project Manager", availability: "100%", expertise: "MEP Systems" },
      { name: "Bob Johnson", role: "Contractor", availability: "60%", expertise: "Electrical Systems" },
    ];
    setAllocatedResources(resources);
  };

  const simulateCapacityPlanning = () => {
    const forecast = {
      currentCapacity: "85%",
      projectedNeed: "110%",
      potentialShortfall: "25%",
      recommendedAction: "Consider hiring additional temporary staff or contractors."
    };
    setCapacityForecast(forecast);
  };

  const simulateVendorManagement = () => {
    const vendors = [
      { name: "Steel Supplies Co.", contract: "Active", nextDelivery: "2024-03-15", status: "On Time" },
      { name: "Electrical Systems Inc.", contract: "Pending Renewal", nextDelivery: "2024-03-20", status: "Potential Delay" },
      { name: "Concrete Solutions", contract: "Active", nextDelivery: "2024-03-18", status: "On Time" },
    ];
    setVendorStatus(vendors);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Management</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-2">Optimal Resource Allocation</h3>
          <Button onClick={simulateResourceAllocation}>Recommend Allocations</Button>
          {allocatedResources.length > 0 && (
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Availability</TableHead>
                  <TableHead>Expertise</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allocatedResources.map((resource, index) => (
                  <TableRow key={index}>
                    <TableCell>{resource.name}</TableCell>
                    <TableCell>{resource.role}</TableCell>
                    <TableCell>{resource.availability}</TableCell>
                    <TableCell>{resource.expertise}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Capacity Planning</h3>
          <Button onClick={simulateCapacityPlanning}>Forecast Capacity</Button>
          {capacityForecast && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Capacity Forecast</AlertTitle>
              <AlertDescription>
                <p>Current Capacity: {capacityForecast.currentCapacity}</p>
                <p>Projected Need: {capacityForecast.projectedNeed}</p>
                <p>Potential Shortfall: {capacityForecast.potentialShortfall}</p>
                <p>Recommended Action: {capacityForecast.recommendedAction}</p>
              </AlertDescription>
            </Alert>
          )}
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-2">Supplier & Vendor Management</h3>
          <Button onClick={simulateVendorManagement}>Update Vendor Status</Button>
          {vendorStatus.length > 0 && (
            <Table className="mt-4">
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Contract Status</TableHead>
                  <TableHead>Next Delivery</TableHead>
                  <TableHead>Delivery Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendorStatus.map((vendor, index) => (
                  <TableRow key={index}>
                    <TableCell>{vendor.name}</TableCell>
                    <TableCell>{vendor.contract}</TableCell>
                    <TableCell>{vendor.nextDelivery}</TableCell>
                    <TableCell>{vendor.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </section>
      </CardContent>
    </Card>
  );
};

export default ResourceManagement;
