
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, User, FileText, Rocket, LogOut, Settings, UserCircle, LayoutDashboard } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MagneticCursor from "@/components/MagneticCursor";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, profile, signOut, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: "Templates", href: "#templates" },
    { name: "Features", href: "#features" },
  ];

  const avatarUrl = profile?.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`;
  const displayName = profile?.name || user?.email?.split('@')[0] || 'User';

  const handleCreatePortfolio = () => {
    if (!isAuthenticated) {
      navigate("/signup");
    } else {
      // Navigate to portfolio creation - for now go to dashboard
      navigate("/dashboard");
    }
  };

  if (loading) {
    return null; // Or a loading spinner
  }

  return (
    <>
      <MagneticCursor />
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-700/50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-3"
            >
              <Link to="/" className="flex items-center space-x-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <Rocket className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>
                <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                  CosmicFolio
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="interactive"
                >
                  {item.href.startsWith('#') ? (
                    <a
                      href={item.href}
                      className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium interactive"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <Link
                      to={item.href}
                      className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium interactive"
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
              
              {/* Dashboard link for authenticated users */}
              {isAuthenticated && (
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                  className="interactive"
                >
                  <Link
                    to="/dashboard"
                    className="text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium interactive"
                  >
                    Dashboard
                  </Link>
                </motion.div>
              )}
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleCreatePortfolio}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 shadow-lg interactive"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Create Portfolio
                    </Button>
                  </motion.div>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors interactive bg-slate-800/50 border border-slate-600/50 hover:border-slate-500 rounded-lg px-3 py-2"
                      >
                        <img
                          src={avatarUrl}
                          alt={displayName}
                          className="w-8 h-8 rounded-full"
                        />
                        <span className="font-medium">{displayName}</span>
                      </motion.button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="w-48 bg-slate-800/90 backdrop-blur-xl border-slate-600/50"
                    >
                      <div className="px-3 py-2 border-b border-slate-600/50">
                        <p className="text-sm text-slate-300">{user?.email}</p>
                      </div>
                      <DropdownMenuItem asChild>
                        <Link to="/dashboard" className="text-slate-300 hover:text-white">
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/profile" className="text-slate-300 hover:text-white">
                          <UserCircle className="w-4 h-4 mr-2" />
                          Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link to="/settings" className="text-slate-300 hover:text-white">
                          <Settings className="w-4 h-4 mr-2" />
                          Settings
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-slate-600/50" />
                      <DropdownMenuItem 
                        onClick={signOut}
                        className="text-slate-300 hover:text-white cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sign Out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Link to="/login">
                      <Button
                        variant="ghost"
                        className="text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-600/50 hover:border-slate-500 interactive"
                      >
                        <User className="w-4 h-4 mr-2" />
                        Login
                      </Button>
                    </Link>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={handleCreatePortfolio}
                      className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 shadow-lg interactive"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      Sign Up
                    </Button>
                  </motion.div>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors interactive"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden border-t border-slate-700/50"
              >
                <div className="py-4 space-y-4">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {item.href.startsWith('#') ? (
                        <a
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2 interactive"
                        >
                          {item.name}
                        </a>
                      ) : (
                        <Link
                          to={item.href}
                          onClick={() => setIsOpen(false)}
                          className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2 interactive"
                        >
                          {item.name}
                        </Link>
                      )}
                    </motion.div>
                  ))}
                  
                  {/* Dashboard link for authenticated users in mobile */}
                  {isAuthenticated && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: navItems.length * 0.1 }}
                    >
                      <Link
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="block text-slate-300 hover:text-cyan-400 transition-colors duration-300 font-medium py-2 interactive"
                      >
                        Dashboard
                      </Link>
                    </motion.div>
                  )}
                  
                  <div className="pt-4 space-y-3 border-t border-slate-700/50">
                    {isAuthenticated ? (
                      <>
                        <div className="flex items-center space-x-3 py-2">
                          <img
                            src={avatarUrl}
                            alt={displayName}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-slate-300 font-medium">{displayName}</p>
                            <p className="text-slate-400 text-sm">{user?.email}</p>
                          </div>
                        </div>
                        <Button
                          onClick={() => {
                            handleCreatePortfolio();
                            setIsOpen(false);
                          }}
                          className="w-full justify-start bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white interactive"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Create Portfolio
                        </Button>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-600/50 interactive"
                          >
                            <LayoutDashboard className="w-4 h-4 mr-2" />
                            Dashboard
                          </Button>
                        </Link>
                        <Link to="/profile" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-600/50 interactive"
                          >
                            <UserCircle className="w-4 h-4 mr-2" />
                            Profile
                          </Button>
                        </Link>
                        <Link to="/settings" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-600/50 interactive"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Settings
                          </Button>
                        </Link>
                        <Button
                          onClick={() => {
                            signOut();
                            setIsOpen(false);
                          }}
                          variant="ghost"
                          className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-600/50 interactive"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </Button>
                      </>
                    ) : (
                      <>
                        <Link to="/login" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-600/50 interactive"
                          >
                            <User className="w-4 h-4 mr-2" />
                            Login
                          </Button>
                        </Link>
                        <Button
                          onClick={() => {
                            handleCreatePortfolio();
                            setIsOpen(false);
                          }}
                          className="w-full justify-start bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white interactive"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Sign Up
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.nav>
    </>
  );
};

export default Navigation;
