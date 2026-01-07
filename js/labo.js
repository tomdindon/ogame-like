// Table de correspondance des transmutations
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

// Sélecteurs DOM
const inputSelect = document.getElementById("inputSelect");
const inputEmoji  = document.getElementById("inputEmoji");

const outputEmoji = document.getElementById("outputEmoji");
const outputText  = document.getElementById("outputText");

const inputCost   = document.getElementById("inputCost");
const outputGain  = document.getElementById("outputGain");

const startBtn    = document.getElementById("startBtn");
const statusBox   = document.getElementById("statusBox");

let currentRecipe = null;
let timer = null;

// Emojis d'entrée
const emojiMap = {
    scrap:   "🔩",
    energie: "⚡",
    nano:    "🧬",
    data:    "📡"
};

// Noms lisibles pour le coût
const inputLabels = {
    scrap:   "Ferraille",
    energie: "Énergie",
    nano:    "Nano‑composants",
    data:    "Données anciennes"
};

// Mise à jour automatique
inputSelect.addEventListener("change", () => {
    const value = inputSelect.value;

    if (!value) {
        inputEmoji.textContent  = "";
        outputEmoji.textContent = "";
        outputText.textContent  = "Sélectionnez une ressource.";
        inputCost.textContent   = "Coût : -";
        outputGain.textContent  = "Gain : -";
        startBtn.disabled       = true;
        currentRecipe           = null;
        return;
    }

    const r = transmutations[value];
    currentRecipe = r;

    // Emoji entrée
    inputEmoji.textContent = emojiMap[value];

    // Résultat
    outputEmoji.textContent = r.emoji;
    outputText.textContent  = r.resultat;

    // Coût & gain (affichage)
    const label = inputLabels[value] || "Ressource";
    inputCost.textContent  = `Coût : ${r.cout.toLocaleString("fr-FR")} ${label}`;
    outputGain.textContent = `Gain : 1 ${r.resultat}`;

    startBtn.disabled = false;
});

// Lancer la transmutation
startBtn.addEventListener("click", () => {
    if (!currentRecipe) return;

    const value = inputSelect.value;
    const r = currentRecipe;

    // Vérification + consommation via GameData
    const ok = spendResource(r.inputKey, r.cout);
    if (!ok) {
        statusBox.innerHTML = "❌ Ressources insuffisantes.";
        return;
    }

    let timeLeft = r.duree;

    statusBox.innerHTML = `Transmutation en cours... (${timeLeft}s restantes)`;

    startBtn.disabled   = true;
    inputSelect.disabled = true;

    timer = setInterval(() => {
        timeLeft--;
        statusBox.innerHTML = `Transmutation en cours... (${timeLeft}s restantes)`;

        if (timeLeft <= 0) {
            clearInterval(timer);

            // Ajout du résultat dans GameData
            addResource(r.outputKey, 1);

            statusBox.innerHTML = `✔️ Transmutation terminée ! Vous obtenez : <strong>${r.resultat}</strong>`;

            startBtn.disabled    = false;
            inputSelect.disabled = false;
        }
    }, 1000);
});
