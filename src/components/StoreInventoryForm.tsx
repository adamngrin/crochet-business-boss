
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface StoreInventoryFormProps {
  storeInventory?: {
    id?: string;
    productId: string;
    storeId: string;
    quantitySent: number;
    dateSent: Date | undefined;
    soldCount: number;
    lastChecked: Date | undefined;
    notes: string;
  } | null;
  products: any[];
  stores: any[];
  onSave: (inventoryData: any) => void;
  onCancel: () => void;
}

const StoreInventoryForm = ({ storeInventory, products, stores, onSave, onCancel }: StoreInventoryFormProps) => {
  const [formData, setFormData] = useState({
    productId: storeInventory?.productId || (products.length > 0 ? products[0].id : ""),
    storeId: storeInventory?.storeId || (stores.length > 0 ? stores[0].id : ""),
    quantitySent: storeInventory?.quantitySent || 1,
    dateSent: storeInventory?.dateSent || new Date(),
    soldCount: storeInventory?.soldCount || 0,
    lastChecked: storeInventory?.lastChecked || new Date(),
    notes: storeInventory?.notes || "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "quantitySent" || name === "soldCount" 
        ? parseInt(value) || 0 
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
  
  const handleDateChange = (date: Date | undefined, field: string) => {
    setFormData({
      ...formData,
      [field]: date
    });
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.productId) newErrors.productId = "Product is required";
    if (!formData.storeId) newErrors.storeId = "Store is required";
    if (formData.quantitySent <= 0) newErrors.quantitySent = "Quantity must be at least 1";
    if (!formData.dateSent) newErrors.dateSent = "Date sent is required";
    if (formData.soldCount < 0) newErrors.soldCount = "Sold count cannot be negative";
    if (formData.soldCount > formData.quantitySent) {
      newErrors.soldCount = "Sold count cannot exceed quantity sent";
    }
    
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Product */}
          <div>
            <Label htmlFor="productId" className={cn("block mb-1", errors.productId && "text-destructive")}>
              Product*
            </Label>
            <Select 
              value={formData.productId} 
              onValueChange={(value) => handleSelectChange(value, "productId")}
            >
              <SelectTrigger className={cn("yarn-input", errors.productId && "border-destructive")}>
                <SelectValue placeholder="Select product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.productId && <p className="text-xs text-destructive mt-1">{errors.productId}</p>}
          </div>
          
          {/* Store */}
          <div>
            <Label htmlFor="storeId" className={cn("block mb-1", errors.storeId && "text-destructive")}>
              Store*
            </Label>
            <Select 
              value={formData.storeId} 
              onValueChange={(value) => handleSelectChange(value, "storeId")}
            >
              <SelectTrigger className={cn("yarn-input", errors.storeId && "border-destructive")}>
                <SelectValue placeholder="Select store" />
              </SelectTrigger>
              <SelectContent>
                {stores.map((store) => (
                  <SelectItem key={store.id} value={store.id}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.storeId && <p className="text-xs text-destructive mt-1">{errors.storeId}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quantity Sent */}
          <div>
            <Label htmlFor="quantitySent" className={cn("block mb-1", errors.quantitySent && "text-destructive")}>
              Quantity Sent*
            </Label>
            <Input
              id="quantitySent"
              name="quantitySent"
              type="number"
              value={formData.quantitySent.toString()}
              onChange={handleChange}
              className={cn("yarn-input", errors.quantitySent && "border-destructive")}
              min="1"
            />
            {errors.quantitySent && <p className="text-xs text-destructive mt-1">{errors.quantitySent}</p>}
          </div>
          
          {/* Date Sent */}
          <div>
            <Label htmlFor="dateSent" className={cn("block mb-1", errors.dateSent && "text-destructive")}>
              Date Sent*
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="dateSent"
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.dateSent && "text-muted-foreground",
                    errors.dateSent && "border-destructive"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.dateSent ? format(formData.dateSent, "MMM d, yyyy") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.dateSent}
                  onSelect={(date) => handleDateChange(date, "dateSent")}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
            {errors.dateSent && <p className="text-xs text-destructive mt-1">{errors.dateSent}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Quantity Sold */}
          <div>
            <Label htmlFor="soldCount" className={cn("block mb-1", errors.soldCount && "text-destructive")}>
              Quantity Sold
            </Label>
            <Input
              id="soldCount"
              name="soldCount"
              type="number"
              value={formData.soldCount.toString()}
              onChange={handleChange}
              className={cn("yarn-input", errors.soldCount && "border-destructive")}
              min="0"
              max={formData.quantitySent.toString()}
            />
            {errors.soldCount && <p className="text-xs text-destructive mt-1">{errors.soldCount}</p>}
            {formData.soldCount > 0 && formData.quantitySent > 0 && (
              <p className="text-xs mt-1">
                {Math.round((formData.soldCount / formData.quantitySent) * 100)}% sold
              </p>
            )}
          </div>
          
          {/* Last Checked */}
          <div>
            <Label htmlFor="lastChecked" className="block mb-1">
              Last Inventory Check Date
            </Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="lastChecked"
                  variant={"outline"}
                  className="w-full justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.lastChecked ? format(formData.lastChecked, "MMM d, yyyy") : <span>Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.lastChecked}
                  onSelect={(date) => handleDateChange(date, "lastChecked")}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        
        {/* Notes */}
        <div>
          <Label htmlFor="notes" className="block mb-1">
            Notes <span className="text-xs text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="yarn-input"
            placeholder="Any details about this inventory"
          />
        </div>
      </div>
      
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="yarn-gradient text-white border-none hover:opacity-90">
          {storeInventory ? "Update Inventory" : "Add Inventory"}
        </Button>
      </div>
    </form>
  );
};

export default StoreInventoryForm;
