/* ===============================
   UNITS.JS - VERSION CORRIGÉE
   =============================== */

const unitsData = [

    // === Hangar attaque ===
    {
        id: "hangar_attaque",
        name: "Hangar d'attaque",
        image: "assets/units/hangar_attaque.png",
        maxLevel: 20,
        description: "Augmente la capacité maximale de vos unités offensives.",
        upgradeCost: { scrap: 300, energy: 150 },
        stats: { capacite: 500 },
        isBuilding: true,
        category: "hangar"
    },

    // === Hangar défense ===
    {
        id: "hangar_defense",
        name: "Hangar de défense",
        image: "assets/units/hangar_defense.png",
        maxLevel: 20,
        description: "Augmente la capacité maximale de vos unités défensives.",
        upgradeCost: { scrap: 300, energy: 150 },
        stats: { capacite: 500 },
        isBuilding: true,
        category: "hangar"
    },

    // === Drone récupérateur ===
    {
        id: "drone_recuperateur",
        name: "Drone récupérateur",
        image: "assets/units/drone_recuperateur.png",
        maxLevel: 10,
        description: "Petit drone autonome conçu pour récupérer des ressources dispersées.",
        cost: { scrap: 50, energy: 20 },
        upgradeCost: { scrap: 100, nano: 10 },
        stats: { attaque: 0, defense: 5, vitesse: 5, cargo: 10 },
        isBuilding: false,
        category: "attack"
    },

    // === Frégate ===
    {
        id: "fregate",
        name: "Frégate",
        image: "assets/units/fregate.png",
        maxLevel: 10,
        description: "Vaisseau polyvalent, équilibré entre attaque et défense.",
        cost: { scrap: 100, energy: 50 },
        upgradeCost: { scrap: 100, nano: 10 },
        stats: { attaque: 15, defense: 20, vitesse: 3, cargo: 5 },
        isBuilding: false,
        category: "attack"
    },

    // === Cargo ===
    {
        id: "cargo",
        name: "Cargo",
        image: "assets/units/cargo.png",
        maxLevel: 10,
        description: "Transporteur massif conçu pour déplacer de grandes quantités de ressources.",
        cost: { scrap: 120, energy: 30 },
        upgradeCost: { scrap: 100, nano: 10 },
        stats: { attaque: 0, defense: 10, vitesse: 3, cargo: 50 },
        isBuilding: false,
        category: "attack"
    },

    // === Sentinelle ===
    {
        id: "sentinelle",
        name: "Sentinelle",
        image: "assets/units/sentinelle.png",
        maxLevel: 10,
        description: "Unité défensive spécialisée dans la détection et la protection.",
        cost: { scrap: 80, energy: 40 },
        upgradeCost: { scrap: 100, nano: 10 },
        stats: { attaque: 5, defense: 30, vitesse: 1, detection: 10, cargo: 0 },
        isBuilding: false,
        category: "attack"
    },

    // === Chasseur ===
    {
        id: "chasseur",
        name: "Chasseur",
        image: "assets/units/chasseur.png",
        maxLevel: 10,
        description: "Vaisseau rapide conçu pour les attaques éclairs.",
        cost: { scrap: 150, energy: 80 },
        upgradeCost: { scrap: 100, nano: 10 },
        stats: { attaque: 40, defense: 10, vitesse: 8, cargo: 5 },
        isBuilding: false,
        category: "attack"
    },

    // === Étoile Noire ===
    {
        id: "etoile_noire",
        name: "Étoile Noire",
        image: "assets/units/etoile_noire.png",
        maxLevel: 1,
        description: "Arme ultime. Capacité de destruction massive.",
        cost: { scrap: 5000, energy: 3000 },
        stats: { attaque: 500, defense: 500, vitesse: 1, cargo: 1000 },
        isBuilding: false,
        category: "attack"
    },

    // === Roquette ===
    {
        id: "roquette",
        name: "Roquette",
        image: "assets/units/roquette.png",
        maxLevel: 10,
        description: "Arme simple mais efficace pour saturer une zone.",
        cost: { scrap: 20, energy: 10 },
        upgradeCost: { scrap: 100, nano: 10 },
        stats: { attaque: 15, defense: 0, vitesse: 0, cargo: 0 },
        isBuilding: false,
        category: "defense"
    },

    // === Canon à impulsion ===
    {
        id: "canon_impulsion",
        name: "Canon à impulsion",
        image: "assets/units/canon_impulsion.png",
        maxLevel: 10,
        description: "Canon énergétique puissant, idéal contre les cibles blindées.",
        cost: { scrap: 200, energy: 120 },
        upgradeCost: { scrap: 100, nano: 10 },
        stats: { attaque: 80, defense: 10, vitesse: 0, cargo: 0 },
        isBuilding: false,
        category: "defense"
    },

    // === Canon Plasma ===
    {
        id: "canon_plasma",
        name: "Canon Plasma",
        image: "assets/units/canon_plasma.png",
        maxLevel: 10,
        description: "Arme lourde tirant des projectiles de plasma surchauffé.",
        cost: { scrap: 250, energy: 150 },
        upgradeCost: { scrap: 100, nano: 10 },
        stats: { attaque: 100, defense: 20, vitesse: 0, cargo: 0 },
        isBuilding: false,
        category: "defense"
    },

    // === Batterie AA ===
    {
        id: "batterie_aa",
        name: "Batterie Anti‑Aérienne",
        image: "assets/units/batterie_aa.png",
        maxLevel: 10,
        description: "Défense spécialisée contre les unités rapides et aériennes.",
        cost: { scrap: 180, energy: 90 },
        upgradeCost: { scrap: 100, nano: 10 },
        stats: { attaque: 10, defense: 60, vitesse: 0, cargo: 0 },
        isBuilding: false,
        category: "defense"
    },

    // === Intercepteur ===
    {
        id: "intercepteur",
        name: "Intercepteur",
        image: "assets/units/intercepteur.png",
        maxLevel: 10,
        description: "Vaisseau ultra‑rapide conçu pour intercepter les cibles prioritaires.",
        cost: { scrap: 200, energy: 120 },
        upgradeCost: { scrap: 100, nano: 10 },
        stats: { attaque: 60, defense: 15, vitesse: 12, cargo: 5 },
        isBuilding: false,
        category: "defense"
    }
];

