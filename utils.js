// =================================================================
// 🎶 Fonction pour générer un bip sonore 🎶
// =================================================================
export function makeSound(frequency, duration) {
    // Crée un contexte audio (le moteur de son)
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    
    // Crée un oscillateur (la source du son)
    const oscillator = audioContext.createOscillator();
    // Crée un gain (le volume)
    const gainNode = audioContext.createGain();

    // Connecte l'oscillateur au gain, et le gain à la sortie audio
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configuration du son
    oscillator.type = 'sine'; // type d'onde : sinusoïdale
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime); // fréquence en Hertz
    
    // Démarre l'oscillateur immédiatement
    oscillator.start();

    // Arrête l'oscillateur après la durée spécifiée
    setTimeout(() => {
        oscillator.stop();
    }, duration);
}