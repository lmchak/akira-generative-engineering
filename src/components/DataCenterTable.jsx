import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";

const DataCenterTable = () => {
  const [dataCenters, setDataCenters] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDataCenters();
  }, []);

  const fetchDataCenters = async () => {
    const apiUrl = 'https://msqkuenfolzzjqtupste.supabase.co/rest/v1/johor_dc';
    const apiKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zcWt1ZW5mb2x6empxdHVwc3RlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU3ODA5OTksImV4cCI6MjA0MTM1Njk5OX0.txZ1kSx8l2V-kp1RHgH-LlSoSmDTouIxoYMnIwsiBEM';

    try {
      const response = await fetch(apiUrl, {
        headers: {
          'apikey': apiKey,
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      const data = await response.json();
      setDataCenters(data);
    } catch (error) {
      console.error('Error fetching data centers:', error);
    }
  };

  const filteredDataCenters = dataCenters.filter(dc =>
    dc.DC.toLowerCase().includes(searchTerm.toLowerCase()) ||
    dc.OPERATOR.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Centers</CardTitle>
      </CardHeader>
      <CardContent>
        <Input
          type="text"
          placeholder="Search data centers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
        />
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data Center</TableHead>
              <TableHead>Operator</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead>Longitude</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDataCenters.map((dc, index) => (
              <TableRow key={index}>
                <TableCell>{dc.DC}</TableCell>
                <TableCell>{dc.OPERATOR}</TableCell>
                <TableCell>{dc.LAT}</TableCell>
                <TableCell>{dc.LONG}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default DataCenterTable;