/* ===============================
    FONCTIONS UTILITAIRES
    =============================== */

function getResourceEmoji(res) {
    const map = {
        scrap: "🔩",
        energy: "⚡",
        nano: "🧬",
        data: "📡",
        tools: "🛠️",
        drones: "🤖",
        parts: "🧩",
        intel: "🧠"
    };
    return map[res] || "❔";
}

function loadGame() {
    let save = JSON.parse(localStorage.getItem("cosmicSave")) || {};

    GameData.units = save.units || {};
}

/* ===============================
   INITIALISATION DES UNITÉS
   =============================== */

function initUnites() {
    const container = document.getElementById("units-container");
    if (!container) return;

    container.innerHTML = "";

    // Récupération niveaux hangars
    const hangarAttaqueLevel = GameData.units.hangar_attaque?.level || 0;
    const hangarDefenseLevel = GameData.units.hangar_defense?.level || 0;

    // Nouvelle capacité : 500 par niveau
    const attackCapacity = hangarAttaqueLevel * 500;
    const defenseCapacity = hangarDefenseLevel * 500;

    // Comptage des unités attaque / défense
    let attackUnits = 0;
    let defenseUnits = 0;

    unitsData.forEach(unit => {
        const data = GameData.units[unit.id];
        if (!data) return;

        if (unit.category === "attack") attackUnits += data.count || 0;
        if (unit.category === "defense") defenseUnits += data.count || 0;
    });

    // Affichage capacité
    const capacityInfo = document.createElement("div");
    capacityInfo.className = "capacity-info";
    capacityInfo.innerHTML = `
        <div class="capacity-slot">
            <div class="capacity-line1">Capacité</div>
            <div class="capacity-line2">Hangar attaque</div>
            <div class="capacity-line4">${attackUnits} / ${attackCapacity}</div>
        </div>

        <div class="capacity-slot">
            <div class="capacity-line1">Capacité</div>
            <div class="capacity-line2">Hangar défense</div>
            <div class="capacity-line4">${defenseUnits} / ${defenseCapacity}</div>
        </div>
    `;

    container.appendChild(capacityInfo);
    // Cartes unités
    unitsData.forEach(unit => {
        const data = GameData.units[unit.id] || { level: 1, count: 0 };
        const level = data.level;
        const count = data.count || 0;

        const card = document.createElement("div");
        card.className = "unit-card";

        // Stats
        const statsHTML = unit.stats
            ? Object.entries(unit.stats).map(([key, val]) => `
                <div class="stat-line">
                    <span class="stat-label">${key}</span>
                    <span class="stat-value">${val * level}</span>
                </div>
            `).join("")
            : "<p class='no-stats'>Aucune statistique</p>";

        // Coût construction (uniquement pour les unités non-bâtiments)
        let buildCostHTML = "";
        if (!unit.isBuilding && unit.cost) {
            buildCostHTML = Object.entries(unit.cost)
                .map(([res, val]) => `<div class="cost-item">${getResourceEmoji(res)} ${val}</div>`)
                .join("");
        }

        // Coût amélioration
        let upgradeCostHTML = "";
        if (unit.upgradeCost && typeof unit.upgradeCost === "object") {
            const upgradeCostObj = {};
            for (const res in unit.upgradeCost) {
                upgradeCostObj[res] = Math.floor(unit.upgradeCost[res] * Math.pow(1.5, level));
            }
            upgradeCostHTML = Object.entries(upgradeCostObj)
                .map(([res, val]) => `<div class="cost-item">${getResourceEmoji(res)} ${val}</div>`)
                .join("");
        }

        // Actions
        const actionsHTML = unit.isBuilding
            ? `
                <!-- HANGARS : une seule colonne centrée -->
                <div class="unit-actions-horizontal" style="justify-content:center;">
                    <div class="cost-column">
                        ${upgradeCostHTML}
                        <button class="btn-upgrade" data-id="${unit.id}">
                            ${level >= unit.maxLevel ? "✅ Max" : "Améliorer"}
                        </button>
                    </div>
                </div>
            `
            : `
                <!-- UNITÉS NORMALES : deux colonnes -->
                <div class="unit-count">Possédés : <strong>${count}</strong></div>

                <div class="unit-actions-horizontal">

                    <div class="cost-column">
                        ${buildCostHTML}
                        <button class="btn-build" data-id="${unit.id}">Construire</button>
                    </div>

                    <div class="cost-column">
                        ${upgradeCostHTML}
                        <button class="btn-upgrade" data-id="${unit.id}">
                            ${level >= unit.maxLevel ? "✅ Max" : "Améliorer"}
                        </button>
                    </div>

                </div>
            `;

        // Carte complète
        card.innerHTML = `
            <div class="unit-image-container">
                <img src="${unit.image}" alt="${unit.name}" class="unit-image" />
            </div>

            <div class="unit-content">
                <div class="unit-header">
                    <h3>${unit.name}</h3>
                </div>

                <div class="unit-level">
                    <span>Niveau ${level} / ${unit.maxLevel}</span>
                    <div class="level-progress">
                        <div class="level-fill" style="width: ${(level / unit.maxLevel) * 100}%"></div>
                    </div>
                </div>

                ${unit.description ? `<p class="unit-description">${unit.description}</p>` : ""}

                <div class="unit-stats">${statsHTML}</div>

                ${actionsHTML}
            </div>
        `;

        container.appendChild(card);

        // Boutons
        if (!unit.isBuilding) {
            const btnBuild = card.querySelector(".btn-build");
            if (btnBuild) btnBuild.addEventListener("click", () => buildUnit(unit));
        }

        const btnUpgrade = card.querySelector(".btn-upgrade");
        if (btnUpgrade) {
            if (level >= unit.maxLevel) {
                btnUpgrade.disabled = true;
            } else {
                btnUpgrade.addEventListener("click", () => upgradeUnit(unit));
            }
        }
    });
}


