// ===============================
// RECHERCHE.JS — VERSION SPA
// ===============================

// Liste des technologies
const technologies = [
    {
        id: "tech1",
        nom: "Amélioration énergétique",
        desc: "Augmente l'efficacité des générateurs et réduit les coûts en énergie.",
        cout: "150 Cristal",
        temps: "45s"
    },
    {
        id: "tech2",
        nom: "Blindage avancé",
        desc: "Renforce la résistance des unités terrestres.",
        cout: "200 Fer",
        temps: "60s"
    },
    {
        id: "tech3",
        nom: "Analyse de matériaux",
        desc: "Débloque de nouvelles recettes dans le laboratoire.",
        cout: "120 Cristal",
        temps: "30s"
    },
    {
        id: "tech4",
        nom: "Optimisation industrielle",
        desc: "Réduit le temps de construction des bâtiments.",
        cout: "300 Fer",
        temps: "90s"
    }
];


// ===============================
// INITIALISATION SPA
// ===============================

export function initRecherche() {

    const techGrid = document.getElementById("techGrid");
    const infoBox = document.getElementById("infoBox");

    // Reset UI
    techGrid.innerHTML = "";
    infoBox.innerHTML = "Sélectionnez une technologie pour voir les détails.";

    // Génération des cartes
    technologies.forEach(tech => {
        const card = document.createElement("div");
        card.className = "tech-card";

        card.innerHTML = `
            <h3>${tech.nom}</h3>
            <p>${tech.desc}</p>
        `;

        card.addEventListener("click", () => {
            afficherInfo(tech, infoBox);
        });

        techGrid.appendChild(card);
    });
}


// ===============================
// AFFICHAGE DES DÉTAILS
// ===============================

function afficherInfo(tech, infoBox) {
    infoBox.innerHTML = `
        <strong>${tech.nom}</strong><br>
        ${tech.desc}<br><br>
        <strong>Coût :</strong> ${tech.cout}<br>
        <strong>Temps de recherche :</strong> ${tech.temps}
    `;
}
