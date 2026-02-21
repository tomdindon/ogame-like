// =======================================
// SHIP MANAGER (version globale)
// =======================================

async function getAllShipModels() {
  const { data, error } = await supabase
    .from('ships')
    .select('*');

  if (error) throw error;
  return data;
}

async function getPlayerShips(playerId) {
  const { data, error } = await supabase
    .from('player_ships')
    .select('*, ships(*)')
    .eq('player_id', playerId);

  if (error) throw error;
  return data;
}

async function updateShipHP(shipId, newHP) {
  const { data, error } = await supabase
    .from('player_ships')
    .update({ current_hp: newHP })
    .eq('id', shipId)
    .select()
    .single();

  if (error) throw error;
  return data;
}

async function addXP(shipId, amount) {
  const { data, error } = await supabase
    .from('player_ships')
    .update({ xp: supabase.rpc('increment', { amount }) })
    .eq('id', shipId);

  if (error) throw error;
  return data;
}

async function giveShipToPlayer(playerId, shipModelId) {
  const { data, error } = await supabase
    .from('player_ships')
    .insert({
      player_id: playerId,
      ship_id: shipModelId,
      current_hp: 100
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

// Rendre les fonctions globales
window.getAllShipModels = getAllShipModels;
window.getPlayerShips = getPlayerShips;
window.updateShipHP = updateShipHP;
window.addXP = addXP;
window.giveShipToPlayer = giveShipToPlayer;
