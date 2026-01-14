import { GameData } from "./gameData.js";

// ===============================
// GESTION GLOBALE DU HUD
// ===============================

export function injectHUD() {
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
            <button class="btn-map" id="btn-map">🌌 Carte Galactique</button>
        </div>
    `;

    const app = document.getElementById("app");
    if (app) app.prepend(nav);

    const btnMap = document.getElementById("btn-map");
    if (btnMap) {
        btnMap.addEventListener("click", () => {
            if (location.hash !== "#page-map") {
                location.hash = "page-map";
            }
        });
    }
}

export function getUnitCapacity() {
    const hangarLevel = GameData.units["hangar"]?.level ?? 1;
    return hangarLevel * 50;
}

export function getTotalUnits() {
    return Object.values(GameData.units)
        .filter(u => typeof u.count === "number")
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
    } else {
        unitDisplay.style.color = "#7fffd4";
    }
}

export function removeHUD() {
    const hud = document.querySelector(".global-hud");
    if (hud) hud.remove();
}
