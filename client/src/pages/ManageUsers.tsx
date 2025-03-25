
import { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { UserRole } from "../context/AuthContext";
import { MOCK_USERS, UserData } from "../types/user";
import UserTable from "../components/users/UserTable";
import AddUserDialog from "../components/users/AddUserDialog";

const ManageUsers = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<UserData[]>(MOCK_USERS);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  
  // Only allow admin access
  if (!user || user.role !== "admin") {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/" replace />;
  }

  const handleAddUser = (newUserData: {
    name: string;
    email: string;
    role: UserRole;
  }) => {
    if (!newUserData.name || !newUserData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // In a real app, this would be an API call
    const createdUser = {
      ...newUserData,
      id: (users.length + 1).toString(),
      lastActive: new Date().toISOString().split("T")[0]
    };
    
    setUsers([...users, createdUser]);
    setIsAddUserOpen(false);
    toast.success(`User ${createdUser.name} created successfully`);
  };

  const handleDeleteUser = (userId: string) => {
    // Don't allow deleting yourself
    if (userId === user.id) {
      toast.error("You cannot delete your own account");
      return;
    }
    
    setUsers(users.filter(u => u.id !== userId));
    toast.success("User deleted successfully");
  };

  const handleEditUser = (userId: string) => {
    // This is a placeholder for future implementation
    toast.info(`Edit user ${userId} functionality coming soon`);
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>
            <p className="text-muted-foreground">Add, edit, or remove system users.</p>
          </div>
          <Button onClick={() => setIsAddUserOpen(true)}>Add New User</Button>
        </div>
        
        <UserTable 
          users={users}
          currentUserId={user.id}
          onDeleteUser={handleDeleteUser}
          onEditUser={handleEditUser}
        />
        
        <AddUserDialog 
          isOpen={isAddUserOpen}
          onOpenChange={setIsAddUserOpen}
          onAddUser={handleAddUser}
        />
      </div>
    </Layout>
  );
};

export default ManageUsers;
