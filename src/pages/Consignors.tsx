
import React, { useState } from "react";
import Layout from "@/components/Layout";
import MobileNav from "@/components/MobileNav";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle, Search, Filter, Pencil, Trash2, UserRound } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

// Mock consignor data
const initialConsignors = [
  {
    id: "1",
    name: "Maria Santos",
    email: "maria@example.com",
    phone: "0917-123-4567",
    address: "123 Sampaguita St., Quezon City",
    commissionRate: 20,
    notes: "Specializes in baby clothing items.",
    productCount: 12,
    totalSales: 15800,
  },
  {
    id: "2",
    name: "Juan Dela Cruz",
    email: "juan@example.com",
    phone: "0918-765-4321",
    address: "456 Acacia Ave., Makati City",
    commissionRate: 25,
    notes: "Provides high-quality home decor items.",
    productCount: 8,
    totalSales: 23400,
  },
  {
    id: "3",
    name: "Ana Reyes",
    email: "ana@example.com",
    phone: "0919-888-9999",
    address: "789 Narra Lane, Pasig City",
    commissionRate: 15,
    notes: "New consignor, started April 2025.",
    productCount: 5,
    totalSales: 7500,
  }
];

const Consignors = () => {
  const [consignors, setConsignors] = useState(initialConsignors);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingConsignor, setEditingConsignor] = useState<any | null>(null);
  
  const handleAddConsignor = () => {
    setEditingConsignor(null);
    setIsFormOpen(true);
  };

  const handleEditConsignor = (consignor: any) => {
    setEditingConsignor(consignor);
    setIsFormOpen(true);
  };

  const handleDeleteConsignor = (consignorId: string) => {
    setConsignors(consignors.filter(c => c.id !== consignorId));
    toast({
      title: "Consignor deleted",
      description: "The consignor has been removed.",
    });
  };

  const handleSaveConsignor = (consignorData: any) => {
    if (editingConsignor) {
      // Update existing consignor
      setConsignors(consignors.map(c => c.id === editingConsignor.id ? { ...consignorData, id: editingConsignor.id } : c));
      toast({
        title: "Consignor updated",
        description: "Your changes have been saved successfully.",
      });
    } else {
      // Add new consignor with random ID
      const newId = Math.random().toString(36).substring(2, 9);
      setConsignors([...consignors, { ...consignorData, id: newId, productCount: 0, totalSales: 0 }]);
      toast({
        title: "Consignor added",
        description: "New consignor has been added.",
      });
    }
    setIsFormOpen(false);
  };

  // Filter consignors based on search query
  const filteredConsignors = consignors.filter(consignor => 
    consignor.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    consignor.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <MobileNav />
      <Layout>
        <PageHeader 
          title="Consignors" 
          description="Manage your consignors and commission rates"
          action={{
            label: "Add Consignor",
            onClick: handleAddConsignor,
            icon: PlusCircle
          }}
        />
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search consignors..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 yarn-input"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="shrink-0">
              <Filter size={18} />
            </Button>
          </div>
        </div>
        
        {filteredConsignors.length === 0 ? (
          <Card className="yarn-card">
            <CardContent className="flex flex-col items-center justify-center py-10">
              <p className="text-muted-foreground mb-4">No consignors found</p>
              <Button onClick={handleAddConsignor}>Add Your First Consignor</Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredConsignors.map((consignor) => (
              <Card key={consignor.id} className="yarn-card overflow-hidden">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-yarn-lilac flex items-center justify-center">
                        <UserRound size={20} className="text-yarn-lavender" />
                      </div>
                      <div>
                        <h3 className="font-medium">{consignor.name}</h3>
                        <p className="text-sm text-muted-foreground">{consignor.email}</p>
                      </div>
                    </div>
                    <Badge className="bg-yarn-lilac text-foreground">
                      {consignor.commissionRate}% Commission
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-muted rounded-md p-3">
                      <p className="text-sm text-muted-foreground">Products</p>
                      <p className="font-medium">{consignor.productCount}</p>
                    </div>
                    <div className="bg-muted rounded-md p-3">
                      <p className="text-sm text-muted-foreground">Total Sales</p>
                      <p className="font-medium">₱{consignor.totalSales.toLocaleString()}</p>
                    </div>
                  </div>
                  
                  {consignor.notes && (
                    <p className="text-sm text-muted-foreground mb-4">{consignor.notes}</p>
                  )}
                  
                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" className="flex-1">View Details</Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleEditConsignor(consignor)}
                    >
                      <Pencil size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDeleteConsignor(consignor.id)}
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* Consignor Form Dialog - For a complete implementation, create a separate ConsignorForm component */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingConsignor ? "Edit Consignor" : "Add New Consignor"}
              </DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="name" className="text-right">Name</label>
                <Input
                  id="name"
                  defaultValue={editingConsignor?.name || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="email" className="text-right">Email</label>
                <Input
                  id="email"
                  type="email"
                  defaultValue={editingConsignor?.email || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="phone" className="text-right">Phone</label>
                <Input
                  id="phone"
                  defaultValue={editingConsignor?.phone || ""}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <label htmlFor="commission" className="text-right">Commission %</label>
                <Input
                  id="commission"
                  type="number"
                  defaultValue={editingConsignor?.commissionRate || "20"}
                  className="col-span-3"
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsFormOpen(false)}>Cancel</Button>
                <Button onClick={() => handleSaveConsignor({
                  name: (document.getElementById("name") as HTMLInputElement)?.value,
                  email: (document.getElementById("email") as HTMLInputElement)?.value,
                  phone: (document.getElementById("phone") as HTMLInputElement)?.value,
                  commissionRate: parseInt((document.getElementById("commission") as HTMLInputElement)?.value || "20"),
                  notes: ""
                })}>Save</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </Layout>
    </>
  );
};

export default Consignors;
