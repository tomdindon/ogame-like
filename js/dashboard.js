// =======================================
// MUSIQUE DU JEU (ne s'arrête jamais)
// =======================================

const music = document.getElementById("gameMusic");

document.addEventListener("click", () => {
    if (music.paused) {
        music.volume = 0.6;
        music.play();
    }
});

// =======================================
// NAVIGATION ENTRE LES PAGES
// =======================================

const buttons = document.querySelectorAll(".hud-btn");
const pages = document.querySelectorAll(".page");

<<<<<<< HEAD
async function navigate(pageId) {
=======
function navigate(pageId) {
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3

    // Masquer toutes les pages
    pages.forEach(p => p.style.display = "none");

    // Afficher la page demandée
    const page = document.getElementById(pageId);
    if (page) {
        page.style.display = "block";
    }

    // Mettre à jour l'état actif du bouton
    buttons.forEach(b => b.classList.remove("active"));
    const btn = document.querySelector(`[data-page="${pageId}"]`);
    if (btn) btn.classList.add("active");

    // =======================================
    // INITIALISATION SPÉCIFIQUE À CHAQUE PAGE
    // =======================================

    if (pageId === "profil" && typeof initProfil === "function") {
        initProfil();
    }

    if (pageId === "batiments" && typeof initBatiments === "function") {
        initBatiments();
    }

<<<<<<< HEAD
    if (pageId === "ressources" && typeof initRessources === "function") {
        initRessources();
=======
    // 🔥 Correction essentielle : mise à jour de la page Ressources
    if (pageId === "ressources") {
        initRessources();
    
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
    }

    if (pageId === "unites" && typeof initUnites === "function") {
        initUnites();
    }
<<<<<<< HEAD

    if (pageId === "players" && typeof loadPlayersList === "function") {
        loadPlayersList();
    }
=======
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
}

// =======================================
// ÉCOUTEURS SUR LES BOUTONS DU HUD
// =======================================

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        navigate(btn.dataset.page);
    });
});

// =======================================
<<<<<<< HEAD
// INITIALISATION SUPABASE AU CHARGEMENT
// =======================================

async function initDashboard() {

    // 1. Vérifier si un utilisateur est connecté
    const { data: auth } = await supabase.auth.getUser();

    if (!auth.user) {
        console.warn("Aucun utilisateur connecté.");
        return;
    }

    // 2. Initialiser le joueur si nécessaire (création des tables)
    if (typeof initPlayerIfNeeded === "function") {
        await initPlayerIfNeeded();
    }

    // 3. Appliquer la production automatique
    if (typeof applyProduction === "function") {
        await applyProduction();
    }

    // 4. Charger la page par défaut
    navigate("default");

    console.log("Dashboard initialisé avec Supabase.");
}

// =======================================
// LANCEMENT DU DASHBOARD
// =======================================

initDashboard();
=======
// PAGE PAR DÉFAUT AU CHARGEMENT
// =======================================

navigate("default");
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3

// =======================================
// HUD : MENU DÉROULANT DES RESSOURCES
// =======================================

const resMain = document.getElementById("res-main");
const resDropdown = document.getElementById("res-dropdown");

if (resMain && resDropdown) {

    // Ouvrir / fermer le menu
    resMain.addEventListener("click", () => {
        const isOpen = resDropdown.style.display === "flex";
        resDropdown.style.display = isOpen ? "none" : "flex";
    });

    // Fermer si on clique ailleurs
    document.addEventListener("click", (e) => {
        if (!resMain.contains(e.target) && !resDropdown.contains(e.target)) {
            resDropdown.style.display = "none";
        }
    });
}
<<<<<<< HEAD

window.dashboardReady = true;
=======
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
