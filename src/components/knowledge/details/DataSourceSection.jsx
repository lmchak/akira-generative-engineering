import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const DataSourceSection = ({ id }) => {
  const syncHistory = [
    { id: 1, date: '2024-03-10T15:45:00', status: 'Success', filesProcessed: 25, warnings: 0 },
    { id: 2, date: '2024-03-09T14:20:00', status: 'Warning', filesProcessed: 23, warnings: 2 },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Data Source</CardTitle>
        <Button>Sync Now</Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <h3 className="font-medium">Source Details</h3>
          <p>Source: S3 Bucket (s3://datacenter-docs)</p>
          <p>Last Sync: {new Date().toLocaleString()}</p>
        </div>

        <div className="space-y-2">
          <h3 className="font-medium">Sync History</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Files Processed</TableHead>
                <TableHead>Warnings</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {syncHistory.map((sync) => (
                <TableRow key={sync.id}>
                  <TableCell>{new Date(sync.date).toLocaleString()}</TableCell>
                  <TableCell>{sync.status}</TableCell>
                  <TableCell>{sync.filesProcessed}</TableCell>
                  <TableCell>{sync.warnings}</TableCell>
                  <TableCell>
                    {sync.warnings > 0 && (
                      <Button variant="ghost" size="sm">
                        View Warnings
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataSourceSection;