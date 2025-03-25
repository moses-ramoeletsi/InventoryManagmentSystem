import { useMemo } from "react";
import Layout from "../components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { useInventory } from "../context/InventoryContext";
import { useAuth } from "../context/AuthContext";
import { PackageSearch, ShoppingBag, TrendingDown, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { products, loading } = useInventory();
  const { user } = useAuth();

  // Calculate inventory statistics
  const stats = useMemo(() => {
    if (loading) {
      return {
        totalProducts: 0,
        totalValue: 0,
        lowStockItems: 0,
        categories: {}
      };
    }

    const categories: Record<string, number> = {};
    let totalValue = 0;
    let lowStockItems = 0;

    products.forEach(product => {
      // Count by category
      categories[product.category] = (categories[product.category] || 0) + 1;
      
      // Calculate total inventory value
      totalValue += product.price * product.quantity;
      
      // Count low stock items (less than 10)
      if (product.quantity < 10) {
        lowStockItems++;
      }
    });

    return {
      totalProducts: products.length,
      totalValue,
      lowStockItems,
      categories
    };
  }, [products, loading]);

  // Prepare chart data
  const chartData = useMemo(() => {
    return Object.entries(stats.categories).map(([name, count]) => ({
      name,
      count
    }));
  }, [stats.categories]);

  // Define chart colors
  const CHART_COLORS = ["#3b82f6", "#60a5fa", "#93c5fd", "#bfdbfe", "#dbeafe"];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-pulse text-lg text-muted-foreground">Loading dashboard...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex gap-2">
            {(user?.role === "manager" || user?.role === "clerk" || user?.role === "admin") && (
              <Button asChild>
                <Link to="/products/add">
                  Add Product
                </Link>
              </Button>
            )}
            <Button variant="ghost" asChild>
              <Link to="/products">
                View All Products
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4  card">
          <Card className="animate-fade-in animation-delay-300 card">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <ShoppingBag className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalProducts}</div>
              <p className="text-xs text-muted-foreground">
                Unique products in inventory
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in animation-delay-300">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Inventory Value
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${stats.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-muted-foreground">
                Total value of inventory
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in animation-delay-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Low Stock Items
              </CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.lowStockItems}</div>
              <p className="text-xs text-muted-foreground">
                Products with less than 10 units
              </p>
            </CardContent>
          </Card>
          
          <Card className="animate-fade-in animation-delay-600">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Categories
              </CardTitle>
              <PackageSearch className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Object.keys(stats.categories).length}</div>
              <p className="text-xs text-muted-foreground">
                Distinct product categories
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className="grid gap-4 lg:grid-cols-2">
          {/* Category Distribution */}
          <Card className="col-span-1 animate-fade-in">
            <CardHeader>
              <CardTitle>Product Categories</CardTitle>
              <CardDescription>
                Distribution of products by category
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#3b82f6">
                    {chartData.map((entry, index) => (
                      <Cell 
                        key={`cell-${entry.name}`} 
                        fill={CHART_COLORS[index % CHART_COLORS.length]} 
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Low Stock Items */}
          <Card className="col-span-1 animate-fade-in">
            <CardHeader>
              <CardTitle>Low Stock Products</CardTitle>
              <CardDescription>
                Products that need to be restocked soon
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {products
                  .filter(product => product.quantity < 10)
                  .sort((a, b) => a.quantity - b.quantity)
                  .slice(0, 5)
                  .map(product => (
                    <div key={product.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className={`h-3 w-3 rounded-full ${
                            product.quantity <= 3 
                              ? "bg-destructive" 
                              : product.quantity <= 7 
                                ? "bg-yellow-500" 
                                : "bg-green-500"
                          }`}
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                      <div className="text-sm">
                        <span className="font-bold">{product.quantity}</span> remaining
                      </div>
                    </div>
                  ))}
                
                {products.filter(product => product.quantity < 10).length === 0 && (
                  <div className="flex items-center justify-center h-40 text-muted-foreground">
                    No low stock items
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;