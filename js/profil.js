// ===============================
// PROFIL.JS
// ===============================

import { GameData } from "./gameData.js";

// ===============================
// CONFIGURATION DES RANGS
// ===============================

export const rankNames = [
    "Non-classé", "Fer III", "Fer II", "Fer I",
    "Bronze III", "Bronze II", "Bronze I",
    "Argent III", "Argent II", "Argent I",
    "Or III", "Or II", "Or I",
    "Platine III", "Platine II", "Platine I",
    "Émeraude", "Diamant", "Master",
    "Challenger", "Elite"
];

export const rankThresholds = [
    0, 100, 300, 600, 1000, 1500, 2000,
    2600, 3300, 4000, 5000, 6500, 8000,
    10000, 13000, 16000, 20000, 26000,
    33000, 42000, 52000
];

export const rankIcons = [
    "non_classe.png", "fer3.png", "fer2.png", "fer1.png",
    "bronze3.png", "bronze2.png", "bronze1.png",
    "argent3.png", "argent2.png", "argent1.png",
    "or3.png", "or2.png", "or1.png",
    "platine3.png", "platine2.png", "platine1.png",
    "emeraude.png", "diamant.png", "master.png",
    "challenger.png", "elite.png"
];

// ===============================
// UTILITAIRES
// ===============================

function getRankFromXP(xpValue) {
    let index = 0;
    for (let i = 0; i < rankThresholds.length; i++) {
        if (xpValue >= rankThresholds[i]) index = i;
    }
    return index;
}

function safeGetElement(id) {
    const el = document.getElementById(id);
    if (!el) console.warn(`⚠️ Élément introuvable : ${id}`);
    return el;
}

// ===============================
// MISE À JOUR DU RANG
// ===============================

function updateRankProgress(rankIndex, xp) {
    const minXP = rankThresholds[rankIndex];
    const maxXP = rankThresholds[rankIndex + 1] ?? minXP;

    let percent = 100;

    if (maxXP > minXP) {
        percent = Math.floor(((xp - minXP) / (maxXP - minXP)) * 100);
    }

    const progressText = safeGetElement("rank-progress-text");
    const progressBar = safeGetElement("rank-progress");

    if (progressText) progressText.textContent = percent + "%";
    if (progressBar) progressBar.style.width = percent + "%";
}

function updateRankDisplay(GameData) {
    const xp = GameData.xp || 0;
    const rankIndex = getRankFromXP(xp);

    const rankCurrent = safeGetElement("rank-current");
    const rankPrev = safeGetElement("rank-prev");
    const rankNext = safeGetElement("rank-next");
    const rankIcon = safeGetElement("rank-icon");

    if (rankCurrent) rankCurrent.textContent = rankNames[rankIndex];
    
    if (rankPrev) {
        rankPrev.textContent = rankIndex > 0 
            ? "Rang précédent : " + rankNames[rankIndex - 1] 
            : "Aucun rang précédent";
    }
    
    if (rankNext) {
        rankNext.textContent = rankIndex < rankNames.length - 1 
            ? "Rang suivant : " + rankNames[rankIndex + 1] 
            : "Rang maximum atteint";
    }

    if (rankIcon) rankIcon.src = "assets/ranks/" + rankIcons[rankIndex];

    updateRankProgress(rankIndex, xp);
}

// ===============================
// MISE À JOUR DES UNITÉS
// ===============================

function updateProfileUnits(GameData) {
    const units = [
        { id: "drone_recuperateur", text: "drone-level", bar: "drone-fill" },
        { id: "fregate", text: "frigate-level", bar: "frigate-fill" },
        { id: "sentinelle", text: "sentinel-level", bar: "sentinel-fill" },
        { id: "cargo", text: "cargo-level", bar: "cargo-fill" },
        { id: "chasseur", text: "chasseur-level", bar: "chasseur-fill" },
        { id: "hangar", text: "hangar-level", bar: "hangar-fill" }
    ];

    let total = 0;

    units.forEach(u => {
        const level = GameData.units[u.id]?.level || 1;
        total += level;

        const textEl = safeGetElement(u.text);
        const barEl = safeGetElement(u.bar);

        if (textEl) textEl.textContent = `${level} / 10`;
        if (barEl) barEl.style.width = `${(level / 10) * 100}%`;
    });

    const percent = Math.floor((total / (units.length * 10)) * 100);
    
    const totalText = safeGetElement("troops-total-text");
    const totalBar = safeGetElement("troops-total-fill");

    if (totalText) totalText.textContent = percent + "%";
    if (totalBar) totalBar.style.width = percent + "%";
}

// ===============================
// MISE À JOUR DES BÂTIMENTS
// ===============================

function updateBuildingBars(GameData) {
    const buildingList = [
        { id: "extracteur_ferraille", text: "bat1-level", bar: "bat1-fill" },
        { id: "reacteur_instable", text: "bat2-level", bar: "bat2-fill" },
        { id: "extracteur_nanocomposants", text: "bat3-level", bar: "bat3-fill" },
        { id: "archives_fracturees", text: "bat4-level", bar: "bat4-fill" },
        { id: "atelier_reparation", text: "bat5-level", bar: "bat5-fill" }
    ];

    buildingList.forEach(b => {
        const level = GameData.buildings[b.id]?.level || 1;
        
        const textEl = safeGetElement(b.text);
        const barEl = safeGetElement(b.bar);

        if (textEl) textEl.textContent = `${level} / 10`;
        if (barEl) barEl.style.width = `${(level / 10) * 100}%`;
    });
}

function updateBuildingsTotal(GameData) {
    const ids = [
        "extracteur_ferraille",
        "reacteur_instable",
        "extracteur_nanocomposants",
        "archives_fracturees",
        "atelier_reparation"
    ];

    let total = 0;
    ids.forEach(id => {
        total += GameData.buildings[id]?.level || 1;
    });

    const percent = Math.floor((total / (ids.length * 10)) * 100);

    const totalText = safeGetElement("buildings-total-text");
    const totalBar = safeGetElement("buildings-total-fill");

    if (totalText) totalText.textContent = percent + "%";
    if (totalBar) totalBar.style.width = percent + "%";
}

function updateBuildingNames(buildings) {
    const list = [
        { id: "extracteur_ferraille", nameId: "bat1-name" },
        { id: "reacteur_instable", nameId: "bat2-name" },
        { id: "extracteur_nanocomposants", nameId: "bat3-name" },
        { id: "archives_fracturees", nameId: "bat4-name" },
        { id: "atelier_reparation", nameId: "bat5-name" }
    ];

    list.forEach(b => {
        const data = buildings.find(x => x.id === b.id);
        const nameEl = safeGetElement(b.nameId);
        
        if (data && nameEl) {
            nameEl.textContent = data.name;
        }
    });
}

// ===============================
// FONCTION PRINCIPALE
// ===============================

export function updateProfil(GameData, buildings) {
    console.log("👤 Mise à jour du profil");
    
    updateRankDisplay(GameData);
    updateProfileUnits(GameData);
    updateBuildingBars(GameData);
    updateBuildingsTotal(GameData);
    updateBuildingNames(buildings);
}
