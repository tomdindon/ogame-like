/* ===============================
   ROUTER SPA - VERSION MODERNE
   =============================== */

import { injectHUD, updateGlobalUnitHUD, removeHUD } from "./layout.js";
import { initBatiments } from "./batiments.js";
import { onPageChange } from './main.js';
import { initUnites } from "./unites.js";
import { renderMissionsList, updateMissionLogDisplay, startGlobalTimer } from "./missions.js";
import { updateInventory } from "./gameData.js";
import { updateProfil } from "./profil.js";
import { buildings, GameData } from "./gameData.js";
import { initLabo } from "./labo.js";
import { initTrade } from "./trade.js";
import { initRecherche } from "./recherche.js";
import { initMap, getGalaxyMap } from "./map.js";

// ===============================
// CONFIGURATION
// ===============================

// Pages avec HUD (barre de ressources)
const pagesAvecHUD = [
    "page-dashboard",
    "page-batiments",
    "page-unites",
    "page-labo",
    "page-trade",
    "page-recherche",
    "page-missions",
    "page-inventaire",
    "page-profil"
];

let currentMapInstance = null;

// ===============================
// INITIALISATION DU DASHBOARD
// ===============================

function initDashboard() {
    console.log("📊 Initialisation du Dashboard");

    const cards = document.querySelectorAll(".dashboard-card");
    
    if (cards.length === 0) {
        console.warn("⚠️ Aucune carte dashboard trouvée");
        return;
    }

    cards.forEach(card => {
        const targetPage = card.dataset.page;
        
        if (!targetPage) {
            console.warn("⚠️ Carte sans data-page :", card);
            return;
        }

        card.style.cursor = "pointer";

        // Cloner pour supprimer les anciens listeners
        const newCard = card.cloneNode(true);
        card.parentNode.replaceChild(newCard, card);

        newCard.addEventListener("click", () => {
            console.log("🎯 Navigation vers :", targetPage);
            location.hash = targetPage;
        });
    });

    console.log("✅", cards.length, "cartes dashboard initialisées");
}

// ===============================
// AFFICHAGE DES PAGES
// ===============================

export function showPage(id) {
    console.log("📄 Affichage de la page :", id);

    // 1. Retirer le HUD de l'ancienne page
    removeHUD();

    // 2. Cacher toutes les pages
    document.querySelectorAll(".spa-page").forEach(p => {
        p.classList.remove("active");
    });

    // 3. Afficher la page demandée
    const page = document.getElementById(id);
    if (!page) {
        console.error("❌ Page introuvable :", id);
        return;
    }

    page.classList.add("active");

    // 4. Initialisations spécifiques par page
    switch (id) {
        case "page-dashboard":
            initDashboard();
            break;

        case "page-batiments":
            initBatiments();
            break;

        case "page-unites":
            initUnites();
            break;

        case "page-missions":
            renderMissionsList();
            updateMissionLogDisplay();
            startGlobalTimer();
            break;

        case "page-inventaire":
            updateInventory();
            break;

        case "page-profil":
            updateProfil(GameData, buildings);
            break;

        case "page-labo":
            initLabo();
            break;

        case "page-trade":
            initTrade();
            break;

        case "page-recherche":
            initRecherche();
            break;

        case "page-map":
            // Initialiser la carte avec un délai pour s'assurer que le DOM est prêt
            setTimeout(() => {
                if (!currentMapInstance) {
                    initMap();
                    currentMapInstance = getGalaxyMap();
                    console.log("🗺️ Carte galactique initialisée");
                }
            }, 100);
            break;
    }

    // 5. Injecter le HUD si nécessaire
    if (pagesAvecHUD.includes(id)) {
        injectHUD();
        updateGlobalUnitHUD();
        console.log("✅ HUD injecté pour :", id);
    }

    // 6. Notifier le changement de page (pour main.js)
    onPageChange(id);

    // 7. Scroll en haut
    window.scrollTo(0, 0);
}

// ===============================
// ROUTAGE PAR HASH
// ===============================

function resolvePage() {
    const hash = location.hash.replace("#", "");
    const page = hash || "page-dashboard";
    
    console.log("🔍 Hash détecté :", hash, "→ Page :", page);
    showPage(page);
}

// ===============================
// ÉCOUTEURS D'ÉVÉNEMENTS
// ===============================

window.addEventListener("hashchange", resolvePage);
window.addEventListener("DOMContentLoaded", resolvePage);

// Export pour accès externe si besoin
export { resolvePage };
