// Table de correspondance des transmutations
const transmutations = {
    "scrap": {
        cout: "1 000 000 Ferraille",
        duree: 30,
        resultat: "Acier renforcé",
        emoji: "🛠️"
    },
    "energie": {
        cout: "1 000 000 Énergie",
        duree: 60,
        resultat: "Nanites synthétiques",
        emoji: "🤖"
    },
    "nano": {
        cout: "1 000 000 Nano‑composants",
        duree: 45,
        resultat: "Module cybernétique",
        emoji: "🧩"
    },
    "data": {
        cout: "1 000 000 Données anciennes",
        duree: 50,
        resultat: "Fragment d’IA oubliée",
        emoji: "🧠"
    }
};

// Sélecteurs DOM
const inputSelect = document.getElementById("inputSelect");
const inputEmoji = document.getElementById("inputEmoji");

const outputEmoji = document.getElementById("outputEmoji");
const outputText = document.getElementById("outputText");

const inputCost = document.getElementById("inputCost");
const outputGain = document.getElementById("outputGain");

const startBtn = document.getElementById("startBtn");
const statusBox = document.getElementById("statusBox");

let currentRecipe = null;
let timer = null;

// Emojis d'entrée
const emojiMap = {
    scrap: "🔩",
    energie: "⚡",
    nano: "🧬",
    data: "📡"
};

// Mise à jour automatique
inputSelect.addEventListener("change", () => {
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
    inputCost.textContent = "Coût : " + r.cout;
    outputGain.textContent = "Gain : 1 " + r.resultat;

    startBtn.disabled = false;
});

// Lancer la transmutation
startBtn.addEventListener("click", () => {
    if (!currentRecipe) return;

    let timeLeft = currentRecipe.duree;

    statusBox.innerHTML = `Transmutation en cours... (${timeLeft}s restantes)`;

    startBtn.disabled = true;
    inputSelect.disabled = true;

    timer = setInterval(() => {
        timeLeft--;
        statusBox.innerHTML = `Transmutation en cours... (${timeLeft}s restantes)`;

        if (timeLeft <= 0) {
            clearInterval(timer);
            statusBox.innerHTML = `✔️ Transmutation terminée ! Vous obtenez : <strong>${currentRecipe.resultat}</strong>`;
            startBtn.disabled = false;
            inputSelect.disabled = false;
        }
    }, 1000);
});
