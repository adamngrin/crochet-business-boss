
import React, { useState } from "react";
import Layout from "@/components/Layout";
import MobileNav from "@/components/MobileNav";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle, Search, Filter, Pencil, Trash2, Calendar } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import CustomOrderForm from "@/components/CustomOrderForm";
import { format } from "date-fns";

// Mock custom orders data
const initialOrders = [
  {
    id: "1",
    customerName: "Alice Johnson",
    customerEmail: "alice@example.com",
    customerPhone: "555-123-4567",
    description: "Custom baby blanket with elephant pattern in blue and gray colors.",
    startDate: new Date(2024, 4, 5), // May 5, 2024
    endDate: new Date(2024, 4, 20), // May 20, 2024
    status: "In Progress",
    price: 85.00,
    deposit: 35.00,
    notes: "Customer prefers softer yarn. Has wool allergies."
  },
  {
    id: "2",
    customerName: "Mark Thompson",
    customerEmail: "mark@example.com",
    customerPhone: "555-987-6543",
    description: "Set of 3 crocheted plant hangers in macramé style with wooden beads.",
    startDate: new Date(2024, 4, 10), // May 10, 2024
    endDate: new Date(2024, 4, 15), // May 15, 2024
    status: "Confirmed",
    price: 65.00,
    deposit: 25.00,
    notes: "Customer will provide the wooden beads."
  },
  {
    id: "3",
    customerName: "Sophia Lee",
    customerEmail: "sophia@example.com",
    customerPhone: "555-789-0123",
    description: "Custom crocheted dog sweater for a medium-sized dachshund, red with white trim.",
    startDate: new Date(2024, 4, 15), // May 15, 2024
    endDate: new Date(2024, 5, 1), // June 1, 2024
    status: "Pending",
    price: 45.00,
    deposit: 15.00,
    notes: "Need to confirm measurements before starting."
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Pending": return "bg-amber-100 text-amber-800 border-amber-200";
    case "Confirmed": return "bg-blue-100 text-blue-800 border-blue-200";
    case "In Progress": return "bg-purple-100 text-purple-800 border-purple-200";
    case "Completed": return "bg-green-100 text-green-800 border-green-200";
    case "Delivered": return "bg-teal-100 text-teal-800 border-teal-200";
    case "Cancelled": return "bg-red-100 text-red-800 border-red-200";
    default: return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const CustomOrders = () => {
  const [orders, setOrders] = useState(initialOrders);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<any | null>(null);
  
  // Get unique statuses
  const statuses = Array.from(new Set(orders.map(order => order.status)));

  const handleAddOrder = () => {
    setEditingOrder(null);
    setIsFormOpen(true);
  };

  const handleEditOrder = (order: any) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(orders.filter(o => o.id !== orderId));
    toast({
      title: "Custom order deleted",
      description: "The custom order has been removed.",
    });
  };

  const handleSaveOrder = (orderData: any) => {
    if (editingOrder) {
      // Update existing order
      setOrders(orders.map(o => o.id === editingOrder.id ? { ...orderData, id: editingOrder.id } : o));
      toast({
        title: "Custom order updated",
        description: "Your changes have been saved successfully.",
      });
    } else {
      // Add new order with random ID
      const newId = Math.random().toString(36).substring(2, 9);
      setOrders([...orders, { ...orderData, id: newId }]);
      toast({
        title: "Custom order added",
        description: "New custom order has been created.",
      });
    }
    setIsFormOpen(false);
  };

  // Filter orders based on search query and selected status
  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         order.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus ? order.status === selectedStatus : true;
    return matchesSearch && matchesStatus;
  });

  return (
    <>
      <MobileNav />
      <Layout>
        <PageHeader 
          title="Custom Orders" 
          description="Manage custom orders and scheduling"
          action={{
            label: "Add Custom Order",
            onClick: handleAddOrder,
            icon: PlusCircle
          }}
        />
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search orders..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 yarn-input"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter size={18} />
            </Button>
            <Button variant="outline" size="icon" className="shrink-0">
              <Calendar size={18} />
            </Button>
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0 mb-6">
          <Button 
            variant={selectedStatus === null ? "secondary" : "outline"} 
            size="sm" 
            onClick={() => setSelectedStatus(null)}
            className="whitespace-nowrap"
          >
            All Orders
          </Button>
          {statuses.map((status) => (
            <Button 
              key={status} 
              variant={selectedStatus === status ? "secondary" : "outline"} 
              size="sm"
              onClick={() => setSelectedStatus(status)}
              className="whitespace-nowrap"
            >
              {status}
            </Button>
          ))}
        </div>
        
        {filteredOrders.length === 0 ? (
          <Card className="yarn-card">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground mb-4">No custom orders found</p>
              <Button onClick={handleAddOrder}>Add Your First Custom Order</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="grid grid-cols-12 p-4 border-b font-medium">
              <div className="col-span-3 md:col-span-2">Customer</div>
              <div className="col-span-4 md:col-span-4">Description</div>
              <div className="hidden md:block md:col-span-2">Timeline</div>
              <div className="col-span-3 md:col-span-2 text-right">Status</div>
              <div className="hidden md:block md:col-span-1 text-right">Price</div>
              <div className="col-span-2 md:col-span-1 text-right">Actions</div>
            </div>
            
            {filteredOrders.map((order) => (
              <div key={order.id} className="grid grid-cols-12 p-4 border-b items-center">
                <div className="col-span-3 md:col-span-2 truncate font-medium">
                  {order.customerName}
                </div>
                <div className="col-span-4 md:col-span-4 truncate text-sm">
                  {order.description}
                </div>
                <div className="hidden md:block md:col-span-2 text-sm">
                  <div>{format(order.startDate, "MMM d")}</div>
                  <div className="text-muted-foreground">to {format(order.endDate, "MMM d, yyyy")}</div>
                </div>
                <div className="col-span-3 md:col-span-2 flex justify-end md:justify-center">
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
                <div className="hidden md:block md:col-span-1 text-right">
                  ${order.price.toFixed(2)}
                </div>
                <div className="col-span-2 md:col-span-1 flex justify-end gap-2">
                  <Button size="icon" variant="ghost" onClick={() => handleEditOrder(order)}>
                    <Pencil size={16} />
                  </Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDeleteOrder(order.id)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Custom Order Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingOrder ? "Edit Custom Order" : "New Custom Order"}
              </DialogTitle>
            </DialogHeader>
            <CustomOrderForm 
              order={editingOrder}
              onSave={handleSaveOrder}
              onCancel={() => setIsFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </Layout>
    </>
  );
};

export default CustomOrders;
