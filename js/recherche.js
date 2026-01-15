// ===============================
// RECHERCHE.JS
// ===============================

import { GameData, spendResource, saveGame } from "./gameData.js";

const technologies = [
    {
        id: "tech_extraction",
        name: "Extraction améliorée",
        icon: "⛏️",
        description: "Augmente la production de ferraille de 20%",
        cost: { scrap: 5000, data: 100 },
        prereq: null
    },
    {
        id: "tech_energie",
        name: "Réacteur optimisé",
        icon: "⚡",
        description: "Augmente la production d'énergie de 20%",
        cost: { energy: 3000, data: 150 },
        prereq: null
    },
    {
        id: "tech_nano",
        name: "Synthèse nano",
        icon: "🧬",
        description: "Augmente la production de nano de 20%",
        cost: { nano: 500, data: 200 },
        prereq: "tech_extraction"
    },
    {
        id: "tech_donnees",
        name: "Archives numériques",
        icon: "📡",
        description: "Augmente la production de données de 20%",
        cost: { data: 1000, energy: 2000 },
        prereq: "tech_energie"
    },
    {
        id: "tech_hangar",
        name: "Optimisation spatiale",
        icon: "🏗️",
        description: "Augmente la capacité du hangar de 20%",
        cost: { scrap: 10000, nano: 1000 },
        prereq: "tech_extraction"
    },
    {
        id: "tech_vitesse",
        name: "Propulsion avancée",
        icon: "🚀",
        description: "Réduit le temps des missions de 15%",
        cost: { energy: 5000, nano: 800 },
        prereq: "tech_energie"
    }
];

export function initRecherche() {
    const grid = document.getElementById("techGrid");
    if (!grid) return;

    if (!GameData.technologies) {
        GameData.technologies = {};
    }

    grid.innerHTML = "";

    technologies.forEach(tech => {
        const researched = GameData.technologies[tech.id] || false;
        const canResearch = tech.prereq ? (GameData.technologies[tech.prereq] || false) : true;

        const card = document.createElement("div");
        card.className = "tech-card";
        
        if (researched) card.classList.add("researched");
        if (!canResearch) card.classList.add("locked");

        let costHTML = Object.entries(tech.cost)
            .map(([res, amount]) => `<div class="cost-item">${getResourceEmoji(res)} ${amount}</div>`)
            .join('');

        card.innerHTML = `
            <div class="tech-header">
                <h3>${tech.name}</h3>
                <span class="tech-icon">${tech.icon}</span>
            </div>
            <p class="tech-description">${tech.description}</p>
            <div class="tech-cost">${costHTML}</div>
            <div class="tech-status ${researched ? 'completed' : canResearch ? '' : 'locked'}">
                ${researched ? '✓ Recherchée' : canResearch ? 'Disponible' : '🔒 Verrouillée'}
            </div>
            ${!researched && canResearch ? `<button class="btn-research" data-id="${tech.id}">Rechercher</button>` : ''}
        `;

        grid.appendChild(card);

        if (!researched && canResearch) {
            const btn = card.querySelector(".btn-research");
            btn.addEventListener("click", () => researchTech(tech));
        }
    });
}

function researchTech(tech) {
    let canAfford = true;

    for (const [res, amount] of Object.entries(tech.cost)) {
        if ((GameData.resources[res] || 0) < amount) {
            canAfford = false;
            break;
        }
    }

    if (!canAfford) {
        alert("Ressources insuffisantes !");
        return;
    }

    for (const [res, amount] of Object.entries(tech.cost)) {
        spendResource(res, amount);
    }

    GameData.technologies[tech.id] = true;
    saveGame();
    
    alert(`Technologie "${tech.name}" recherchée avec succès !`);
    initRecherche();
}

function getResourceEmoji(res) {
    const map = {
        scrap: "🔩",
        energy: "⚡",
        nano: "🧬",
        data: "📡"
    };
    return map[res] || "❓";
}
