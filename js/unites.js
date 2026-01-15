/* ===============================
   UNITES.JS - AVEC IMAGES
   =============================== */

import { GameData, spendResource, saveGame } from "./gameData.js";
import { getUnitCapacity, getTotalUnits, updateGlobalUnitHUD } from "./layout.js";

const unitsData = [
    {
        id: "drone_recuperateur",
        name: "Drone récupérateur",
        emoji: "🤖",
        image: "assets/units/drone_recuperateur.png", // ⭐ AJOUT
        maxLevel: 10,
        cost: { scrap: 50, energy: 20 },
        stats: { vitesse: 5, cargo: 10 }
    },
    {
        id: "fregate",
        name: "Frégate",
        emoji: "🚀",
        image: "assets/units/fregate.png", // ⭐ AJOUT
        maxLevel: 10,
        cost: { scrap: 100, energy: 50 },
        stats: { attaque: 15, defense: 20 }
    },
    {
        id: "sentinelle",
        name: "Sentinelle",
        emoji: "🛡️",
        image: "assets/units/sentinelle.png", // ⭐ AJOUT
        maxLevel: 10,
        cost: { scrap: 80, energy: 40 },
        stats: { defense: 30, detection: 10 }
    },
    {
        id: "cargo",
        name: "Cargo",
        emoji: "📦",
        image: "assets/units/cargo.png", // ⭐ AJOUT
        maxLevel: 10,
        cost: { scrap: 120, energy: 30 },
        stats: { cargo: 50, vitesse: 3 }
    },
    {
        id: "chasseur",
        name: "Chasseur",
        emoji: "⚔️",
        image: "assets/units/chasseur.png", // ⭐ AJOUT (attention à l'orthographe)
        maxLevel: 10,
        cost: { scrap: 150, energy: 80 },
        stats: { attaque: 40, vitesse: 8 }
    },
    {
        id: "hangar",
        name: "Hangar",
        emoji: "🏗️",
        image: "assets/units/hangar.png", // ⭐ AJOUT
        maxLevel: 20,
        description: "Augmente la capacité maximale de vos unités.",
        cost: { scrap: 300, energy: 150 },
        stats: { capacité: 50 },
        isBuilding: true
    }
];

// ===============================
// INITIALISATION DES UNITÉS
// ===============================

export function initUnites() {
    const container = document.getElementById("units-container");
    if (!container) {
        console.error("❌ Conteneur units-container introuvable");
        return;
    }

    container.innerHTML = "";
    console.log("🚀 Initialisation des unités");

    // Barre de capacité globale
    const capacityInfo = document.createElement("div");
    capacityInfo.className = "capacity-info";
    capacityInfo.innerHTML = `
        <div class="capacity-bar-container">
            <div class="capacity-header">
                <h3>📊 Capacité de Flotte</h3>
                <span class="capacity-numbers">${getTotalUnits()} / ${getUnitCapacity()}</span>
            </div>
            <div class="capacity-bar">
                <div class="capacity-fill" style="width: ${(getTotalUnits() / getUnitCapacity()) * 100}%"></div>
            </div>
            <p class="capacity-tip">💡 Améliorez le Hangar pour augmenter la capacité</p>
        </div>
    `;
    container.appendChild(capacityInfo);

    // Afficher les unités
    unitsData.forEach(unit => {
        const data = GameData.units[unit.id];
        const level = data?.level || 1;
        const count = data?.count || 0;

        const card = document.createElement("div");
        card.className = "unit-card";

        // Stats
        const statsHTML = unit.stats 
            ? Object.entries(unit.stats).map(([key, val]) => `
                <div class="stat-line">
                    <span class="stat-label">${key}</span>
                    <span class="stat-value">${val * level}</span>
                </div>
            `).join('')
            : '<p class="no-stats">Aucune statistique</p>';

        // Actions différentes pour le Hangar
        const actionsHTML = unit.isBuilding 
            ? `
                <div class="unit-info-building">
                    <p>🏗️ Capacité actuelle : <strong>${getUnitCapacity()}</strong></p>
                </div>
                <div class="unit-actions">
                    <button class="btn-upgrade" data-id="${unit.id}">
                        ${level >= unit.maxLevel ? '✅ Niveau max' : '⬆️ Améliorer'}
                    </button>
                </div>
            `
            : `
                <div class="unit-count">Possédés : <strong>${count}</strong></div>
                <div class="unit-actions">
                    <button class="btn-build" data-id="${unit.id}">🔨 Construire</button>
                    <button class="btn-upgrade" data-id="${unit.id}">
                        ${level >= unit.maxLevel ? '✅ Max' : '⬆️ Améliorer'}
                    </button>
                </div>
            `;

        card.innerHTML = `
            <div class="unit-image-container">
                <img src="${unit.image}" alt="${unit.name}" class="unit-image" />
                <div class="unit-image-overlay">
                    <span class="unit-emoji-large">${unit.emoji}</span>
                </div>
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
                ${unit.description ? `<p class="unit-description">${unit.description}</p>` : ''}
                <div class="unit-stats">
                    ${statsHTML}
                </div>
                <div class="unit-cost">
                    <div class="cost-item">🔩 ${unit.cost.scrap}</div>
                    <div class="cost-item">⚡ ${unit.cost.energy}</div>
                </div>
                ${actionsHTML}
            </div>
        `;

        container.appendChild(card);

        // Événements
        if (!unit.isBuilding) {
            const btnBuild = card.querySelector(".btn-build");
            if (btnBuild) {
                btnBuild.addEventListener("click", () => buildUnit(unit));
            }
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

    console.log("✅ Unités initialisées");
}

// ===============================
// CONSTRUIRE UNE UNITÉ
// ===============================

function buildUnit(unit) {
    const capacity = getUnitCapacity();
    const total = getTotalUnits();

    if (total >= capacity) {
        alert("⚠️ Capacité maximale atteinte !\n\nAméliorez votre Hangar pour construire plus d'unités.");
        return;
    }

    if (spendResource("scrap", unit.cost.scrap) && spendResource("energy", unit.cost.energy)) {
        if (!GameData.units[unit.id]) {
            GameData.units[unit.id] = { level: 1, count: 0 };
        }
        GameData.units[unit.id].count++;
        saveGame();
        updateGlobalUnitHUD();
        initUnites();
        console.log("✅ Unité construite :", unit.name);
    } else {
        alert("❌ Ressources insuffisantes !");
    }
}

// ===============================
// AMÉLIORER UNE UNITÉ
// ===============================

function upgradeUnit(unit) {
    const level = GameData.units[unit.id]?.level || 1;
    
    if (level >= unit.maxLevel) return;

    const upgradeCost = {
        scrap: Math.floor(unit.cost.scrap * Math.pow(1.5, level)),
        energy: Math.floor(unit.cost.energy * Math.pow(1.5, level))
    };

    if (spendResource("scrap", upgradeCost.scrap) && spendResource("energy", upgradeCost.energy)) {
        if (!GameData.units[unit.id]) {
            GameData.units[unit.id] = { level: 1, count: 0 };
        }
        GameData.units[unit.id].level++;
        saveGame();
        updateGlobalUnitHUD();
        initUnites();
        console.log("✅ Unité améliorée :", unit.name, "→ Niveau", GameData.units[unit.id].level);
    } else {
        alert("❌ Ressources insuffisantes !\n\n" +
              `Requis : ${upgradeCost.scrap} Ferraille, ${upgradeCost.energy} Énergie`);
    }
}
