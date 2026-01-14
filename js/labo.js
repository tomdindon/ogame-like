// ===============================
// LABO.JS - Transmutation
// ===============================

import { GameData, spendResource, addResource, saveGame } from "./gameData.js";

// ===============================
// CONFIGURATION DES TRANSMUTATIONS
// ===============================

const transmutations = {
    scrap: {
        inputKey: "scrap",
        cout: 1000,
        duree: 30,
        resultat: "Acier renforcé",
        outputKey: "acier",
        emoji: "🛠️"
    },
    energie: {
        inputKey: "energy",
        cout: 1000,
        duree: 60,
        resultat: "Nanites synthétiques",
        outputKey: "nanites",
        emoji: "🤖"
    },
    nano: {
        inputKey: "nano",
        cout: 1000,
        duree: 45,
        resultat: "Module cybernétique",
        outputKey: "module",
        emoji: "🧩"
    },
    data: {
        inputKey: "data",
        cout: 1000,
        duree: 50,
        resultat: "Fragment d'IA oubliée",
        outputKey: "fragment",
        emoji: "🧠"
    }
};

const emojiMap = {
    scrap: "🔩",
    energie: "⚡",
    nano: "🧬",
    data: "📡"
};

const inputLabels = {
    scrap: "Ferraille",
    energie: "Énergie",
    nano: "Nano‑composants",
    data: "Données anciennes"
};

// ===============================
// VARIABLES GLOBALES
// ===============================

let currentRecipe = null;
let timer = null;

// ===============================
// INITIALISATION
// ===============================

export function initLabo() {
    console.log("🧪 Initialisation du Labo");

    const inputSelect = document.getElementById("inputSelect");
    const inputEmoji = document.getElementById("inputEmoji");
    const outputEmoji = document.getElementById("outputEmoji");
    const outputText = document.getElementById("outputText");
    const inputCost = document.getElementById("inputCost");
    const outputGain = document.getElementById("outputGain");
    const startBtn = document.getElementById("startBtn");
    const statusBox = document.getElementById("statusBox");

    if (!inputSelect || !startBtn || !statusBox) {
        console.error("❌ Éléments DOM du Labo introuvables !");
        return;
    }

    // Reset
    if (timer) {
        clearInterval(timer);
        timer = null;
    }

    inputSelect.disabled = false;
    startBtn.disabled = true;
    inputSelect.value = "";
    
    if (inputEmoji) inputEmoji.textContent = "";
    if (outputEmoji) outputEmoji.textContent = "";
    if (outputText) outputText.textContent = "Sélectionnez une ressource.";
    if (inputCost) inputCost.textContent = "Coût : -";
    if (outputGain) outputGain.textContent = "Gain : -";
    statusBox.textContent = "Aucune transmutation en cours.";

    currentRecipe = null;

    // ===============================
    // ÉVÉNEMENT : Choix de ressource
    // ===============================

    inputSelect.addEventListener("change", () => {
        const value = inputSelect.value;
        console.log("📝 Ressource sélectionnée :", value);

        if (!value) {
            if (inputEmoji) inputEmoji.textContent = "";
            if (outputEmoji) outputEmoji.textContent = "";
            if (outputText) outputText.textContent = "Sélectionnez une ressource.";
            if (inputCost) inputCost.textContent = "Coût : -";
            if (outputGain) outputGain.textContent = "Gain : -";
            startBtn.disabled = true;
            currentRecipe = null;
            return;
        }

        const r = transmutations[value];
        if (!r) {
            console.error("❌ Recette introuvable pour :", value);
            return;
        }

        currentRecipe = r;

        if (inputEmoji) inputEmoji.textContent = emojiMap[value];
        if (outputEmoji) outputEmoji.textContent = r.emoji;
        if (outputText) outputText.textContent = r.resultat;

        const label = inputLabels[value];
        if (inputCost) inputCost.textContent = `Coût : ${r.cout.toLocaleString("fr-FR")} ${label}`;
        if (outputGain) outputGain.textContent = `Gain : 1 ${r.resultat}`;

        startBtn.disabled = false;
    });

    // ===============================
    // ÉVÉNEMENT : Lancer transmutation
    // ===============================

    startBtn.addEventListener("click", () => {
        console.log("🚀 Lancement de la transmutation");

        if (!currentRecipe) {
            console.warn("⚠️ Aucune recette sélectionnée");
            return;
        }

        const r = currentRecipe;

        // Vérification des ressources
        const hasEnough = GameData.resources[r.inputKey] >= r.cout;
        
        if (!hasEnough) {
            statusBox.textContent = "❌ Ressources insuffisantes.";
            console.warn("⚠️ Pas assez de", r.inputKey);
            return;
        }

        // Dépense
        if (!spendResource(r.inputKey, r.cout)) {
            statusBox.textContent = "❌ Erreur lors de la dépense.";
            return;
        }

        let timeLeft = r.duree;
        statusBox.textContent = `Transmutation en cours... (${timeLeft}s restantes)`;

        startBtn.disabled = true;
        inputSelect.disabled = true;

        timer = setInterval(() => {
            timeLeft--;
            statusBox.textContent = `Transmutation en cours... (${timeLeft}s restantes)`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                timer = null;

                addResource(r.outputKey, 1);

                statusBox.innerHTML = `✅ Transmutation terminée ! Vous obtenez : <strong>${r.resultat}</strong>`;

                startBtn.disabled = false;
                inputSelect.disabled = false;

                console.log("✅ Transmutation terminée !");
            }
        }, 1000);
    });
}
