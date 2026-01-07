// Table de correspondance
const transmutations = {
    "fer": {
        cout: "50 Fer",
        duree: 30,
        resultat: "10 Acier renforcé"
    },
    "cristal": {
        cout: "40 Cristal",
        duree: 45,
        resultat: "5 Plasma instable"
    },
    "energie": {
        cout: "100 Énergie",
        duree: 60,
        resultat: "20 Nanites synthétiques"
    }
};

const inputSelect = document.getElementById("inputSelect");
const colOutput = document.getElementById("colOutput");
const startBtn = document.getElementById("startBtn");
const statusBox = document.getElementById("statusBox");

let currentRecipe = null;
let timer = null;

// Mise à jour automatique du résultat
inputSelect.addEventListener("change", () => {
    const value = inputSelect.value;

    if (!value) {
        colOutput.innerHTML = "Sélectionnez une ressource.";
        startBtn.disabled = true;
        currentRecipe = null;
        return;
    }

    const r = transmutations[value];
    currentRecipe = r;

    colOutput.innerHTML = `<strong>${r.resultat}</strong>`;
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
