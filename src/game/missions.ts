export interface MissionDef {
  key: string;
  name: string;
  duration: number;
  reward: Record<string, number>;
  prereq: Record<string, number>;
}

export const MISSIONS: Record<string, MissionDef> = {
  patrouille_courte: { key: "patrouille_courte", name: "Patrouille courte", duration: 60, reward: { scrap: 1500, xp: 10 }, prereq: { drone_recuperateur: 2 } },
  forage_profond: { key: "forage_profond", name: "Forage profond", duration: 1800, reward: { scrap: 35000, xp: 150 }, prereq: { drone_recuperateur: 12, cargo: 3 } },
  collecte_energie: { key: "collecte_energie", name: "Collecte d'énergie", duration: 900, reward: { energy: 4000, xp: 80 }, prereq: { chasseur: 6, fregate: 2 } },
  analyse_signal: { key: "analyse_signal", name: "Analyse de signal", duration: 900, reward: { data: 2500, xp: 80 }, prereq: { drone_recuperateur: 6, sentinelle: 2 } },
  synthese_nano: { key: "synthese_nano", name: "Synthèse de nanocomposants", duration: 1800, reward: { nano: 600, xp: 150 }, prereq: { drone_recuperateur: 10, sentinelle: 4 } },
  expedition_longue: { key: "expedition_longue", name: "Expédition longue durée", duration: 3600, reward: { scrap: 60000, energy: 12000, xp: 300 }, prereq: { fregate: 5, cargo: 4, chasseur: 6 } },
  recuperation_acier: { key: "recuperation_acier", name: "Récupération d'acier renforcé", duration: 1200, reward: { reinforcedSteel: 30, xp: 100 }, prereq: { drone_recuperateur: 8, chasseur: 4 } },
  extraction_module: { key: "extraction_module", name: "Extraction de module cybernétique", duration: 1800, reward: { cyberModule: 40, xp: 150 }, prereq: { sentinelle: 5, fregate: 3 } },
  recolte_nanites: { key: "recolte_nanites", name: "Récolte de nanites synthétiques", duration: 2400, reward: { syntheticNanites: 50, xp: 200 }, prereq: { drone_recuperateur: 15, sentinelle: 6 } },
  fouille_archives_IA: { key: "fouille_archives_IA", name: "Fouille d'archives d'IA", duration: 3600, reward: { aiFragment: 60, xp: 300 }, prereq: { fregate: 6, sentinelle: 8 } },
  mission_elite: {
    key: "mission_elite",
    name: "Mission d'élite",
    duration: 7200,
    reward: { reinforcedSteel: 800, cyberModule: 600, syntheticNanites: 500, aiFragment: 400, xp: 600 },
    prereq: { fregate: 10, sentinelle: 10, chasseur: 10, cargo: 15 },
  },
};

export function hasPrerequisites(mission: MissionDef, units: Record<string, { count: number }>): boolean {
  return Object.entries(mission.prereq).every(([unitId, req]) => (units[unitId]?.count ?? 0) >= req);
}

export function getRewardText(reward: Record<string, number>): string[] {
  const labels: Record<string, string> = {
    scrap: "🔩 Ferraille",
    energy: "⚡ Énergie",
    nano: "🧬 Nano-composants",
    data: "📡 Données anciennes",
    reinforcedSteel: "🛠️ Acier renforcé",
    cyberModule: "🧩 Module cybernétique",
    syntheticNanites: "🤖 Nanites synthétiques",
    aiFragment: "🧠 Fragment d'IA",
    xp: "⭐ XP",
  };
  const out = Object.entries(reward)
    .filter(([, v]) => v)
    .map(([k, v]) => `${labels[k] ?? k} ${v}`);
  return out.length ? out : ["Aucune récompense directe"];
}
