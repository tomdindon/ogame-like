/* ============================================
   LAYOUT.JS - Avec navigation globale
   ============================================ */

import { GameData } from "./gameData.js";

let hudInjected = false;
let navInjected = false;

// ===============================
// INJECTION DE LA NAVIGATION
// ===============================

export function injectNav() {
    if (navInjected) return;

    const existing = document.getElementById("main-nav");
    if (existing) {
        existing.remove();
    }

    const nav = document.createElement("nav");
    nav.id = "main-nav";
    nav.innerHTML = `
        <div class="nav-wrapper">
            <div class="nav-brand">
                <a href="#page-dashboard">
                    <span class="nav-logo">🌌</span>
                    <span class="nav-title">Cosmic Empires</span>
                </a>
            </div>
            
            <div class="nav-links">
                <a href="#page-dashboard" class="nav-link" data-page="page-dashboard">
                    <span class="nav-icon">🏠</span>
                    <span class="nav-text">Accueil</span>
                </a>
                <a href="#page-batiments" class="nav-link" data-page="page-batiments">
                    <span class="nav-icon">🏗️</span>
                    <span class="nav-text">Bâtiments</span>
                </a>
                <a href="#page-unites" class="nav-link" data-page="page-unites">
                    <span class="nav-icon">🚀</span>
                    <span class="nav-text">Unités</span>
                </a>
                <a href="#page-recherche" class="nav-link" data-page="page-recherche">
                    <span class="nav-icon">🔬</span>
                    <span class="nav-text">Recherche</span>
                </a>
                <a href="#page-missions" class="nav-link" data-page="page-missions">
                    <span class="nav-icon">🎯</span>
                    <span class="nav-text">Missions</span>
                </a>
                <a href="#page-map" class="nav-link" data-page="page-map">
                    <span class="nav-icon">🗺️</span>
                    <span class="nav-text">Carte</span>
                </a>
                <a href="#page-trade" class="nav-link" data-page="page-trade">
                    <span class="nav-icon">💱</span>
                    <span class="nav-text">Commerce</span>
                </a>
                <a href="#page-profil" class="nav-link" data-page="page-profil">
                    <span class="nav-icon">👤</span>
                    <span class="nav-text">Profil</span>
                </a>
            </div>
            
            <button class="nav-toggle" id="nav-toggle">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    `;

    document.body.prepend(nav);
    navInjected = true;

    // Ajouter le toggle mobile
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            navToggle.classList.toggle("active");
        });

        // Fermer le menu au clic sur un lien
        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                navToggle.classList.remove("active");
            });
        });
    }

    updateActiveNavLink();
}

// ===============================
// MISE À JOUR DU LIEN ACTIF
// ===============================

export function updateActiveNavLink() {
    const currentHash = location.hash.replace("#", "") || "page-dashboard";
    
    document.querySelectorAll(".nav-link").forEach(link => {
        link.classList.remove("active");
        if (link.dataset.page === currentHash) {
            link.classList.add("active");
        }
    });
}

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
            </div>
        </div>
    `;

    document.body.appendChild(hud);
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

export function getUnitCapacity() {
    const hangarData = GameData.units?.hangar;
    const hangarLevel = hangarData?.level || 1;
    const baseCapacity = 100;
    const capacityPerLevel = 50;
    
    return baseCapacity + (hangarLevel * capacityPerLevel);
}

export function getTotalUnits() {
    let total = 0;
    
    for (const [unitId, data] of Object.entries(GameData.units || {})) {
        if (unitId === 'hangar') continue;
        total += data.count || 0;
    }
    
    return total;
}

export function updateGlobalUnitHUD() {
    const unitsValueEl = document.getElementById("hud-units-value");
    if (!unitsValueEl) return;

    const total = getTotalUnits();
    const max = getUnitCapacity();
    
    unitsValueEl.textContent = `${total} / ${max}`;

    const unitsContainer = document.getElementById("hud-unit-count");
    if (unitsContainer) {
        const ratio = total / max;
        
        if (ratio >= 1) {
            unitsContainer.style.borderColor = "rgba(239, 68, 68, 0.8)";
            unitsContainer.style.background = "rgba(239, 68, 68, 0.3)";
            unitsContainer.style.color = "#fca5a5";
        } else if (ratio >= 0.9) {
            unitsContainer.style.borderColor = "rgba(251, 191, 36, 0.8)";
            unitsContainer.style.background = "rgba(251, 191, 36, 0.3)";
            unitsContainer.style.color = "#fcd34d";
        } else if (ratio >= 0.7) {
            unitsContainer.style.borderColor = "rgba(251, 191, 36, 0.6)";
            unitsContainer.style.background = "rgba(251, 191, 36, 0.2)";
            unitsContainer.style.color = "#fde68a";
        } else {
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

export { hudInjected, navInjected };
