
import { UserRole } from "../context/AuthContext";

export interface UserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  lastActive: string;
}

// Mock users for demonstration
export const MOCK_USERS: UserData[] = [
  {
    id: "1",
    name: "John Manager",
    email: "manager@example.com",
    role: "manager",
    lastActive: "2023-09-15"
  },
  {
    id: "2",
    name: "Alice Clerk",
    email: "clerk@example.com", 
    role: "clerk",
    lastActive: "2023-09-18"
  },
  {
    id: "3", 
    name: "Bob Sales",
    email: "sales@example.com",
    role: "salesperson",
    lastActive: "2023-09-14"
  },
  {
    id: "4",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
    lastActive: "2023-09-19"
  }
];
