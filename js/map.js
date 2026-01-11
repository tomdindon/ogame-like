// ===============================
// MAP.JS — VERSION STABLE (SPA)
// ===============================

// Verrou pour empêcher double init
let mapInitialized = false;

// Empêche double fog
let fogGenerated = false;

export function initMap() {

    // Empêche double initialisation SPA
    if (mapInitialized) {
        console.log("⏳ Map déjà initialisée, skip.");
        return;
    }
    mapInitialized = true;

    console.log("🌌 INIT MAP (SPA)");

    // ===============================
    // SÉLECTEURS
    // ===============================
    const mapContainer = document.getElementById("map-container");
    const mapContent = document.getElementById("map-content");
    const fogLayer = document.getElementById("fog-layer");
    const systemsLayer = document.getElementById("systems-layer");

    if (!mapContainer || !mapContent || !fogLayer || !systemsLayer) {
        console.warn("⚠ Map : éléments introuvables.");
        return;
    }

    // ===============================
    // VARIABLES
    // ===============================
    const zoom = 1;
    let mapX = 0;
    let mapY = 0;

    let isDragging = false;
    let startX = 0;
    let startY = 0;

    const CELL_SIZE = 128;
    const GRID_COLS = Math.ceil(6144 / CELL_SIZE);
    const GRID_ROWS = Math.ceil(4096 / CELL_SIZE);

    const FOG_STORAGE_KEY = "galacticFogState";
    const ACTIVE_EXPLORATION_CELL_KEY = "activeExplorationCell";

    let fogGrid = [];
    let currentExplorationCell = null;


    // ===============================
    // FOG — SAUVEGARDE
    // ===============================
    function saveFogState() {
        const data = fogGrid.map(c => ({
            x: c.x,
            y: c.y,
            revealed: c.revealed
        }));
        localStorage.setItem(FOG_STORAGE_KEY, JSON.stringify(data));
    }


    // ===============================
    // FOG — GÉNÉRATION (1 seule fois)
    // ===============================
    function generateFog() {

        if (fogGenerated) {
            console.log("🌫️ Fog déjà généré, skip.");
            return;
        }
        fogGenerated = true;

        console.log("🌫️ Génération du fog");

        fogGrid = [];
        fogLayer.innerHTML = "";

        const saved = JSON.parse(localStorage.getItem(FOG_STORAGE_KEY) || "[]");

        const revealedMap = new Map();
        saved.forEach(c => revealedMap.set(`${c.x},${c.y}`, c.revealed));

        for (let y = 0; y < GRID_ROWS; y++) {
            for (let x = 0; x < GRID_COLS; x++) {

                const key = `${x},${y}`;
                const wasRevealed = revealedMap.get(key) === true;

                const cell = document.createElement("div");
                cell.classList.add("fog-cell");
                cell.style.left = (x * CELL_SIZE) + "px";
                cell.style.top = (y * CELL_SIZE) + "px";

                if (wasRevealed) {
                    cell.classList.add("fog-revealed");
                    cell.style.display = "none"; // disparition réelle
                }

                fogLayer.appendChild(cell);

                fogGrid.push({
                    x,
                    y,
                    element: cell,
                    revealed: wasRevealed,
                    exploring: false
                });
            }
        }
    }


    // ===============================
    // FOG — CHOIX CASE ROUGE
    // ===============================
    function pickRandomFogCell() {
        const hidden = fogGrid.filter(c => !c.revealed && !c.exploring);
        if (hidden.length === 0) return null;

        const cell = hidden[Math.floor(Math.random() * hidden.length)];
        cell.exploring = true;
        cell.element.classList.add("fog-exploring");
        return cell;
    }

    function startExplorationPreview() {
        const cell = pickRandomFogCell();
        if (!cell) return;

        currentExplorationCell = cell;

        localStorage.setItem(ACTIVE_EXPLORATION_CELL_KEY, JSON.stringify({
            x: cell.x,
            y: cell.y
        }));

        console.log("Case rouge :", cell.x, cell.y);
    }


    // ===============================
    // FOG — RÉVÉLATION
    // ===============================
    function revealFogCell(cell) {
        if (!cell) return;

        cell.revealed = true;
        cell.exploring = false;

        cell.element.classList.remove("fog-exploring");
        cell.element.classList.add("fog-revealed");

        // disparition réelle
        cell.element.style.display = "none";

        saveFogState();
    }


    // ===============================
    // MISSION — FIN D’EXPLORATION
    // ===============================
    function startExplorationMission() {

        const saved = JSON.parse(localStorage.getItem(ACTIVE_EXPLORATION_CELL_KEY));

        if (!saved) return;

        const cell = fogGrid.find(c => c.x === saved.x && c.y === saved.y);
        if (!cell) return;

        currentExplorationCell = cell;

        console.log("Révélation après mission :", cell.x, cell.y);

        setTimeout(() => {
            revealFogCell(cell);
            triggerExplorationEvent(cell);
        }, 5000);
    }

    function triggerExplorationEvent(cell) {
        const events = ["combat", "ressource", "signal", "ruines"];
        const event = events[Math.floor(Math.random() * events.length)];
        console.log("Événement :", event, "dans", cell.x, cell.y);
    }


    // ===============================
    // SYNCHRO MISSIONS
    // ===============================
    function checkActiveExplorationMission() {

        let activeMissions = [];

        try {
            activeMissions = JSON.parse(localStorage.getItem("activeMissions")) || [];
        } catch (e) {
            return;
        }

        const hasMission = activeMissions.some(m => m.key === "exploration_galactique");
        if (!hasMission) return;

        const saved = JSON.parse(localStorage.getItem(ACTIVE_EXPLORATION_CELL_KEY));

        if (saved) {
            const cell = fogGrid.find(c => c.x === saved.x && c.y === saved.y);

            if (cell && !cell.revealed) {
                cell.exploring = true;
                cell.element.classList.add("fog-exploring");
                console.log("Case rouge restaurée :", saved.x, saved.y);
                return;
            }
        }

        startExplorationPreview();
    }

    function checkPendingExplorationReveal() {
        const pending = localStorage.getItem("pendingExplorationReveal");
        if (!pending) return;

        localStorage.removeItem("pendingExplorationReveal");
        startExplorationMission();
    }


    // ===============================
    // SYSTÈMES STELLAIRES
    // ===============================
    const systems = [
        { name: "Alpha‑7", x: 800, y: 600, icon: "🛰️" },
        { name: "Nébuleuse Rouge", x: 1500, y: 900, icon: "🔬" },
        { name: "Station Fantôme", x: 2500, y: 1200, icon: "⚔️" },
        { name: "Ruines Orbitales", x: 4000, y: 2000, icon: "🛰️" }
    ];

    function renderSystems() {
        systemsLayer.innerHTML = "";

        systems.forEach(sys => {
            const el = document.createElement("div");
            el.classList.add("system");
            el.style.left = sys.x + "px";
            el.style.top = sys.y + "px";
            el.dataset.name = sys.name;
            el.dataset.icon = sys.icon;

            el.addEventListener("click", () => {
                console.log("Système :", sys.name);
            });

            systemsLayer.appendChild(el);
        });
    }
    // ===============================
    // CAMERA — CHARGEMENT POSITION
    // ===============================
    function loadCameraPosition() {
        const savedX = localStorage.getItem("mapX");
        const savedY = localStorage.getItem("mapY");

        if (savedX !== null) mapX = parseInt(savedX);
        if (savedY !== null) mapY = parseInt(savedY);

        updateMapPosition();
    }

    // Sauvegarde position caméra
    function saveCameraPosition() {
        localStorage.setItem("mapX", mapX);
        localStorage.setItem("mapY", mapY);
    }

    // Applique transform sur map-content
    function updateMapPosition() {
        const transformValue = `translate(${mapX}px, ${mapY}px) scale(${zoom})`;
        mapContent.style.transform = transformValue;
    }


    // ===============================
    // DRAG — DÉPLACEMENT CARTE
    // ===============================
    mapContainer.onmousedown = (e) => {
        isDragging = true;
        mapContainer.classList.add("dragging");

        startX = e.clientX - mapX;
        startY = e.clientY - mapY;
    };

    mapContainer.onmousemove = (e) => {
        if (!isDragging) return;

        mapX = e.clientX - startX;
        mapY = e.clientY - startY;

        // Limites caméra
        const maxX = 0;
        const maxY = 0;

        const minX = mapContainer.clientWidth - mapContent.clientWidth * zoom;
        const minY = mapContainer.clientHeight - mapContent.clientHeight * zoom;

        mapX = Math.min(maxX, Math.max(minX, mapX));
        mapY = Math.min(maxY, Math.max(minY, mapY));

        updateMapPosition();
    };

    mapContainer.onmouseup = () => {
        isDragging = false;
        mapContainer.classList.remove("dragging");
        saveCameraPosition();
    };

    mapContainer.onmouseleave = () => {
        if (isDragging) {
            isDragging = false;
            mapContainer.classList.remove("dragging");
            saveCameraPosition();
        }
    };


    // ===============================
    // INITIALISATION COMPLÈTE
    // ===============================
    loadCameraPosition();              // restaure position caméra
    renderSystems();                   // place les systèmes
    generateFog();                     // génère fog (1 seule fois)
    checkActiveExplorationMission();   // restaure case rouge si mission active
    checkPendingExplorationReveal();   // révèle si mission terminée
    updateMapPosition();               // applique transform final
}


// ===============================
// RESET — appelé quand on QUITTE la page
// ===============================
export function resetMapInitialization() {
    mapInitialized = false;   // permet réinit SPA
    fogGenerated = false;     // permet regénérer fog proprement
}
