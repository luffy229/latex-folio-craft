
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, User, FileText, Rocket, LogOut, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import MagneticCursor from "@/components/MagneticCursor";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { user, signOut, isAuthenticated } = useAuth();

  const navItems = [
    { name: "Templates", href: "#templates" },
    { name: "Features", href: "#features" },
    { name: "Dashboard", href: "/dashboard" },
  ];

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
            </div>

            {/* Desktop Auth Section */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-3 text-slate-300 hover:text-white transition-colors interactive bg-slate-800/50 border border-slate-600/50 hover:border-slate-500 rounded-lg px-3 py-2"
                  >
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-8 h-8 rounded-full"
                    />
                    <span className="font-medium">{user?.name}</span>
                  </motion.button>
                  
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 bg-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-lg shadow-lg"
                      >
                        <div className="py-2">
                          <div className="px-4 py-2 border-b border-slate-600/50">
                            <p className="text-sm text-slate-300">{user?.email}</p>
                          </div>
                          <Link to="/dashboard" className="flex items-center px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors interactive">
                            <Settings className="w-4 h-4 mr-2" />
                            Dashboard
                          </Link>
                          <button
                            onClick={signOut}
                            className="flex items-center w-full px-4 py-2 text-slate-300 hover:text-white hover:bg-slate-700/50 transition-colors interactive"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
                    <Link to="/signup">
                      <Button className="bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white border-0 shadow-lg interactive">
                        <FileText className="w-4 h-4 mr-2" />
                        Sign Up
                      </Button>
                    </Link>
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
                  
                  <div className="pt-4 space-y-3 border-t border-slate-700/50">
                    {isAuthenticated ? (
                      <>
                        <div className="flex items-center space-x-3 py-2">
                          <img
                            src={user?.avatar}
                            alt={user?.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-slate-300 font-medium">{user?.name}</p>
                            <p className="text-slate-400 text-sm">{user?.email}</p>
                          </div>
                        </div>
                        <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start text-slate-300 hover:text-white hover:bg-slate-800/50 border border-slate-600/50 interactive"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            Dashboard
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
                        <Link to="/signup" onClick={() => setIsOpen(false)}>
                          <Button className="w-full justify-start bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white interactive">
                            <FileText className="w-4 h-4 mr-2" />
                            Sign Up
                          </Button>
                        </Link>
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
