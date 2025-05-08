import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

type FlipTileProps = {
  delay: number;
};

const FlipTile: React.FC<FlipTileProps> = ({ delay }) => {
  const [flipped, setFlipped] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlipped(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (flipped) {
      const timer = setTimeout(() => {
        setFlipped(false);
      }, Math.random() * 5000 + 2000);

      return () => clearTimeout(timer);
    }
  }, [flipped]);

  return (
    <motion.div
      className="w-full h-full bg-gray-100/20 backdrop-blur-sm rounded-md"
      initial={{ rotateY: 0 }}
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      onClick={() => setFlipped(!flipped)}
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      <div 
        className={`absolute inset-0 w-full h-full rounded-md ${flipped ? 'opacity-0' : 'opacity-100'}`}
        style={{ backfaceVisibility: 'hidden', transition: 'opacity 0.8s' }}
      />
      <div 
        className={`absolute inset-0 w-full h-full bg-black rounded-md ${flipped ? 'opacity-100' : 'opacity-0'}`}
        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', transition: 'opacity 0.8s' }}
      />
    </motion.div>
  );
};

export default FlipTile;