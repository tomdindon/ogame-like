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
// RANG
// ===============================

function getRankFromXP(xpValue) {
    let index = 0;
    for (let i = 0; i < rankThresholds.length; i++) {
        if (xpValue >= rankThresholds[i]) index = i;
    }
    return index;
}

function updateRankProgress(rankIndex, xp) {
    const minXP = rankThresholds[rankIndex];
    const maxXP = rankThresholds[rankIndex + 1] ?? minXP;

    let percent = 100;

    if (maxXP > minXP) {
        percent = Math.floor(((xp - minXP) / (maxXP - minXP)) * 100);
    }

    document.getElementById("rank-progress-text").textContent = percent + "%";
    document.getElementById("rank-progress").style.width = percent + "%";
}

function updateRankDisplay(GameData) {
    const xp = GameData.xp || 0;
    const rankIndex = getRankFromXP(xp);

    document.getElementById("rank-current").textContent = rankNames[rankIndex];
    document.getElementById("rank-prev").textContent =
        rankIndex > 0 ? "Rang précédent : " + rankNames[rankIndex - 1] : "Aucun rang précédent";
    document.getElementById("rank-next").textContent =
        rankIndex < rankNames.length - 1 ? "Rang suivant : " + rankNames[rankIndex + 1] : "Rang maximum atteint";

    document.getElementById("rank-icon").src = "assets/ranks/" + rankIcons[rankIndex];

    updateRankProgress(rankIndex, xp);
}

// ===============================
// UNITÉS
// ===============================

function updateProfileUnits(GameData) {
    const U = GameData.units;

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
        const level = U[u.id]?.level ?? 1;
        total += level;

        document.getElementById(u.text).textContent = `${level} / 10`;
        document.getElementById(u.bar).style.width = `${(level / 10) * 100}%`;
    });

    const percent = Math.floor((total / (units.length * 10)) * 100);
    document.getElementById("troops-total-text").textContent = percent + "%";
    document.getElementById("troops-total-fill").style.width = percent + "%";
}

// ===============================
// BÂTIMENTS
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
        const level = GameData.buildings[b.id].level;
        document.getElementById(b.text).textContent = `${level} / 10`;
        document.getElementById(b.bar).style.width = `${(level / 10) * 100}%`;
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
    ids.forEach(id => total += GameData.buildings[id].level);

    const percent = Math.floor((total / (ids.length * 10)) * 100);

    document.getElementById("buildings-total-text").textContent = percent + "%";
    document.getElementById("buildings-total-fill").style.width = percent + "%";
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
        if (data) document.getElementById(b.nameId).textContent = data.name;
    });
}

// ===============================
// FONCTION PRINCIPALE
// ===============================

export function updateProfil(GameData, buildings) {
    updateRankDisplay(GameData);
    updateProfileUnits(GameData);
    updateBuildingBars(GameData);
    updateBuildingsTotal(GameData);
    updateBuildingNames(buildings);
}
