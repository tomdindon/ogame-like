/* ============================================
   MAIN.JS - Point d'entrée principal
   ============================================ */

// 1️⃣ Données et configuration en premier
import "./gameData.js";

// 2️⃣ HUD et layout
import "./layout.js";

// 3️⃣ Modules de jeu
import "./batiments.js";
import "./unites.js";
import "./missions.js";
import "./labo.js";
import "./trade.js";
import "./recherche.js";
import "./profil.js";

// 4️⃣ Importer la carte interactive
import { initMap, getGalaxyMap } from './map.js';

// 5️⃣ Router EN DERNIER
import "./router.js";

// ============================================
// Configuration globale
// ============================================

let musicStarted = false;
let backBtnWrapper = null;
let backBtn = null;
let currentGalaxyMap = null;

// ============================================
// Gestion de la musique
// ============================================

function playMusic() {
    const music = document.getElementById("gameMusic");
    if (!music) return;

    music.volume = 0.4;
    music.play().catch(() => {
        console.log("🎵 Lecture en attente d'une interaction utilisateur.");
    });
}

// Démarrer la musique au premier clic
window.addEventListener("click", () => {
    if (!musicStarted) {
        musicStarted = true;
        playMusic();
    }
}, { once: true });

// ============================================
// Initialisation du bouton Retour
// ============================================

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

// ============================================
// Gestion de la visibilité du bouton Retour
// ============================================

export function updateBackButtonVisibility(pageId) {
    if (!backBtnWrapper) return;

    const pagesSansBouton = ["page-dashboard"];

    if (pagesSansBouton.includes(pageId)) {
        backBtnWrapper.style.display = "none";
    } else {
        backBtnWrapper.style.display = "block";
    }
}

// ============================================
// Gestion des pages et initialisation modules
// ============================================

export function onPageChange(pageId) {
    // Mettre à jour le bouton retour
    updateBackButtonVisibility(pageId);

    // Initialiser la carte si on accède à la page map
    if (pageId === "page-map") {
        // Petite temporisation pour s'assurer que le DOM est prêt
        setTimeout(() => {
            if (!currentGalaxyMap) {
                initMap();
                currentGalaxyMap = getGalaxyMap();
                console.log("🗺️ Carte galactique initialisée");
            }
        }, 100);
    }

    // Logs pour debug
    console.log(`📄 Navigation vers: ${pageId}`);
}

// ============================================
// Export de la référence à la carte
// ============================================

export function getCurrentMap() {
    return currentGalaxyMap;
}

// ============================================
// Fonction pour explorer depuis les missions
// ============================================

export function triggerExploration() {
    if (currentGalaxyMap) {
        currentGalaxyMap.completeExplorationMission();
        console.log("🔭 Nouvelle zone explorée !");
        return true;
    }
    console.warn("⚠ Carte non initialisée");
    return false;
}

// ============================================
// Message de démarrage
// ============================================

console.log(`
╔════════════════════════════════════════╗
║     🚀 COSMIC EMPIRES LOADED 🚀       ║
║     Modern UI - Vanilla Edition        ║
╚════════════════════════════════════════╝
`);
