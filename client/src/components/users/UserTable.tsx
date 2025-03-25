
import React from "react";
import { UserData } from "../../types/user";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/data";

interface UserTableProps {
  users: UserData[];
  currentUserId: string;
  onDeleteUser: (userId: string) => void;
  onEditUser?: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  currentUserId,
  onDeleteUser,
  onEditUser,
}) => {
  return (
    <div className="border rounded-lg">
      <Table className="bg-white/80">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Last Active</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge variant="default" className="capitalize">
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell>{user.lastActive}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onEditUser && onEditUser(user.id)}
                  >
                    Edit
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-destructive"
                    onClick={() => onDeleteUser(user.id)}
                    disabled={user.id === currentUserId}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;
