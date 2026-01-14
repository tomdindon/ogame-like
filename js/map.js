// ===============================
// MAP.JS
// ===============================

let mapInitialized = false;

export function resetMapInitialization() {
    mapInitialized = false;
    console.log("🗺️ Map réinitialisée");
}

export function initMap() {
    if (mapInitialized) {
        console.log("⚠️ Map déjà initialisée");
        return;
    }

    console.log("🗺️ Initialisation de la Map");

    const mapContainer = document.getElementById("map");
    if (!mapContainer) {
        console.error("❌ Conteneur map introuvable");
        return;
    }

    mapContainer.innerHTML = "";
    createStarfield();
    createSystems();

    mapInitialized = true;
    console.log("✅ Map initialisée");
}

function createStarfield() {
    const systemsLayer = document.getElementById("systems-layer");
    if (!systemsLayer) return;

    for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "star";
        star.style.left = Math.random() * 100 + "%";
        star.style.top = Math.random() * 100 + "%";
        star.style.animationDelay = Math.random() * 3 + "s";
        systemsLayer.appendChild(star);
    }
}

function createSystems() {
    const systemsLayer = document.getElementById("systems-layer");
    if (!systemsLayer) return;

    const systems = [
        { name: "Alpha Centauri", x: 20, y: 30 },
        { name: "Proxima", x: 50, y: 50 },
        { name: "Sirius", x: 70, y: 20 },
        { name: "Vega", x: 30, y: 70 },
        { name: "Arcturus", x: 80, y: 80 }
    ];

    systems.forEach(sys => {
        const system = document.createElement("div");
        system.className = "system";
        system.style.left = sys.x + "%";
        system.style.top = sys.y + "%";

        const label = document.createElement("div");
        label.className = "system-label";
        label.textContent = sys.name;

        system.appendChild(label);
        system.addEventListener("click", () => {
            alert(`Système : ${sys.name}`);
        });

        systemsLayer.appendChild(system);
    });
}
