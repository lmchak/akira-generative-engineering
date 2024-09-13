import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from 'lucide-react';

const FacilityManagement = () => {
  const [coolingData, setCoolingData] = useState([]);
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    // Simulated data fetching
    const fetchData = () => {
      const newData = {
        timestamp: new Date().toLocaleTimeString(),
        coolantFlow: Math.random() * 100 + 50,
        pumpEfficiency: Math.random() * 20 + 80,
        temperature: Math.random() * 10 + 20,
      };
      setCoolingData(prevData => [...prevData.slice(-19), newData]);

      // Simulated AI prediction for maintenance needs
      if (Math.random() > 0.9) {
        setAlerts(prevAlerts => [...prevAlerts, {
          id: Date.now(),
          message: "Predicted maintenance needed for pump system within next 48 hours."
        }]);
      }

      // Simulated alert for cooling inefficiencies
      if (newData.pumpEfficiency < 85) {
        setAlerts(prevAlerts => [...prevAlerts, {
          id: Date.now(),
          message: `Low pump efficiency detected: ${newData.pumpEfficiency.toFixed(2)}%`
        }]);
      }
    };

    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Facility Management Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Coolant Flow Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={coolingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="coolantFlow" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pump Efficiency</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={coolingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pumpEfficiency" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Temperature Data</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={coolingData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="temperature" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Alerts and Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {alerts.slice(-5).map(alert => (
                <Alert key={alert.id} variant="destructive">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Alert</AlertTitle>
                  <AlertDescription>{alert.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FacilityManagement;