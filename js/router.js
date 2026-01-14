// ===============================
// ROUTER SPA - VERSION CORRIGÉE
// ===============================

import { injectHUD, updateGlobalUnitHUD, removeHUD } from "./layout.js";
import { initBatiments } from "./batiments.js";
import { updateBackButtonVisibility } from "./main.js";
import { initUnites } from "./unites.js";
import { renderMissionsList, updateMissionLogDisplay, startGlobalTimer } from "./missions.js";
import { updateInventory } from "./gameData.js";
import { updateProfil } from "./profil.js";
import { buildings, GameData } from "./gameData.js";
import { initLabo } from "./labo.js";
import { initTrade } from "./trade.js";
import { initRecherche } from "./recherche.js";
import { initMap, resetMapInitialization } from "./map.js";

// ✅ AJOUTER page-dashboard ICI
const pagesAvecHUD = [
    "page-dashboard",      // ⭐ AJOUT
    "page-batiments",
    "page-unites",
    "page-labo",
    "page-trade",
    "page-recherche",
    "page-missions",
    "page-inventaire",     // ⭐ Ajoute aussi inventaire si tu veux
    "page-profil"          // ⭐ Et profil si tu veux
];

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

    // 1. Retirer le HUD
    removeHUD();

    // 2. Cacher toutes les pages
    document.querySelectorAll(".spa-page").forEach(p => {
        p.classList.remove("active");
    });

    // 3. Réinitialiser la Map si on quitte
    if (id !== "page-map") {
        resetMapInitialization();
    }

    // 4. Afficher la page demandée
    const page = document.getElementById(id);
    if (!page) {
        console.error("❌ Page introuvable :", id);
        return;
    }

    page.classList.add("active");

    // 5. Initialisations spécifiques
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
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    initMap();
                });
            });
            break;
    }

    // 6. Injecter le HUD si nécessaire
    if (pagesAvecHUD.includes(id)) {
        injectHUD();
        updateGlobalUnitHUD();
        console.log("✅ HUD injecté pour :", id);
    }

    // 7. Bouton Retour
    updateBackButtonVisibility(id);
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

window.addEventListener("hashchange", resolvePage);
window.addEventListener("DOMContentLoaded", resolvePage);
