// ===============================
// BATIMENTS.JS
// ===============================

import { buildings, GameData, spendResource, saveGame } from "./gameData.js";

function getBuildingImage(buildingId, level) {
    const b = buildings.find(x => x.id === buildingId);
    
    if (!b || !b.imageBase) {
        return "https://placehold.co/200x150?text=Batiment";
    }
    
    return `${b.imageBase}_lvl${level}.png`;
}

export function initBatiments() {
    const container = document.getElementById("buildings-container");
    if (!container) return;

    container.innerHTML = "";

    buildings.forEach(b => {
        const level = GameData.buildings[b.id]?.level || 1;
        
        const card = document.createElement("div");
        card.className = "building-card";
        
        card.innerHTML = `
            <img 
                src="${getBuildingImage(b.id, level)}"
                class="building-image"
                alt="${b.name}"
                onerror="this.src='https://placehold.co/200x150?text=Image+Manquante';"
            >
            <h3>${b.name}</h3>
            <p>${b.description}</p>
            <div class="building-level">
                <span>Niveau ${level} / ${b.maxLevel}</span>
            </div>
            ${b.production ? `
                <p class="building-production">
                    Production : ${b.production.base * level}/s ${b.production.resource}
                </p>
            ` : ''}
            <div class="building-cost">
                <div class="cost-item">🔩 ${b.cost.scrap}</div>
                <div class="cost-item">⚡ ${b.cost.energy}</div>
            </div>
            <div class="building-actions">
                <button class="btn-upgrade" data-id="${b.id}">
                    ${level >= b.maxLevel ? 'Niveau max' : 'Améliorer'}
                </button>
            </div>
        `;
        
        container.appendChild(card);
        
        const btn = card.querySelector(".btn-upgrade");
        if (level >= b.maxLevel) {
            btn.disabled = true;
        }
        
        btn.addEventListener("click", () => {
            if (GameData.buildings[b.id].level >= b.maxLevel) return;
            
            if (spendResource("scrap", b.cost.scrap) && spendResource("energy", b.cost.energy)) {
                GameData.buildings[b.id].level++;
                saveGame();
                initBatiments();
            } else {
                alert("Ressources insuffisantes !");
            }
        });
    });
}
