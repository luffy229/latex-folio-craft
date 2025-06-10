
import { motion } from "framer-motion";
import { Github, Twitter, Linkedin, Mail, Rocket, Star } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-slate-900/80 backdrop-blur-xl border-t border-slate-700/50 mt-32">
      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-20 left-1/4 w-40 h-40 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -top-16 right-1/3 w-32 h-32 bg-gradient-to-r from-pink-500/20 to-orange-500/20 rounded-full blur-3xl"
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-xl flex items-center justify-center"
              >
                <Rocket className="w-6 h-6 text-white" />
              </motion.div>
              <span className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
                CosmicFolio
              </span>
            </div>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
              Transcend the ordinary with portfolios that exist beyond dimensions, powered by LaTeX and cosmic creativity.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-slate-200 font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Templates", "Features", "Documentation", "Support"].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-cyan-400 transition-colors duration-300 text-sm md:text-base flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <Star className="w-3 h-3" />
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-slate-200 font-semibold text-lg mb-6">Resources</h3>
            <ul className="space-y-3">
              {["LaTeX Guide", "Examples", "Community", "Tutorials"].map((link) => (
                <li key={link}>
                  <motion.a
                    href="#"
                    className="text-slate-400 hover:text-purple-400 transition-colors duration-300 text-sm md:text-base flex items-center gap-2"
                    whileHover={{ x: 5 }}
                  >
                    <Star className="w-3 h-3" />
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Connect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-slate-200 font-semibold text-lg mb-6">Connect</h3>
            <div className="flex gap-4 mb-6">
              {[
                { icon: Github, color: "hover:text-slate-300" },
                { icon: Twitter, color: "hover:text-blue-400" },
                { icon: Linkedin, color: "hover:text-blue-500" },
                { icon: Mail, color: "hover:text-green-400" }
              ].map(({ icon: Icon, color }, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className={`text-slate-400 ${color} transition-colors duration-300 p-2 rounded-lg hover:bg-slate-800/50`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
            <p className="text-slate-500 text-xs md:text-sm">
              Join our cosmic community of creators
            </p>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-slate-700/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <p className="text-slate-500 text-sm text-center md:text-left">
            © {currentYear} CosmicFolio. All rights reserved across all dimensions.
          </p>
          <div className="flex gap-6 text-slate-500 text-sm">
            <motion.a
              href="#"
              className="hover:text-slate-300 transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="hover:text-slate-300 transition-colors duration-300"
              whileHover={{ y: -2 }}
            >
              Terms of Service
            </motion.a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
