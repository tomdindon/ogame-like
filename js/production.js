/* =====================================================
   PRODUCTION DES RESSOURCES PAR LES BÂTIMENTS
===================================================== */

// Production PAR SECONDE de l'extracteur de ferraille (niv 1 → 10)
const scrapProduction = [
    2,    // niv 1
    4,    // niv 2
    7,    // niv 3
    13,   // niv 4
    23,   // niv 5
    42,   // niv 6
    75,   // niv 7
    135,  // niv 8
    259,  // niv 9
    500   // niv 10
];

// Production PAR SECONDE du réacteur instable (niv 1 → 10)
const energyProduction = [
    2,    // niv 1
    4,    // niv 2
    7,    // niv 3
    13,   // niv 4
    23,   // niv 5
    42,   // niv 6
    75,   // niv 7
    135,  // niv 8
    259,  // niv 9
    500   // niv 10
];

// Production PAR SECONDE des nanocomposants (niv 1 → 10)
const nanoProduction = [
    2,    // niv 1
    4,    // niv 2
    7,    // niv 3
    13,   // niv 4
    23,   // niv 5
    42,   // niv 6
    75,   // niv 7
    135,  // niv 8
    259,  // niv 9
    500   // niv 10
];

// Production PAR SECONDE des données anciennes (niv 1 → 10)
const dataProduction = [
    2,    // niv 1
    4,    // niv 2
    7,    // niv 3
    13,   // niv 4
    23,   // niv 5
    42,   // niv 6
    75,   // niv 7
    135,  // niv 8
    259,  // niv 9
    500   // niv 10
];

// Tick toutes les secondes
setInterval(productionTick, 1000);

/* =====================================================
   Fonction principale de production
===================================================== */

function productionTick() {
    let save = JSON.parse(localStorage.getItem("cosmicSave")) || {};
    if (!save.buildings) return;

    // Bonus labo
    const energyBonus = save.energyEfficiency || 0;

    // Initialisation des ressources si absentes
    save.scrap = save.scrap || 0;
    save.energy = save.energy || 0;
    save.nano = save.nano || 0;
    save.data = save.data || 0;

    // Buffer pour accumuler les décimales de production sans les perdre
    save.scrapBuffer = save.scrapBuffer || 0;

    /* =====================================================
       Parcours de tous les bâtiments définis dans buildings.js
    ====================================================== */

    buildings.forEach(building => {
    const level = save.buildings[building.id] || 0;

    if (!building.production || level <= 0) return;

    // Extracteur de ferraille
    if (building.id === "extracteur_ferraille") {
        const perSecondRate = scrapProduction[level - 1] || 0;
        save.scrap += perSecondRate;
        return;
    }

    // Réacteur instable
    if (building.id === "reacteur_instable") {
        let amount = energyProduction[level - 1] || 0;
        amount = Math.floor(amount * (1 + energyBonus));
        save.energy += amount;
        return;
    }

    // Extracteur de nanocomposants
    if (building.id === "extracteur_nanocomposants") {
        const perSecondRate = nanoProduction[level - 1] || 0;
        save.nano += perSecondRate;
        return;
    }

    // Archives fracturées
    if (building.id === "archives_fracturees") {
        const perSecondRate = dataProduction[level - 1] || 0;
        save.data += perSecondRate;
        return;
    }
});

    localStorage.setItem("cosmicSave", JSON.stringify(save));

    updateHUD();
    updateRessourcesPage();
}

/* =====================================================
   Mise à jour du HUD
===================================================== */

function updateHUD() {
    const save = JSON.parse(localStorage.getItem("cosmicSave")) || {};

    const map = {
        "hud-scrap": "scrap",
        "hud-energy": "energy",
        "hud-nano": "nano",
        "hud-data": "data",
        "hud-tools": "reinforcedSteel",
        "hud-drones": "cyberModule",
        "hud-parts": "syntheticNanites",
        "hud-intel": "aiFragment"
    };

    for (const id in map) {
        const el = document.getElementById(id);
        if (el) el.textContent = save[map[id]] ?? 0;
    }
}

/* =====================================================
   Mise à jour de la page Ressources (réellement compatible)
===================================================== */

function updateRessourcesPage() {
    // Vérifier si la page Ressources est visible
    const page = document.getElementById("ressources");
    if (!page || page.style.display === "none") return;

    const save = JSON.parse(localStorage.getItem("cosmicSave")) || {};
    const values = document.querySelectorAll(".item-value");

    resourceList.forEach((res, i) => {
        if (values[i]) {
            values[i].textContent = save[res.id] ?? 0;
        }
    });
}
