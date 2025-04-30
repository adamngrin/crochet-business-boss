
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, X } from "lucide-react";

// We can't modify the component directly, but we're creating a wrapper around it that maintains its interface
const ProductFormWithCustomCategories = ({
  product,
  categories,
  onSave,
  onCancel,
  onAddCategory
}) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [cost, setCost] = useState(product?.cost || 0);
  const [stock, setStock] = useState(product?.stock || 0);
  const [category, setCategory] = useState(product?.category || "");
  const [materials, setMaterials] = useState(product?.materials || []);
  const [imageUrl, setImageUrl] = useState(product?.imageUrl || "");
  const [currentMaterial, setCurrentMaterial] = useState("");
  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const handleAddMaterial = () => {
    if (currentMaterial && !materials.includes(currentMaterial)) {
      setMaterials([...materials, currentMaterial]);
      setCurrentMaterial("");
    }
  };

  const handleRemoveMaterial = (material) => {
    setMaterials(materials.filter((m) => m !== material));
  };

  const handleSubmitNewCategory = () => {
    if (newCategory && !categories.includes(newCategory)) {
      onAddCategory(newCategory);
      setCategory(newCategory);
      setIsAddCategoryOpen(false);
      setNewCategory("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      name,
      description,
      price: parseFloat(price),
      cost: parseFloat(cost),
      stock: parseInt(stock),
      category,
      materials,
      imageUrl,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter product name"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter product description"
              className="h-32"
            />
          </div>
          
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Paste image URL"
            />
            {imageUrl && (
              <div className="mt-2 relative w-20 h-20 rounded-md overflow-hidden">
                <img
                  src={imageUrl}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price">Price (₱)</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <Label htmlFor="cost">Cost (₱)</Label>
              <Input
                id="cost"
                type="number"
                min="0"
                step="0.01"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="stock">Stock Quantity</Label>
            <Input
              id="stock"
              type="number"
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
              required
            />
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label htmlFor="category">Category</Label>
              <Dialog open={isAddCategoryOpen} onOpenChange={setIsAddCategoryOpen}>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 gap-1">
                    <PlusCircle size={14} />
                    <span>Add New</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Category</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="new-category">Category Name</Label>
                      <Input
                        id="new-category"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        placeholder="Enter new category name"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsAddCategoryOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitNewCategory}>Add Category</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label>Materials</Label>
            <div className="flex gap-2 mb-2">
              <Input
                value={currentMaterial}
                onChange={(e) => setCurrentMaterial(e.target.value)}
                placeholder="Add material"
                className="flex-1"
              />
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddMaterial}
                disabled={!currentMaterial}
              >
                Add
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {materials.map((material, i) => (
                <Badge key={i} variant="secondary" className="flex items-center gap-1">
                  {material}
                  <button
                    type="button"
                    onClick={() => handleRemoveMaterial(material)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <X size={12} />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Product</Button>
      </div>
    </form>
  );
};

export default ProductFormWithCustomCategories;
