
import React, { useState } from "react";
import Layout from "@/components/Layout";
import MobileNav from "@/components/MobileNav";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { PlusCircle, Search, MapPin, Store, Pencil, Trash2, ShoppingBag } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import StoreForm from "@/components/StoreForm";
import StoreInventoryForm from "@/components/StoreInventoryForm";

// Mock store data
const initialStores = [
  {
    id: "1",
    name: "Craft Central Market",
    address: "123 Main St, Springfield, IL 62701",
    contactName: "Jane Smith",
    contactPhone: "555-123-4567",
    contactEmail: "jane@craftcentral.com",
    commissionRate: 25,
    notes: "Busy store with good foot traffic. Best sellers are baby items.",
  },
  {
    id: "2",
    name: "Artisan Corner",
    address: "456 Oak Ave, Millville, CA 96062",
    contactName: "Mike Johnson",
    contactPhone: "555-987-6543",
    contactEmail: "mike@artisancorner.com",
    commissionRate: 30,
    notes: "Upscale boutique. High-end items sell best here.",
  },
  {
    id: "3",
    name: "The Yarn Barn",
    address: "789 Knitter Lane, Crochet City, TX 75001",
    contactName: "Susan Wilson",
    contactPhone: "555-456-7890",
    contactEmail: "susan@yarnbarn.com",
    commissionRate: 20,
    notes: "Specializes in yarn crafts. Monthly events bring in new customers.",
  },
];

// Mock product data (simplified version)
const initialProducts = [
  { id: "1", name: "Cozy Winter Scarf", price: 45.99, stock: 5, category: "Scarves" },
  { id: "2", name: "Baby Blanket - Pastel", price: 65.00, stock: 3, category: "Blankets" },
  { id: "3", name: "Amigurumi Elephant", price: 28.99, stock: 7, category: "Toys" },
  { id: "4", name: "Summer Hat", price: 32.50, stock: 4, category: "Hats" },
];

// Mock store inventory data
const initialStoreInventory = [
  {
    id: "1",
    productId: "1",
    storeId: "1",
    quantitySent: 3,
    dateSent: new Date(2024, 3, 15), // April 15, 2024
    soldCount: 1,
    lastChecked: new Date(2024, 4, 1), // May 1, 2024
    notes: "Displayed near front counter",
  },
  {
    id: "2",
    productId: "2",
    storeId: "2",
    quantitySent: 2,
    dateSent: new Date(2024, 3, 20), // April 20, 2024
    soldCount: 1,
    lastChecked: new Date(2024, 4, 5), // May 5, 2024
    notes: "Featured in baby section",
  },
  {
    id: "3",
    productId: "3",
    storeId: "3",
    quantitySent: 5,
    dateSent: new Date(2024, 3, 10), // April 10, 2024
    soldCount: 3,
    lastChecked: new Date(2024, 4, 2), // May 2, 2024
    notes: "Popular item, consider sending more",
  },
];

