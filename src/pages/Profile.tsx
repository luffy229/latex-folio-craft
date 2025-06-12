
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, User, Mail, Upload, Camera } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import SpaceBackground from "@/components/SpaceBackground";
import FloatingElements from "@/components/FloatingElements";
import MagneticCursor from "@/components/MagneticCursor";
import ParticleSystem from "@/components/ParticleSystem";

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Profile updated!",
      description: "Your profile has been successfully updated.",
    });
    setIsLoading(false);
  };

  const handleAvatarChange = () => {
    // Simulate avatar upload
    toast({
      title: "Avatar updated!",
      description: "Your profile picture has been updated.",
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
        <motion.div
          initial={{ opacity: 0, y: 50, rotateX: 10 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Card className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/40 shadow-2xl glow-effect">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Profile Settings
              </CardTitle>
              <CardDescription className="text-slate-400">
                Update your profile information
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* Avatar Section */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative">
                  <img
                    src={user?.avatar}
                    alt={user?.name}
                    className="w-24 h-24 rounded-full border-4 border-slate-600/50"
                  />
                  <button
                    onClick={handleAvatarChange}
                    className="absolute bottom-0 right-0 bg-gradient-to-r from-cyan-500 to-purple-600 p-2 rounded-full text-white hover:from-cyan-400 hover:to-purple-500 transition-colors interactive"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <Button
                  variant="ghost"
                  onClick={handleAvatarChange}
                  className="mt-2 text-slate-400 hover:text-cyan-400 interactive"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Change Avatar
                </Button>
              </div>

              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-cyan-400 interactive"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-cyan-400 interactive"
                      required
                    />
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg interactive"
                  >
                    {isLoading ? "Saving..." : "Save Changes"}
                  </Button>
                </motion.div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;
