import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const SupplierAnalytics = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Dummy data for demonstration
  const supplierData = [
    { name: 'Supplier A', location: 'New York', services: 'Cooling Systems' },
    { name: 'Supplier B', location: 'London', services: 'Power Systems' },
    { name: 'Supplier C', location: 'Tokyo', services: 'Network Infrastructure' },
  ];

  const filteredSuppliers = supplierData.filter(supplier =>
    supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.services.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Supplier Analytics</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Search suppliers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Supplier</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Services</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSuppliers.map((supplier, index) => (
              <TableRow key={index}>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.location}</TableCell>
                <TableCell>{supplier.services}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default SupplierAnalytics;