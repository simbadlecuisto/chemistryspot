// Jeu de données de produits
const products = [
    {
        id: 1,
        name: "Acide Chlorhydrique",
        category: "reactifs",
        price: 25.50,
        inStock: true
    },
    {
        id: 2,
        name: "Éprouvette en Verre",
        category: "verrerie",
        price: 15.75,
        inStock: true
    },
    {
        id: 3,
        name: "Agitateur Magnétique",
        category: "equipements",
        price: 205.00,
        inStock: false
    }
    // Ajouter plus de produits ici
];

// Fonction de recherche et filtrage
function searchProducts() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const categoryFilter = Array.from(document.getElementById('category-filter').selectedOptions)
        .map(option => option.value);
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const availabilityFilter = document.getElementById('availability-filter').value;

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter.length === 0 || 
            categoryFilter.includes(product.category);
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        const matchesAvailability = 
            availabilityFilter === 'all' ||
            (availabilityFilter === 'in-stock' && product.inStock) ||
            (availabilityFilter === 'out-of-stock' && !product.inStock);

        return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });

    displayResults(filteredProducts);
}

// Fonction pour afficher les résultats
function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    results.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>Catégorie: ${product.category}</p>
            <p>Prix: ${product.price} €</p>
            <p>Disponibilité: ${product.inStock ? 'En stock' : 'Rupture de stock'}</p>
        `;
        resultsContainer.appendChild(productCard);
    });
}

// Ajout des écouteurs d'événements
document.getElementById('search-bar').addEventListener('input', searchProducts);
document.getElementById('category-filter').addEventListener('change', searchProducts);
document.getElementById('min-price').addEventListener('input', searchProducts);
document.getElementById('max-price').addEventListener('input', searchProducts);
document.getElementById('availability-filter').addEventListener('change', searchProducts);

// Affichage initial de tous les produits
displayResults(products);
