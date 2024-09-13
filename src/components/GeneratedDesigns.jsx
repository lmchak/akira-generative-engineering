import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const GeneratedDesigns = ({ designs }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Generated Cooling Layouts</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Layout</TableHead>
              <TableHead>Energy Efficiency (%)</TableHead>
              <TableHead>Cooling Performance (%)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {designs.map((design) => (
              <TableRow key={design.id}>
                <TableCell>{design.layout}</TableCell>
                <TableCell>{design.efficiency}</TableCell>
                <TableCell>{design.performance}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default GeneratedDesigns;