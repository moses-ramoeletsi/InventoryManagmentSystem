import { cn } from "../lib/utils";
import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  ShoppingBag, 
  LayoutDashboard, 
  Users, 
  Settings, 
  PlusCircle, 
  PackageSearch, 
  FileBarChart2,
  X,
  User,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { useAuth } from "../context/AuthContext";
import { useIsMobile } from "../hooks/use-mobile";

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const Sidebar = ({ open, setOpen }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  const isMobile = useIsMobile();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Handle click outside on mobile to close sidebar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close on mobile, prevent closing on desktop
      if (isMobile && open && sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobile, open, setOpen]);

  // Close sidebar on location change if mobile
  useEffect(() => {
    if (isMobile && open) {
      setOpen(false);
    }
  }, [location, isMobile]);

  // Define navigation items based on user role
  const getNavItems = () => {
    if (!user) return [];

    const commonItems = [
      {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
        roles: ["manager", "clerk", "salesperson", "admin"],
      },
      {
        name: "Products",
        href: "/products",
        icon: ShoppingBag,
        roles: ["manager", "clerk", "salesperson", "admin"],
      },
      {
        name: "Search Inventory",
        href: "/search",
        icon: PackageSearch,
        roles: ["manager", "clerk", "salesperson", "admin"],
      },
    ];

    const managementItems = [
      {
        name: "Add Product",
        href: "/products/add",
        icon: PlusCircle,
        roles: ["manager", "clerk", "admin"],
      },
      {
        name: "Reports",
        href: "/reports",
        icon: FileBarChart2,
        roles: ["manager", "admin"],
      },
    ];

    const adminItems = [
      {
        name: "Users",
        href: "/users",
        icon: Users,
        roles: ["admin"],
      },
      {
        name: "Settings",
        href: "/settings",
        icon: Settings,
        roles: ["admin"],
      },
    ];

    const profileItems = [
      {
        name: "Profile",
        href: "/profile",
        icon: User,
        roles: ["manager", "clerk", "salesperson", "admin"],
      },
    ];

    return [
      ...commonItems,
      ...managementItems,
      ...adminItems,
      ...profileItems,
    ].filter(item => item.roles.includes(user.role));
  };

  const navItems = getNavItems();

  return (
    <div
      ref={sidebarRef}
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground transform transition-transform duration-300 ease-in-out",
        // Modify the translation logic to prevent closing on desktop
        open || !isMobile ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          <Link to="/" className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-sidebar-primary" />
            <span className="text-lg font-medium">Inventory</span>
          </Link>
          {isMobile && (
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setOpen(false)}
              className="text-sidebar-foreground"
            >
              <X size={20} />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {navItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors",
                    location.pathname === item.href
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/50 text-sidebar-foreground/80 hover:text-sidebar-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info */}
        
      </div>
    </div>
  );
};

export default Sidebar;