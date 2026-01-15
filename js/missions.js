/* ===============================
   MISSIONS.JS - Avec système d'exploration
   =============================== */

import { GameData, addResource, saveGame } from "./gameData.js";
import { triggerExploration } from "./main.js";

// ===============================
// DÉFINITION DES MISSIONS
// ===============================

const MISSIONS = {
    exploration: {
        key: "exploration",
        name: "Exploration spatiale",
        emoji: "🔭",
        duration: 300, // 5 minutes
        type: "exploration", // ⭐ TYPE IMPORTANT
        reward: { scrap: 1000, xp: 50 },
        prereq: { drone_recuperateur: 5 }
    },
    reconnaissance: {
        key: "reconnaissance",
        name: "Reconnaissance sectorielle",
        emoji: "📡",
        duration: 120, // 2 minutes
        type: "exploration", // ⭐ TYPE IMPORTANT
        reward: { data: 50, xp: 30 },
        prereq: { drone_recuperateur: 3 }
    },
    sauvetage: {
        key: "sauvetage",
        name: "Mission de sauvetage",
        emoji: "🛟",
        duration: 600, // 10 minutes
        reward: { nano: 20, xp: 80 },
        prereq: { drone_recuperateur: 8 }
    },
    combat: {
        key: "combat",
        name: "Patrouille de combat",
        emoji: "⚔️",
        duration: 180, // 3 minutes
        reward: { energy: 100, xp: 60 },
        prereq: { chasseur: 5 }
    },
    deep_exploration: {
        key: "deep_exploration",
        name: "Exploration profonde",
        emoji: "🌌",
        duration: 480, // 8 minutes
        type: "exploration", // ⭐ TYPE IMPORTANT
        reward: { nano: 30, data: 100, xp: 120 },
        prereq: { drone_recuperateur: 10, chasseur: 3 }
    }
};

const ACTIVE_MISSIONS_KEY = "activeMissions";
let globalMissionTimer = null;

// ===============================
// UTILITAIRES
// ===============================

function loadActiveMissions() {
    return JSON.parse(localStorage.getItem(ACTIVE_MISSIONS_KEY)) || [];
}

function saveActiveMissions(list) {
    localStorage.setItem(ACTIVE_MISSIONS_KEY, JSON.stringify(list));
}

