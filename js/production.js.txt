/* =====================================================
   PRODUCTION DES RESSOURCES PAR LES BÂTIMENTS
===================================================== */

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

    // Ressources rares
    save.tools = save.tools || 0;
    save.drones = save.drones || 0;
    save.parts = save.parts || 0;
    save.intel = save.intel || 0;

    /* =====================================================
       Parcours de tous les bâtiments définis dans buildings.js
    ====================================================== */

    buildings.forEach(building => {
        const level = save.buildings[building.id] || 0;

        if (!building.production || level <= 0) return;

        const base = building.production.base;
        const scaling = Math.pow(1.12, level - 1);
        let amount = Math.floor(base * scaling);

        if (building.id === "reacteur_instable") {
            amount = Math.floor(amount * (1 + energyBonus));
        }

        if (building.id === "extracteur_ferraille") save.scrap += amount;
        if (building.id === "reacteur_instable") save.energy += amount;
        if (building.id === "extracteur_nanocomposants") save.nano += amount;
        if (building.id === "archives_fracturees") save.data += amount;
    });

    localStorage.setItem("cosmicSave", JSON.stringify(save));

    updateHUD();
    updateRessourcesPage();  // 🔥 Mise à jour en temps réel
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
        "hud-tools": "tools",
        "hud-drones": "drones",
        "hud-parts": "parts",
        "hud-intel": "intel"
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
