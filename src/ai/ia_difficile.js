/**
 * IA Difficile pour Tic Tac Toe
 * Utilise l'algorithme Minimax avec élagage alpha-beta
 */

import { 
    mouvementsPossibles, 
    appliquerMouvement, 
    estGagnant, 
    estPlein,
    JOUEUR_O, 
    JOUEUR_X 
  } from '../engine/moteur_jeu';
  
  /**
   * Choisit le meilleur coup possible avec l'algorithme Minimax
   * @param {Array} plateau - État actuel du plateau
   * @returns {Number} Index du coup choisi par l'IA
   */
  export function choisirCoup(plateau) {
    const coups = mouvementsPossibles(plateau);
    
    if (coups.length === 0) {
      return null;
    }
    
    let meilleurScore = -Infinity;
    let meilleurCoup = null;
    
    for (const coup of coups) {
      const nouveauPlateau = appliquerMouvement(plateau, coup, JOUEUR_O);
      const score = minimax(nouveauPlateau, 0, false, -Infinity, Infinity);
      
      if (score > meilleurScore) {
        meilleurScore = score;
        meilleurCoup = coup;
      }
    }
    
    return meilleurCoup;
  }
  
  /**
   * Algorithme Minimax avec élagage alpha-beta
   * @param {Array} plateau - État du plateau
   * @param {Number} profondeur - Profondeur actuelle de l'arbre de recherche
   * @param {Boolean} estMaximisant - true si c'est le tour du joueur maximisant (IA)
   * @param {Number} alpha - Valeur alpha pour l'élagage
   * @param {Number} beta - Valeur beta pour l'élagage
   * @returns {Number} Meilleur score pour ce nœud
   */
  function minimax(plateau, profondeur, estMaximisant, alpha, beta) {
    // Évaluer la position terminale
    if (estGagnant(plateau, JOUEUR_O)) {
      return 10 - profondeur; // L'IA gagne, favorise les victoires rapides
    }
    
    if (estGagnant(plateau, JOUEUR_X)) {
      return profondeur - 10; // L'adversaire gagne, minimise les défaites
    }
    
    if (estPlein(plateau)) {
      return 0; // Match nul
    }
    
    const coups = mouvementsPossibles(plateau);
    
    if (estMaximisant) {
      // Tour de l'IA (maximisant)
      let meilleurScore = -Infinity;
      
      for (const coup of coups) {
        const nouveauPlateau = appliquerMouvement(plateau, coup, JOUEUR_O);
        const score = minimax(nouveauPlateau, profondeur + 1, false, alpha, beta);
        meilleurScore = Math.max(score, meilleurScore);
        alpha = Math.max(alpha, score);
        
        // Élagage alpha-beta
        if (beta <= alpha) {
          break;
        }
      }
      
      return meilleurScore;
    } else {
      // Tour de l'adversaire (minimisant)
      let meilleurScore = Infinity;
      
      for (const coup of coups) {
        const nouveauPlateau = appliquerMouvement(plateau, coup, JOUEUR_X);
        const score = minimax(nouveauPlateau, profondeur + 1, true, alpha, beta);
        meilleurScore = Math.min(score, meilleurScore);
        beta = Math.min(beta, score);
        
        // Élagage alpha-beta
        if (beta <= alpha) {
          break;
        }
      }
      
      return meilleurScore;
    }
  }