function formatTime(seconds) {
    const s = Math.max(0, seconds);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${m}:${r.toString().padStart(2, "0")}`;
}

function hasPrerequisites(mission) {
    const prereq = mission.prereq || {};
    
    for (const [unitId, count] of Object.entries(prereq)) {
        const owned = GameData.units[unitId]?.count || 0;
        if (owned < count) return false;
    }
    
    return true;
}

function isMissionActive(missionKey, activeList) {
    return activeList.some(m => m.key === missionKey);
}

// ===============================
// AFFICHAGE DES MISSIONS
// ===============================

export function renderMissionsList() {
    const container = document.getElementById("missionsList");
    if (!container) return;

    const activeMissions = loadActiveMissions();
    container.innerHTML = "";

    Object.values(MISSIONS).forEach(mission => {
        const div = document.createElement("div");
        div.className = "mission-card";

        const hasReq = hasPrerequisites(mission);
        const active = isMissionActive(mission.key, activeMissions);

        let prereqText = [];
        if (mission.prereq) {
            Object.entries(mission.prereq).forEach(([unit, count]) => {
                prereqText.push(`${count} ${unit.replace(/_/g, ' ')}`);
            });
        }

        let rewardText = [];
        if (mission.reward.scrap) rewardText.push(`🔩 ${mission.reward.scrap} Ferraille`);
        if (mission.reward.energy) rewardText.push(`⚡ ${mission.reward.energy} Énergie`);
        if (mission.reward.nano) rewardText.push(`🧬 ${mission.reward.nano} Nano`);
        if (mission.reward.data) rewardText.push(`📡 ${mission.reward.data} Données`);
        if (mission.reward.xp) rewardText.push(`⭐ ${mission.reward.xp} XP`);

        // Badge pour les missions d'exploration
        const explorationBadge = mission.type === "exploration" 
            ? '<span class="badge exploration-badge">🗺️ Exploration</span>' 
            : '';

        div.innerHTML = `
            <div class="mission-header">
                <div>
                    <h3>${mission.name}</h3>
                    ${explorationBadge}
                </div>
                <span class="mission-emoji">${mission.emoji}</span>
            </div>
            <p class="mission-description">
                Durée : ${Math.floor(mission.duration / 60)} minutes
                ${mission.type === "exploration" ? '<br><small>🌟 Révèle de nouvelles zones sur la carte</small>' : ''}
            </p>
            <div class="mission-requirements">
                <h4>Prérequis</h4>
                <p>${prereqText.length ? prereqText.join(", ") : "Aucun"}</p>
            </div>
            <div class="mission-rewards">
                ${rewardText.map(r => `<div class="reward-item">${r}</div>`).join('')}
            </div>
            <button class="btn-mission" data-key="${mission.key}">
                ${active ? '⏳ En cours...' : hasReq ? '🚀 Lancer' : '🔒 Prérequis manquants'}
            </button>
        `;

        const btn = div.querySelector(".btn-mission");
        btn.disabled = active || !hasReq;

        if (!active && hasReq) {
            btn.addEventListener("click", () => startMission(mission.key));
        }

        container.appendChild(div);
    });

    console.log("✅ Liste des missions mise à jour");
}

// ===============================
// JOURNAL DE MISSION
// ===============================

export function updateMissionLogDisplay() {
    const log = document.getElementById("missionLog");
    if (!log) return;

    const activeMissions = loadActiveMissions();

    if (activeMissions.length === 0) {
        log.innerHTML = `
            <div style="text-align: center; padding: 20px; color: var(--color-text-secondary);">
                <p>📋 Aucune mission en cours.</p>
                <p style="font-size: 0.9rem; margin-top: 8px;">Lancez une mission pour commencer !</p>
            </div>
        `;
        return;
    }

    const now = Date.now();
    const lines = activeMissions.map(m => {
        const mission = MISSIONS[m.key];
        const remaining = Math.floor((m.endTime - now) / 1000);
        const explorationIcon = mission.type === "exploration" ? "🗺️ " : "";
        return `
            <div class="mission-log-entry">
                <span class="mission-log-icon">${mission.emoji}</span>
                <span class="mission-log-name">${explorationIcon}${mission.name}</span>
                <span class="mission-log-time">${formatTime(remaining)}</span>
            </div>
        `;
    });

    log.innerHTML = lines.join("");
}

// ===============================
// LANCER UNE MISSION
// ===============================

function startMission(missionKey) {
    const mission = MISSIONS[missionKey];
    if (!mission) return;

    let activeMissions = loadActiveMissions();
    if (isMissionActive(missionKey, activeMissions)) return;

    const endTime = Date.now() + mission.duration * 1000;

    activeMissions.push({
        key: missionKey,
        endTime: endTime
    });

    saveActiveMissions(activeMissions);
    renderMissionsList();
    updateMissionLogDisplay();
    startGlobalTimer();

    // Message de confirmation
    const status = document.getElementById("missionStatus");
    if (status) {
        status.textContent = `🚀 Mission "${mission.name}" lancée !`;
        status.className = "info";
        setTimeout(() => {
            status.textContent = "";
        }, 3000);
    }

    console.log(`🚀 Mission lancée : ${mission.name}`);
}

// ===============================
// TIMER GLOBAL
// ===============================

export function startGlobalTimer() {
    if (globalMissionTimer) return;

    globalMissionTimer = setInterval(() => {
        tickMissions();
    }, 1000);

    console.log("⏱️ Timer de missions démarré");
}

function stopGlobalTimerIfNeeded() {
    const activeMissions = loadActiveMissions();
    if (activeMissions.length === 0 && globalMissionTimer) {
        clearInterval(globalMissionTimer);
        globalMissionTimer = null;
        console.log("⏹️ Timer de missions arrêté");
    }
}

function tickMissions() {
    let activeMissions = loadActiveMissions();
    const now = Date.now();
    let changed = false;

    const stillActive = [];

    activeMissions.forEach(m => {
        const remaining = Math.floor((m.endTime - now) / 1000);

        if (remaining <= 0) {
            finishMission(m.key);
            changed = true;
        } else {
            stillActive.push(m);
        }
    });

    if (changed) {
        saveActiveMissions(stillActive);
        renderMissionsList();
    }

    updateMissionLogDisplay();
    stopGlobalTimerIfNeeded();
}

// ===============================
// TERMINER UNE MISSION
// ===============================

function finishMission(missionKey) {
    const mission = MISSIONS[missionKey];
    if (!mission) return;

    const reward = mission.reward;

    // Donner les récompenses
    if (reward.scrap) addResource("scrap", reward.scrap);
    if (reward.energy) addResource("energy", reward.energy);
    if (reward.nano) addResource("nano", reward.nano);
    if (reward.data) addResource("data", reward.data);
    if (reward.xp) {
        GameData.xp = (GameData.xp || 0) + reward.xp;
        saveGame();
    }

    // ⭐ SI C'EST UNE MISSION D'EXPLORATION, RÉVÉLER LA CARTE
    if (mission.type === "exploration") {
        const explored = triggerExploration();
        if (explored) {
            console.log("🗺️ Nouvelle zone découverte sur la carte galactique !");
            
            const status = document.getElementById("missionStatus");
            if (status) {
                status.innerHTML = `
                    ✅ Mission "${mission.name}" terminée !<br>
                    🗺️ Nouvelle zone découverte sur la carte !
                `;
                status.className = "success exploration-success";
            }
        }
    } else {
        const status = document.getElementById("missionStatus");
        if (status) {
            status.textContent = `✅ Mission "${mission.name}" terminée !`;
            status.className = "success";
        }
    }

    // Effacer le message après 5 secondes
    setTimeout(() => {
        const status = document.getElementById("missionStatus");
        if (status) {
            status.textContent = "";
            status.className = "";
        }
    }, 5000);

    console.log(`✅ Mission terminée : ${mission.name}`);
}

// ===============================
// INITIALISATION
// ===============================

window.addEventListener("load", () => {
    const activeMissions = loadActiveMissions();
    if (activeMissions.length > 0) {
        startGlobalTimer();
        console.log(`🔄 Reprise de ${activeMissions.length} mission(s) en cours`);
    }
});

// Export pour tests
export { MISSIONS };
