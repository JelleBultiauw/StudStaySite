import React from 'react';
import { motion } from 'framer-motion';
import { Home, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';

type HeaderProps = {
  isAuthenticated: boolean;
  onLogout: () => void;
};

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
    onLogout();
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-80 backdrop-blur-md z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <Home className="h-8 w-8 text-blue-600 mr-2" />
          <span className="text-2xl font-bold text-gray-800">StudStay</span>
        </motion.div>

        {isAuthenticated && (
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={handleLogout}
            className="flex items-center text-gray-700 hover:text-blue-600 transition duration-300"
          >
            <span className="mr-2">Logout</span>
            <LogOut size={18} />
          </motion.button>
        )}
      </div>
    </header>
  );
};

export default Header;