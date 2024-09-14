import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '../lib/supabase';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState("market");
  const [selectedRegion, setSelectedRegion] = useState("EMEA");
  const [selectedSegment, setSelectedSegment] = useState("colocation");
  const [marketData, setMarketData] = useState([]);
  const [companyData, setCompanyData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFrame, setTimeFrame] = useState("quarterly");
  const [capacityType, setCapacityType] = useState("all");

  useEffect(() => {
    fetchMarketData();
    fetchCompanyData();
    fetchSupplierData();
  }, [selectedRegion, selectedSegment, timeFrame, capacityType]);

  const fetchMarketData = async () => {
    const { data, error } = await supabase
      .from('market_data')
      .select('*')
      .eq('region', selectedRegion)
      .eq('segment', selectedSegment);

    if (error) {
      console.error('Error fetching market data:', error);
    } else {
      setMarketData(data);
    }
  };

  const fetchCompanyData = async () => {
    const { data, error } = await supabase
      .from('company_data')
      .select('*')
      .eq('region', selectedRegion);

    if (error) {
      console.error('Error fetching company data:', error);
    } else {
      setCompanyData(data);
    }
  };

  const fetchSupplierData = async () => {
    const { data, error } = await supabase
      .from('supplier_data')
      .select('*')
      .ilike('name', `%${searchTerm}%`);

    if (error) {
      console.error('Error fetching supplier data:', error);
    } else {
      setSupplierData(data);
    }
  };

  const handleGenerateReport = () => {
    console.log("Generating report...");
  };

  const MarketHighlights = () => (
    <Card>
      <CardHeader>
        <CardTitle>Market Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold">Live Megawatts</h3>
            <p>{marketData.reduce((sum, item) => sum + item.liveMW, 0)} MW</p>
          </div>
          <div>
            <h3 className="font-bold">Pipeline Megawatts</h3>
            <p>{marketData.reduce((sum, item) => sum + item.pipelineMW, 0)} MW</p>
          </div>
          <div>
            <h3 className="font-bold">Availability Rate</h3>
            <p>{(marketData.reduce((sum, item) => sum + item.availabilityRate, 0) / marketData.length).toFixed(2)}%</p>
          </div>
          <div>
            <h3 className="font-bold">Colocation %</h3>
            <p>{(marketData.filter(item => item.segment === 'colocation').length / marketData.length * 100).toFixed(2)}%</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const MarketLeaderboard = () => (
    <Card>
      <CardHeader>
        <CardTitle>Market Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={capacityType} onValueChange={setCapacityType}>
          <SelectTrigger>
            <SelectValue placeholder="Select Capacity Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Capacity</SelectItem>
            <SelectItem value="live">Live Capacity</SelectItem>
            <SelectItem value="pipeline">Pipeline Capacity</SelectItem>
          </SelectContent>
        </Select>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>Operator</th>
              <th>Capacity (MW)</th>
            </tr>
          </thead>
          <tbody>
            {companyData
              .sort((a, b) => b[capacityType === 'all' ? 'totalMW' : capacityType + 'MW'] - a[capacityType === 'all' ? 'totalMW' : capacityType + 'MW'])
              .slice(0, 5)
              .map((company, index) => (
                <tr key={index}>
                  <td>{company.name}</td>
                  <td>{company[capacityType === 'all' ? 'totalMW' : capacityType + 'MW']} MW</td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  );

  const SupplyAndTakeup = () => (
    <Card>
      <CardHeader>
        <CardTitle>Supply and Take-up</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger>
            <SelectValue placeholder="Select Time Frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="supplyMW" stroke="#8884d8" name="Supply (MW)" />
            <Line type="monotone" dataKey="takeupMW" stroke="#82ca9d" name="Take-up (MW)" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const NewTakeupByType = () => (
    <Card>
      <CardHeader>
        <CardTitle>New Take-up by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <Select value={timeFrame} onValueChange={setTimeFrame}>
          <SelectTrigger>
            <SelectValue placeholder="Select Time Frame" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="quarterly">Quarterly</SelectItem>
            <SelectItem value="yearly">Yearly</SelectItem>
          </SelectContent>
        </Select>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="colocationTakeup" stackId="a" fill="#8884d8" name="Colocation" />
            <Bar dataKey="selfBuildTakeup" stackId="a" fill="#82ca9d" name="Self-build" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const SupplyPipeline = () => (
    <Card>
      <CardHeader>
        <CardTitle>Supply Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={marketData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="liveMW" stackId="a" fill="#8884d8" name="Live" />
            <Bar dataKey="pipelineMW" stackId="a" fill="#82ca9d" name="Pipeline" />
            <Bar dataKey="availableMW" stackId="b" fill="#ffc658" name="Available" />
            <Bar dataKey="contractedMW" stackId="b" fill="#ff8042" name="Contracted" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const MarketShare = () => (
    <Card>
      <CardHeader>
        <CardTitle>Market Share</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={companyData}
              dataKey="totalMW"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {companyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={`#${Math.floor(Math.random()*16777215).toString(16)}`} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );

  const CompanyAnalytics = () => (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Global Highlights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-bold">Total Capacity</h3>
              <p>{companyData.reduce((sum, item) => sum + item.totalMW, 0)} MW</p>
            </div>
            <div>
              <h3 className="font-bold">Live Capacity</h3>
              <p>{companyData.reduce((sum, item) => sum + item.liveMW, 0)} MW</p>
            </div>
            <div>
              <h3 className="font-bold">Pipeline Capacity</h3>
              <p>{companyData.reduce((sum, item) => sum + item.pipelineMW, 0)} MW</p>
            </div>
            <div>
              <h3 className="font-bold">Number of Facilities</h3>
              <p>{companyData.reduce((sum, item) => sum + item.facilityCount, 0)}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Market Skew</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={companyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="facilityCount" fill="#8884d8" name="Facility Count" />
              <Bar yAxisId="right" dataKey="marketSharePercentage" fill="#82ca9d" name="Market Share %" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Facility Deployed Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={companyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="facilityCount" stroke="#8884d8" name="Facility Count" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Center Analytics</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="market">Market Analytics</TabsTrigger>
          <TabsTrigger value="company">Company Analytics</TabsTrigger>
          <TabsTrigger value="supplier">Supplier Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="market">
          <div className="flex space-x-4 mb-4">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="EMEA">EMEA</SelectItem>
                <SelectItem value="APAC">APAC</SelectItem>
                <SelectItem value="Americas">Americas</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedSegment} onValueChange={setSelectedSegment}>
              <SelectTrigger>
                <SelectValue placeholder="Select Segment" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="colocation">Colocation</SelectItem>
                <SelectItem value="self-build">Self-build</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleGenerateReport}>Generate Report</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <MarketHighlights />
            <MarketLeaderboard />
            <SupplyAndTakeup />
            <NewTakeupByType />
            <SupplyPipeline />
            <MarketShare />
          </div>
        </TabsContent>
        <TabsContent value="company">
          <CompanyAnalytics />
        </TabsContent>
        <TabsContent value="supplier">
          <Card>
            <CardHeader>
              <CardTitle>Supplier Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Search suppliers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplier</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {supplierData.map((supplier, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">{supplier.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{supplier.location}</td>
                      <td className="px-6 py-4 whitespace-nowrap">{supplier.services}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;