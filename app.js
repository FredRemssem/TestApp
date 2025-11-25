let currentMode = null;

import * as IntervalMode from './mode-interval.js';

// ===========================================
// FONCTIONS GLOBALES (MENU & NAVIGATION)
// ===========================================

// EXPOSÉE à WINDOW pour onclick="selectMode(...)"
window.selectMode = function(mode) {
    currentMode = mode;    
    document.getElementById('mode-selection').classList.add('hidden');
    if (mode === 'interval') {
        document.getElementById('setup').classList.remove('hidden');
    } else if (mode === 'circuit') {
        alert("Mode Circuit en cours de développement. Retour au menu.");
        window.goBack(); 
    }
};

// EXPOSÉE à WINDOW pour onclick="goBack()"
window.goBack = function() {
    IntervalMode.resetTimer(); 
    document.getElementById('setup').classList.add('hidden');
    // FUTURE: document.getElementById('setup-circuit').classList.add('hidden'); 
    
    document.getElementById('mode-selection').classList.remove('hidden');
    currentMode = null;
}

// ===========================================
// EXPOSITION DES FONCTIONS DU MODE INTERVALLE AU HTML
// ===========================================
// Ces lignes exposent les fonctions du module au DOM global
window.startTimer = IntervalMode.startTimer;
window.resetTimer = IntervalMode.resetTimer;
window.changeValue = IntervalMode.changeValue;
window.changeTime = IntervalMode.changeTime;

// =================================================
// Enregistrement du Service Worker
// =================================================
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./service-worker.js')
      .then(registration => {
        console.log('SW enregistré avec succès: ', registration);
      })
      .catch(error => {
        console.log('Échec de l\'enregistrement du SW: ', error);
      });
  });
}