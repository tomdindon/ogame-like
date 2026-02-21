// ============================
// TECHNOLOGIES MULTI‑NIVEAUX
// ============================

const technologies = [
    {
        id: "tech1",
        nom: "Analyse de matériaux",
        desc: "Débloque de nouvelles recettes dans le laboratoire.",
<<<<<<< HEAD
        maxLevel: 7,
        baseCost: 120,
        baseTime: 30,
        effect: "unlock_recipe"
    },
    {
        id: "tech2",
        nom: "Blindage avancé",
        desc: "Renforce la résistance des unités terrestres.",
        maxLevel: 10,
        baseCost: 200,
        baseTime: 60,
        effect: "unit_defense"
    },
    {
        id: "tech3",
        nom: "Amélioration énergétique",
        desc: "Augmente l'efficacité des générateurs.",
        maxLevel: 10,
        baseCost: 150,
        baseTime: 45,
        effect: "energy_efficiency"
    },
    {
        id: "tech4",
        nom: "Optimisation industrielle",
        desc: "Réduit le coût des améliorations de bâtiments.",
        maxLevel: 10,
        baseCost: 300,
        baseTime: 90,
        effect: "building_discount"
    },
    {
        id: "tech5",
        nom: "Puissance d'attaque",
        desc: "Augmente la puissance d'attaque de toutes les unités.",
        maxLevel: 10,
        baseCost: 180,
        baseTime: 50,
        effect: "unit_attack"
    },

    // ⭐ NOUVELLES TECHNOLOGIES ⭐

    {
        id: "tech6",
        nom: "Infrastructure spatiale",
        desc: "Débloque les hangars orbitaux.",
        maxLevel: 1,
        baseCost: 500,
        baseTime: 120,
        effect: "unlock_hangars"
    },
    {
        id: "tech7",
        nom: "Armes expérimentales",
        desc: "Débloque les unités d'attaque avancées.",
        maxLevel: 5,
        baseCost: 250,
        baseTime: 75,
        effect: "unlock_attack_units"
    },
    {
        id: "tech8",
        nom: "Systèmes défensifs",
        desc: "Débloque les unités de défense renforcées.",
        maxLevel: 4,
        baseCost: 220,
        baseTime: 70,
        effect: "unlock_defense_units"
=======
        maxLevel: 5,
        baseCost: 120,
        baseTime: 30,
        effect: "unlock_recipe"
    },
    {
        id: "tech2",
        nom: "Blindage avancé",
        desc: "Renforce la résistance des unités terrestres.",
        maxLevel: 10,
        baseCost: 200,
        baseTime: 60,
        effect: "unit_defense"
    },
    {
        id: "tech3",
        nom: "Amélioration énergétique",
        desc: "Augmente l'efficacité des générateurs.",
        maxLevel: 10,
        baseCost: 150,
        baseTime: 45,
        effect: "energy_efficiency"
    },
    {
        id: "tech4",
        nom: "Optimisation industrielle",
        desc: "Réduit le coût des améliorations de bâtiments.",
        maxLevel: 10,
        baseCost: 300,
        baseTime: 90,
        effect: "building_discount"
    },
    {
        id: "tech5",
        nom: "Puissance d'attaque",
        desc: "Augmente la puissance d'attaque de toutes les unités.",
        maxLevel: 10,
        baseCost: 180,
        baseTime: 50,
        effect: "unit_attack"
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
    }
];

// ============================
// SÉLECTEURS
// ============================

<<<<<<< HEAD
// ============================
// SÉLECTEURS
// ============================

const techGrid = document.getElementById("techGrid");
const infoBox = document.getElementById("infoBox");

// ============================
// CHARGER / SAUVER NIVEAUX
// ============================

=======
const techGrid = document.getElementById("techGrid");
const infoBox = document.getElementById("infoBox");

// ============================
// CHARGER / SAUVER NIVEAUX
// ============================

>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
function loadTechLevels() {
    const save = JSON.parse(localStorage.getItem("cosmicSave")) || {};
    if (!save.techLevels) save.techLevels = {};
    technologies.forEach(t => {
        if (save.techLevels[t.id] === undefined) save.techLevels[t.id] = 0;
    });
    localStorage.setItem("cosmicSave", JSON.stringify(save));
    return save.techLevels;
}

function saveTechLevels(levels) {
    const save = JSON.parse(localStorage.getItem("cosmicSave")) || {};
    save.techLevels = levels;
    localStorage.setItem("cosmicSave", JSON.stringify(save));
}

// ============================
// CALCUL COÛT / TEMPS NIVEAU
// ============================

function getCost(tech, level) {
    return Math.floor(tech.baseCost * Math.pow(1.15, level - 1));
}

function getTime(tech, level) {
    return Math.floor(tech.baseTime * Math.pow(1.12, level - 1));
}

// ============================
// GÉNÉRATION DES CARTES
// ============================

function genererTechnologies() {
    const levels = loadTechLevels();
    techGrid.innerHTML = "";

    technologies.forEach(tech => {
        const level = levels[tech.id];
        const card = document.createElement("div");
        card.className = "tech-card";

        card.innerHTML = `
            <h3>${tech.nom}</h3>
            <p>${tech.desc}</p>
            <p>Niveau : ${level} / ${tech.maxLevel}</p>
        `;

        card.addEventListener("click", () => afficherInfo(tech));
        techGrid.appendChild(card);
    });
}

// ============================
// AFFICHAGE DES DÉTAILS
// ============================

