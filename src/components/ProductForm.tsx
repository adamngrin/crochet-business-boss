
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, Upload, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  product?: {
    id?: string;
    name: string;
    description: string;
    price: number;
    cost: number;
    stock: number;
    category: string;
    materials: string[];
    imageUrl?: string;
  } | null;
  onSave: (productData: any) => void;
  onCancel: () => void;
}

const categories = [
  "Scarves",
  "Blankets",
  "Hats",
  "Toys",
  "Decorations",
  "Clothing",
  "Accessories",
  "Other"
];

const ProductForm = ({ product, onSave, onCancel }: ProductFormProps) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    cost: product?.cost || 0,
    stock: product?.stock || 0,
    category: product?.category || categories[0],
    materials: product?.materials || [],
    imageUrl: product?.imageUrl || "",
  });
  
  const [newMaterial, setNewMaterial] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "cost" || name === "stock" 
        ? parseFloat(value) || 0 
        : value
    });
    
    // Clear error for this field
    if (errors[name]) {
      const { [name]: _, ...rest } = errors;
      setErrors(rest);
    }
  };
  
  const handleSelectChange = (value: string, field: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  const handleAddMaterial = () => {
    if (newMaterial.trim() && !formData.materials.includes(newMaterial.trim())) {
      setFormData({
        ...formData,
        materials: [...formData.materials, newMaterial.trim()]
      });
      setNewMaterial("");
    }
  };
  
  const handleRemoveMaterial = (materialToRemove: string) => {
    setFormData({
      ...formData,
      materials: formData.materials.filter(material => material !== materialToRemove)
    });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload this file to a server and get a URL back
      // For this demo, we'll create a fake URL
      const fakeImageUrl = URL.createObjectURL(file);
      setFormData({
        ...formData,
        imageUrl: fakeImageUrl
      });
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (formData.price <= 0) newErrors.price = "Price must be greater than zero";
    if (formData.stock < 0) newErrors.stock = "Stock cannot be negative";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        {/* Image Upload */}
        <div>
          <Label htmlFor="image" className="block mb-2">Product Image</Label>
          <div className="flex items-center gap-4">
            <div 
              className={cn(
                "w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center overflow-hidden",
                formData.imageUrl ? "border-none" : "border-yarn-dust"
              )}
            >
              {formData.imageUrl ? (
                <img 
                  src={formData.imageUrl} 
                  alt="Product" 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <Upload size={24} className="text-muted-foreground" />
              )}
            </div>
            <div className="flex-1">
              <Input
                id="image"
                type="file"
                accept="image/*"
                className="yarn-input"
                onChange={handleImageUpload}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Upload a clear image of your product (max 5MB)
              </p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product Name */}
          <div className="md:col-span-2">
            <Label htmlFor="name" className={cn("block mb-1", errors.name && "text-destructive")}>
              Product Name*
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={cn("yarn-input", errors.name && "border-destructive")}
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
          </div>
          
          {/* Category */}
          <div>
            <Label htmlFor="category" className="block mb-1">Category</Label>
            <Select 
              value={formData.category} 
              onValueChange={(value) => handleSelectChange(value, "category")}
            >
              <SelectTrigger className="yarn-input">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Stock */}
          <div>
            <Label htmlFor="stock" className={cn("block mb-1", errors.stock && "text-destructive")}>
              Stock Quantity
            </Label>
            <Input
              id="stock"
              name="stock"
              type="number"
              value={formData.stock.toString()}
              onChange={handleChange}
              className={cn("yarn-input", errors.stock && "border-destructive")}
              min="0"
            />
            {errors.stock && <p className="text-xs text-destructive mt-1">{errors.stock}</p>}
          </div>
        </div>
        
        {/* Description */}
        <div>
          <Label htmlFor="description" className={cn("block mb-1", errors.description && "text-destructive")}>
            Description*
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={cn("yarn-input min-h-24", errors.description && "border-destructive")}
          />
          {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
        </div>
        
        <Separator />
        
        {/* Price & Cost */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="price" className={cn("block mb-1", errors.price && "text-destructive")}>
              Price ($)*
            </Label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price.toString()}
                onChange={handleChange}
                className={cn("yarn-input pl-8", errors.price && "border-destructive")}
                step="0.01"
                min="0"
              />
            </div>
            {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
          </div>
          
          <div>
            <Label htmlFor="cost" className="block mb-1">
              Cost ($) <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <div className="relative">
              <DollarSign size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                id="cost"
                name="cost"
                type="number"
                value={formData.cost.toString()}
                onChange={handleChange}
                className="yarn-input pl-8"
                step="0.01"
                min="0"
              />
            </div>
            {formData.cost > 0 && formData.price > 0 && (
              <p className="text-xs mt-1">
                Profit margin: {((formData.price - formData.cost) / formData.price * 100).toFixed(0)}%
              </p>
            )}
          </div>
        </div>
        
        {/* Materials */}
        <div>
          <Label className="block mb-2">Materials</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.materials.map((material, index) => (
              <div 
                key={index}
                className="flex items-center gap-1 bg-yarn-lilac rounded-full px-3 py-1 text-sm"
              >
                <span>{material}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveMaterial(material)}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newMaterial}
              onChange={(e) => setNewMaterial(e.target.value)}
              placeholder="Add material"
              className="yarn-input"
            />
            <Button 
              type="button" 
              variant="outline" 
              size="icon" 
              onClick={handleAddMaterial}
              disabled={!newMaterial.trim()}
            >
              <Plus size={16} />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="yarn-gradient text-white border-none hover:opacity-90">
          {product ? "Update Product" : "Add Product"}
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
