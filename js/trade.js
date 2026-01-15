// ===============================
// TRADE.JS
// ===============================

import { GameData, spendResource, addResource, saveGame } from "./gameData.js";

const resources = [
    { id: "scrap", name: "Ferraille", emoji: "🔩" },
    { id: "energy", name: "Énergie", emoji: "⚡" },
    { id: "nano", name: "Nano", emoji: "🧬" },
    { id: "data", name: "Données", emoji: "📡" }
];

let selectedResource = null;
let quantity = 0;

export function initTrade() {
    const container = document.querySelector(".trade-resources");
    const confirmBtn = document.getElementById("tradeConfirm");
    const shieldTime = document.getElementById("shieldTime");

    if (!container) return;

    container.innerHTML = "";

    resources.forEach(res => {
        const div = document.createElement("div");
        div.className = "resource-trade";
        div.dataset.id = res.id;

        const owned = GameData.resources[res.id] || 0;

        div.innerHTML = `
            <div class="resource-emoji">${res.emoji}</div>
            <div class="resource-name">${res.name}</div>
            <div class="resource-amount">${Math.floor(owned)}</div>
            <div class="trade-input">
                <button class="btn-minus">-</button>
                <input type="number" value="0" min="0" max="${owned}">
                <button class="btn-plus">+</button>
            </div>
        `;

        container.appendChild(div);

        const input = div.querySelector("input");
        const btnMinus = div.querySelector(".btn-minus");
        const btnPlus = div.querySelector(".btn-plus");

        div.addEventListener("click", (e) => {
            if (e.target.tagName !== "BUTTON" && e.target.tagName !== "INPUT") {
                selectResource(div, res.id);
            }
        });

        btnMinus.addEventListener("click", (e) => {
            e.stopPropagation();
            const val = parseInt(input.value) || 0;
            input.value = Math.max(0, val - 100);
            updateShieldTime();
        });

        btnPlus.addEventListener("click", (e) => {
            e.stopPropagation();
            const val = parseInt(input.value) || 0;
            input.value = Math.min(owned, val + 100);
            updateShieldTime();
        });

        input.addEventListener("input", () => {
            updateShieldTime();
        });
    });

    confirmBtn.addEventListener("click", executeTrade);

    function selectResource(div, resId) {
        document.querySelectorAll(".resource-trade").forEach(el => {
            el.classList.remove("selected");
        });
        div.classList.add("selected");
        selectedResource = resId;
    }

    function updateShieldTime() {
        const inputs = container.querySelectorAll("input");
        let total = 0;
        inputs.forEach(input => {
            total += parseInt(input.value) || 0;
        });

        const minutes = Math.floor(total / 100);
        shieldTime.textContent = `Protection : ${minutes} min`;
    }

    function executeTrade() {
        const inputs = container.querySelectorAll("input");
        let totalSpent = 0;

        inputs.forEach(input => {
            const amount = parseInt(input.value) || 0;
            const resId = input.closest(".resource-trade").dataset.id;
            
            if (amount > 0) {
                if (spendResource(resId, amount)) {
                    totalSpent += amount;
                }
            }
        });

        if (totalSpent > 0) {
            alert(`Échange effectué ! Protection activée pour ${Math.floor(totalSpent / 100)} minutes.`);
            initTrade();
        } else {
            alert("Aucune ressource échangée.");
        }
    }
}
