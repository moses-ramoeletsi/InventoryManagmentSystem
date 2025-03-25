
import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useInventory } from "../context/InventoryContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardFooter } from "../components/ui/card";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ChevronRight, Edit, Search, X } from "lucide-react";

const SearchProduct = () => {
  const { searchProducts, loading } = useInventory();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<ReturnType<typeof searchProducts>>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Handle search when search term changes
  useEffect(() => {
    const delaySearch = setTimeout(() => {
      if (searchTerm.trim()) {
        setIsSearching(true);
        const searchResults = searchProducts(searchTerm);
        setResults(searchResults);
        setIsSearching(false);
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(delaySearch);
  }, [searchTerm, searchProducts]);

  // Check if user can edit products
  const canEdit = user?.role === "manager" || user?.role === "admin";

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Search Inventory</h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-8">
          {/* Search box */}
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search by ID, name, or category..."
                className="pl-10 py-6 text-lg bg-white/70"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                autoFocus
              />
              {searchTerm && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 h-9 w-9"
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
          </div>

          {/* Search results */}
          {isSearching || loading ? (
            <div className="animate-pulse text-center p-8">
              <p className="text-lg text-muted-foreground">Searching...</p>
            </div>
          ) : searchTerm && results.length === 0 ? (
            <div className="text-center p-8 border rounded-lg bg-muted/30">
              <p className="text-lg text-muted-foreground">No products found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Found {results.length} product{results.length === 1 ? "" : "s"}
                </p>
              )}
              {results.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden transition-all duration-200 hover:shadow-md"
                >
                  <CardContent className="p-0">
                    <div className="flex items-center">
                      {product.imageUrl && (
                        <div className="w-24 h-24 flex-shrink-0">
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                      <div className="p-4 flex-1">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                          <div>
                            <h3 className="font-medium">{product.name}</h3>
                            <p className="text-sm text-muted-foreground">
                              ID: {product.id}
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-medium">
                              ${product.price.toFixed(2)}
                            </span>
                            <span
                              className={
                                product.quantity <= 5
                                  ? "text-destructive text-sm font-medium"
                                  : product.quantity <= 10
                                  ? "text-yellow-600 text-sm font-medium"
                                  : "text-sm text-muted-foreground"
                              }
                            >
                              {product.quantity} in stock
                            </span>
                          </div>
                        </div>
                        <div className="mt-2">
                          <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold">
                            {product.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center border-t p-2 bg-muted/30">
                    <span className="text-xs text-muted-foreground">
                      Last updated:{" "}
                      {new Date(product.updatedAt).toLocaleDateString()}
                    </span>
                    <div className="flex gap-2">
                      {canEdit && (
                        <Button
                          variant="ghost"
                          size="sm"
                          asChild
                          className="h-8"
                        >
                          <Link to={`/products/edit/${product.id}`}>
                            <Edit className="h-4 w-4 mr-1" />
                            Edit
                          </Link>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        asChild
                        className="h-8"
                      >
                        <Link to={`/products`}>
                          Details
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SearchProduct;
