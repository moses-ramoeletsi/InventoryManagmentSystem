import { useState } from "react";
import Layout from "../components/Layout";
import { useInventory } from "../context/InventoryContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { ArrowLeft, Save } from "lucide-react";
import { toast } from "sonner";

// Define product categories (in a real app, these might come from a database)
const CATEGORIES = [
  "Electronics",
  "Audio",
  "Wearables",
  "Accessories",
  "Computers",
  "Peripherals",
  "Storage",
  "Networking",
  "Other"
];

const AddProduct = () => {
  const navigate = useNavigate();
  const { addProduct } = useInventory();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    imageUrl: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle category selection
  const handleCategoryChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
    
    // Clear error when field is edited
    if (errors.category) {
      setErrors({
        ...errors,
        category: "",
      });
    }
  };

  // Validate the form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }
    
    if (!formData.price) {
      newErrors.price = "Price is required";
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a positive number";
    }
    
    if (!formData.quantity) {
      newErrors.quantity = "Quantity is required";
    } else if (
      isNaN(Number(formData.quantity)) ||
      !Number.isInteger(Number(formData.quantity)) ||
      Number(formData.quantity) < 0
    ) {
      newErrors.quantity = "Quantity must be a non-negative integer";
    }
    
    if (!formData.category) {
      newErrors.category = "Category is required";
    }
    
    // Image URL validation (optional field)
    if (formData.imageUrl && !isValidUrl(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid URL";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Check if a string is a valid URL
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }
    
    setLoading(true);
    
    try {
      // Add the product
      addProduct({
        name: formData.name,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity),
        category: formData.category,
        description: formData.description,
        imageUrl: formData.imageUrl || undefined,
      });
      
      // Navigate back to products page
      navigate("/products");
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-3xl font-bold tracking-tight">Add Product</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Product Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`
                      ${errors.name ? "border-destructive" : ""}
                      transition duration-300 
                      focus:ring-2 focus:ring-primary/50 
                      hover:border-primary/50
                      bg-white/70
                      hover:bg-background/90
                    `}
                    placeholder="Enter product name"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive">{errors.name}</p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">
                      Price ($) <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      step="0.01"
                      min="0"
                      value={formData.price}
                      onChange={handleChange}
                      className={`
                        ${errors.price ? "border-destructive" : ""}
                        transition duration-300 
                        focus:ring-2 focus:ring-primary/50 
                        hover:border-primary/50
                       bg-white/70
                        hover:bg-background/90
                      `}
                      placeholder="0.00"
                    />
                    {errors.price && (
                      <p className="text-xs text-destructive">{errors.price}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="quantity">
                      Quantity <span className="text-destructive">*</span>
                    </Label>
                    <Input
                      id="quantity"
                      name="quantity"
                      type="number"
                      min="0"
                      step="1"
                      value={formData.quantity}
                      onChange={handleChange}
                      className={`
                        ${errors.quantity ? "border-destructive" : ""}
                        transition duration-300 
                        focus:ring-2 focus:ring-primary/50 
                        hover:border-primary/50
                       bg-white/70
                        hover:bg-background/90
                      `}
                      placeholder="0"
                    />
                    {errors.quantity && (
                      <p className="text-xs text-destructive">
                        {errors.quantity}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">
                    Category <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={formData.category}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger
                      id="category"
                      className={`
                        ${errors.category ? "border-destructive" : ""}
                        transition duration-300 
                        focus:ring-2 focus:ring-primary/50 
                        hover:border-primary/50
                        bg-white/70
                        hover:bg-background/90
                      `}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {CATEGORIES.map(category => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-xs text-destructive">{errors.category}</p>
                  )}
                </div>
              </div>

              {/* Right column */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={formData.description}
                    onChange={handleChange}
                    className={`
                      transition duration-300 
                      focus:ring-2 focus:ring-primary/50 
                      hover:border-primary/50
                      bg-white/70
                      hover:bg-background/90
                    `}
                    placeholder="Enter product description (optional)"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageUrl">Image URL</Label>
                  <Input
                    id="imageUrl"
                    name="imageUrl"
                    type="url"
                    placeholder="https://example.com/image.jpg"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    className={`
                      ${errors.imageUrl ? "border-destructive" : ""}
                      transition duration-300 
                      focus:ring-2 focus:ring-primary/50 
                      hover:border-primary/50
                     bg-white/70
                      hover:bg-background/90
                    `}
                  />
                  {errors.imageUrl && (
                    <p className="text-xs text-destructive">{errors.imageUrl}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    Enter a URL for the product image (optional)
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="ghost"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                "Adding Product..."
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Product
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AddProduct;