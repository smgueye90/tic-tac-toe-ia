import React, { useState, useEffect } from 'react';
import Board from './components/Board';
import {
  initialiserPlateau,
  appliquerMouvement,
  obtenirEtatJeu,
  JOUEUR_X,
  JOUEUR_O,
  joueurSuivant
} from './engine/moteur_jeu';

// Importer les différentes IA
import * as IAFacile from './ai/ia_facile';
import * as IAMoyenne from './ai/ia_moyenne';
import * as IADifficile from './ai/ia_difficile';

const MODE_JOUEUR_VS_IA = 'joueur_vs_ia';
const MODE_JOUEUR_VS_JOUEUR = 'joueur_vs_joueur';

function App() {
  const [plateau, setPlateau] = useState(initialiserPlateau());
  const [joueurActuel, setJoueurActuel] = useState(JOUEUR_X);
  const [etatJeu, setEtatJeu] = useState({ termine: false, gagnant: null });
  const [niveauIA, setNiveauIA] = useState('facile');
  const [mode, setMode] = useState(MODE_JOUEUR_VS_IA);
  const [attente, setAttente] = useState(false);

  // Effet pour le tour de l'IA
  useEffect(() => {
    // Si c'est le tour de l'IA (O) et que le jeu n'est pas terminé
    if (mode === MODE_JOUEUR_VS_IA && joueurActuel === JOUEUR_O && !etatJeu.termine) {
      setAttente(true);
      
      // Petit délai pour simuler la "réflexion" de l'IA
      const delaiIA = setTimeout(() => {
        const coupIA = choisirCoupIA(plateau, niveauIA);
        
        if (coupIA !== null) {
          const nouveauPlateau = appliquerMouvement(plateau, coupIA, JOUEUR_O);
          setPlateau(nouveauPlateau);
          
          // Vérifier l'état du jeu après le coup de l'IA
          const nouvelEtat = obtenirEtatJeu(nouveauPlateau);
          setEtatJeu(nouvelEtat);
          
          if (!nouvelEtat.termine) {
            setJoueurActuel(JOUEUR_X);
          }
        }
        
        setAttente(false);
      }, 500);
      
      return () => clearTimeout(delaiIA);
    }
  }, [joueurActuel, etatJeu.termine, plateau, niveauIA, mode]);

  // Fonction pour choisir un coup selon le niveau de l'IA
  const choisirCoupIA = (plateau, niveau) => {
    switch (niveau) {
      case 'difficile':
        return IADifficile.choisirCoup(plateau);
      case 'moyen':
        return IAMoyenne.choisirCoup(plateau);
      case 'facile':
      default:
        return IAFacile.choisirCoup(plateau);
    }
  };

  // Gérer un clic sur une cellule
  const handleCellClick = (index) => {
    // Ignorer les clics si le jeu est terminé ou en attente
    if (etatJeu.termine || attente) {
      return;
    }
    
    // Appliquer le mouvement du joueur actuel
    const nouveauPlateau = appliquerMouvement(plateau, index, joueurActuel);
    setPlateau(nouveauPlateau);
    
    // Vérifier l'état du jeu après le mouvement
    const nouvelEtat = obtenirEtatJeu(nouveauPlateau);
    setEtatJeu(nouvelEtat);
    
    // Si le jeu n'est pas terminé, passer au joueur suivant
    if (!nouvelEtat.termine) {
      setJoueurActuel(joueurSuivant(joueurActuel));
    }
  };

  // Réinitialiser le jeu
  const resetGame = () => {
    setPlateau(initialiserPlateau());
    setJoueurActuel(JOUEUR_X);
    setEtatJeu({ termine: false, gagnant: null });
  };

  // Changer le niveau de l'IA
  const changeNiveauIA = (niveau) => {
    setNiveauIA(niveau);
    resetGame();
  };

  // Changer le mode de jeu
  const changeMode = (nouveauMode) => {
    setMode(nouveauMode);
    resetGame();
  };

  // Message de statut
  const getStatusMessage = () => {
    if (etatJeu.termine) {
      if (etatJeu.gagnant) {
        return `Joueur ${etatJeu.gagnant} a gagné !`;
      } else {
        return 'Match nul !';
      }
    } else {
      const joueur = joueurActuel === JOUEUR_X ? 'X' : 'O';
      const joueurNom = mode === MODE_JOUEUR_VS_IA && joueurActuel === JOUEUR_O ? 'IA' : `Joueur ${joueur}`;
      return `Au tour de ${joueurNom}`;
    }
  };

  return (
    <div className="app-container">
      <h1>Tic Tac Toe IA</h1>
      
      <div className="controls">
        <div className="mode-selector">
          <button 
            className={mode === MODE_JOUEUR_VS_IA ? 'active' : ''} 
            onClick={() => changeMode(MODE_JOUEUR_VS_IA)}
          >
            Joueur vs IA
          </button>
          <button 
            className={mode === MODE_JOUEUR_VS_JOUEUR ? 'active' : ''} 
            onClick={() => changeMode(MODE_JOUEUR_VS_JOUEUR)}
          >
            Joueur vs Joueur
          </button>
        </div>
        
        {mode === MODE_JOUEUR_VS_IA && (
          <div className="difficulty-selector">
            <p>Niveau de l'IA:</p>
            <div className="buttons">
              <button 
                className={niveauIA === 'facile' ? 'active' : ''} 
                onClick={() => changeNiveauIA('facile')}
              >
                Facile
              </button>
              <button 
                className={niveauIA === 'moyen' ? 'active' : ''} 
                onClick={() => changeNiveauIA('moyen')}
              >
                Moyen
              </button>
              <button 
                className={niveauIA === 'difficile' ? 'active' : ''} 
                onClick={() => changeNiveauIA('difficile')}
              >
                Difficile
              </button>
            </div>
          </div>
        )}
      </div>
      
      <div className="status">{getStatusMessage()}</div>
      
      <Board 
        plateau={plateau} 
        onClick={handleCellClick} 
        disabled={etatJeu.termine || (mode === MODE_JOUEUR_VS_IA && joueurActuel === JOUEUR_O)}
      />
      
      <button className="reset-button" onClick={resetGame}>
        Nouvelle partie
      </button>
      
      <style jsx="true">{`
        .app-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          text-align: center;
          font-family: Arial, sans-serif;
        }
        
        h1 {
          margin-bottom: 20px;
          color: #2c3e50;
        }
        
        .controls {
          margin-bottom: 20px;
        }
        
        .mode-selector, .difficulty-selector .buttons {
          display: flex;
          justify-content: center;
          gap: 10px;
          margin-bottom: 15px;
        }
        
        button {
          padding: 8px 16px;
          border: 1px solid #3498db;
          background-color: white;
          color: #3498db;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        button:hover {
          background-color: #f0f8ff;
        }
        
        button.active {
          background-color: #3498db;
          color: white;
        }
        
        .reset-button {
          margin-top: 20px;
          padding: 10px 20px;
          background-color: #27ae60;
          color: white;
          border: none;
        }
        
        .reset-button:hover {
          background-color: #2ecc71;
        }
        
        .status {
          margin-bottom: 20px;
          font-size: 1.2rem;
          font-weight: bold;
          height: 30px;
        }
        
        .difficulty-selector p {
          margin-bottom: 5px;
        }
      `}</style>
    </div>
  );
}

export default App;