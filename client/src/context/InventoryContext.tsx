
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

// Define product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  description: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define context type
interface InventoryContextType {
  products: Product[];
  addProduct: (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => void;
  updateProduct: (id: string, updates: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>) => void;
  deleteProduct: (id: string) => void;
  getProduct: (id: string) => Product | undefined;
  searchProducts: (query: string) => Product[];
  loading: boolean;
}

// Create the context
const InventoryContext = createContext<InventoryContextType | undefined>(undefined);

// Mock products
const MOCK_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Premium Laptop",
    price: 1299.99,
    quantity: 15,
    category: "Electronics",
    description: "High-performance laptop with latest processor",
    imageUrl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop",
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-01-15")
  },
  {
    id: "p2",
    name: "Wireless Headphones",
    price: 199.99,
    quantity: 42,
    category: "Audio",
    description: "Noise-cancelling wireless headphones",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop",
    createdAt: new Date("2023-02-20"),
    updatedAt: new Date("2023-03-15")
  },
  {
    id: "p3",
    name: "Smart Watch",
    price: 249.99,
    quantity: 28,
    category: "Wearables",
    description: "Smart watch with health tracking features",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop",
    createdAt: new Date("2023-03-10"),
    updatedAt: new Date("2023-03-10")
  },
  {
    id: "p4",
    name: "Wireless Keyboard",
    price: 79.99,
    quantity: 35,
    category: "Accessories",
    description: "Ergonomic wireless keyboard",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2065&auto=format&fit=crop",
    createdAt: new Date("2023-04-05"),
    updatedAt: new Date("2023-04-05")
  },
  {
    id: "p5",
    name: "4K Monitor",
    price: 349.99,
    quantity: 12,
    category: "Electronics",
    description: "High-resolution 4K monitor for professionals",
    imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=2070&auto=format&fit=crop",
    createdAt: new Date("2023-05-12"),
    updatedAt: new Date("2023-05-12")
  }
];

// Inventory provider component
export const InventoryProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Load initial data
  useEffect(() => {
    const loadProducts = async () => {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would be a fetch call to your backend
      const savedProducts = localStorage.getItem("products");
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      } else {
        setProducts(MOCK_PRODUCTS);
        localStorage.setItem("products", JSON.stringify(MOCK_PRODUCTS));
      }
      
      setLoading(false);
    };
    
    loadProducts();
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products, loading]);

  // Add a new product
  const addProduct = (product: Omit<Product, "id" | "createdAt" | "updatedAt">) => {
    const now = new Date();
    const newProduct: Product = {
      ...product,
      id: `p${Date.now()}`,
      createdAt: now,
      updatedAt: now
    };
    
    setProducts(prevProducts => [...prevProducts, newProduct]);
    toast.success(`Product "${product.name}" added successfully`);
  };

  // Update an existing product
  const updateProduct = (id: string, updates: Partial<Omit<Product, "id" | "createdAt" | "updatedAt">>) => {
    setProducts(prevProducts =>
      prevProducts.map(product =>
        product.id === id
          ? { ...product, ...updates, updatedAt: new Date() }
          : product
      )
    );
    toast.success("Product updated successfully");
  };

  // Delete a product
  const deleteProduct = (id: string) => {
    const productName = products.find(p => p.id === id)?.name;
    setProducts(prevProducts => prevProducts.filter(product => product.id !== id));
    toast.success(`Product "${productName}" deleted successfully`);
  };

  // Get a product by ID
  const getProduct = (id: string) => {
    return products.find(product => product.id === id);
  };

  // Search products
  const searchProducts = (query: string) => {
    if (!query.trim()) return products;
    
    const lowerQuery = query.toLowerCase();
    return products.filter(product =>
      product.id.toLowerCase().includes(lowerQuery) ||
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category.toLowerCase().includes(lowerQuery) ||
      product.description.toLowerCase().includes(lowerQuery)
    );
  };

  return (
    <InventoryContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProduct,
        searchProducts,
        loading
      }}
    >
      {children}
    </InventoryContext.Provider>
  );
};

// Custom hook for using inventory context
export const useInventory = () => {
  const context = useContext(InventoryContext);
  if (context === undefined) {
    throw new Error("useInventory must be used within an InventoryProvider");
  }
  return context;
};