/* ===============================
   CONSTRUIRE UNE UNITÉ
   =============================== */

function buildUnit(unit) {

    // Capacité dynamique
    const hangarAttaqueLevel = GameData.units.hangar_attaque?.level || 0;
    const hangarDefenseLevel = GameData.units.hangar_defense?.level || 0;

    const attackCapacity = hangarAttaqueLevel * 500;
    const defenseCapacity = hangarDefenseLevel * 500;

    // Comptage des unités
    let attackUnits = 0;
    let defenseUnits = 0;

    unitsData.forEach(u => {
        const data = GameData.units[u.id];
        if (!data) return;

        if (u.category === "attack") attackUnits += data.count || 0;
        if (u.category === "defense") defenseUnits += data.count || 0;
    });

    // Vérification capacité selon catégorie
    if (unit.category === "attack" && attackUnits >= attackCapacity) {
        alert("Capacité du hangar d'attaque atteinte.");
        return;
    }

    if (unit.category === "defense" && defenseUnits >= defenseCapacity) {
        alert("Capacité du hangar de défense atteinte.");
        return;
    }

    // Dépense des ressources directement
    for (const res in unit.cost) {
        if (!spendResource(res, unit.cost[res])) {
            alert("Ressources insuffisantes.");
            return;
        }
    }

    // Construction
    if (!GameData.units[unit.id]) {
        GameData.units[unit.id] = { level: 1, count: 0 };
    }

    GameData.units[unit.id].count++;
    saveGame();
    updateGlobalUnitHUD();
    initUnites();
}


