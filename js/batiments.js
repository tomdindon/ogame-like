/* ===============================
   BATIMENTS.JS - AVEC IMAGES
   =============================== */

import { GameData, spendResource, addResource, saveGame } from "./gameData.js";
import { updateHUDResources } from "./layout.js";

// Fonction pour obtenir le chemin de l'image selon le niveau
function getBuildingImage(buildingId, level) {
    return `assets/batiments/${buildingId}_lvl${level}.png`;
}

export function initBatiments() {
    const container = document.getElementById("buildings-container");
    if (!container) {
        console.error("❌ Conteneur buildings-container introuvable");
        return;
    }

    container.innerHTML = "";

    const buildingsArray = [
        { id: "extracteur_ferraille", name: "Extracteur de ferraille", emoji: "🔩" },
        { id: "reacteur_instable", name: "Réacteur instable", emoji: "⚡" },
        { id: "extracteur_nanocomposants", name: "Extracteur de nanocomposants", emoji: "🧬" },
        { id: "archives_fracturees", name: "Archives fracturées", emoji: "📡" },
        { id: "atelier", name: "Atelier", emoji: "🔧" }
    ];

    buildingsArray.forEach(b => {
        const data = GameData.buildings[b.id];
        const level = data?.level || 0;

        const card = document.createElement("div");
        card.className = "building-card";

        // Déterminer la production actuelle
        let productionText = "";
        let resourceIcon = "";
        
        if (b.id === "extracteur_ferraille") {
            productionText = `${data?.production || 10} / sec`;
            resourceIcon = "🔩";
        } else if (b.id === "reacteur_instable") {
            productionText = `${data?.production || 0} / sec`;
            resourceIcon = "⚡";
        } else if (b.id === "extracteur_nanocomposants") {
            productionText = `${data?.production || 0} / sec`;
            resourceIcon = "🧬";
        } else if (b.id === "archives_fracturees") {
            productionText = `${data?.production || 0} / sec`;
            resourceIcon = "📡";
        } else if (b.id === "atelier") {
            productionText = `Bonus : +${level * 5}%`;
            resourceIcon = "🔧";
        }

        card.innerHTML = `
            <div class="building-image-container">
                <img src="${getBuildingImage(b.id, Math.max(1, level))}" 
                     alt="${b.name}" 
                     class="building-image" 
                     onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
                <div class="building-image-fallback" style="display: none;">
                    <span class="building-emoji-large">${b.emoji}</span>
                </div>
            </div>
            <div class="building-content">
                <div class="building-header">
                    <h3>${b.name}</h3>
                </div>
                <div class="building-level">
                    <span>Niveau ${level}</span>
                    <div class="level-progress">
                        <div class="level-fill" style="width: ${Math.min(level * 10, 100)}%"></div>
                    </div>
                </div>
                <div class="building-production">
                    <span class="production-icon">${resourceIcon}</span>
                    <span class="production-value">${productionText}</span>
                </div>
                <div class="building-cost">
                    <div class="cost-item">🔩 ${data?.cost?.scrap || 100}</div>
                    <div class="cost-item">⚡ ${data?.cost?.energy || 50}</div>
                </div>
                <button class="btn-upgrade-building" data-id="${b.id}">
                    ${level === 0 ? '🏗️ Construire' : '⬆️ Améliorer'}
                </button>
            </div>
        `;

        container.appendChild(card);

        const btn = card.querySelector(".btn-upgrade-building");
        btn.addEventListener("click", () => upgradeBuilding(b.id));
    });

    console.log("✅ Bâtiments initialisés");
}

function upgradeBuilding(buildingId) {
    const data = GameData.buildings[buildingId];
    const cost = data?.cost || { scrap: 100, energy: 50 };

    if (spendResource("scrap", cost.scrap) && spendResource("energy", cost.energy)) {
        data.level++;
        data.production = (data.production || 0) + 10;
        data.cost.scrap = Math.floor(cost.scrap * 1.5);
        data.cost.energy = Math.floor(cost.energy * 1.5);
        
        saveGame();
        updateHUDResources();
        initBatiments();
        
        console.log(`✅ Bâtiment amélioré : ${buildingId} → Niveau ${data.level}`);
    } else {
        alert("❌ Ressources insuffisantes !");
    }
}
