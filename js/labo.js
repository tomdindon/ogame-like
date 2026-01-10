// ===============================
// IMPORTS
// ===============================
import { spendResource, addResource } from "./gameData.js";


// ===============================
// TABLE DES TRANSMUTATIONS
// ===============================

const transmutations = {
    scrap: {
        inputKey: "scrap",
        cout: 1000000,
        duree: 30,
        resultat: "Acier renforcé",
        outputKey: "acier",
        emoji: "🛠️"
    },
    energie: {
        inputKey: "energy",
        cout: 1000000,
        duree: 60,
        resultat: "Nanites synthétiques",
        outputKey: "nanites",
        emoji: "🤖"
    },
    nano: {
        inputKey: "nano",
        cout: 1000000,
        duree: 45,
        resultat: "Module cybernétique",
        outputKey: "module",
        emoji: "🧩"
    },
    data: {
        inputKey: "data",
        cout: 1000000,
        duree: 50,
        resultat: "Fragment d’IA oubliée",
        outputKey: "fragment",
        emoji: "🧠"
    }
};


// ===============================
// TABLES D'AFFICHAGE
// ===============================

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
// VARIABLES INTERNES
// ===============================

let currentRecipe = null;
let timer = null;


// ===============================
// INITIALISATION DE LA PAGE LABO
// ===============================

export function initLabo() {

    // Sélecteurs DOM
    const inputSelect = document.getElementById("inputSelect");
    const inputEmoji  = document.getElementById("inputEmoji");
    const outputEmoji = document.getElementById("outputEmoji");
    const outputText  = document.getElementById("outputText");
    const inputCost   = document.getElementById("inputCost");
    const outputGain  = document.getElementById("outputGain");
    const startBtn    = document.getElementById("startBtn");
    const statusBox   = document.getElementById("statusBox");

    // ===============================
    // RESET COMPLET À CHAQUE ENTRÉE
    // ===============================

    if (timer) {
        clearInterval(timer);
        timer = null;
    }

    inputSelect.disabled = false;
    startBtn.disabled = true;

    inputSelect.value = "";
    inputEmoji.textContent = "";
    outputEmoji.textContent = "";
    outputText.textContent = "Sélectionnez une ressource.";
    inputCost.textContent = "Coût : -";
    outputGain.textContent = "Gain : -";
    statusBox.textContent = "Aucune transmutation en cours.";

    currentRecipe = null;


    // ===============================
    // CHOIX DE LA RESSOURCE
    // ===============================

    inputSelect.onchange = () => {
        const value = inputSelect.value;

        if (!value) {
            inputEmoji.textContent = "";
            outputEmoji.textContent = "";
            outputText.textContent = "Sélectionnez une ressource.";
            inputCost.textContent = "Coût : -";
            outputGain.textContent = "Gain : -";
            startBtn.disabled = true;
            currentRecipe = null;
            return;
        }

        const r = transmutations[value];
        currentRecipe = r;

        // Emoji entrée
        inputEmoji.textContent = emojiMap[value];

        // Résultat
        outputEmoji.textContent = r.emoji;
        outputText.textContent = r.resultat;

        // Coût & gain
        const label = inputLabels[value];
        inputCost.textContent = `Coût : ${r.cout.toLocaleString("fr-FR")} ${label}`;
        outputGain.textContent = `Gain : 1 ${r.resultat}`;

        startBtn.disabled = false;
    };


    // ===============================
    // LANCER LA TRANSMUTATION
    // ===============================

    startBtn.onclick = () => {
        if (!currentRecipe) return;

        const r = currentRecipe;

        // Vérification des ressources
        const ok = spendResource(r.inputKey, r.cout);
        if (!ok) {
            statusBox.innerHTML = "❌ Ressources insuffisantes.";
            return;
        }

        let timeLeft = r.duree;

        statusBox.innerHTML = `Transmutation en cours... (${timeLeft}s restantes)`;

        startBtn.disabled = true;
        inputSelect.disabled = true;

        timer = setInterval(() => {
            timeLeft--;
            statusBox.innerHTML = `Transmutation en cours... (${timeLeft}s restantes)`;

            if (timeLeft <= 0) {
                clearInterval(timer);
                timer = null;

                // Ajout du résultat
                addResource(r.outputKey, 1);

                statusBox.innerHTML =
                    `✔️ Transmutation terminée ! Vous obtenez : <strong>${r.resultat}</strong>`;

                startBtn.disabled = false;
                inputSelect.disabled = false;
            }
        }, 1000);
    };
}
