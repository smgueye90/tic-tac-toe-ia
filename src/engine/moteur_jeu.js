/**
 * Moteur de jeu Tic Tac Toe
 * Contient la logique principale du jeu
 */

// Constantes pour les joueurs
export const JOUEUR_X = 'X';
export const JOUEUR_O = 'O';
export const VIDE = null;

/**
 * Crée un nouveau plateau de jeu vide
 * @returns {Array} Plateau 3x3 initialisé avec des valeurs null
 */
export function initialiserPlateau() {
  return Array(9).fill(VIDE);
}

/**
 * Vérifie si un mouvement est valide
 * @param {Array} plateau - État actuel du plateau
 * @param {Number} index - Position où le joueur veut jouer (0-8)
 * @returns {Boolean} true si le mouvement est valide
 */
export function estMouvementValide(plateau, index) {
  return index >= 0 && index < 9 && plateau[index] === VIDE;
}

/**
 * Applique un mouvement sur le plateau
 * @param {Array} plateau - État actuel du plateau
 * @param {Number} index - Position où le joueur veut jouer (0-8)
 * @param {String} joueur - Symbole du joueur (X ou O)
 * @returns {Array} Nouveau plateau après le mouvement
 */
export function appliquerMouvement(plateau, index, joueur) {
  if (!estMouvementValide(plateau, index)) {
    return plateau;
  }
  
  const nouveauPlateau = [...plateau];
  nouveauPlateau[index] = joueur;
  return nouveauPlateau;
}

/**
 * Vérifie les combinaisons gagnantes
 */
const combinaisonsGagnantes = [
  [0, 1, 2], // ligne du haut
  [3, 4, 5], // ligne du milieu
  [6, 7, 8], // ligne du bas
  [0, 3, 6], // colonne de gauche
  [1, 4, 7], // colonne du milieu
  [2, 5, 8], // colonne de droite
  [0, 4, 8], // diagonale gauche-droite
  [2, 4, 6]  // diagonale droite-gauche
];

/**
 * Détermine si un joueur a gagné
 * @param {Array} plateau - État du plateau
 * @param {String} joueur - Symbole du joueur (X ou O)
 * @returns {Boolean} true si le joueur a gagné
 */
export function estGagnant(plateau, joueur) {
  return combinaisonsGagnantes.some(combinaison => {
    return combinaison.every(index => plateau[index] === joueur);
  });
}

/**
 * Vérifie si le plateau est plein (match nul)
 * @param {Array} plateau - État du plateau
 * @returns {Boolean} true si le plateau est plein
 */
export function estPlein(plateau) {
  return plateau.every(cellule => cellule !== VIDE);
}

/**
 * Détermine l'état du jeu
 * @param {Array} plateau - État du plateau
 * @returns {Object} État du jeu {termine, gagnant}
 */
export function obtenirEtatJeu(plateau) {
  // Vérifier si X a gagné
  if (estGagnant(plateau, JOUEUR_X)) {
    return { termine: true, gagnant: JOUEUR_X };
  }
  
  // Vérifier si O a gagné
  if (estGagnant(plateau, JOUEUR_O)) {
    return { termine: true, gagnant: JOUEUR_O };
  }
  
  // Vérifier le match nul
  if (estPlein(plateau)) {
    return { termine: true, gagnant: null };
  }
  
  // Le jeu continue
  return { termine: false, gagnant: null };
}

/**
 * Retourne la liste des mouvements possibles (cases vides)
 * @param {Array} plateau - État du plateau
 * @returns {Array} Liste des indices des cases vides
 */
export function mouvementsPossibles(plateau) {
  return plateau
    .map((cellule, index) => cellule === VIDE ? index : null)
    .filter(index => index !== null);
}

/**
 * Alterne le joueur actif
 * @param {String} joueurActuel - Symbole du joueur actuel
 * @returns {String} Symbole du joueur suivant
 */
export function joueurSuivant(joueurActuel) {
  return joueurActuel === JOUEUR_X ? JOUEUR_O : JOUEUR_X;
}