/* ===============================
   AMÉLIORER UNE UNITÉ
   =============================== */

function upgradeUnit(unit) {
    const current = GameData.units[unit.id] || { level: 1, count: 0 };
    const level = current.level;

    if (level >= unit.maxLevel) return;

    // Capacité dynamique
    const hangarAttaqueLevel = GameData.units.hangar_attaque?.level || 0;
    const hangarDefenseLevel = GameData.units.hangar_defense?.level || 0;

    const attackCapacity = hangarAttaqueLevel * 500;
    const defenseCapacity = hangarDefenseLevel * 500;

    // Comptage des unités
    let attackUnits = 0;
    let defenseUnits = 0;

    unitsData.forEach(u => {
        const data = GameData.units[u.id];
        if (!data) return;

        if (u.category === "attack") attackUnits += data.count || 0;
        if (u.category === "defense") defenseUnits += data.count || 0;
    });

    // Vérification capacité selon catégorie
    if (unit.category === "attack" && attackUnits > attackCapacity) {
        alert("Capacité du hangar d'attaque atteinte. Impossible d'améliorer.");
        return;
    }

    if (unit.category === "defense" && defenseUnits > defenseCapacity) {
        alert("Capacité du hangar de défense atteinte. Impossible d'améliorer.");
        return;
    }

    // Calcul dynamique du coût d'amélioration
    const upgradeCost = {};
    for (const res in unit.upgradeCost) {
        upgradeCost[res] = Math.floor(unit.upgradeCost[res] * Math.pow(1.5, level));
    }

    // Dépense des ressources directement
    for (const res in upgradeCost) {
        if (!spendResource(res, upgradeCost[res])) {
            let msg = "Ressources insuffisantes.\nRequis :\n";
            for (const r in upgradeCost) {
                msg += `- ${upgradeCost[r]} ${r}\n`;
            }
            alert(msg);
            return;
        }
    }

    // Application de l'amélioration
    GameData.units[unit.id].level++;
    saveGame();
    updateGlobalUnitHUD();
    initUnites();
    loadGame();
    initUnites();

}
