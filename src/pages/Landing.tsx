import React from 'react';
import { motion } from 'framer-motion';
import TileBackground from '../components/TileBackground';
import AuthForm from '../components/AuthForm';
import { Home } from 'lucide-react';

type LandingProps = {
  onAuthSuccess: () => void;
};

const Landing: React.FC<LandingProps> = ({ onAuthSuccess }) => {
  return (
    <div className="min-h-screen">
      <TileBackground />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2 text-center md:text-left"
          >
            <div className="flex items-center justify-center md:justify-start mb-6">
              <Home className="h-10 w-10 text-blue-600 mr-3" />
              <h1 className="text-5xl font-bold text-gray-800">
                StudStay
              </h1>
            </div>
            <p className="text-xl text-gray-600">
              Find your perfect student accommodation
            </p>
          </motion.div>
          
          <div className="md:w-1/2 flex justify-center">
            <AuthForm onSuccess={onAuthSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;