
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { ShoppingBag } from "lucide-react";
import { useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsLoggingIn(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (error) {
      // Error handling is done in the login function
      console.error("Login failed:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-[#F0EDCC]">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="glass-card border-[#02343F]/10">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#02343F]/10">
              <ShoppingBag className="h-6 w-6 text-[#02343F]" />
            </div>
            <CardTitle className="text-2xl text-[#02343F]">Welcome back</CardTitle>
            <CardDescription className="text-[#02343F]/70">
              Sign in to your account to continue
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[#02343F]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="border-[#02343F]/20 focus-visible:ring-[#02343F]"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-[#02343F]">Password</Label>
                  <Button variant="link" size="sm" className="h-auto p-0 text-xs text-[#02343F]">
                    Forgot password?
                  </Button>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="border-[#02343F]/20 focus-visible:ring-[#02343F]"
                />
              </div>
              
              <div className="text-sm text-[#02343F]/70">
                <p>Demo accounts (password: "password" for all):</p>
                <ul className="list-disc pl-5 space-y-1 mt-1">
                  <li>manager@example.com</li>
                  <li>clerk@example.com</li>
                  <li>sales@example.com</li>
                  <li>admin@example.com</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-[#02343F] hover:bg-[#02343F]/80 text-white"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? "Signing in..." : "Sign in"}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
