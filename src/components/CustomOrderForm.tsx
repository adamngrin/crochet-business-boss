
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface CustomOrderFormProps {
  order?: {
    id?: string;
    customerName: string;
    customerEmail: string;
    customerPhone: string;
    description: string;
    startDate: Date | undefined;
    endDate: Date | undefined;
    status: string;
    price: number;
    deposit: number;
    notes: string;
  } | null;
  onSave: (orderData: any) => void;
  onCancel: () => void;
}

const statuses = [
  "Pending",
  "Confirmed",
  "In Progress",
  "Completed",
  "Delivered",
  "Cancelled",
];

const CustomOrderForm = ({ order, onSave, onCancel }: CustomOrderFormProps) => {
  const [formData, setFormData] = useState({
    customerName: order?.customerName || "",
    customerEmail: order?.customerEmail || "",
    customerPhone: order?.customerPhone || "",
    description: order?.description || "",
    startDate: order?.startDate || undefined,
    endDate: order?.endDate || undefined,
    status: order?.status || statuses[0],
    price: order?.price || 0,
    deposit: order?.deposit || 0,
    notes: order?.notes || "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" || name === "deposit" 
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
  
  const handleDateChange = (date: Date | undefined, field: string) => {
    setFormData({
      ...formData,
      [field]: date
    });
  };
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.customerName.trim()) newErrors.customerName = "Customer name is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (formData.endDate && formData.startDate && formData.endDate < formData.startDate) {
      newErrors.endDate = "End date cannot be before start date";
    }
    if (formData.price < 0) newErrors.price = "Price cannot be negative";
    if (formData.deposit < 0) newErrors.deposit = "Deposit cannot be negative";
    if (formData.deposit > formData.price) newErrors.deposit = "Deposit cannot exceed price";
    
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
          {/* Customer Name */}
          <div>
            <Label htmlFor="customerName" className={cn("block mb-1", errors.customerName && "text-destructive")}>
              Customer Name*
            </Label>
            <Input
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              className={cn("yarn-input", errors.customerName && "border-destructive")}
            />
            {errors.customerName && <p className="text-xs text-destructive mt-1">{errors.customerName}</p>}
          </div>
          
          {/* Status */}
          <div>
            <Label htmlFor="status" className="block mb-1">Order Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value) => handleSelectChange(value, "status")}
            >
              <SelectTrigger className="yarn-input">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Customer Email */}
          <div>
            <Label htmlFor="customerEmail" className="block mb-1">
              Customer Email <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="customerEmail"
              name="customerEmail"
              type="email"
              value={formData.customerEmail}
              onChange={handleChange}
              className="yarn-input"
            />
          </div>
          
          {/* Customer Phone */}
          <div>
            <Label htmlFor="customerPhone" className="block mb-1">
              Customer Phone <span className="text-xs text-muted-foreground">(optional)</span>
            </Label>
            <Input
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleChange}
              className="yarn-input"
            />
          </div>
        </div>
        
        {/* Description */}
        <div>
          <Label htmlFor="description" className={cn("block mb-1", errors.description && "text-destructive")}>
            Order Description*
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={cn("yarn-input min-h-24", errors.description && "border-destructive")}
            placeholder="Detailed description of the customer's custom order request"
          />
          {errors.description && <p className="text-xs text-destructive mt-1">{errors.description}</p>}
        </div>
        
        <Separator />
        
        {/* Scheduling */}
        <div>
          <h3 className="text-lg font-medium mb-3">Scheduling</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Start Date */}
            <div>
              <Label htmlFor="startDate" className={cn("block mb-1", errors.startDate && "text-destructive")}>
                Start Date*
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="startDate"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.startDate && "text-muted-foreground",
                      errors.startDate && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.startDate ? format(formData.startDate, "PPP") : <span>Select start date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.startDate}
                    onSelect={(date) => handleDateChange(date, "startDate")}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.startDate && <p className="text-xs text-destructive mt-1">{errors.startDate}</p>}
            </div>
            
            {/* End Date */}
            <div>
              <Label htmlFor="endDate" className={cn("block mb-1", errors.endDate && "text-destructive")}>
                Estimated Completion Date*
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    id="endDate"
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !formData.endDate && "text-muted-foreground",
                      errors.endDate && "border-destructive"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {formData.endDate ? format(formData.endDate, "PPP") : <span>Select end date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={formData.endDate}
                    onSelect={(date) => handleDateChange(date, "endDate")}
                    disabled={(date) => 
                      formData.startDate ? date < formData.startDate : false
                    }
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
              {errors.endDate && <p className="text-xs text-destructive mt-1">{errors.endDate}</p>}
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Pricing */}
        <div>
          <h3 className="text-lg font-medium mb-3">Pricing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Price */}
            <div>
              <Label htmlFor="price" className={cn("block mb-1", errors.price && "text-destructive")}>
                Total Price ($)
              </Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price.toString()}
                onChange={handleChange}
                className={cn("yarn-input", errors.price && "border-destructive")}
                step="0.01"
                min="0"
              />
              {errors.price && <p className="text-xs text-destructive mt-1">{errors.price}</p>}
            </div>
            
            {/* Deposit */}
            <div>
              <Label htmlFor="deposit" className={cn("block mb-1", errors.deposit && "text-destructive")}>
                Deposit Amount ($)
              </Label>
              <Input
                id="deposit"
                name="deposit"
                type="number"
                value={formData.deposit.toString()}
                onChange={handleChange}
                className={cn("yarn-input", errors.deposit && "border-destructive")}
                step="0.01"
                min="0"
              />
              {errors.deposit && <p className="text-xs text-destructive mt-1">{errors.deposit}</p>}
              {formData.price > 0 && formData.deposit > 0 && (
                <p className="text-xs mt-1">
                  {((formData.deposit / formData.price) * 100).toFixed(0)}% of total price
                </p>
              )}
            </div>
          </div>
        </div>
        
        {/* Additional Notes */}
        <div>
          <Label htmlFor="notes" className="block mb-1">
            Additional Notes <span className="text-xs text-muted-foreground">(optional)</span>
          </Label>
          <Textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            className="yarn-input min-h-20"
            placeholder="Any additional details or notes about this custom order"
          />
        </div>
      </div>
      
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="yarn-gradient text-white border-none hover:opacity-90">
          {order ? "Update Order" : "Create Order"}
        </Button>
      </div>
    </form>
  );
};

export default CustomOrderForm;
