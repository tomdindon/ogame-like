function pseudoToEmail(pseudo) {
    return pseudo.toLowerCase() + "@cosmic-empires.local";
}

async function registerUser(pseudo, password) {
    const email = pseudoToEmail(pseudo);

    const { error } = await supabase.auth.signUp({
        email,
        password
    });

    if (error) {
        alert("Erreur inscription : " + error.message);
        return;
    }

    alert("Compte créé !");
}

async function loginUser(pseudo, password) {
    const email = pseudoToEmail(pseudo);

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) {
        alert("Erreur connexion : " + error.message);
        return;
    }

    window.location.href = "dashboard.html";
}

// =======================================
// BOUTONS DU FORMULAIRE INDEX.HTML
// =======================================

document.getElementById("login-btn")?.addEventListener("click", () => {
    const pseudo = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!pseudo || !password) {
        alert("Veuillez entrer un pseudo et un mot de passe.");
        return;
    }

    loginUser(pseudo, password);
});

document.getElementById("register-btn")?.addEventListener("click", () => {
    const pseudo = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (!pseudo || !password) {
        alert("Veuillez entrer un pseudo et un mot de passe.");
        return;
    }

    registerUser(pseudo, password);
});
