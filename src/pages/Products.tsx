
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
import { PlusCircle, Search, Filter, Tag, Pencil, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import ProductForm from "@/components/ProductForm";
import ProductCard from "@/components/ProductCard";

// Initial categories
const initialCategories = [
  "Scarves",
  "Blankets",
  "Hats",
  "Toys",
  "Decorations",
  "Clothing",
  "Accessories",
  "Other"
];

// Mock product data
const initialProducts = [
  {
    id: "1", 
    name: "Cozy Winter Scarf", 
    description: "A warm scarf made with soft merino wool blend",
    price: 45.99,
    cost: 15.25,
    stock: 5,
    category: "Scarves",
    materials: ["Merino Wool", "Acrylic"],
    imageUrl: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "2", 
    name: "Baby Blanket - Pastel", 
    description: "Soft, hypoallergenic blanket for babies in pastel colors",
    price: 65.00,
    cost: 22.50,
    stock: 3,
    category: "Blankets",
    materials: ["Cotton", "Polyester"],
    imageUrl: "https://images.unsplash.com/photo-1617688997460-f8f756894d71?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "3", 
    name: "Amigurumi Elephant", 
    description: "Cute elephant toy, perfect for babies and children",
    price: 28.99,
    cost: 8.75,
    stock: 7,
    category: "Toys",
    materials: ["Cotton Yarn", "Polyester Filling"],
    imageUrl: "https://images.unsplash.com/photo-1543886151-3bc2b944c718?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "4", 
    name: "Summer Hat", 
    description: "Light, breathable summer hat with wide brim",
    price: 32.50,
    cost: 10.00,
    stock: 4,
    category: "Hats",
    materials: ["Cotton"],
    imageUrl: "https://images.unsplash.com/photo-1572307480813-ceb0e59d8325?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "5", 
    name: "Flower Bouquet", 
    description: "Everlasting bouquet of crochet flowers",
    price: 39.99,
    cost: 12.75,
    stock: 2,
    category: "Decorations",
    materials: ["Cotton Yarn", "Wire"],
    imageUrl: "https://images.unsplash.com/photo-1464454709131-ffd692591ee5?q=80&w=300&h=300&auto=format&fit=crop",
  },
  {
    id: "6", 
    name: "Chunky Throw Blanket", 
    description: "Extra thick and warm throw blanket for winter",
    price: 89.99,
    cost: 35.00,
    stock: 3,
    category: "Blankets",
    materials: ["Chunky Yarn", "Wool"],
    imageUrl: "https://images.unsplash.com/photo-1580229080435-1c7ebe507d1a?q=80&w=300&h=300&auto=format&fit=crop",
  },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [categories, setCategories] = useState(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsFormOpen(true);
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setIsFormOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    // In a real app, confirm before deleting
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: "Product deleted",
      description: "The product has been removed from your inventory.",
    });
  };

  const handleAddCategory = (newCategory: string) => {
    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      toast({
        title: "Category added",
        description: `New category "${newCategory}" has been created.`,
      });
    }
  };

  const handleSaveProduct = (productData: any) => {
    if (editingProduct) {
      // Update existing product
      setProducts(products.map(p => p.id === editingProduct.id ? { ...productData, id: editingProduct.id } : p));
      toast({
        title: "Product updated",
        description: "Your changes have been saved successfully.",
      });
    } else {
      // Add new product with random ID
      const newId = Math.random().toString(36).substring(2, 9);
      setProducts([...products, { ...productData, id: newId }]);
      toast({
        title: "Product added",
        description: "New product has been added to your inventory.",
      });
    }
    setIsFormOpen(false);
  };

  // Filter products based on search query and selected category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories from products (in case there are categories not in our list)
  const productCategories = Array.from(new Set(products.map(product => product.category)));

  return (
    <>
      <MobileNav />
      <Layout>
        <PageHeader 
          title="Products" 
          description="Manage your crochet products"
          action={{
            label: "Add Product",
            onClick: handleAddProduct,
            icon: PlusCircle
          }}
        />
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search products..." 
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
              <Tag size={18} />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="grid" className="mb-6">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2 md:pb-0">
              <Button 
                variant={selectedCategory === null ? "secondary" : "outline"} 
                size="sm" 
                onClick={() => setSelectedCategory(null)}
                className="whitespace-nowrap"
              >
                All
              </Button>
              {productCategories.map((category) => (
                <Button 
                  key={category} 
                  variant={selectedCategory === category ? "secondary" : "outline"} 
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="whitespace-nowrap"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <TabsContent value="grid" className="mt-6">
            {filteredProducts.length === 0 ? (
              <Card className="yarn-card">
                <CardContent className="flex flex-col items-center justify-center py-10">
                  <p className="text-muted-foreground mb-4">No products found</p>
                  <Button onClick={handleAddProduct}>Add Your First Product</Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id}
                    product={product}
                    onEdit={() => handleEditProduct(product)}
                    onDelete={() => handleDeleteProduct(product.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="list">
            <div className="bg-card rounded-lg border overflow-hidden">
              <div className="grid grid-cols-12 p-4 border-b font-medium">
                <div className="col-span-4 md:col-span-3">Product</div>
                <div className="hidden md:block md:col-span-3">Category</div>
                <div className="col-span-3 md:col-span-2 text-right">Price</div>
                <div className="col-span-3 md:col-span-2 text-right">Stock</div>
                <div className="col-span-2 md:col-span-2 text-right">Actions</div>
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="p-8 text-center text-muted-foreground">
                  No products found
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div key={product.id} className="grid grid-cols-12 p-4 border-b items-center">
                    <div className="col-span-4 md:col-span-3 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-md bg-muted overflow-hidden">
                        {product.imageUrl && (
                          <img 
                            src={product.imageUrl} 
                            alt={product.name} 
                            className="w-full h-full object-cover" 
                          />
                        )}
                      </div>
                      <div className="truncate">{product.name}</div>
                    </div>
                    <div className="hidden md:block md:col-span-3">
                      <Badge variant="secondary">{product.category}</Badge>
                    </div>
                    <div className="col-span-3 md:col-span-2 text-right">${product.price.toFixed(2)}</div>
                    <div className="col-span-3 md:col-span-2 text-right">{product.stock}</div>
                    <div className="col-span-2 md:col-span-2 flex justify-end gap-2">
                      <Button size="icon" variant="ghost" onClick={() => handleEditProduct(product)}>
                        <Pencil size={16} />
                      </Button>
                      <Button size="icon" variant="ghost" onClick={() => handleDeleteProduct(product.id)}>
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Product Form Dialog */}
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? "Edit Product" : "Add New Product"}
              </DialogTitle>
            </DialogHeader>
            <ProductForm 
              product={editingProduct}
              categories={categories}
              onSave={handleSaveProduct}
              onCancel={() => setIsFormOpen(false)}
              onAddCategory={handleAddCategory}
            />
          </DialogContent>
        </Dialog>
      </Layout>
    </>
  );
};

export default Products;
