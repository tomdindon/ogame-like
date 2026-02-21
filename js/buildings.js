// =======================================
// Liste des bâtiments du jeu
// =======================================

const buildings = [

    {
        id: "extracteur_ferraille",
        name: "Extracteur de ferraille",
        description: "Récupère automatiquement de la ferraille dans les débris environnants.",
        imageBase: "assets/buildings/extracteur_ferraille",
        maxLevel: 10,
<<<<<<< HEAD

        // Coûts définis manuellement (progression maîtrisée)
        costPerLevel: {
            2: 150,
            3: 1000,
            4: 5000,
            5: 25000,
            6: 100000,
            7: 250000,
            8: 500000,
            9: 1000000,
            10: 2000000
        },

        // Production linéaire : 200 → 7000 /h
        production: { level1: 200, level10: 7000 }
=======
        cost: { scrap: 50, energy: 20 },
        production: { base: 2 }
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
    },

    {
        id: "reacteur_instable",
        name: "Réacteur instable",
        description: "Génère de l'énergie… mais pas toujours de manière stable.",
        imageBase: "assets/buildings/reacteur_instable",
        maxLevel: 10,
<<<<<<< HEAD

        costPerLevel: {
            2: 150,
            3: 1000,
            4: 5000,
            5: 25000,
            6: 100000,
            7: 250000,
            8: 500000,
            9: 1000000,
            10: 2000000
        },

        production: { level1: 200, level10: 7000 }
=======
        cost: { scrap: 80, energy: 0 },
        production: { base: 3 }
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
    },

    {
        id: "extracteur_nanocomposants",
        name: "Extracteur de nanocomposants",
        description: "Produit des nanocomposants essentiels aux technologies avancées.",
        imageBase: "assets/buildings/extracteur_nanocomposants",
        maxLevel: 10,
<<<<<<< HEAD

        costPerLevel: {
            2: 150,
            3: 1000,
            4: 5000,
            5: 25000,
            6: 100000,
            7: 250000,
            8: 500000,
            9: 1000000,
            10: 2000000
        },

        production: { level1: 200, level10: 7000 }
=======
        cost: { scrap: 120, energy: 40 },
        production: { base: 1 }
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
    },

    {
        id: "archives_fracturees",
        name: "Archives fracturées",
        description: "Contient des données anciennes… parfois corrompues.",
        imageBase: "assets/buildings/archives_fracturees",
        maxLevel: 10,
<<<<<<< HEAD

        costPerLevel: {
            2: 150,
            3: 1000,
            4: 5000,
            5: 25000,
            6: 100000,
            7: 250000,
            8: 500000,
            9: 1000000,
            10: 2000000
        },

        production: { level1: 200, level10: 7000 }
=======
        cost: { scrap: 60, energy: 30 },
        production: { base: 1 }
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
    },

    {
        id: "atelier_reparation",
        name: "Atelier de réparation",
        description: "Répare et entretient vos unités.",
        imageBase: "assets/buildings/atelier_reparation",
        maxLevel: 10,
<<<<<<< HEAD

        costPerLevel: {
            2: 150,
            3: 1000,
            4: 5000,
            5: 25000,
            6: 100000,
            7: 250000,
            8: 500000,
            9: 1000000,
            10: 2000000
        },

        production: null // pas de production
=======
        cost: { scrap: 100, energy: 50 },
        production: null
>>>>>>> 99f3915a40eed9b8359562dce8dfaca8557bc5c3
    }

];
