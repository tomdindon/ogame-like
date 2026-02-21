// =======================================
// IMAGE PAR NIVEAU
// =======================================

function getBuildingImage(buildingId, level) {
    const b = buildings.find(x => x.id === buildingId);

    if (!b || !b.imageBase) {
        return "assets/buildings/default.png";
    }

<<<<<<< HEAD
=======
    // Version avancée : image par niveau
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
    return `${b.imageBase}_lvl${level}.png`;
}


// =======================================
// INITIALISATION DE LA PAGE BÂTIMENTS
// =======================================

function initBatiments() {

    const slots = document.querySelectorAll("#building-slots .slot");

    slots.forEach((slot, index) => {
        const b = buildings[index];

<<<<<<< HEAD
=======
        // Si pas de bâtiment pour ce slot → slot vide
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
        if (!b) {
            slot.classList.add("empty");
            slot.textContent = "Emplacement vide";
            return;
        }

<<<<<<< HEAD
        const level = GameData.buildings[b.id]?.level || 1;

        // Production par heure
        const hourly = getBuildingProduction(b, level);

        // Coût du prochain niveau
        const nextLevel = level + 1;
        const nextCost = getBuildingUpgradeCost(b, nextLevel);

=======
        // Niveau actuel depuis GameData
        const level = GameData.buildings[b.id]?.level || 1;

        // Génération de la carte bâtiment
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
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
<<<<<<< HEAD
                </div>

                <div class="building-bonus">
                    ${b.production ? `Production : ${hourly.toFixed(0)}/h` : "Pas de production"}
                </div>

                <div class="building-cost">
                    ${nextLevel <= b.maxLevel 
                        ? `Coût amélioration : ${nextCost.toLocaleString("fr-FR")} ferraille`
                        : "Niveau max"}
=======
                </div>

                <div class="building-bonus">
                    ${b.production ? `Production : ${b.production.base * level}/s` : "Pas de production"}
                </div>

                <div class="building-cost">
                    Coût : ${b.cost.scrap} ferraille, ${b.cost.energy} énergie
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
                </div>

                <div class="building-time">Temps : 1s</div>

                <button class="building-button">Améliorer</button>
            </div>
        `;

        const button = slot.querySelector(".building-button");

<<<<<<< HEAD
=======
        // Désactiver si niveau max
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
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
<<<<<<< HEAD

            const targetLevel = currentLevel + 1;
            const cost = getBuildingUpgradeCost(b, targetLevel);

            if (spendResource("scrap", cost)) {

=======

            // Vérifier les ressources
            if (spendResource("scrap", b.cost.scrap) && spendResource("energy", b.cost.energy)) {

>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
                // Amélioration
                GameData.buildings[b.id].level++;
                saveGame();

                const newLevel = GameData.buildings[b.id].level;
                const newHourly = getBuildingProduction(b, newLevel);

                // Mise à jour visuelle
                slot.querySelector(".lvl-val").textContent = newLevel;
                slot.querySelector(".building-image").src = getBuildingImage(b.id, newLevel);

                if (b.production) {
                    slot.querySelector(".building-bonus").textContent =
                        `Production : ${newHourly.toFixed(0)}/h`;
                }

<<<<<<< HEAD
                // Mise à jour du coût
=======
                // Niveau max atteint
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
                if (newLevel >= b.maxLevel) {
                    button.disabled = true;
                    button.textContent = "Niveau max";
                    slot.querySelector(".building-cost").textContent = "Niveau max";
                } else {
                    const newCost = getBuildingUpgradeCost(b, newLevel + 1);
                    slot.querySelector(".building-cost").textContent =
                        `Coût amélioration : ${newCost.toLocaleString("fr-FR")} ferraille`;
                }

            } else {
                alert("Pas assez de ressources !");
            }
        });
    });
}