const Stores = () => {
  const [stores, setStores] = useState(initialStores);
  const [products] = useState(initialProducts);
  const [storeInventory, setStoreInventory] = useState(initialStoreInventory);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStore, setSelectedStore] = useState<string | null>(null);
  const [isStoreFormOpen, setIsStoreFormOpen] = useState(false);
  const [isInventoryFormOpen, setIsInventoryFormOpen] = useState(false);
  const [editingStore, setEditingStore] = useState<any | null>(null);
  const [editingInventory, setEditingInventory] = useState<any | null>(null);

  const handleAddStore = () => {
    setEditingStore(null);
    setIsStoreFormOpen(true);
  };

  const handleEditStore = (store: any) => {
    setEditingStore(store);
    setIsStoreFormOpen(true);
  };

  const handleDeleteStore = (storeId: string) => {
    // Delete the store and any related inventory
    setStores(stores.filter(s => s.id !== storeId));
    setStoreInventory(storeInventory.filter(i => i.storeId !== storeId));
    toast({
      title: "Store deleted",
      description: "The store and its inventory have been removed.",
    });
  };

  const handleSaveStore = (storeData: any) => {
    if (editingStore) {
      // Update existing store
      setStores(stores.map(s => s.id === editingStore.id ? { ...storeData, id: editingStore.id } : s));
      toast({
        title: "Store updated",
        description: "Your changes have been saved successfully.",
      });
    } else {
      // Add new store with random ID
      const newId = Math.random().toString(36).substring(2, 9);
      setStores([...stores, { ...storeData, id: newId }]);
      toast({
        title: "Store added",
        description: "New store has been added.",
      });
    }
    setIsStoreFormOpen(false);
  };

  const handleAddInventory = () => {
    setEditingInventory(null);
    setIsInventoryFormOpen(true);
  };

  const handleEditInventory = (inventory: any) => {
    setEditingInventory(inventory);
    setIsInventoryFormOpen(true);
  };

  const handleDeleteInventory = (inventoryId: string) => {
    setStoreInventory(storeInventory.filter(i => i.id !== inventoryId));
    toast({
      title: "Inventory item removed",
      description: "The inventory item has been deleted.",
    });
  };

  const handleSaveInventory = (inventoryData: any) => {
    if (editingInventory) {
      // Update existing inventory
      setStoreInventory(storeInventory.map(i => 
        i.id === editingInventory.id ? { ...inventoryData, id: editingInventory.id } : i
      ));
      toast({
        title: "Inventory updated",
        description: "Your changes have been saved successfully.",
      });
    } else {
      // Add new inventory with random ID
      const newId = Math.random().toString(36).substring(2, 9);
      setStoreInventory([...storeInventory, { ...inventoryData, id: newId }]);
      toast({
        title: "Inventory added",
        description: "New inventory item has been added.",
      });
    }
    setIsInventoryFormOpen(false);
  };

  // Filter stores based on search query
  const filteredStores = stores.filter(store => 
    store.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    store.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get inventory items for selected store or all if none selected
  const filteredInventory = storeInventory.filter(item => 
    selectedStore ? item.storeId === selectedStore : true
  );

  // Helper function to get product name
  const getProductName = (productId: string) => {
    const product = products.find(p => p.id === productId);
    return product ? product.name : "Unknown Product";
  };

  // Helper function to get store name
  const getStoreName = (storeId: string) => {
    const store = stores.find(s => s.id === storeId);
    return store ? store.name : "Unknown Store";
  };

  return (
    <>
      <MobileNav />
      <Layout>
        <PageHeader 
          title="Stores" 
          description="Manage stores and inventory"
          action={{
            label: "Add Store",
            onClick: handleAddStore,
            icon: PlusCircle
          }}
        />
        
        <Tabs defaultValue="stores" className="mb-6">
          <TabsList>
            <TabsTrigger value="stores">Stores</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
          </TabsList>
          
          <TabsContent value="stores" className="space-y-4 pt-4">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input 
                  placeholder="Search stores..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 yarn-input"
                />
              </div>
            </div>
            
            {filteredStores.length === 0 ? (
              <Card className="yarn-card">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">No stores found</p>
                  <Button onClick={handleAddStore}>Add Your First Store</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStores.map((store) => (
                  <Card key={store.id} className="yarn-card overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{store.name}</CardTitle>
                        <Badge className="bg-yarn-lilac text-foreground">
                          {store.commissionRate}% Commission
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                        <MapPin size={14} />
                        <span className="truncate">{store.address}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {store.contactName && (
                        <div className="text-sm mb-2">
                          <span className="font-medium">Contact:</span> {store.contactName}
                          {store.contactPhone && <span> • {store.contactPhone}</span>}
                        </div>
                      )}
                      
                      {store.notes && (
                        <div className="text-sm text-muted-foreground mt-2">
                          {store.notes}
                        </div>
                      )}
                      
                      <div className="mt-4 flex gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="flex-1"
                          onClick={() => {
                            setSelectedStore(store.id);
                            document.getElementById('inventory-tab')?.click();
                          }}
                        >
                          <ShoppingBag size={14} className="mr-1" /> View Inventory
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleEditStore(store)}
                        >
                          <Pencil size={14} />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => handleDeleteStore(store.id)}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="inventory" className="space-y-4 pt-4" id="inventory-tab">
            <div className="flex justify-between items-center mb-6">
              <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
                <Button 
                  variant={selectedStore === null ? "secondary" : "outline"} 
                  size="sm" 
                  onClick={() => setSelectedStore(null)}
                  className="whitespace-nowrap"
                >
                  All Stores
                </Button>
                {stores.map((store) => (
                  <Button 
                    key={store.id} 
                    variant={selectedStore === store.id ? "secondary" : "outline"} 
                    size="sm"
                    onClick={() => setSelectedStore(store.id)}
                    className="whitespace-nowrap"
                  >
                    {store.name}
                  </Button>
                ))}
              </div>
              
              <Button onClick={handleAddInventory} className="shrink-0">
                <PlusCircle size={16} className="mr-2" /> Add Inventory
              </Button>
            </div>
            
            {filteredInventory.length === 0 ? (
              <Card className="yarn-card">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">No inventory items found</p>
                  <Button onClick={handleAddInventory}>Add Your First Inventory Item</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="bg-card rounded-lg border overflow-hidden">
                <div className="grid grid-cols-12 p-4 border-b font-medium">
                  <div className="col-span-3 md:col-span-3">Product</div>
                  <div className="col-span-3 md:col-span-3">Store</div>
                  <div className="col-span-3 md:col-span-2 text-right">Sent</div>
                  <div className="col-span-2 md:col-span-2 text-right">Sold</div>
                  <div className="col-span-1 md:col-span-2 text-right">Actions</div>
                </div>
                
                {filteredInventory.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 p-4 border-b items-center">
                    <div className="col-span-3 md:col-span-3 truncate font-medium">
                      {getProductName(item.productId)}
                    </div>
                    <div className="col-span-3 md:col-span-3 truncate">
                      {getStoreName(item.storeId)}
                    </div>
                    <div className="col-span-3 md:col-span-2 text-right">
                      {item.quantitySent} {item.quantitySent === 1 ? 'item' : 'items'}
                    </div>
                    <div className="col-span-2 md:col-span-2 text-right">
                      <span className={item.soldCount > 0 ? "text-green-600" : ""}>
                        {item.soldCount} 
                        {item.quantitySent > 0 && ` (${Math.round((item.soldCount / item.quantitySent) * 100)}%)`}
                      </span>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditInventory(item)}>
                        <Pencil size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteInventory(item.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {/* Store Form Dialog */}
        <Dialog open={isStoreFormOpen} onOpenChange={setIsStoreFormOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingStore ? "Edit Store" : "Add New Store"}
              </DialogTitle>
            </DialogHeader>
            <StoreForm 
              store={editingStore}
              onSave={handleSaveStore}
              onCancel={() => setIsStoreFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
        
        {/* Inventory Form Dialog */}
        <Dialog open={isInventoryFormOpen} onOpenChange={setIsInventoryFormOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>
                {editingInventory ? "Edit Inventory" : "Add Inventory"}
              </DialogTitle>
            </DialogHeader>
            <StoreInventoryForm 
              storeInventory={editingInventory}
              products={products}
              stores={stores}
              onSave={handleSaveInventory}
              onCancel={() => setIsInventoryFormOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </Layout>
    </>
  );
};

export default Stores;
