// ===============================
// ROUTER SPA — VERSION FINALE
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


// ===============================
// PAGES AVEC HUD
// ===============================

const pagesAvecHUD = [
    "page-batiments",
    "page-unites",
    "page-labo",
    "page-trade",
    "page-recherche",
    "page-missions"
];


// ===============================
// GESTION DES FONDS DYNAMIQUES
// ===============================

function updateBackground(pageId) {

    const backgrounds = {
        "page-unites": "bg-profil",
        "page-profil": "bg-profil",
        "page-missions": "bg-missions",
        "page-labo": "bg-labo",
        "page-trade": "bg-trade",
        "page-recherche": "bg-recherche",
        "page-map": "bg-map"
    };

    document.body.classList.remove(
        "bg-profil",
        "bg-missions",
        "bg-labo",
        "bg-trade",
        "bg-recherche",
        "bg-map"
    );

    if (backgrounds[pageId]) {
        document.body.classList.add(backgrounds[pageId]);
    }
}


// ===============================
// AFFICHAGE DES PAGES
// ===============================

export function showPage(id) {

    // 1. Retirer le HUD
    removeHUD();

    // 2. Cacher toutes les pages
    document.querySelectorAll(".spa-page").forEach(p => p.style.display = "none");

    // 3. Réinitialiser la Map si on QUITTE la page Map
    if (id !== "page-map") {
        resetMapInitialization();
    }

    // 4. Afficher la page demandée
    const page = document.getElementById(id);
    if (page) page.style.display = "block";
    else console.warn("Page introuvable :", id);

    // 5. Classe spéciale pour la connexion
    document.body.classList.toggle("show-connexion", id === "page-connexion");

    // 6. Fonds dynamiques
    updateBackground(id);

    // 7. Initialisations spécifiques
    switch (id) {

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
            // ⭐ Patch critique : attendre que la page soit visible AVANT d'initialiser la Map
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    initMap();
                });
            });
            break;
    }

    // 8. Injecter le HUD si nécessaire
    if (pagesAvecHUD.includes(id)) {
        injectHUD();
        updateGlobalUnitHUD();
    }

    // 9. Bouton Retour
    updateBackButtonVisibility(id);
}


// ===============================
// ROUTAGE PAR HASH
// ===============================

function resolvePage() {
    const page = location.hash.replace("#", "") || "page-connexion";
    showPage(page);
}

window.addEventListener("hashchange", resolvePage);
window.addEventListener("DOMContentLoaded", resolvePage);
