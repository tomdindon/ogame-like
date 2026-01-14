// ===============================
// UNITES.JS - VERSION CORRIGÉE
// ===============================

import { GameData, spendResource, saveGame } from "./gameData.js";
import { getUnitCapacity, getTotalUnits, updateGlobalUnitHUD } from "./layout.js";

const unitsData = [
    {
        id: "drone_recuperateur",
        name: "Drone récupérateur",
        emoji: "🤖",
        maxLevel: 10,
        cost: { scrap: 50, energy: 20 },
        stats: { vitesse: 5, cargo: 10 }
    },
    {
        id: "fregate",
        name: "Frégate",
        emoji: "🚀",
        maxLevel: 10,
        cost: { scrap: 100, energy: 50 },
        stats: { attaque: 15, defense: 20 }
    },
    {
        id: "sentinelle",
        name: "Sentinelle",
        emoji: "🛡️",
        maxLevel: 10,
        cost: { scrap: 80, energy: 40 },
        stats: { defense: 30, detection: 10 }
    },
    {
        id: "cargo",
        name: "Cargo",
        emoji: "📦",
        maxLevel: 10,
        cost: { scrap: 120, energy: 30 },
        stats: { cargo: 50, vitesse: 3 }
    },
    {
        id: "chasseur",
        name: "Chasseur",
        emoji: "⚔️",
        maxLevel: 10,
        cost: { scrap: 150, energy: 80 },
        stats: { attaque: 40, vitesse: 8 }
    },
    {
        id: "hangar",
        name: "Hangar",
        emoji: "🏗️",
        maxLevel: 20,
        description: "Augmente la capacité maximale de vos unités.",
        cost: { scrap: 300, energy: 150 },
        stats: { capacité: 50 }, // ✅ AJOUT DES STATS
        isBuilding: true // ✅ Marquer comme bâtiment spécial
    }
];

export function initUnites() {
    const container = document.getElementById("units-container");
    if (!container) {
        console.error("❌ Conteneur units-container introuvable");
        return;
    }

    container.innerHTML = "";
    console.log("🚀 Initialisation des unités");

    unitsData.forEach(unit => {
        const data = GameData.units[unit.id];
        const level = data?.level || 1;
        const count = data?.count || 0;

        const card = document.createElement("div");
        card.className = "unit-card";

        // ✅ Vérifier si unit.stats existe avant Object.entries
        const statsHTML = unit.stats 
            ? Object.entries(unit.stats).map(([key, val]) => `
                <div class="stat-line">
                    <span class="stat-label">${key}</span>
                    <span class="stat-value">${val * level}</span>
                </div>
            `).join('')
            : '<p class="no-stats">Aucune statistique</p>';

        // ✅ Affichage différent pour le Hangar
        const actionsHTML = unit.isBuilding 
            ? `
                <div class="unit-actions">
                    <button class="btn-upgrade" data-id="${unit.id}">
                        ${level >= unit.maxLevel ? 'Niveau max' : 'Améliorer'}
                    </button>
                </div>
            `
            : `
                <div class="unit-count">Possédés : ${count}</div>
                <div class="unit-actions">
                    <button class="btn-build" data-id="${unit.id}">Construire</button>
                    <button class="btn-upgrade" data-id="${unit.id}">
                        ${level >= unit.maxLevel ? 'Max' : 'Améliorer'}
                    </button>
                </div>
            `;

        card.innerHTML = `
            <div class="unit-header">
                <h3>${unit.name}</h3>
                <span class="unit-emoji">${unit.emoji}</span>
            </div>
            <div class="unit-level">
                <span>Niveau ${level} / ${unit.maxLevel}</span>
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
        `;

        container.appendChild(card);

        // ✅ Événements uniquement si ce n'est PAS un bâtiment
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

function buildUnit(unit) {
    const capacity = getUnitCapacity();
    const total = getTotalUnits();

    if (total >= capacity) {
        alert("Capacité maximale atteinte ! Améliorez votre Hangar.");
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
        alert("Ressources insuffisantes !");
    }
}

function upgradeUnit(unit) {
    const level = GameData.units[unit.id]?.level || 1;
    
    if (level >= unit.maxLevel) return;

    const upgradeCost = {
        scrap: unit.cost.scrap * 2,
        energy: unit.cost.energy * 2
    };

    if (spendResource("scrap", upgradeCost.scrap) && spendResource("energy", upgradeCost.energy)) {
        GameData.units[unit.id].level++;
        saveGame();
        updateGlobalUnitHUD(); // ✅ Mise à jour du HUD pour le Hangar
        initUnites();
        console.log("✅ Unité améliorée :", unit.name);
    } else {
        alert("Ressources insuffisantes !");
    }
}
