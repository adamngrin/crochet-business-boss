
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";

interface StoreFormProps {
  store?: {
    id?: string;
    name: string;
    address: string;
    contactName: string;
    contactPhone: string;
    contactEmail: string;
    commissionRate: number;
    notes: string;
  } | null;
  onSave: (storeData: any) => void;
  onCancel: () => void;
}

const StoreForm = ({ store, onSave, onCancel }: StoreFormProps) => {
  const [formData, setFormData] = useState({
    name: store?.name || "",
    address: store?.address || "",
    contactName: store?.contactName || "",
    contactPhone: store?.contactPhone || "",
    contactEmail: store?.contactEmail || "",
    commissionRate: store?.commissionRate || 20,
    notes: store?.notes || "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "commissionRate" 
        ? parseFloat(value) || 0 
        : value
    });
    
    // Clear error for this field
    if (errors[name]) {
      const { [name]: _, ...rest } = errors;
      setErrors(rest);
    }
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = "Store name is required";
    if (!formData.address.trim()) newErrors.address = "Store address is required";
    if (formData.commissionRate < 0 || formData.commissionRate > 100) {
      newErrors.commissionRate = "Commission rate must be between 0 and 100";
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
        {/* Store Name */}
        <div>
          <Label htmlFor="name" className={cn("block mb-1", errors.name && "text-destructive")}>
            Store Name*
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
        
        {/* Store Address */}
        <div>
          <Label htmlFor="address" className={cn("block mb-1", errors.address && "text-destructive")}>
            Store Address*
          </Label>
          <div className="relative">
            <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={cn("yarn-input pl-8", errors.address && "border-destructive")}
              placeholder="Street address, city, state, zip"
            />
          </div>
          {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Name */}
          <div>
            <Label htmlFor="contactName" className="block mb-1">
              Contact Person <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="contactName"
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              className="yarn-input"
            />
          </div>
          
          {/* Commission Rate */}
          <div>
            <Label htmlFor="commissionRate" className={cn("block mb-1", errors.commissionRate && "text-destructive")}>
              Commission Rate (%)
            </Label>
            <Input
              id="commissionRate"
              name="commissionRate"
              type="number"
              value={formData.commissionRate.toString()}
              onChange={handleChange}
              className={cn("yarn-input", errors.commissionRate && "border-destructive")}
              min="0"
              max="100"
              step="0.1"
            />
            {errors.commissionRate && <p className="text-xs text-destructive mt-1">{errors.commissionRate}</p>}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Contact Phone */}
          <div>
            <Label htmlFor="contactPhone" className="block mb-1">
              Contact Phone <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="contactPhone"
              name="contactPhone"
              value={formData.contactPhone}
              onChange={handleChange}
              className="yarn-input"
            />
          </div>
          
          {/* Contact Email */}
          <div>
            <Label htmlFor="contactEmail" className="block mb-1">
              Contact Email <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="contactEmail"
              name="contactEmail"
              type="email"
              value={formData.contactEmail}
              onChange={handleChange}
              className="yarn-input"
            />
          </div>
        </div>
        
        {/* Notes */}
        <div>
          <Label htmlFor="notes" className="block mb-1">
            Notes <span className="text-xs text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="yarn-input min-h-20"
            placeholder="Additional notes about this store"
          />
        </div>
      </div>
      
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="yarn-gradient text-white border-none hover:opacity-90">
          {store ? "Update Store" : "Add Store"}
        </Button>
      </div>
    </form>
  );
};

export default StoreForm;
