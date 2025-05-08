import React from 'react';
import FlipTile from './FlipTile';

const TileBackground: React.FC = () => {
  const tiles = [];
  const rows = 6;
  const cols = 8;

  for (let i = 0; i < rows * cols; i++) {
    const delay = Math.random() * 5000;
    tiles.push(
      <div key={i} className="aspect-square">
        <FlipTile delay={delay} />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 -z-10 opacity-40">
      <div 
        className="w-full h-full grid" 
        style={{ 
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          gap: '8px',
          padding: '8px',
        }}
      >
        {tiles}
      </div>
    </div>
  );
};

export default TileBackground;