// ===============================
// LAYOUT.JS - GESTION GLOBALE DU HUD
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    if (!window.DISABLE_HUD) {
        injectHUD();
        updateGlobalUnitHUD();
    }
});

// 1. INJECTION DU HTML
function injectHUD() {
    // Vérifie si le HUD existe déjà pour éviter les doublons
    if (document.querySelector(".global-hud")) return;

    const nav = document.createElement("nav");
    nav.className = "global-hud";

    nav.innerHTML = `
        <div class="resources">
            <p>🔩 Ferraille : <span id="scrap">0</span></p>
            <p>⚡ Énergie : <span id="energy">0</span></p>
            <p>🧬 Nano : <span id="nano">0</span></p>
            <p>📡 Données : <span id="data">0</span></p>
            <p id="unit-count-display">Unités : 0 / 0</p>
              <button class="btn-map" onclick="window.location.href='map.html'">
            🌌 Carte Galactique
        </button>
        </div>
    `;

    // Insère la nav tout en haut du body
    document.body.prepend(nav);
}

// ===============================
// LOGIQUE GLOBALE (Accessible partout)
// ===============================

// Calcul de la capacité du hangar
function getUnitCapacity() {
    if (typeof GameData === "undefined") return 0;
    const hangarLevel = GameData.units["hangar"]?.level ?? 1;
    return hangarLevel * 50;
}

// Calcul du total des unités actuelles
function getTotalUnits() {
    if (typeof GameData === "undefined") return 0;
    return Object.values(GameData.units)
        .filter(u => u.count) // On prend ceux qui ont une propriété count
        .reduce((sum, u) => sum + u.count, 0);
}

// Mise à jour visuelle uniquement pour la partie "Unités" du HUD
function updateGlobalUnitHUD() {
    const unitDisplay = document.getElementById("unit-count-display");
    if (!unitDisplay) return;

    const total = getTotalUnits();
    const capacity = getUnitCapacity();

    unitDisplay.textContent = `Unités : ${total} / ${capacity}`;

    // Petit effet visuel : rouge si plein, vert sinon
    if (total >= capacity) {
        unitDisplay.style.color = "#ff4a4a"; // Rouge
        unitDisplay.style.borderColor = "#ff4a4a";
    } else {
        unitDisplay.style.color = "#7fffd4"; // Vert cyan
        unitDisplay.style.borderColor = "rgba(127, 255, 212, 0.3)";
    }
}