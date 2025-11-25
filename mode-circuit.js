// ===========================================
// Fonctions de contrôle (Stubs)
// ===========================================

/**
 * Stub de la fonction de lancement du minuteur.
 */
export function startTimer() {
    console.log("Mode Intervalle : Démarrage du minuteur (Logique à implémenter).");
    
    // Simule l'affichage du timer pour le développement de la navigation
    document.getElementById('setup')?.classList.add('hidden');
    document.getElementById('timer-display')?.classList.remove('hidden');
}

/**
 * Réinitialise l'état et masque le minuteur.
 * (Important pour la fonction goBack)
 */
export function resetTimer() {
    console.log("Mode Intervalle : Réinitialisation de l'état (Minimale).");
    
    // Masque le minuteur si visible
    document.getElementById('timer-display')?.classList.add('hidden');
}