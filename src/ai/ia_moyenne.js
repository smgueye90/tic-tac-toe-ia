/**
 * IA Moyenne pour Tic Tac Toe
 * Joue intelligemment mais fait des erreurs occasionnelles
 */

import { 
    mouvementsPossibles, 
    appliquerMouvement, 
    estGagnant,
    JOUEUR_O, 
    JOUEUR_X 
  } from '../engine/moteur_jeu';
  
  /**
   * Choisit un coup intermédiaire - joue intelligemment 70% du temps,
   * aléatoirement 30% du temps
   * @param {Array} plateau - État actuel du plateau
   * @returns {Number} Index du coup choisi par l'IA
   */
  export function choisirCoup(plateau) {
    const coups = mouvementsPossibles(plateau);
    
    if (coups.length === 0) {
      return null;
    }
    
    // 70% du temps, joue intelligemment
    if (Math.random() < 0.7) {
      // Vérifier si l'IA peut gagner au prochain coup
      for (const coup of coups) {
        const plateauTest = appliquerMouvement(plateau, coup, JOUEUR_O);
        if (estGagnant(plateauTest, JOUEUR_O)) {
          return coup;
        }
      }
      
      // Vérifier si l'adversaire peut gagner au prochain coup et bloquer
      for (const coup of coups) {
        const plateauTest = appliquerMouvement(plateau, coup, JOUEUR_X);
        if (estGagnant(plateauTest, JOUEUR_X)) {
          return coup;
        }
      }
      
      // Prioriser le centre
      if (coups.includes(4)) {
        return 4;
      }
      
      // Prioriser les coins
      const coins = [0, 2, 6, 8].filter(coin => coups.includes(coin));
      if (coins.length > 0) {
        return coins[Math.floor(Math.random() * coins.length)];
      }
    }
    
    // Dans les autres cas, joue aléatoirement
    return coups[Math.floor(Math.random() * coups.length)];
  }