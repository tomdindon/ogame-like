// ===============================
// MISSIONS.JS
// ===============================

import { GameData, addResource, saveGame } from "./gameData.js";

const MISSIONS = {
    exploration: {
        key: "exploration",
        name: "Exploration spatiale",
        emoji: "🔭",
        duration: 300,
        reward: { scrap: 1000, xp: 50 },
        prereq: { drone_recuperateur: 5 }
    },
    reconnaissance: {
        key: "reconnaissance",
        name: "Reconnaissance",
        emoji: "📡",
        duration: 120,
        reward: { data: 50, xp: 30 },
        prereq: { drone_recuperateur: 3 }
    },
    sauvetage: {
        key: "sauvetage",
        name: "Mission de sauvetage",
        emoji: "🛟",
        duration: 600,
        reward: { nano: 20, xp: 80 },
        prereq: { drone_recuperateur: 8 }
    },
    combat: {
        key: "combat",
        name: "Patrouille de combat",
        emoji: "⚔️",
        duration: 180,
        reward: { energy: 100, xp: 60 },
        prereq: { chasseur: 5 }
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
        if (mission.reward.scrap) rewardText.push(`${mission.reward.scrap} Ferraille`);
        if (mission.reward.energy) rewardText.push(`${mission.reward.energy} Énergie`);
        if (mission.reward.nano) rewardText.push(`${mission.reward.nano} Nano`);
        if (mission.reward.data) rewardText.push(`${mission.reward.data} Données`);
        if (mission.reward.xp) rewardText.push(`${mission.reward.xp} XP`);

        div.innerHTML = `
            <div class="mission-header">
                <h3>${mission.name}</h3>
                <span class="mission-emoji">${mission.emoji}</span>
            </div>
            <p class="mission-description">Durée : ${Math.floor(mission.duration / 60)} minutes</p>
            <div class="mission-requirements">
                <h4>Prérequis</h4>
                <p>${prereqText.length ? prereqText.join(", ") : "Aucun"}</p>
            </div>
            <div class="mission-rewards">
                ${rewardText.map(r => `<div class="reward-item">${r}</div>`).join('')}
            </div>
            <button class="btn-mission" data-key="${mission.key}">
                ${active ? 'En cours...' : hasReq ? 'Lancer' : 'Prérequis manquants'}
            </button>
        `;

        const btn = div.querySelector(".btn-mission");
        btn.disabled = active || !hasReq;

        if (!active && hasReq) {
            btn.addEventListener("click", () => startMission(mission.key));
        }

        container.appendChild(div);
    });
}

// ===============================
// JOURNAL DE MISSION
// ===============================

export function updateMissionLogDisplay() {
    const log = document.getElementById("missionLog");
    if (!log) return;

    const activeMissions = loadActiveMissions();

    if (activeMissions.length === 0) {
        log.textContent = "Aucune mission en cours.";
        return;
    }

    const now = Date.now();
    const lines = activeMissions.map(m => {
        const mission = MISSIONS[m.key];
        const remaining = Math.floor((m.endTime - now) / 1000);
        return `${mission.name} : ${formatTime(remaining)}`;
    });

    log.textContent = lines.join("\n");
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
}

// ===============================
// TIMER GLOBAL
// ===============================

export function startGlobalTimer() {
    if (globalMissionTimer) return;

    globalMissionTimer = setInterval(() => {
        tickMissions();
    }, 1000);
}

function stopGlobalTimerIfNeeded() {
    const activeMissions = loadActiveMissions();
    if (activeMissions.length === 0 && globalMissionTimer) {
        clearInterval(globalMissionTimer);
        globalMissionTimer = null;
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

    if (reward.scrap) addResource("scrap", reward.scrap);
    if (reward.energy) addResource("energy", reward.energy);
    if (reward.nano) addResource("nano", reward.nano);
    if (reward.data) addResource("data", reward.data);
    if (reward.xp) {
        GameData.xp = (GameData.xp || 0) + reward.xp;
        saveGame();
    }

    const status = document.getElementById("missionStatus");
    if (status) {
        status.textContent = `Mission "${mission.name}" terminée !`;
        status.className = "success";
    }
}

// ===============================
// INITIALISATION
// ===============================

window.addEventListener("load", () => {
    const activeMissions = loadActiveMissions();
    if (activeMissions.length > 0) {
        startGlobalTimer();
    }
});
