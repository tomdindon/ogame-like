// =======================================
// INITIALISATION DU JOUEUR DANS SUPABASE
// =======================================

async function initPlayerIfNeeded() {

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    const userId = auth.user.id;

    // Vérifier si le joueur existe déjà
    const { data: exists } = await supabase
        .from("player_users")
        .select("user_id")
        .eq("user_id", userId)
        .maybeSingle();

    if (exists) return; // déjà initialisé

    // 1. Créer la ligne player_users
    await supabase.from("player_users").insert({ user_id: userId });

    // 2. Créer les ressources
    await supabase.from("player_resources").insert({
        user_id: userId
    });

    // 3. Créer les bâtiments
    const rows = buildings.map(b => ({
        user_id: userId,
        building_id: b.id,
        level: 1,
        last_production: Date.now()
    }));

    await supabase.from("player_buildings").insert(rows);

    console.log("Joueur initialisé !");
}
