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

function navigate(pageId) {

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

    // 🔥 Correction essentielle : mise à jour de la page Ressources
    if (pageId === "ressources") {
        initRessources();
    
    }

    if (pageId === "unites" && typeof initUnites === "function") {
        initUnites();
    }
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
// PAGE PAR DÉFAUT AU CHARGEMENT
// =======================================

navigate("default");

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
