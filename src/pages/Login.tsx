
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Rocket } from "lucide-react";
import { Link } from "react-router-dom";
import SpaceBackground from "@/components/SpaceBackground";
import FloatingElements from "@/components/FloatingElements";
import MagneticCursor from "@/components/MagneticCursor";
import ParticleSystem from "@/components/ParticleSystem";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password });
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
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Rocket className="w-6 h-6 text-white" />
              </motion.div>
              <CardTitle className="text-2xl bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-slate-400">
                Sign in to your cosmic portfolio account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-300">
                    Email
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
                
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 bg-slate-800/50 border-slate-600/50 text-white placeholder-slate-400 focus:border-cyan-400 interactive"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors interactive"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white shadow-lg interactive"
                  >
                    Sign In
                  </Button>
                </motion.div>
              </form>

              <div className="mt-6 text-center space-y-2">
                <p className="text-sm text-slate-400">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 transition-colors interactive">
                    Sign up
                  </Link>
                </p>
                <p className="text-sm">
                  <a href="#" className="text-slate-400 hover:text-cyan-400 transition-colors interactive">
                    Forgot your password?
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
