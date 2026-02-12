/* =====================================================
   CONFIGURATION DU FOG
===================================================== */

const FOG_COLS = 48;
const FOG_ROWS = 32;
const TOTAL_FOG_CELLS = FOG_COLS * FOG_ROWS;

/* =====================================================
   INITIALISATION DU FOG
===================================================== */

function initFog() {
    const fogLayer = document.getElementById("fogLayer");

    // Charger ou créer le fog
    let fog = JSON.parse(localStorage.getItem("fogData"));
    if (!fog || fog.length !== TOTAL_FOG_CELLS) {
        fog = Array(TOTAL_FOG_CELLS).fill(1); // 1 = couvert
        localStorage.setItem("fogData", JSON.stringify(fog));
    }

    // Génération visuelle
    fogLayer.innerHTML = "";

    fog.forEach((cell, index) => {
        const div = document.createElement("div");
        div.className = "fogCell";
        if (cell === 0) div.classList.add("revealed");
        fogLayer.appendChild(div);
    });
}

/* =====================================================
   RÉVÉLER UNE CASE APRÈS UNE MISSION
===================================================== */

function revealFogCell() {
    let fog = JSON.parse(localStorage.getItem("fogData"));
    if (!fog) return;

    // Liste des cases encore couvertes
    const covered = fog
        .map((v, i) => (v === 1 ? i : null))
        .filter(v => v !== null);

    if (covered.length === 0) {
        console.log("Fog entièrement révélé !");
        return;
    }

    // Choisir une case au hasard
    const randomIndex = covered[Math.floor(Math.random() * covered.length)];

    // Révéler
    fog[randomIndex] = 0;

    // Sauvegarder
    localStorage.setItem("fogData", JSON.stringify(fog));

    // Mise à jour visuelle
    const fogLayer = document.getElementById("fogLayer");
    fogLayer.children[randomIndex].classList.add("revealed");
}

/* =====================================================
   INTÉGRATION AVEC LES MISSIONS
===================================================== */

// Appelée depuis finishMission() dans missions.js
function onExplorationMissionComplete() {
    revealFogCell();
}

/* =====================================================
   ZOOM DE LA MAP (TON CODE)
===================================================== */

// Niveau de zoom actuel
let mapZoom = 1;

// Récupération du conteneur de la map
const mapContainer = document.getElementById("map-container");

// Boutons de zoom
const zoomInBtn = document.getElementById("zoom-in");
const zoomOutBtn = document.getElementById("zoom-out");

// Fonction d'application du zoom
function applyZoom() {
    mapContainer.style.transform = `scale(${mapZoom})`;
    mapContainer.style.transformOrigin = "top left";
}

// Zoom +
zoomInBtn.addEventListener("click", () => {
    mapZoom += 0.1;
    if (mapZoom > 3) mapZoom = 3; // limite max
    applyZoom();
});

// Zoom -
zoomOutBtn.addEventListener("click", () => {
    mapZoom -= 0.1;
    if (mapZoom < 0.3) mapZoom = 0.3; // limite min
    applyZoom();
});

/* =====================================================
   INITIALISATION DE LA MAP
===================================================== */

window.addEventListener("load", () => {
    initFog();

    // Si une mission d'exploration vient de se terminer
    if (localStorage.getItem("pendingExplorationReveal") === "1") {
        revealFogCell();
        localStorage.setItem("pendingExplorationReveal", "0");
    }
});
