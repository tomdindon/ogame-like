// =======================================
// PLAYER MANAGER (version globale)
// =======================================

// Récupère un joueur par son nom
async function getPlayerByName(name) {
    const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq("name", name)
        .single();

    if (error && error.code !== "PGRST116") {
        console.error("Erreur getPlayerByName :", error);
        return null;
    }

    return data || null;
}

// Crée un nouveau joueur
async function createPlayer(name) {
    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return null;

    const userId = auth.user.id;

    // Créer la ligne dans players
    const { data: player, error } = await supabase
        .from("players")
        .insert({
            user_id: userId,
            name: name,
            xp: 0,
            rank: 1
        })
        .select()
        .single();

    if (error) {
        console.error("Erreur createPlayer :", error);
        return null;
    }

    // Créer les ressources initiales
    await supabase
        .from("player_resources")
        .insert({
            user_id: userId,
            scrap: 0,
            energy: 0,
            nano: 0,
            signal: 0
        });

    // Créer les bâtiments initiaux
    await supabase
        .from("player_buildings")
        .insert([
            { user_id: userId, building_id: "extracteur_ferraille", level: 1, last_production: Date.now() },
            { user_id: userId, building_id: "reacteur_instable", level: 1, last_production: Date.now() },
            { user_id: userId, building_id: "extracteur_nanocomposants", level: 1, last_production: Date.now() },
            { user_id: userId, building_id: "archives_fracturees", level: 1, last_production: Date.now() }
        ]);

    return player;
}

// Rendre global
window.getPlayerByName = getPlayerByName;
window.createPlayer = createPlayer;
