
/**
 * IA Facile pour Tic Tac Toe
 * Joue des coups aléatoires parmi les coups possibles
 */

import { mouvementsPossibles } from '../engine/moteur_jeu';

/**
 * Choisi un coup aléatoire parmi les coups possibles
 * @param {Array} plateau - État actuel du plateau
 * @returns {Number} Index du coup choisi par l'IA
 */
export function choisirCoup(plateau) {
  const coups = mouvementsPossibles(plateau);
  
  if (coups.length === 0) {
    return null;
  }
  
  // Sélection aléatoire d'un coup parmi les coups possibles
  const indexAleatoire = Math.floor(Math.random() * coups.length);
  return coups[indexAleatoire];
}