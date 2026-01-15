// ===============================
// DASHBOARD.JS
// ===============================

export function initDashboard() {
    console.log("📊 Initialisation du Dashboard");

    const cards = document.querySelectorAll(".dashboard-card");
    
    if (!cards || cards.length === 0) {
        console.warn("⚠️ Aucune carte dashboard trouvée");
        return;
    }

    cards.forEach(card => {
        const targetPage = card.dataset.page;
        
        if (!targetPage) {
            console.warn("⚠️ Carte sans attribut data-page :", card);
            return;
        }

        card.style.cursor = "pointer";

        card.addEventListener("click", () => {
            console.log("🎯 Navigation vers :", targetPage);
            location.hash = targetPage;
        });
    });
}
