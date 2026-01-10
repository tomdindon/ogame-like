// ===============================
// PAGE DE CONNEXION (SPA)
// ===============================

function initConnexionPage() {
    const page = document.getElementById("page-connexion");
    if (!page) return;

    // ----- Étoiles -----
    const starContainer = page.querySelector(".shooting-stars");
    if (starContainer && starContainer.children.length === 0) {

        function createStaticStars(count = 150) {
            for (let i = 0; i < count; i++) {
                const star = document.createElement("span");
                star.classList.add("star-static");

                star.style.top = Math.random() * 100 + "%";
                star.style.left = Math.random() * 100 + "%";

                const size = 2 + Math.random() * 3;
                star.style.width = size + "px";
                star.style.height = size + "px";

                star.style.animationDuration = (2 + Math.random() * 2) + "s";
                star.style.animationDelay = (Math.random() * 3) + "s";

                star.style.setProperty("--parallax", (Math.random() * 0.4 + 0.1));

                starContainer.appendChild(star);
            }
        }

        createStaticStars(150);
    }

    // ----- Bouton démarrer -----
    const startBtn = page.querySelector("#start-btn");
    if (startBtn) {
        startBtn.addEventListener("click", () => {
            location.hash = "page-dashboard";
        });
    }
}

// Initialisation quand la page SPA devient visible
window.addEventListener("hashchange", () => {
    if (location.hash === "#page-connexion" || location.hash === "") {
        initConnexionPage();
    }
});

// Initialisation au chargement
document.addEventListener("DOMContentLoaded", () => {
    if (location.hash === "#page-connexion" || location.hash === "") {
        initConnexionPage();
    }
});
