/* ============================================
   LAYOUT.JS - Gestion du HUD (VERSION COMPLÈTE)
   ============================================ */

import { GameData } from "./gameData.js";

let hudInjected = false;

// ===============================
// INJECTION DU HUD
// ===============================

export function injectHUD() {
    if (hudInjected) {
        updateGlobalUnitHUD();
        return;
    }

    const existing = document.getElementById("hud-container");
    if (existing) {
        existing.remove();
    }

    const hud = document.createElement("div");
    hud.id = "hud-container";
    hud.innerHTML = `
        <div id="hud-wrapper">
            <div class="hud-resources">
                <div class="hud-resource-item">
                    <span class="hud-resource-icon">🔩</span>
                    <div>
                        <div class="hud-resource-label">Ferraille</div>
                        <div class="hud-resource-value" id="hud-scrap">0</div>
                    </div>
                </div>
                
                <div class="hud-resource-item">
                    <span class="hud-resource-icon">⚡</span>
                    <div>
                        <div class="hud-resource-label">Énergie</div>
                        <div class="hud-resource-value" id="hud-energy">0</div>
                    </div>
                </div>
                
                <div class="hud-resource-item">
                    <span class="hud-resource-icon">🧬</span>
                    <div>
                        <div class="hud-resource-label">Nano</div>
                        <div class="hud-resource-value" id="hud-nano">0</div>
                    </div>
                </div>
                
                <div class="hud-resource-item">
                    <span class="hud-resource-icon">📡</span>
                    <div>
                        <div class="hud-resource-label">Données</div>
                        <div class="hud-resource-value" id="hud-data">0</div>
                    </div>
                </div>
            </div>
            
            <div class="hud-actions">
                <div class="hud-units" id="hud-unit-count">
                    Unités : <span id="hud-units-value">0 / 700</span>
                </div>
                
                <button class="hud-button btn-galaxy-map" onclick="location.hash='page-map'">
                    🗺️ Carte Galactique
                </button>
            </div>
        </div>
    `;

    document.body.prepend(hud);
    hudInjected = true;

    updateHUDResources();
    updateGlobalUnitHUD();
}

// ===============================
// MISE À JOUR DES RESSOURCES
// ===============================

export function updateHUDResources() {
    const scrapEl = document.getElementById("hud-scrap");
    const energyEl = document.getElementById("hud-energy");
    const nanoEl = document.getElementById("hud-nano");
    const dataEl = document.getElementById("hud-data");

    if (scrapEl) scrapEl.textContent = Math.floor(GameData.resources.scrap || 0).toLocaleString();
    if (energyEl) energyEl.textContent = Math.floor(GameData.resources.energy || 0).toLocaleString();
    if (nanoEl) nanoEl.textContent = Math.floor(GameData.resources.nano || 0).toLocaleString();
    if (dataEl) dataEl.textContent = Math.floor(GameData.resources.data || 0).toLocaleString();
}

// ===============================
// GESTION DES UNITÉS
// ===============================

/**
 * Calcule la capacité maximale d'unités
 * Base : 100 + (niveau Hangar × 50)
 */
export function getUnitCapacity() {
    const hangarData = GameData.units?.hangar;
    const hangarLevel = hangarData?.level || 1;
    const baseCapacity = 100;
    const capacityPerLevel = 50;
    
    return baseCapacity + (hangarLevel * capacityPerLevel);
}

/**
 * Compte le nombre total d'unités possédées
 */
export function getTotalUnits() {
    let total = 0;
    
    for (const [unitId, data] of Object.entries(GameData.units || {})) {
        // Ignorer le hangar dans le compte (c'est un bâtiment)
        if (unitId === 'hangar') continue;
        
        total += data.count || 0;
    }
    
    return total;
}

// ===============================
// MISE À JOUR DU HUD UNITÉS
// ===============================

export function updateGlobalUnitHUD() {
    const unitsValueEl = document.getElementById("hud-units-value");
    if (!unitsValueEl) return;

    const total = getTotalUnits();
    const max = getUnitCapacity();
    
    unitsValueEl.textContent = `${total} / ${max}`;

    // Changer la couleur selon le remplissage
    const unitsContainer = document.getElementById("hud-unit-count");
    if (unitsContainer) {
        const ratio = total / max;
        
        if (ratio >= 1) {
            // Capacité maximale atteinte (rouge)
            unitsContainer.style.borderColor = "rgba(239, 68, 68, 0.8)";
            unitsContainer.style.background = "rgba(239, 68, 68, 0.3)";
            unitsContainer.style.color = "#fca5a5";
        } else if (ratio >= 0.9) {
            // Presque plein (orange)
            unitsContainer.style.borderColor = "rgba(251, 191, 36, 0.8)";
            unitsContainer.style.background = "rgba(251, 191, 36, 0.3)";
            unitsContainer.style.color = "#fcd34d";
        } else if (ratio >= 0.7) {
            // Moyennement rempli (jaune)
            unitsContainer.style.borderColor = "rgba(251, 191, 36, 0.6)";
            unitsContainer.style.background = "rgba(251, 191, 36, 0.2)";
            unitsContainer.style.color = "#fde68a";
        } else {
            // Encore de la place (violet par défaut)
            unitsContainer.style.borderColor = "rgba(168, 85, 247, 0.4)";
            unitsContainer.style.background = "rgba(168, 85, 247, 0.2)";
            unitsContainer.style.color = "white";
        }
    }
}

// ===============================
// RETRAIT DU HUD
// ===============================

export function removeHUD() {
    const hud = document.getElementById("hud-container");
    if (hud) {
        hud.remove();
        hudInjected = false;
    }
}

// ===============================
// EXPORTS
// ===============================

export { hudInjected };
