// ===============================
// ROUTER SPA
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
        "page-recherche": "bg-recherche"
    };

    // Retirer tous les fonds connus
    document.body.classList.remove(
        "bg-profil",
        "bg-missions",
        "bg-labo",
        "bg-trade",
        "bg-recherche"
    );

    // Appliquer celui de la page
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

    // 3. Afficher la page demandée
    const page = document.getElementById(id);
    if (page) page.style.display = "block";
    else console.warn("Page introuvable :", id);

    // 4. Classe spéciale pour la connexion
    document.body.classList.toggle("show-connexion", id === "page-connexion");

    // 5. Fonds dynamiques
    updateBackground(id);

    // 6. Initialisations spécifiques
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
    }

    // 7. Injecter le HUD si nécessaire
    if (pagesAvecHUD.includes(id)) {
        injectHUD();
        updateGlobalUnitHUD();
    }

    // 8. Bouton Retour
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
