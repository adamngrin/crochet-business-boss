
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    category: string;
    materials: string[];
    imageUrl?: string;
  };
  onEdit: () => void;
  onDelete: () => void;
}

const ProductCard = ({ product, onEdit, onDelete }: ProductCardProps) => {
  return (
    <Card className="yarn-card overflow-hidden flex flex-col h-full">
      <div className="h-48 overflow-hidden bg-muted">
        {product.imageUrl ? (
          <img 
            src={product.imageUrl} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            No image
          </div>
        )}
      </div>
      
      <CardContent className="flex-grow pt-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold line-clamp-1">{product.name}</h3>
          <Badge variant="secondary">{product.category}</Badge>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center">
          <div className="font-medium text-lg">${product.price.toFixed(2)}</div>
          <div className={`text-sm ${product.stock > 0 ? "text-green-600" : "text-destructive"}`}>
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex gap-2 border-t pt-4 mt-auto">
        <Button variant="outline" className="flex-1" onClick={onEdit}>
          <Pencil size={16} className="mr-2" />
          Edit
        </Button>
        <Button variant="ghost" size="icon" onClick={onDelete}>
          <Trash2 size={16} />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
