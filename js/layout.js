// ===============================
// LAYOUT.JS - GESTION GLOBALE DU HUD
// ===============================

// 1. INJECTION DU HTML
export function injectHUD() {
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

            <button class="btn-map" onclick="location.hash='page-map'">
                🌌 Carte Galactique
            </button>
        </div>
    `;

    // 🔥 Correction : injecter le HUD dans #app, pas dans <body>
    const app = document.getElementById("app");
    if (app) {
        app.prepend(nav);
    }
}

// ===============================
// LOGIQUE GLOBALE
// ===============================

export function getUnitCapacity() {
    if (typeof GameData === "undefined") return 0;
    const hangarLevel = GameData.units["hangar"]?.level ?? 1;
    return hangarLevel * 50;
}

export function getTotalUnits() {
    if (typeof GameData === "undefined") return 0;
    return Object.values(GameData.units)
        .filter(u => u.count)
        .reduce((sum, u) => sum + u.count, 0);
}

export function updateGlobalUnitHUD() {
    const unitDisplay = document.getElementById("unit-count-display");
    if (!unitDisplay) return;

    const total = getTotalUnits();
    const capacity = getUnitCapacity();

    unitDisplay.textContent = `Unités : ${total} / ${capacity}`;

    if (total >= capacity) {
        unitDisplay.style.color = "#ff4a4a";
        unitDisplay.style.borderColor = "#ff4a4a";
    } else {
        unitDisplay.style.color = "#7fffd4";
        unitDisplay.style.borderColor = "rgba(127, 255, 212, 0.3)";
    }
}

export function removeHUD() {
    const hud = document.querySelector(".global-hud");
    if (hud) hud.remove();
}
