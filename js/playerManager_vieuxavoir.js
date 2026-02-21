// =======================================
// CHARGEMENT DES DONNÉES DU JOUEUR
// =======================================

async function loadPlayerData() {

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    const userId = auth.user.id;

    // RESSOURCES
    const { data: res } = await supabase
        .from("player_resources")
        .select("*")
        .eq("user_id", userId)
        .single();

    if (res) {
        GameData.resources = res;
    }

    // BÂTIMENTS
    const { data: bld } = await supabase
        .from("player_buildings")
        .select("*")
        .eq("user_id", userId);

    if (bld) {
        bld.forEach(row => {
            GameData.buildings[row.building_id].level = row.level;
        });
    }

    console.log("Données joueur chargées.");
}


// =======================================
// PRODUCTION AUTOMATIQUE
// =======================================

async function applyProduction() {

    const { data: auth } = await supabase.auth.getUser();
    if (!auth.user) return;

    const userId = auth.user.id;

    const { data: buildingsData } = await supabase
        .from("player_buildings")
        .select("*")
        .eq("user_id", userId);

    const now = Date.now();

    for (const b of buildingsData) {

        const def = buildings.find(x => x.id === b.building_id);
        if (!def || !def.production) continue;

        const elapsed = now - b.last_production;
        const hours = elapsed / 3600000;

        const hourly = getBuildingProduction(def, b.level);
        const gained = Math.floor(hourly * hours);

        // Ajouter la ressource correspondante
        if (def.id === "extracteur_ferraille") GameData.resources.scrap += gained;
        if (def.id === "reacteur_instable") GameData.resources.energy += gained;
        if (def.id === "extracteur_nanocomposants") GameData.resources.nano += gained;
        if (def.id === "archives_fracturees") GameData.resources.signal += gained;

        // Mettre à jour last_production
        await supabase
            .from("player_buildings")
            .update({ last_production: now })
            .eq("user_id", userId)
            .eq("building_id", b.building_id);
    }

    // Sauvegarder les ressources
    await supabase
        .from("player_resources")
        .update(GameData.resources)
        .eq("user_id", userId);

    console.log("Production appliquée.");
}
