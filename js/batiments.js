// ===============================
// IMPORTS
// ===============================
import { buildings, GameData, spendResource, saveGame } from "./gameData.js";


// ===============================
// IMAGE PAR NIVEAU
// ===============================
function getBuildingImage(buildingId, level) {

    const b = buildings.find(x => x.id === buildingId);

    // Sécurité : si pas d'image définie
    if (!b || !b.imageBase) {
        return "assets/buildings/default.png";
    }

    // Image par niveau
    return `${b.imageBase}_lvl${level}.png`;
}


// ===============================
// REMPLISSAGE DES SLOTS
// ===============================
export function initBatiments() {

    const slots = document.querySelectorAll("#page-batiments .slot");

    slots.forEach((slot, index) => {

        const b = buildings[index];   // <-- maintenant valide

        if (!b) {
            slot.classList.add("empty");
            slot.textContent = "Emplacement vide";
            return;
        }

        // Niveau actuel du bâtiment
        const level = GameData.buildings[b.id]?.level || 1;

        slot.innerHTML = `
            <div class="building-card">
                <img 
                    src="${getBuildingImage(b.id, level)}"
                    class="building-image"
                    alt="${b.name}"
                    onerror="this.onerror=null; this.src='https://placehold.co/100x100?text=Image+Manquante';"
                >
                <div class="building-name">${b.name}</div>
                <div class="building-description">${b.description}</div>
                <div class="building-level">Niveau : <span class="lvl-val">${level}</span> / ${b.maxLevel}</div>
                <div class="building-bonus">
                    ${b.production ? `Production : ${b.production.base * level}/s` : "Pas de production"}
                </div>
                <div class="building-cost">Coût : ${b.cost.scrap} ferraille, ${b.cost.energy} énergie</div>
                <div class="building-time">Temps : 1s</div>
                <button class="building-button">Améliorer</button>
            </div>
        `;

        const button = slot.querySelector(".building-button");

        // Niveau max
        if (level >= b.maxLevel) {
            button.disabled = true;
            button.textContent = "Niveau max";
        }

        // ===============================
        // LOGIQUE D'AMÉLIORATION
        // ===============================
        button.addEventListener("click", () => {

            if (GameData.buildings[b.id].level >= b.maxLevel) return;

            if (spendResource("scrap", b.cost.scrap) && spendResource("energy", b.cost.energy)) {

                GameData.buildings[b.id].level++;
                saveGame();

                const newLevel = GameData.buildings[b.id].level;

                slot.querySelector(".lvl-val").textContent = newLevel;
                slot.querySelector(".building-image").src = getBuildingImage(b.id, newLevel);

                if (b.production) {
                    slot.querySelector(".building-bonus").textContent =
                        `Production : ${b.production.base * newLevel}/s`;
                }

                if (newLevel >= b.maxLevel) {
                    button.disabled = true;
                    button.textContent = "Niveau max";
                }

            } else {
                alert("Pas assez de ressources !");
            }
        });
    });
}
