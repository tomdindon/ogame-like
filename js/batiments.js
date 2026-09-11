// =======================================
// IMAGE PAR NIVEAU
// =======================================

function getBuildingImage(buildingId, level) {
    const b = buildings.find(x => x.id === buildingId);

    if (!b || !b.imageBase) {
        return "assets/buildings/default.png";
    }

    // Version avancée : image par niveau
    return `${b.imageBase}_lvl${level}.png`;
}


// =======================================
// TEXTE DE PRODUCTION (gère les bâtiments avec courbe spécifique)
// =======================================

function getBuildingProductionText(building, level) {
    if (!building.production) return "Pas de production";

    if (building.id === "extracteur_ferraille") {
        return `Production : ${scrapProduction[level - 1] || 0}/s`;
    }

    if (building.id === "reacteur_instable") {
        return `Production : ${energyProduction[level - 1] || 0}/s`;
    }

    if (building.id === "extracteur_nanocomposants") {
        return `Production : ${nanoProduction[level - 1] || 0}/s`;
    }

    if (building.id === "archives_fracturees") {
        return `Production : ${dataProduction[level - 1] || 0}/s`;
    }

    // Autres bâtiments (sans table dédiée) : formule générique inchangée
    return `Production : ${building.production.base * level}/s`;
}


// =======================================
// INITIALISATION DE LA PAGE BÂTIMENTS
// =======================================

function initBatiments() {

    const slots = document.querySelectorAll("#building-slots .slot");

    slots.forEach((slot, index) => {
        const b = buildings[index];

        // Si pas de bâtiment pour ce slot → slot vide
        if (!b) {
            slot.classList.add("empty");
            slot.textContent = "Emplacement vide";
            return;
        }

        // Niveau actuel depuis GameData
        const level = GameData.buildings[b.id]?.level || 1;

        // Génération de la carte bâtiment
        slot.innerHTML = `
            <div class="building-card">
                <img 
                    src="${getBuildingImage(b.id, level)}" 
                    class="building-image" 
                    alt="${b.name}"
                    onerror="this.onerror=null; this.src='https://placehold.co/200x200?text=Image+Manquante';"
                >

                <div class="building-name">${b.name}</div>
                <div class="building-description">${b.description}</div>

                <div class="building-level">
                    Niveau : <span class="lvl-val">${level}</span> / ${b.maxLevel}
                </div>

                <div class="building-bonus">
                    ${getBuildingProductionText(b, level)}
                </div>

                <div class="building-cost">
                    Coût : ${b.cost.scrap} ferraille, ${b.cost.energy} énergie
                </div>

                <div class="building-time">Temps : 1s</div>

                <button class="building-button">Améliorer</button>
            </div>
        `;

        const button = slot.querySelector(".building-button");

        // Désactiver si niveau max
        if (level >= b.maxLevel) {
            button.disabled = true;
            button.textContent = "Niveau max";
        }

        // ===============================
        // BOUTON AMÉLIORER
        // ===============================

        button.addEventListener("click", () => {

            const currentLevel = GameData.buildings[b.id].level;

            if (currentLevel >= b.maxLevel) return;

            // Vérifier les ressources
            if (spendResource("scrap", b.cost.scrap) && spendResource("energy", b.cost.energy)) {

                // Amélioration
                GameData.buildings[b.id].level++;
                saveGame();

                const newLevel = GameData.buildings[b.id].level;

                // Mise à jour visuelle
                slot.querySelector(".lvl-val").textContent = newLevel;
                slot.querySelector(".building-image").src = getBuildingImage(b.id, newLevel);

                slot.querySelector(".building-bonus").textContent =
                    getBuildingProductionText(b, newLevel);

                // Niveau max atteint
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