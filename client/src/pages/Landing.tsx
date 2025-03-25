
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { ShoppingBag, PackageOpen, TrendingUp, Users, Settings } from "lucide-react";

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#F0EDCC]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center py-4 px-6 bg-white/80 backdrop-blur-md z-50 border-b border-[#02343F]/10">
        <div className="flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6 text-[#02343F]" />
          <span className="font-bold text-xl text-[#02343F]">InventoryPro</span>
        </div>
        <nav>
          <Link to="/login">
            <Button className="bg-[#02343F] hover:bg-[#02343F]/80">
              Login
            </Button>
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-16 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#02343F] mb-6">
            Streamline Your Inventory Management
          </h1>
          <p className="text-lg md:text-xl text-[#02343F]/80 max-w-3xl mx-auto mb-8">
            A powerful, intuitive system designed to help businesses efficiently track, manage, and optimize their inventory.
          </p>
          <Link to="/login">
            <Button size="lg" className="bg-[#02343F] hover:bg-[#02343F]/80 text-white px-8">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#02343F]/10 rounded-lg flex items-center justify-center mb-4">
              <PackageOpen className="h-6 w-6 text-[#02343F]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#02343F]">Product Management</h3>
            <p className="text-[#02343F]/70">Easily add, edit, and manage your product inventory in real-time.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#02343F]/10 rounded-lg flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-[#02343F]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#02343F]">Analytics & Reports</h3>
            <p className="text-[#02343F]/70">Gain insights with comprehensive reports and analytics tools.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#02343F]/10 rounded-lg flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-[#02343F]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#02343F]">User Management</h3>
            <p className="text-[#02343F]/70">Control access with role-based permissions for your team.</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-[#02343F]/10 rounded-lg flex items-center justify-center mb-4">
              <Settings className="h-6 w-6 text-[#02343F]" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-[#02343F]">Customization</h3>
            <p className="text-[#02343F]/70">Tailor the system to meet your specific business requirements.</p>
          </div>
        </div>
      </section>

      {/* Testimonials/Info Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-[#02343F]/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-[#02343F]">Why Choose InventoryPro</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-[#02343F]">Easy to Use</h3>
              <p className="text-[#02343F]/70">Intuitive interface designed for users of all technical levels.</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-[#02343F]">Secure</h3>
              <p className="text-[#02343F]/70">Enterprise-grade security to protect your valuable inventory data.</p>
            </div>
            <div className="bg-white p-6 rounded-xl">
              <h3 className="text-xl font-semibold mb-3 text-[#02343F]">Scalable</h3>
              <p className="text-[#02343F]/70">Grows with your business from startup to enterprise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 md:px-6 lg:px-8 bg-[#02343F] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <ShoppingBag className="h-5 w-5" />
            <span className="font-bold">InventoryPro</span>
          </div>
          <div className="text-sm text-white/70">
            © {new Date().getFullYear()} InventoryPro. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
