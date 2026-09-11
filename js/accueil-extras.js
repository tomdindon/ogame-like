/* =====================================================
   PAGE ACCUEIL — PUISSANCE MILITAIRE / MISSIONS / AMÉLIORATIONS
===================================================== */

// Unités offensives : points d'attaque fixes par unité (bonus labo à ajouter plus tard)
const OFFENSIVE_UNITS = {
    drone_recuperateur: 0,
    fregate: 15,
    sentinelle: 5,
    cargo: 0,
    chasseur: 40,
    etoile_noire: 500
};

// Unités défensives : points de défense fixes par unité (bonus labo à ajouter plus tard)
const DEFENSIVE_UNITS = {
    roquette: 10,
    canon_impulsion: 80,
    canon_plasma: 100,
    batterie_aa: 10,
    intercepteur: 60
};

/* =====================================================
   Puissance militaire (ATK / DEF)
===================================================== */
function updateAccueilMilitaryPower() {
    const attackEl = document.getElementById("acc-attack-total");
    const defenseEl = document.getElementById("acc-defense-total");
    if (!attackEl || !defenseEl) return;

    const U = GameData.units || {};

    let totalAttack = 0;
    for (const [id, attackValue] of Object.entries(OFFENSIVE_UNITS)) {
        const count = U[id]?.count ?? 0;
        totalAttack += attackValue * count;
    }

    let totalDefense = 0;
    for (const [id, defenseValue] of Object.entries(DEFENSIVE_UNITS)) {
        const count = U[id]?.count ?? 0;
        totalDefense += defenseValue * count;
    }

    attackEl.textContent = Math.floor(totalAttack);
    defenseEl.textContent = Math.floor(totalDefense);
}

/* =====================================================
   Missions en cours
===================================================== */
function updateAccueilMissions() {
    const list = document.getElementById("acc-missions-list");
    if (!list) return;

    list.innerHTML = "";

    const active = typeof loadActiveMissions === "function" ? loadActiveMissions() : [];

    if (active.length === 0) {
        list.innerHTML = "<li>Aucune mission en cours</li>";
        return;
    }

    const now = Date.now();

    active.forEach(m => {
        const mission = MISSIONS[m.key];
        if (!mission) return;

        const remaining = Math.max(0, Math.floor((m.endTime - now) / 1000));

        const li = document.createElement("li");
        li.textContent = `${mission.name} — ${formatTime(remaining)}`;
        list.appendChild(li);
    });
}

/* =====================================================
   Amélioration en cours (labo)
===================================================== */
function updateAccueilUpgrades() {
    const list = document.getElementById("acc-upgrades-list");
    if (!list) return;

    list.innerHTML = "";

    const active = JSON.parse(localStorage.getItem("rechercheActive"));

    if (!active) {
        list.innerHTML = "<li>Aucune amélioration en cours</li>";
        return;
    }

    const tech = technologies.find(t => t.id === active.id);
    if (!tech) return;

    const remaining = Math.max(0, Math.floor((active.endTime - Date.now()) / 1000));

    const li = document.createElement("li");
    li.textContent = `${tech.nom} — ${formatTime(remaining)}`;
    list.appendChild(li);
}

/* =====================================================
   Rafraîchissement global (uniquement si la page accueil est visible)
===================================================== */
function refreshAccueilExtras() {
    const page = document.getElementById("acceuil");
    if (!page || page.style.display === "none") return;

    updateAccueilMilitaryPower();
    updateAccueilMissions();
    updateAccueilUpgrades();
}

// Tick toutes les secondes (timers missions/labo à jour en direct)
setInterval(refreshAccueilExtras, 1000);

// Premier appel au chargement
window.addEventListener("load", refreshAccueilExtras);