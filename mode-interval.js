let timer;
let remainingTime;
let currentRound = 1;
let isWorking = true;
let totalRoundsInput, workTimeInput, restTimeInput;

import { makeSound } from './utils.js';

function startRound() {
    // Définir le temps et la couleur selon le mode
    if (isWorking) {
        remainingTime = workTimeInput;
        document.getElementById('status').innerText = "TRAVAIL";
        document.getElementById('status').className = "work-mode";
    } else {
        // Le premier repos est après le premier round, donc on incrémente l'affichage du round avant le repos.
        document.getElementById('current-round').innerText = currentRound - 1; 

        remainingTime = restTimeInput;
        document.getElementById('status').innerText = "REPOS";
        document.getElementById('status').className = "rest-mode";
    }

    document.getElementById('current-round').innerText = currentRound;
    updateDisplay();

    // Lancer la boucle du minuteur
    timer = setInterval(() => {
        remainingTime--;
        updateDisplay();
        
        // Bip pour les 3 dernières secondes
        if (remainingTime <= 3 && remainingTime > 0) {
            makeSound(660, 150); // Bip plus aigu
        }
        
        // Bip pour la fin de la phase
        if (remainingTime === 0) {
            makeSound(880, 500); // Bip fort et long
        }

        if (remainingTime < 0) {
            clearInterval(timer);
            handlePhaseEnd();
        }
    }, 1000);
}

function startCountdown(duration) {
    let countdown = duration;
    
    document.getElementById('status').innerText = "PRÉPAREZ-VOUS !";
    document.getElementById('status').className = "get-ready-mode"; // On pourrait ajouter ce style en CSS
    document.getElementById('current-round').innerText = currentRound;
    
    const countdownTimer = setInterval(() => {
        document.getElementById('time-left').innerText = countdown;
        makeSound(440, 100); // Bip à 440 Hz (La)

        if (countdown <= 0) {
            clearInterval(countdownTimer);
            startRound();
        }
        
        countdown--;
    }, 1000);
}

function finish() {
    document.getElementById('status').innerText = "TERMINÉ !";
    document.getElementById('status').className = "finish-mode";
    document.getElementById('time-left').innerText = "Bravo";
    makeSound(2000, 1000); // Bip de fin très aigu et long
}

function updateDisplay() {
    document.getElementById('time-left').innerText = remainingTime >= 0 ? remainingTime : 0;
    // On met à jour l'affichage du round en temps réel (pour la lisibilité)
    document.getElementById('current-round').innerText = currentRound + (isWorking ? '' : ' (Repos)');
    if (currentRound > totalRoundsInput && isWorking) {
         document.getElementById('current-round').innerText = totalRoundsInput + ' / ' + totalRoundsInput;
    }    
    // Si on est en phase de repos, on affiche le round précédent + Repos.
    if (!isWorking && currentRound > 1) {
        document.getElementById('current-round').innerText = (currentRound - 1) + ' / ' + totalRoundsInput + ' (Repos)';
    }
    if (currentRound > totalRoundsInput) {
         document.getElementById('current-round').innerText = totalRoundsInput + ' / ' + totalRoundsInput;
    }
}

function handlePhaseEnd() {
    if (isWorking) {
        // Fin de la phase de travail. On regarde s'il reste des rounds.
        if (currentRound < totalRoundsInput) {
            isWorking = false; // On passe au repos
            startRound(); // Compte à rebours avant le repos
        } else {
            finish();
        }
    } else {
        // Fin de la phase de repos. On passe au prochain round.
        currentRound++; 
        isWorking = true; 
        
        if (currentRound <= totalRoundsInput) {
            startCountdown(3); // Compte à rebours avant le travail
        } else {
            finish();
        }
    }
}

export function changeValue(id, delta) {
    const input = document.getElementById(id);
    let currentValue = parseInt(input.value) || 0; 
    let newValue = currentValue + delta;
    
    if (id === 'rounds') {
        if (newValue >= 1) {
            input.value = newValue;
        } else {
            input.value = 1; 
        }
    }
}

export function changeTime(mode, unit, delta) {
    const input = document.getElementById(`${mode}-${unit}`);
    let currentValue = parseInt(input.value) || 0;
    let newValue = currentValue + delta;

    if (unit === 'sec') {
        // Logique pour les secondes : boucle entre 0 et 59
        if (newValue > 59) {
            newValue = 0;
            // On incrémente la minute si on passe de 59 à 60
            if (delta > 0) changeTime(mode, 'min', 1);
        } else if (newValue < 0) {
            newValue = 55; // On va à 55s si on décrémente en dessous de 0
            // On décrémente la minute si on passe de 0 à -1
            if (delta < 0) changeTime(mode, 'min', -1);
        }
    } else if (unit === 'min') {
        // Logique pour les minutes : ne descend pas sous zéro
        if (newValue < 0) {
            newValue = 0;
        }
    }
    
    // Met à jour l'affichage en ajoutant un zéro si nécessaire (padStart)
    input.value = String(newValue).padStart(2, '0');
}

export function startTimer() {
    // 1. Récupérer et convertir les valeurs des inputs Min:Sec
    
    // Travail : (Minutes * 60) + Secondes
    const workMin = parseInt(document.getElementById('work-min').value);
    const workSec = parseInt(document.getElementById('work-sec').value);
    workTimeInput = (workMin * 60) + workSec;

    // Repos : (Minutes * 60) + Secondes
    const restMin = parseInt(document.getElementById('rest-min').value);
    const restSec = parseInt(document.getElementById('rest-sec').value);
    restTimeInput = (restMin * 60) + restSec;
    
    // Rounds (inchangé)
    totalRoundsInput = parseInt(document.getElementById('rounds').value);


    // 2. Masquer la config, afficher le timer (inchangé)
    document.getElementById('setup').classList.add('hidden');
    document.getElementById('timer-display').classList.remove('hidden');
    
    // 3. Initialiser (inchangé)
    document.getElementById('total-rounds').innerText = totalRoundsInput;
    currentRound = 1;
    isWorking = true;
    
    startCountdown(3); 
}

export function resetTimer() {
    clearInterval(timer);
    document.getElementById('setup').classList.remove('hidden');
    document.getElementById('timer-display').classList.add('hidden');
    // Réinitialisation de l'état
    remainingTime = 0;
    currentRound = 1;
    isWorking = true;
    document.getElementById('status').innerText = "PRÊT";
    document.getElementById('status').className = "";
}