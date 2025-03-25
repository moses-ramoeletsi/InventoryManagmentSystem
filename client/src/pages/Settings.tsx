import { useState } from "react";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { toast } from "sonner";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

const Settings = () => {
  const { user } = useAuth();
  
  // Mock settings state
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    autoLogout: true,
    logRetention: "30",
    currency: "USD",
    timezone: "UTC",
    language: "en-US"
  });
  
  // Only allow admin access
  if (!user || user.role !== "admin") {
    toast.error("You don't have permission to access this page");
    return <Navigate to="/" replace />;
  }
  
  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    toast.success(`Setting "${key}" updated successfully`);
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save to a backend
    toast.success("Settings saved successfully");
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
          <p className="text-muted-foreground">
            Configure system-wide settings and preferences.
          </p>
        </div>
        
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Configure basic system behavior and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="currency">Currency</Label>
                      <p className="text-sm text-muted-foreground">
                        The default currency for the system.
                      </p>
                    </div>
                    <div className="w-40">
                      <select 
                        id="currency"
                        className="w-full h-9 rounded-md border border-input bg-background px-3"
                        value={settings.currency}
                        onChange={(e) => handleSettingChange("currency", e.target.value)}
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="JPY">JPY (¥)</option>
                      </select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="timezone">Timezone</Label>
                      <p className="text-sm text-muted-foreground">
                        The default timezone for dates and times.
                      </p>
                    </div>
                    <div className="w-40">
                      <select 
                        id="timezone"
                        className="w-full h-9 rounded-md border border-input bg-background px-3"
                        value={settings.timezone}
                        onChange={(e) => handleSettingChange("timezone", e.target.value)}
                      >
                        <option value="UTC">UTC</option>
                        <option value="EST">Eastern Time</option>
                        <option value="CST">Central Time</option>
                        <option value="PST">Pacific Time</option>
                      </select>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="language">Language</Label>
                      <p className="text-sm text-muted-foreground">
                        The default language for the system.
                      </p>
                    </div>
                    <div className="w-40">
                      <select 
                        id="language"
                        className="w-full h-9 rounded-md border border-input bg-background px-3"
                        value={settings.language}
                        onChange={(e) => handleSettingChange("language", e.target.value)}
                      >
                        <option value="en-US">English (US)</option>
                        <option value="es-ES">Spanish</option>
                        <option value="fr-FR">French</option>
                        <option value="de-DE">German</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Configure security and privacy settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="auto-logout">Auto Logout</Label>
                      <p className="text-sm text-muted-foreground">
                        Automatically log out idle users after 30 minutes.
                      </p>
                    </div>
                    <Switch 
                      id="auto-logout"
                      checked={settings.autoLogout}
                      onCheckedChange={(checked) => handleSettingChange("autoLogout", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="log-retention">Log Retention (days)</Label>
                      <p className="text-sm text-muted-foreground">
                        Number of days to retain system logs.
                      </p>
                    </div>
                    <Input 
                      id="log-retention"
                      type="number" 
                      className="w-20" 
                      value={settings.logRetention}
                      onChange={(e) => handleSettingChange("logRetention", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="appearance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Configure the look and feel of the system.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable dark mode for the application.
                      </p>
                    </div>
                    <Switch 
                      id="dark-mode"
                      checked={settings.darkMode}
                      onCheckedChange={(checked) => handleSettingChange("darkMode", checked)}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="notifications">Notifications</Label>
                      <p className="text-sm text-muted-foreground">
                        Enable in-app notifications.
                      </p>
                    </div>
                    <Switch 
                      id="notifications"
                      checked={settings.notifications}
                      onCheckedChange={(checked) => handleSettingChange("notifications", checked)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        
        <div className="flex justify-end">
          <Button onClick={handleSaveSettings}>Save All Settings</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
