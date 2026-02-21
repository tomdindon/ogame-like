// =======================================
// GAME STATE (version globale)
// =======================================

// Charge ou crée un joueur + récupère ses vaisseaux
async function loadGame(playerName) {
    // Récupère le joueur par son nom
    let player = await getPlayerByName(playerName);

    // Si le joueur n'existe pas, on le crée
    if (!player) {
        player = await createPlayer(playerName);
    }

    // Récupère les vaisseaux du joueur
    const ships = await getPlayerShips(player.id);

    return {
        player,
        ships
    };
}

// Sauvegarde (Supabase gère tout automatiquement)
async function saveGame() {
    return true;
}

// Rendre les fonctions globales
window.loadGame = loadGame;
window.saveGame = saveGame;
