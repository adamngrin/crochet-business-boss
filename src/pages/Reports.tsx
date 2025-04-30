import React, { useState } from "react";
import Layout from "@/components/Layout";
import MobileNav from "@/components/MobileNav";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Download, Calendar, Filter } from "lucide-react";

// Mock sales data
const monthlySalesData = [
  { name: 'Jan', total: 12500 },
  { name: 'Feb', total: 18900 },
  { name: 'Mar', total: 23600 },
  { name: 'Apr', total: 29700 },
  { name: 'May', total: 25400 },
  { name: 'Jun', total: 32800 },
  { name: 'Jul', total: 38200 }
];

// Mock category data
const categoryData = [
  { name: 'Scarves', value: 25 },
  { name: 'Blankets', value: 30 },
  { name: 'Hats', value: 15 },
  { name: 'Toys', value: 20 },
  { name: 'Accessories', value: 10 }
];

// Mock store performance data
const storePerformanceData = [
  { name: 'Craft Central', sales: 45700, commission: 11425 },
  { name: 'Artisan Corner', sales: 32500, commission: 9750 },
  { name: 'The Yarn Barn', sales: 28900, commission: 5780 }
];

// Colors for charts
const COLORS = ['#9C89B8', '#F0A6CA', '#EFC3E6', '#B8BEDD', '#FFD8BE'];

const Reports = () => {
  const [period, setPeriod] = useState("year");
  
  return (
    <>
      <MobileNav />
      <Layout>
        <PageHeader 
          title="Reports" 
          description="View sales analytics and business performance"
        />
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <Card className="yarn-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱181,100</div>
              <p className="text-xs text-muted-foreground mt-1">+24% from last month</p>
            </CardContent>
          </Card>
          
          <Card className="yarn-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">69</div>
              <p className="text-xs text-muted-foreground mt-1">12 added this month</p>
            </CardContent>
          </Card>
          
          <Card className="yarn-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Profit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱98,500</div>
              <p className="text-xs text-muted-foreground mt-1">After material costs</p>
            </CardContent>
          </Card>
          
          <Card className="yarn-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Commissions Paid</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₱26,955</div>
              <p className="text-xs text-muted-foreground mt-1">To 3 consignors</p>
            </CardContent>
          </Card>
        </div>
        
        <Tabs defaultValue="sales" className="mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
            <TabsList>
              <TabsTrigger value="sales">Sales</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="stores">Stores</TabsTrigger>
              <TabsTrigger value="consignors">Consignors</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Calendar size={16} />
              </Button>
              <Button variant="outline" size="icon">
                <Filter size={16} />
              </Button>
              <Button variant="outline">
                <Download size={16} className="mr-2" />
                Export
              </Button>
            </div>
          </div>
          
          {/* Sales Tab Content */}
          <TabsContent value="sales" className="space-y-6">
            <Card className="yarn-card">
              <CardHeader>
                <CardTitle className="text-lg">Sales Overview</CardTitle>
                <CardDescription>Monthly sales performance</CardDescription>
              </CardHeader>
              <CardContent className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySalesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#EAE4E9" />
                    <XAxis dataKey="name" stroke="#9C89B8" />
                    <YAxis stroke="#9C89B8" tickFormatter={(value) => `₱${value/1000}k`} />
                    <Tooltip 
                      formatter={(value) => [`₱${Number(value).toLocaleString()}`, "Sales"]}
                      contentStyle={{ 
                        backgroundColor: "#FFF8E8", 
                        borderColor: "#EAE4E9",
                        borderRadius: "8px" 
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="total" 
                      stroke="#9C89B8" 
                      strokeWidth={2}
                      dot={{ fill: "#9C89B8" }}
                      activeDot={{ r: 6, stroke: "#F0A6CA", strokeWidth: 2, fill: "#9C89B8" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="yarn-card">
                <CardHeader>
                  <CardTitle className="text-lg">Sales by Category</CardTitle>
                  <CardDescription>Product category distribution</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, "Sales Share"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              
              <Card className="yarn-card">
                <CardHeader>
                  <CardTitle className="text-lg">Store Performance</CardTitle>
                  <CardDescription>Sales by store location</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={storePerformanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `₱${value/1000}k`} />
                      <Tooltip formatter={(value) => [`₱${Number(value).toLocaleString()}`, "Amount"]} />
                      <Legend />
                      <Bar dataKey="sales" name="Total Sales" fill="#9C89B8" />
                      <Bar dataKey="commission" name="Commission" fill="#F0A6CA" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Other tabs - For a complete implementation, add content for other tabs */}
          <TabsContent value="products">
            <Card className="yarn-card">
              <CardHeader>
                <CardTitle className="text-lg">Product Performance</CardTitle>
                <CardDescription>Top selling products</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Product analytics will be shown here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stores">
            <Card className="yarn-card">
              <CardHeader>
                <CardTitle className="text-lg">Store Analytics</CardTitle>
                <CardDescription>Performance across different stores</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Store analytics will be shown here</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="consignors">
            <Card className="yarn-card">
              <CardHeader>
                <CardTitle className="text-lg">Consignor Performance</CardTitle>
                <CardDescription>Sales by consignor</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-8 text-muted-foreground">Consignor analytics will be shown here</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Layout>
    </>
  );
};

export default Reports;