function afficherInfo(tech) {
    const levels = loadTechLevels();
    const level = levels[tech.id];

    if (level >= tech.maxLevel) {
        infoBox.innerHTML = `
            <strong>${tech.nom}</strong><br>
            ${tech.desc}<br><br>
            <strong>Niveau max atteint.</strong>
        `;
        return;
    }

    const nextLevel = level + 1;
    const cost = getCost(tech, nextLevel);
    const time = getTime(tech, nextLevel);

    const rechercheActive = JSON.parse(localStorage.getItem("rechercheActive"));

    const bouton = rechercheActive
        ? `<button class="btn-recherche" disabled>Recherche en cours…</button>`
        : `<button class="btn-recherche" onclick="lancerRecherche('${tech.id}')">Améliorer</button>`;

    infoBox.innerHTML = `
        <strong>${tech.nom}</strong><br>
        ${tech.desc}<br><br>
        <strong>Niveau actuel :</strong> ${level}<br>
        <strong>Niveau suivant :</strong> ${nextLevel}<br><br>
        <strong>Coût :</strong> ${cost} Cristal<br>
        <strong>Temps :</strong> ${time}s<br><br>
        ${bouton}
    `;
}

// ============================
// LANCER UNE RECHERCHE
// ============================

function lancerRecherche(idTech) {
    const tech = technologies.find(t => t.id === idTech);
    if (!tech) return;

    const levels = loadTechLevels();
    const nextLevel = levels[tech.id] + 1;

    if (nextLevel > tech.maxLevel) return;

    const time = getTime(tech, nextLevel);
    const endTime = Date.now() + time * 1000;

    localStorage.setItem("rechercheActive", JSON.stringify({
        id: tech.id,
        endTime: endTime
    }));

    infoBox.innerHTML = `
        <strong>${tech.nom}</strong><br>
        Recherche lancée !<br><br>

        <div class="progressBar">
            <div id="researchProgress" class="progressFill" style="width:0%"></div>
        </div>

        <p id="researchTimer">Temps restant : ${time}s</p>

        <button class="btn-recherche" disabled>Recherche en cours…</button>
    `;
}

// ============================
// MISE À JOUR PROGRESSION
// ============================

function updateResearchProgress() {
    const active = JSON.parse(localStorage.getItem("rechercheActive"));
    if (!active) return;

    const tech = technologies.find(t => t.id === active.id);
    if (!tech) return;

    const levels = loadTechLevels();
    const nextLevel = levels[tech.id] + 1;
    const totalTime = getTime(tech, nextLevel);

    const now = Date.now();
    const remaining = Math.floor((active.endTime - now) / 1000);

    const elapsed = totalTime - Math.max(remaining, 0);
    const percent = Math.min(100, Math.floor((elapsed / totalTime) * 100));

    const bar = document.getElementById("researchProgress");
    if (bar) bar.style.width = percent + "%";

    const timer = document.getElementById("researchTimer");
    if (timer) timer.textContent = `Temps restant : ${Math.max(remaining, 0)}s`;

    if (remaining <= 0) {
        terminerRecherche();
        infoBox.innerHTML = `
            <strong>${tech.nom}</strong><br>
            Recherche terminée !<br><br>
            <button class="btn-recherche" disabled>Complété</button>
        `;
    }
}

// ============================
// FINALISATION DE LA RECHERCHE
// ============================

function terminerRecherche() {
    const active = JSON.parse(localStorage.getItem("rechercheActive"));
    if (!active) return;

    const tech = technologies.find(t => t.id === active.id);
    if (!tech) return;

    const levels = loadTechLevels();
    const current = levels[tech.id];

    if (current < tech.maxLevel) {
        levels[tech.id] = current + 1;
        saveTechLevels(levels);
        appliquerEffet(tech, levels[tech.id]);
    }

    localStorage.removeItem("rechercheActive");
    genererTechnologies();
}

// ============================
// APPLICATION DES EFFETS
// ============================

function appliquerEffet(tech, level) {
    const save = JSON.parse(localStorage.getItem("cosmicSave")) || {};

    switch (tech.effect) {
        case "energy_efficiency":
            save.energyEfficiency = level * 0.05;
            break;

        case "unit_defense":
            save.unitDefenseBonus = level * 0.10;
            break;

        case "unit_attack":
            save.unitAttackBonus = level * 0.10;
            break;

        case "building_discount":
            save.buildingUpgradeDiscount = level * 0.05;
            break;

        case "unlock_recipe":
            if (!save.unlockedRecipes) save.unlockedRecipes = 0;
            save.unlockedRecipes = level;
            break;
    }

    localStorage.setItem("cosmicSave", JSON.stringify(save));
}

// ============================
// TICK RECHERCHE
// ============================

setInterval(updateResearchProgress, 1000);

// ============================
// INITIALISATION
// ============================

window.addEventListener("load", () => {
    genererTechnologies();

    // Si une recherche était déjà en cours au rechargement
    const active = JSON.parse(localStorage.getItem("rechercheActive"));
    if (active) {
        const tech = technologies.find(t => t.id === active.id);
        if (tech) {
            const levels = loadTechLevels();
            const nextLevel = levels[tech.id] + 1;
            const totalTime = getTime(tech, nextLevel);
            const remaining = Math.max(0, Math.floor((active.endTime - Date.now()) / 1000));

            infoBox.innerHTML = `
                <strong>${tech.nom}</strong><br>
                Recherche en cours…<br><br>

                <div class="progressBar">
                    <div id="researchProgress" class="progressFill" style="width:0%"></div>
                </div>

                <p id="researchTimer">Temps restant : ${remaining}s</p>

                <button class="btn-recherche" disabled>Recherche en cours…</button>
            `;
        }
    }
});
