import Layout from "../components/Layout";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight text-[#02343F]">My Profile</h1>
        <p className="text-[#02343F]/70">View and manage your account information.</p>
        
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="text-lg bg-[#02343F]/10 text-[#02343F]">
                  {user.name
                    .split(" ")
                    .map(part => part[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-semibold text-[#02343F]">{user.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="capitalize border-[#02343F]/20 text-[#02343F]">
                    {user.role}
                  </Badge>
                  <span className="text-sm text-[#02343F]/70">{user.email}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-medium mb-2 text-[#02343F]">Account Information</h3>
                <dl className="space-y-2">
                  <div className="flex justify-between border-b pb-2 border-[#02343F]/10">
                    <dt className="text-[#02343F]/70">User ID</dt>
                    <dd className="font-medium text-[#02343F]">{user.id}</dd>
                  </div>
                  <div className="flex justify-between border-b pb-2 border-[#02343F]/10">
                    <dt className="text-[#02343F]/70">Email</dt>
                    <dd className="font-medium text-[#02343F]">{user.email}</dd>
                  </div>
                  <div className="flex justify-between pb-2">
                    <dt className="text-[#02343F]/70">Role</dt>
                    <dd className="font-medium capitalize text-[#02343F]">{user.role}</dd>
                  </div>
                </dl>
              </div>
              
              <div>
                <h3 className="font-medium mb-2 text-[#02343F]">Account Actions</h3>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start border-[#02343F]/20 text-[#02343F]">
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start border-[#02343F]/20 text-[#02343F]">
                    Update Profile
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="pt-4 border-t border-[#02343F]/10">
              <h3 className="font-medium mb-2 text-[#02343F]">Session Information</h3>
              <p className="text-sm text-[#02343F]/70">
                You are currently logged in as {user.name}. Your session is active.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
