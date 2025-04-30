
import React from "react";
import Layout from "@/components/Layout";
import MobileNav from "@/components/MobileNav";
import PageHeader from "@/components/PageHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";

const Settings = () => {
  const handleSaveProfile = () => {
    toast({
      title: "Profile updated",
      description: "Your profile has been updated successfully.",
    });
  };
  
  const handleSaveBusinessSettings = () => {
    toast({
      title: "Business settings updated",
      description: "Your business settings have been updated successfully.",
    });
  };
  
  const handleSaveNotifications = () => {
    toast({
      title: "Notification settings updated",
      description: "Your notification preferences have been saved.",
    });
  };
  
  const handleSaveAppearance = () => {
    toast({
      title: "Appearance updated",
      description: "Your appearance settings have been saved.",
    });
  };

  return (
    <>
      <MobileNav />
      <Layout>
        <PageHeader 
          title="Settings" 
          description="Customize your application settings"
        />
        
        <Tabs defaultValue="profile" className="mb-6">
          <TabsList className="w-full md:w-auto mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card className="yarn-card">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue="Catherine Santos" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="catherine@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="0917-123-4567" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 Crochet Street, Manila" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveProfile}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Business Settings */}
          <TabsContent value="business">
            <Card className="yarn-card">
              <CardHeader>
                <CardTitle>Business Settings</CardTitle>
                <CardDescription>Configure your business information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input id="businessName" defaultValue="Catherine Crochets" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="businessEmail">Business Email</Label>
                    <Input id="businessEmail" type="email" defaultValue="contact@catherinecrochets.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="taxId">Tax ID / Registration Number</Label>
                    <Input id="taxId" defaultValue="123-456-789-000" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Default Currency</Label>
                    <Select defaultValue="PHP">
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PHP">Philippine Peso (₱)</SelectItem>
                        <SelectItem value="USD">US Dollar ($)</SelectItem>
                        <SelectItem value="EUR">Euro (€)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="tax-switch">Enable Tax Calculation</Label>
                      <p className="text-sm text-muted-foreground">Automatically calculate taxes on sales</p>
                    </div>
                    <Switch id="tax-switch" defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="commission-switch">Enable Commission Tracking</Label>
                      <p className="text-sm text-muted-foreground">Track commissions for consignors</p>
                    </div>
                    <Switch id="commission-switch" defaultChecked={true} />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="default-commission">Default Commission Rate (%)</Label>
                      <p className="text-sm text-muted-foreground">Applied to new consignors</p>
                    </div>
                    <Input id="default-commission" className="w-24" defaultValue="20" />
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveBusinessSettings}>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Notification Settings */}
          <TabsContent value="notifications">
            <Card className="yarn-card">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage your notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Email Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-low-stock">Low Stock Alerts</Label>
                      <Switch id="email-low-stock" defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-sales">Sales Reports</Label>
                      <Switch id="email-sales" defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="email-events">Upcoming Events</Label>
                      <Switch id="email-events" defaultChecked={true} />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Application Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-orders">New Orders</Label>
                      <Switch id="app-orders" defaultChecked={true} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-inventory">Inventory Updates</Label>
                      <Switch id="app-inventory" defaultChecked={false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="app-payments">Payment Notifications</Label>
                      <Switch id="app-payments" defaultChecked={true} />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications}>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Appearance Settings */}
          <TabsContent value="appearance">
            <Card className="yarn-card">
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>Customize how the application looks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="border rounded-lg p-4 flex flex-col items-center cursor-pointer bg-background">
                      <div className="h-20 w-full bg-background border rounded mb-2"></div>
                      <span>Light</span>
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col items-center cursor-pointer bg-background">
                      <div className="h-20 w-full bg-slate-800 border rounded mb-2"></div>
                      <span>Dark</span>
                    </div>
                    <div className="border rounded-lg p-4 flex flex-col items-center cursor-pointer bg-background">
                      <div className="h-20 w-full bg-gradient-to-b from-background to-slate-800 border rounded mb-2"></div>
                      <span>System</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Color Scheme</h3>
                  <div className="grid grid-cols-4 gap-4">
                    <div className="border rounded-lg p-2 flex flex-col items-center cursor-pointer">
                      <div className="h-10 w-full bg-yarn-lavender rounded mb-2"></div>
                      <span className="text-sm">Lavender</span>
                    </div>
                    <div className="border rounded-lg p-2 flex flex-col items-center cursor-pointer">
                      <div className="h-10 w-full bg-yarn-sage rounded mb-2"></div>
                      <span className="text-sm">Sage</span>
                    </div>
                    <div className="border rounded-lg p-2 flex flex-col items-center cursor-pointer">
                      <div className="h-10 w-full bg-yarn-rose rounded mb-2"></div>
                      <span className="text-sm">Rose</span>
                    </div>
                    <div className="border rounded-lg p-2 flex flex-col items-center cursor-pointer">
                      <div className="h-10 w-full bg-yarn-mauve rounded mb-2"></div>
                      <span className="text-sm">Mauve</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Display Settings</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="compact-mode">Compact Mode</Label>
                      <Switch id="compact-mode" defaultChecked={false} />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="animations">Enable Animations</Label>
                      <Switch id="animations" defaultChecked={true} />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end">
                  <Button onClick={handleSaveAppearance}>Save Preferences</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </Layout>
    </>
  );
};

export default Settings;
