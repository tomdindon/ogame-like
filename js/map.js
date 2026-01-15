/* ============================================
   MAP.JS - Carte interactive avec Fog of War
   ============================================ */

export class GalaxyMap {
    constructor() {
        this.gridSize = 20; // Grille 20x20
        this.cellSize = 0;
        this.exploredCells = new Set();
        this.fogGrid = [];
        this.planets = [];
        this.stars = [];
        
        this.fogLayer = document.getElementById('fog-layer');
        this.systemsLayer = document.getElementById('systems-layer');
        this.mapElement = document.getElementById('map');
        
        this.init();
    }
    
    init() {
        this.calculateCellSize();
        this.generateStars();
        this.generatePlanets();
        this.initFogGrid();
        
        // Explorer zone de départ
        this.exploreSector(10, 10, 3);
        
        window.addEventListener('resize', () => this.onResize());
    }
    
    calculateCellSize() {
        const containerWidth = this.mapElement.offsetWidth;
        const containerHeight = this.mapElement.offsetHeight;
        this.cellSize = Math.max(containerWidth, containerHeight) / this.gridSize;
    }
    
    generateStars() {
        const starCount = 200;
        
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = `star ${this.getRandomStarSize()}`;
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            star.style.animationDelay = `${Math.random() * 3}s`;
            
            this.mapElement.appendChild(star);
            this.stars.push(star);
        }
    }
    
    getRandomStarSize() {
        const rand = Math.random();
        if (rand < 0.6) return 'small';
        if (rand < 0.9) return 'medium';
        return 'large';
    }
    
    generatePlanets() {
        const planetCount = 50;
        const types = ['desert', 'ice', 'volcanic', 'ocean', 'forest', 'gas-giant'];
        
        for (let i = 0; i < planetCount; i++) {
            const gridX = Math.floor(Math.random() * this.gridSize);
            const gridY = Math.floor(Math.random() * this.gridSize);
            
            const planet = document.createElement('div');
            planet.className = `planet type-${types[Math.floor(Math.random() * types.length)]}`;
            
            const x = (gridX * this.cellSize) + (Math.random() * this.cellSize);
            const y = (gridY * this.cellSize) + (Math.random() * this.cellSize);
            
            planet.style.left = `${x}px`;
            planet.style.top = `${y}px`;
            
            const label = document.createElement('div');
            label.className = 'planet-label';
            label.textContent = `Système ${i + 1}`;
            planet.appendChild(label);
            
            planet.addEventListener('click', () => this.onPlanetClick(i, planet));
            
            this.systemsLayer.appendChild(planet);
            
            this.planets.push({
                element: planet,
                gridX,
                gridY,
                id: i,
                discovered: false
            });
        }
    }
    
    initFogGrid() {
        for (let y = 0; y < this.gridSize; y++) {
            for (let x = 0; x < this.gridSize; x++) {
                const cell = document.createElement('div');
                cell.className = 'fog-cell';
                cell.style.left = `${x * this.cellSize}px`;
                cell.style.top = `${y * this.cellSize}px`;
                cell.style.width = `${this.cellSize}px`;
                cell.style.height = `${this.cellSize}px`;
                
                this.fogLayer.appendChild(cell);
                this.fogGrid.push({ x, y, element: cell, revealed: false });
            }
        }
    }
    
    exploreSector(centerX, centerY, radius = 2) {
        this.fogGrid.forEach(cell => {
            const distance = Math.sqrt(
                Math.pow(cell.x - centerX, 2) + 
                Math.pow(cell.y - centerY, 2)
            );
            
            if (distance <= radius && !cell.revealed) {
                cell.revealed = true;
                cell.element.classList.add('revealing');
                
                setTimeout(() => {
                    cell.element.classList.add('revealed');
                }, 100);
                
                this.revealPlanetsInCell(cell.x, cell.y);
            }
        });
    }
    
    revealPlanetsInCell(x, y) {
        this.planets
            .filter(p => p.gridX === x && p.gridY === y && !p.discovered)
            .forEach((planet, index) => {
                setTimeout(() => {
                    planet.element.classList.add('discovered');
                    planet.discovered = true;
                }, index * 200);
            });
    }
    
    onPlanetClick(id, element) {
        console.log(`Planète ${id} cliquée !`);
        
        // Animation de sélection
        element.style.animation = 'none';
        setTimeout(() => {
            element.style.animation = '';
        }, 10);
        
        // Ici vous pouvez ouvrir un modal avec les détails de la planète
    }
    
    completeExplorationMission() {
        // Appelé après une mission d'exploration réussie
        const randomX = Math.floor(Math.random() * this.gridSize);
        const randomY = Math.floor(Math.random() * this.gridSize);
        const randomRadius = Math.floor(Math.random() * 2) + 2;
        
        this.exploreSector(randomX, randomY, randomRadius);
    }
    
    onResize() {
        this.calculateCellSize();
        
        // Redimensionner fog grid
        this.fogGrid.forEach(cell => {
            cell.element.style.left = `${cell.x * this.cellSize}px`;
            cell.element.style.top = `${cell.y * this.cellSize}px`;
            cell.element.style.width = `${this.cellSize}px`;
            cell.element.style.height = `${this.cellSize}px`;
        });
        
        // Repositionner planètes
        this.planets.forEach(planet => {
            const x = (planet.gridX * this.cellSize) + (this.cellSize / 2);
            const y = (planet.gridY * this.cellSize) + (this.cellSize / 2);
            planet.element.style.left = `${x}px`;
            planet.element.style.top = `${y}px`;
        });
    }
}

// Initialiser quand la page map est visible
let galaxyMap = null;

export function initMap() {
    if (!galaxyMap) {
        galaxyMap = new GalaxyMap();
    }
}

export function getGalaxyMap() {
    return galaxyMap;
}
