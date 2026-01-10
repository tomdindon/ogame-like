// ============================================================
// IMPORTS (ordre important)
// ============================================================

import "./gameData.js";     // doit être chargé en premier
import "./batiments.js";    // dépend de GameData
import "./layout.js";       // doit être prêt avant le router
import "./connexion.js";    // indépendant
import "./router.js";       // TOUJOURS en dernier


// ============================================================
// MUSIQUE DU JEU
// ============================================================

let musicStarted = false;

function playMusic() {
    const music = document.getElementById("gameMusic");
    if (!music) return;

    music.volume = 0.4;

    music.play().catch(() => {
        console.log("🎵 Lecture en attente d'une interaction utilisateur.");
    });
}

// Démarre la musique dès la première interaction
window.addEventListener("click", () => {
    if (!musicStarted) {
        musicStarted = true;
        playMusic();
    }
}, { once: true });


// ============================================================
// BOUTON RETOUR (global)
// ============================================================

let backBtnWrapper = null;
let backBtn = null;

// On attend que le DOM soit prêt pour récupérer les éléments
window.addEventListener("DOMContentLoaded", () => {

    backBtnWrapper = document.getElementById("back-button-wrapper");
    backBtn = document.getElementById("btn-retour");

    if (!backBtnWrapper || !backBtn) {
        console.warn("⚠ Impossible de trouver le bouton Retour dans le DOM.");
        return;
    }

    // Action du bouton : retour vers le dashboard
    backBtn.addEventListener("click", () => {
        location.hash = "page-dashboard";
    });
});


// ============================================================
// FONCTION : afficher / cacher le bouton Retour
// ============================================================

export function updateBackButtonVisibility(pageId) {

    // Sécurité : si le DOM n'est pas encore prêt
    if (!backBtnWrapper) return;

    // Pages où le bouton NE doit PAS apparaître
    const pagesSansBouton = [
        "page-connexion",
        "page-dashboard"
    ];

    if (pagesSansBouton.includes(pageId)) {
        backBtnWrapper.style.display = "none";
    } else {
        backBtnWrapper.style.display = "block";
    }
}
