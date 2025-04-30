
import React, { useState } from "react";
import Layout from "@/components/Layout";
import MobileNav from "@/components/MobileNav";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Users, Calendar, DollarSign, TrendingUp, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

// Mock data
const salesData = [
  { name: 'Jan', amount: 400 },
  { name: 'Feb', amount: 300 },
  { name: 'Mar', amount: 600 },
  { name: 'Apr', amount: 800 },
  { name: 'May', amount: 1000 },
  { name: 'Jun', amount: 900 },
  { name: 'Jul', amount: 1200 }
];

const inventoryData = [
  { category: 'Scarves', count: 24 },
  { category: 'Blankets', count: 13 },
  { category: 'Hats', count: 18 },
  { category: 'Toys', count: 9 },
  { category: 'Sweaters', count: 5 },
];

const recentSales = [
  { id: 1, product: 'Cozy Blanket', price: 65, date: '2025-04-29' },
  { id: 2, product: 'Baby Hat', price: 22, date: '2025-04-29' },
  { id: 3, product: 'Amigurumi Bunny', price: 35, date: '2025-04-28' },
  { id: 4, product: 'Scarf Set', price: 48, date: '2025-04-27' },
];

// Stats cards data
const statsCards = [
  {
    title: "Total Products",
    value: "69",
    description: "12 added this month",
    icon: Package,
    color: "text-yarn-lavender",
  },
  {
    title: "Total Sales",
    value: "$4,320",
    description: "+18% from last month",
    icon: DollarSign,
    color: "text-yarn-sage",
  },
  {
    title: "Active Consignors",
    value: "14",
    description: "3 joined recently",
    icon: Users,
    color: "text-yarn-rose",
  },
  {
    title: "Upcoming Events",
    value: "2",
    description: "Next: Craft Fair (May 15)",
    icon: Calendar,
    color: "text-yarn-mauve",
  },
];

const Index = () => {
  const navigate = useNavigate();
  const [activePeriod, setActivePeriod] = useState("month");

  const handleCreateProduct = () => {
    navigate("/products/new");
  };

  return (
    <>
      <MobileNav />
      <Layout>
        <PageHeader 
          title="Welcome to Catherine Crochets" 
          description="Manage your crochet business with ease"
          action={{
            label: "New Product",
            onClick: handleCreateProduct,
            icon: PlusCircle
          }}
        />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {statsCards.map((card, index) => (
            <Card key={index} className="yarn-card">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg font-medium">{card.title}</CardTitle>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Sales Overview */}
          <Card className="yarn-card">
            <CardHeader>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <CardTitle className="text-lg">Sales Overview</CardTitle>
                  <CardDescription>Your revenue over time</CardDescription>
                </div>
                <div className="flex space-x-1">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={activePeriod === "week" ? "bg-muted" : ""}
                    onClick={() => setActivePeriod("week")}
                  >
                    Week
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={activePeriod === "month" ? "bg-muted" : ""}
                    onClick={() => setActivePeriod("month")}
                  >
                    Month
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className={activePeriod === "year" ? "bg-muted" : ""}
                    onClick={() => setActivePeriod("year")}
                  >
                    Year
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EAE4E9" />
                  <XAxis dataKey="name" stroke="#9C89B8" />
                  <YAxis stroke="#9C89B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#FFF8E8", 
                      borderColor: "#EAE4E9",
                      borderRadius: "8px" 
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    name="Revenue ($)" 
                    stroke="#9C89B8" 
                    strokeWidth={2}
                    dot={{ fill: "#9C89B8" }}
                    activeDot={{ r: 6, stroke: "#F0A6CA", strokeWidth: 2, fill: "#9C89B8" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Inventory Overview */}
          <Card className="yarn-card">
            <CardHeader>
              <CardTitle className="text-lg">Inventory Overview</CardTitle>
              <CardDescription>Products by category</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={inventoryData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#EAE4E9" />
                  <XAxis dataKey="category" stroke="#9C89B8" />
                  <YAxis stroke="#9C89B8" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#FFF8E8", 
                      borderColor: "#EAE4E9",
                      borderRadius: "8px" 
                    }} 
                  />
                  <Bar 
                    dataKey="count" 
                    name="Count" 
                    fill="#F0A6CA"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Sales & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Sales */}
          <Card className="yarn-card lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg">Recent Sales</CardTitle>
                <CardDescription>Your latest transactions</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="text-xs">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div key={sale.id} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center bg-yarn-lilac">
                        <ShoppingBag size={16} className="text-yarn-lavender" />
                      </div>
                      <div>
                        <p className="font-medium">{sale.product}</p>
                        <p className="text-xs text-muted-foreground">{sale.date}</p>
                      </div>
                    </div>
                    <div className="font-medium">${sale.price.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Quick Actions */}
          <Card className="yarn-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
              <CardDescription>Frequently used tools</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
              <Button className="bg-yarn-lavender text-white border-none hover:bg-yarn-lavender/90 justify-start">
                <Package size={16} className="mr-2" />
                Add New Product
              </Button>
              <Button className="bg-yarn-rose text-white border-none hover:bg-yarn-rose/90 justify-start">
                <ShoppingBag size={16} className="mr-2" />
                Record Sale
              </Button>
              <Button className="bg-yarn-sage text-white border-none hover:bg-yarn-sage/90 justify-start">
                <TrendingUp size={16} className="mr-2" />
                Price Calculator
              </Button>
              <Button variant="outline" className="justify-start">
                <Users size={16} className="mr-2" />
                Manage Consignors
              </Button>
            </CardContent>
          </Card>
        </div>
      </Layout>
    </>
  );
};

export default Index;
