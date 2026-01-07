// ===============================
// TRADE.JS - SYSTÈME DE BOUCLIERS
// ===============================

// Valeur en minutes par unité de ressource
const shieldValues = {
    scrap: 0.5,
    energy: 1,
    nano: 3,
    data: 5,
    acier: 8,
    nanites: 12,
    module: 20,
    fragment: 60
};

// Sélection actuelle du joueur
let tradeSelection = {
    scrap: 0,
    energy: 0,
    nano: 0,
    data: 0,
    acier: 0,
    nanites: 0,
    module: 0,
    fragment: 0
};

// Génération des cartes ressources
function generateTradeUI() {
    const container = document.querySelector(".trade-resources");

    Object.keys(shieldValues).forEach(resource => {
        const card = document.createElement("div");
        card.className = "resource-card";

        card.innerHTML = `
            <div class="emoji">${getEmoji(resource)}</div>
            <p>${resource}</p>
            <p id="count-${resource}">0</p>
            <div class="resource-controls">
                <button onclick="changeResource('${resource}', -1)">-</button>
                <button onclick="changeResource('${resource}', 1)">+</button>
            </div>
        `;

        container.appendChild(card);
    });
}

// Modifier la quantité d'une ressource
function changeResource(type, delta) {
    const newValue = tradeSelection[type] + delta;

    if (newValue < 0) return;
    if (newValue > GameData.resources[type]) return;

    tradeSelection[type] = newValue;

    document.getElementById(`count-${type}`).textContent = newValue;

    updateShieldTime();
}

// Calcul dynamique du temps total
function updateShieldTime() {
    let totalMinutes = 0;

    for (let r in tradeSelection) {
        totalMinutes += tradeSelection[r] * shieldValues[r];
    }

    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.floor(totalMinutes % 60);

    document.getElementById("shieldTime").textContent =
        `Durée : ${hours}h ${minutes}min`;
}

// Emoji par ressource
function getEmoji(type) {
    const emojis = {
        scrap: "🔩",
        energy: "⚡",
        nano: "🧬",
        data: "📡",
        acier: "🛠️",
        nanites: "🤖",
        module: "🧩",
        fragment: "🧠"
    };
    return emojis[type];
}

// Validation de l'échange
document.addEventListener("DOMContentLoaded", () => {
    generateTradeUI();
    updateShieldTime();

    document.getElementById("tradeConfirm").addEventListener("click", () => {

        // Vérifier les ressources
        for (let r in tradeSelection) {
            if (tradeSelection[r] > GameData.resources[r]) {
                alert("Ressources insuffisantes !");
                return;
            }
        }

        // Déduire les ressources
        for (let r in tradeSelection) {
            GameData.resources[r] -= tradeSelection[r];
        }

        // Ajouter le temps de bouclier
        let totalMinutes = 0;
        for (let r in tradeSelection) {
            totalMinutes += tradeSelection[r] * shieldValues[r];
        }

        GameData.resources.shieldTime =
            (GameData.resources.shieldTime || 0) + totalMinutes;

        // Reset sélection
        tradeSelection = {
            scrap: 0, energy: 0, nano: 0, data: 0,
            acier: 0, nanites: 0, module: 0, fragment: 0
        };

        document.querySelectorAll("[id^='count-']").forEach(el => el.textContent = "0");

        updateShieldTime();
        updateHUD();
        saveGame();

        alert("Échange effectué !");
    });
});
