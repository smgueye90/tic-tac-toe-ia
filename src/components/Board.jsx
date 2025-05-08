// import React from 'react';
// import Square from './Square';

// function Board({ squares, onClick }) {
//   const renderSquare = (i) => {
//     return <Square value={squares[i]} onClick={() => onClick(i)} />;
//   };

//   return (
//     <div className="grid grid-cols-3">
//       {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
//       {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
//       {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
//     </div>
//   );
// }

// export default Board;

import React from 'react';

/**
 * Composant Board - Affiche le plateau de jeu
 */
const Board = ({ plateau, onClick, disabled }) => {
  return (
    <div className="board">
      {plateau.map((cellule, index) => (
        <button
          key={index}
          className={`cell ${cellule ? 'cell-' + cellule.toLowerCase() : ''}`}
          onClick={() => onClick(index)}
          disabled={cellule !== null || disabled}
        >
          {cellule}
        </button>
      ))}
      <style jsx="true">{`
        .board {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          grid-gap: 4px;
          max-width: 300px;
          margin: 0 auto;
        }
        
        .cell {
          width: 100%;
          aspect-ratio: 1/1;
          font-size: 2rem;
          font-weight: bold;
          background-color: #f0f0f0;
          border: 2px solid #333;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s;
        }
        
        .cell:hover:not(:disabled) {
          background-color: #e0e0e0;
        }
        
        .cell:disabled {
          cursor: not-allowed;
        }
        
        .cell-x {
          color: #e74c3c;
        }
        
        .cell-o {
          color: #3498db;
        }
      `}</style>
    </div>
  );
};

export default Board;