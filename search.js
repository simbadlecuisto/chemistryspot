// Jeu de données de produits
const products = [
    {
        id: 1,
        name: "Acide Chlorhydrique",
        category: "reactifs",
        price: 25.50,
        inStock: true,
        description: "Solution acide standard pour laboratoire"
    },
    {
        id: 2,
        name: "Éprouvette en Verre",
        category: "verrerie",
        price: 15.75,
        inStock: true,
        description: "Éprouvette en verre borosilicaté de haute qualité"
    },
    {
        id: 3,
        name: "Agitateur Magnétique",
        category: "equipements",
        price: 205.00,
        inStock: false,
        description: "Agitateur magnétique de précision pour laboratoire"
    }
    // Plus de produits peuvent être ajoutés ici
];

function searchProducts() {
    const searchTerm = document.getElementById('search-bar').value.toLowerCase();
    const categoryFilter = Array.from(document.getElementById('category-filter').selectedOptions)
        .map(option => option.value);
    const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
    const availabilityFilter = document.getElementById('availability-filter').value;
    const sortOption = document.getElementById('sort-select').value;

    let filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) || 
                               product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter.length === 0 || 
            categoryFilter.includes(product.category);
        const matchesPrice = product.price >= minPrice && product.price <= maxPrice;
        const matchesAvailability = 
            availabilityFilter === 'all' ||
            (availabilityFilter === 'in-stock' && product.inStock) ||
            (availabilityFilter === 'out-of-stock' && !product.inStock);

        return matchesSearch && matchesCategory && matchesPrice && matchesAvailability;
    });

    // Tri des résultats
    switch(sortOption) {
        case 'name':
            filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'price-asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
    }

    displayResults(filteredProducts);
}

function displayResults(results) {
    const resultsContainer = document.getElementById('results-container');
    const resultsCountElement = document.getElementById('results-count');
    resultsContainer.innerHTML = '';

    resultsCountElement.textContent = `${results.length} résultats`;

    results.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>Catégorie: ${product.category}</p>
            <p>Prix: ${product.price} €</p>
            <p>Disponibilité: ${product.inStock ? 'En stock' : 'Rupture de stock'}</p>
            <button>Ajouter au panier</button>
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
document.getElementById('sort-select').addEventListener('change', searchProducts);
document.getElementById('search-button').addEventListener('click', searchProducts);

// Affichage initial de tous les produits
displayResults(products);