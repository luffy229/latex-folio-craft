
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Lock, Mail, Bell, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import SpaceBackground from "@/components/SpaceBackground";
import FloatingElements from "@/components/FloatingElements";
import MagneticCursor from "@/components/MagneticCursor";
import ParticleSystem from "@/components/ParticleSystem";

const Settings = () => {
  const { toast } = useToast();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password mismatch",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Password updated!",
      description: "Your password has been successfully changed.",
    });
    
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setIsLoading(false);
  };

  const handleNotificationSave = () => {
    toast({
      title: "Settings saved!",
      description: "Your notification preferences have been updated.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <SpaceBackground />
      <FloatingElements />
      <ParticleSystem />
      <MagneticCursor />
      
      {/* Back Button */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-6 left-6 z-10"
      >
        <Link to="/">
          <Button
            variant="ghost"
            className="text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-600/50 hover:border-slate-500 interactive"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-2xl space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent text-center mb-8">
              Account Settings
            </h1>
          </motion.div>

          {/* Password Change Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <Card className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 shadow-2xl glow-effect">
              <CardHeader>
                <CardTitle className="text-xl text-slate-200 flex items-center">
                  <Lock className="w-5 h-5 mr-2" />
                  Change Password
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Update your account password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="current-password" className="text-sm font-medium text-slate-300">
                      Current Password
                    </label>
                    <Input
                      id="current-password"
                      type="password"
                      placeholder="Enter current password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-cyan-400 interactive"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="new-password" className="text-sm font-medium text-slate-300">
                      New Password
                    </label>
                    <Input
                      id="new-password"
                      type="password"
                      placeholder="Enter new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-cyan-400 interactive"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="confirm-password" className="text-sm font-medium text-slate-300">
                      Confirm New Password
                    </label>
                    <Input
                      id="confirm-password"
                      type="password"
                      placeholder="Confirm new password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-cyan-400 interactive"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg interactive"
                  >
                    {isLoading ? "Updating..." : "Update Password"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Notifications Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <Card className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 shadow-2xl glow-effect">
              <CardHeader>
                <CardTitle className="text-xl text-slate-200 flex items-center">
                  <Bell className="w-5 h-5 mr-2" />
                  Notifications
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your notification preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-slate-300 font-medium">Email Notifications</p>
                      <p className="text-slate-400 text-sm">Receive updates via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={emailNotifications}
                    onCheckedChange={setEmailNotifications}
                    className="interactive"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-slate-300 font-medium">Push Notifications</p>
                      <p className="text-slate-400 text-sm">Receive browser notifications</p>
                    </div>
                  </div>
                  <Switch
                    checked={pushNotifications}
                    onCheckedChange={setPushNotifications}
                    className="interactive"
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5 text-slate-400" />
                    <div>
                      <p className="text-slate-300 font-medium">Two-Factor Authentication</p>
                      <p className="text-slate-400 text-sm">Add extra security to your account</p>
                    </div>
                  </div>
                  <Switch
                    checked={twoFactorAuth}
                    onCheckedChange={setTwoFactorAuth}
                    className="interactive"
                  />
                </div>

                <Button
                  onClick={handleNotificationSave}
                  className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg interactive"
                >
                  Save Notification Settings
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
