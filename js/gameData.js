// =======================================
// Données globales du joueur
// =======================================

const GameData = {

    // XP du joueur (modifie cette valeur pour tester les rangs)
    xp: 14000,

    // Temps de jeu
    playtime: {
        hours: 0,
        minutes: 0
    },

    // ============================
    // UNITÉS
    // ============================
    units: {
        drone_recuperateur: { level: 1, count: 0 },
        fregate: { level: 1, count: 0 },
        sentinelle: { level: 1, count: 0 },
        cargo: { level: 1, count: 0 },
        chasseur: { level: 1, count: 0 },
        intercepteur: { level: 1, count: 0 },

        // Défense
        roquette: { level: 1, count: 0 },
        canon_impulsion: { level: 1, count: 0 },
        canon_plasma: { level: 1, count: 0 },
        batterie_aa: { level: 1, count: 0 },

        // Bâtiments unités
        hangar_attaque: { level: 1 },
        hangar_defense: { level: 1 },
        etoile_noire: { level: 1 }
    },

    // ============================
    // BÂTIMENTS
    // ============================
    buildings: {
        extracteur_ferraille: { level: 1 },
        reacteur_instable: { level: 1 },
        extracteur_nanocomposants: { level: 1 },
        archives_fracturees: { level: 1 },
        atelier_reparation: { level: 1 }
    },

    // ============================
    // RESSOURCES
    // ============================
    resources: {
        scrap: 0,
        energy: 0,
        nano: 0,
        signal: 0,
        tools: 0,
        robots: 0,
        modules: 0,
        knowledge: 0
    }
};

/* ============================================================
   FONCTIONS MANQUANTES POUR LA PAGE UNITÉS
   ============================================================ */

// Total d’unités possédées
function getTotalUnits() {
    let total = 0;

    for (const id in GameData.units) {
        const u = GameData.units[id];
        if (u.count) total += u.count;
    }

    return total;
}

// Capacité maximale (basée sur les hangars)
function getUnitCapacity() {
    let base = 10; // capacité minimale
    let bonus = 0;

    // Hangar d'attaque
    if (GameData.units.hangar_attaque) {
        bonus += GameData.units.hangar_attaque.level * 50;
    }

    // Hangar de défense
    if (GameData.units.hangar_defense) {
        bonus += GameData.units.hangar_defense.level * 50;
    }

    return base + bonus;
}

// Mise à jour du HUD global (pour plus tard)
function updateGlobalUnitHUD() {
    // Tu pourras afficher le total dans le HUD ici
    // Pour l’instant, on laisse vide pour éviter les erreurs
}
