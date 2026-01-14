// main.js
import "./gameData.js";     // 1️⃣ Données en premier
import "./layout.js";       // 2️⃣ HUD
import "./batiments.js";    // 3️⃣ Modules
import "./unites.js";
import "./missions.js";
import "./labo.js";
import "./trade.js";
import "./recherche.js";
import "./profil.js";
import "./map.js";
import "./router.js";       // 5️⃣ Router EN DERNIER


let musicStarted = false;

function playMusic() {
    const music = document.getElementById("gameMusic");
    if (!music) return;

    music.volume = 0.4;
    music.play().catch(() => {
        console.log("🎵 Lecture en attente d'une interaction utilisateur.");
    });
}

window.addEventListener("click", () => {
    if (!musicStarted) {
        musicStarted = true;
        playMusic();
    }
}, { once: true });

let backBtnWrapper = null;
let backBtn = null;

window.addEventListener("DOMContentLoaded", () => {
    backBtnWrapper = document.getElementById("back-button-wrapper");
    backBtn = document.getElementById("btn-retour");

    if (!backBtnWrapper || !backBtn) {
        console.warn("⚠ Impossible de trouver le bouton Retour.");
        return;
    }

    backBtn.addEventListener("click", () => {
        location.hash = "page-dashboard";
    });
});

export function updateBackButtonVisibility(pageId) {
    if (!backBtnWrapper) return;

    const pagesSansBouton = ["page-dashboard"];

    if (pagesSansBouton.includes(pageId)) {
        backBtnWrapper.style.display = "none";
    } else {
        backBtnWrapper.style.display = "block";
    }
}
