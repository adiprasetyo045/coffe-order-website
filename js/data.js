/**
 * DATA PRODUK KOPI - FINAL VERSION
 * File ini berisi semua data produk kopi
 */

const coffeeProducts = [
    // ESPRESSO CATEGORY
    {
        id: 1,
        name: "Classic Espresso",
        category: "espresso",
        type: "hot",
        price: 25000,
        description: "Espresso murni dengan cita rasa kuat dan aroma yang khas",
        image: "images/products/Espresso.jpg", 
        imageAlt: "Classic Espresso",
        featured: true
    },
    {
        id: 2,
        name: "Americano",
        category: "espresso",
        type: "hot",
        price: 28000,
        description: "Espresso yang diencerkan dengan air panas, nikmat dan tidak terlalu pekat",
        image: "images/products/Americano.jpg",
        imageAlt: "Hot Americano",
        featured: false
    },
    {
        id: 3,
        name: "Iced Americano",
        category: "espresso",
        type: "ice",
        price: 30000,
        description: "Americano dingin yang menyegarkan dengan es batu",
        image: "images/products/Iced-Americano.jpg",
        imageAlt: "Iced Americano",
        featured: true
    },
    {
        id: 4,
        name: "Double Espresso",
        category: "espresso",
        type: "hot",
        price: 35000,
        description: "Dua shot espresso untuk rasa yang lebih kuat dan energi maksimal",
        image: "images/products/Double-Espresso.jpg",
        imageAlt: "Double Espresso",
        featured: false
    },

    // LATTE CATEGORY
    {
        id: 5,
        name: "Cafe Latte",
        category: "latte",
        type: "hot",
        price: 35000,
        description: "Kombinasi sempurna espresso dengan susu steamed yang creamy",
        image: "images/products/Cafe-Latte.jpg",
        imageAlt: "Cafe Latte",
        featured: true
    },
    {
        id: 6,
        name: "Iced Latte",
        category: "latte",
        type: "ice",
        price: 38000,
        description: "Latte dingin dengan es untuk kesegaran maksimal",
        image: "images/products/Iced-Latte.jpg",
        imageAlt: "Iced Latte",
        featured: true
    },
    {
        id: 7,
        name: "Vanilla Latte",
        category: "latte",
        type: "hot",
        price: 40000,
        description: "Latte dengan sentuhan vanilla yang manis dan harum",
        image: "images/products/Vanilla-Latte.jpg",
        imageAlt: "Vanilla Latte",
        featured: false
    },
    {
        id: 8,
        name: "Caramel Latte",
        category: "latte",
        type: "hot",
        price: 42000,
        description: "Latte dengan topping caramel sauce yang lezat",
        image: "images/products/Caramel-latte.jpg",
        imageAlt: "Caramel Latte",
        featured: false
    },
    {
        id: 9,
        name: "Iced Vanilla Latte",
        category: "latte",
        type: "ice",
        price: 42000,
        description: "Kombinasi vanilla latte dengan es yang menyegarkan",
        image: "images/products/Iced-Vanilla-Latte.jpg",
        imageAlt: "Iced Vanilla Latte",
        featured: false
    },
    {
        id: 10,
        name: "Matcha Latte",
        category: "latte",
        type: "hot",
        price: 45000,
        description: "Perpaduan unik matcha premium dengan susu yang creamy",
        image: "images/products/Matcha-Latte.jpg",
        imageAlt: "Matcha Latte",
        featured: true
    },

    // MANUAL BREW CATEGORY
    {
        id: 11,
        name: "V60 Pour Over",
        category: "manual-brew",
        type: "hot",
        price: 38000,
        description: "Kopi manual brew dengan metode V60, rasa yang clean dan bright",
        image: "images/products/V60-Pour-over.jpg",
        imageAlt: "V60 Pour Over",
        featured: false
    },
    {
        id: 12,
        name: "French Press",
        category: "manual-brew",
        type: "hot",
        price: 40000,
        description: "Kopi dengan body yang full dan rasa yang kaya",
        image: "images/products/French-Press.jpg",
        imageAlt: "French Press",
        featured: false
    },
    {
        id: 13,
        name: "Aeropress",
        category: "manual-brew",
        type: "hot",
        price: 35000,
        description: "Metode brewing cepat dengan rasa yang smooth dan balanced",
        image: "images/products/Aeropress.jpg",
        imageAlt: "Aeropress Coffee",
        featured: false
    },
    {
        id: 14,
        name: "Cold Brew",
        category: "manual-brew",
        type: "ice",
        price: 42000,
        description: "Kopi yang diseduh dingin selama 12-24 jam, rasa yang smooth dan less acidic",
        image: "images/products/Cold-Brew.jpg",
        imageAlt: "Cold Brew Coffee",
        featured: true
    },
    {
        id: 15,
        name: "Japanese Iced Coffee",
        category: "manual-brew",
        type: "ice",
        price: 40000,
        description: "Kopi yang diseduh langsung ke atas es, mempertahankan aroma dan rasa",
        image: "images/products/Japanese-Iced-Coffe.jpg",
        imageAlt: "Japanese Iced Coffee",
        featured: false
    },

    // SIGNATURE CATEGORY
    {
        id: 16,
        name: "Cappuccino",
        category: "signature",
        type: "hot",
        price: 38000,
        description: "Espresso dengan milk foam yang tebal dan creamy",
        image: "images/products/Cappuccino.jpg",
        imageAlt: "Cappuccino",
        featured: true
    },
    {
        id: 17,
        name: "Mocha",
        category: "signature",
        type: "hot",
        price: 45000,
        description: "Kombinasi sempurna espresso, cokelat, dan susu",
        image: "images/products/Mocha.jpg",
        imageAlt: "Mocha Coffee",
        featured: false
    },
    {
        id: 18,
        name: "Iced Mocha",
        category: "signature",
        type: "ice",
        price: 48000,
        description: "Mocha dingin dengan es dan whipped cream",
        image: "images/products/Iced-Mocha.jpg",
        imageAlt: "Iced Mocha",
        featured: false
    },
    {
        id: 19,
        name: "Affogato",
        category: "signature",
        type: "hot",
        price: 42000,
        description: "Espresso panas yang dituangkan ke atas vanilla ice cream",
        image: "images/products/Affogato.jpg",
        imageAlt: "Affogato",
        featured: true
    },
    {
        id: 20,
        name: "Kopi Susu Gula Aren",
        category: "signature",
        type: "ice",
        price: 35000,
        description: "Kopi susu khas Indonesia dengan gula aren yang manis",
        image: "images/products/Kopi-Susu-Gula-Aren.jpg",
        imageAlt: "Kopi Susu Gula Aren",
        featured: true
    },
    {
        id: 21,
        name: "Vietnamese Coffee",
        category: "signature",
        type: "hot",
        price: 38000,
        description: "Kopi Vietnam dengan condensed milk yang manis dan kental",
        image: "images/products/Vietnamese-Coffe.jpg",
        imageAlt: "Vietnamese Coffee",
        featured: false
    },
    {
        id: 22,
        name: "Irish Coffee",
        category: "signature",
        type: "hot",
        price: 48000,
        description: "Kopi dengan whiskey, gula, dan cream (non-alcoholic version)",
        image: "images/products/Irish-Coffe.jpg",
        imageAlt: "Irish Coffee",
        featured: false
    },
    {
        id: 23,
        name: "Dalgona Coffee",
        category: "signature",
        type: "ice",
        price: 38000,
        description: "Kopi Korea dengan foam kopi yang creamy di atas susu dingin",
        image: "images/products/Dalgona-Coffe.jpg",
        imageAlt: "Dalgona Coffee",
        featured: false
    },
    {
        id: 24,
        name: "Spanish Latte",
        category: "signature",
        type: "ice",
        price: 42000,
        description: "Latte dengan condensed milk dan susu full cream yang creamy",
        image: "images/products/Spanish-Latte.jpg",
        imageAlt: "Spanish Latte",
        featured: false
    }
];

/**
 * FUNGSI HELPER UNTUK MENGAKSES DATA
 */

// Mendapatkan semua produk
function getAllProducts() {
    return coffeeProducts;
}

// Mendapatkan produk berdasarkan ID
function getProductById(id) {
    return coffeeProducts.find(product => product.id === id);
}

// Mendapatkan produk featured (untuk homepage)
function getFeaturedProducts() {
    return coffeeProducts.filter(product => product.featured === true);
}

// Mendapatkan produk berdasarkan kategori
function getProductsByCategory(category) {
    if (category === 'all') return coffeeProducts;
    return coffeeProducts.filter(product => product.category === category);
}

// Mendapatkan produk berdasarkan tipe (hot/ice)
function getProductsByType(type) {
    if (type === 'all') return coffeeProducts;
    return coffeeProducts.filter(product => product.type === type);
}

// Filter produk berdasarkan tipe dan kategori
function filterProducts(type, category) {
    let filtered = coffeeProducts;
    
    if (type !== 'all') {
        filtered = filtered.filter(product => product.type === type);
    }
    
    if (category !== 'all') {
        filtered = filtered.filter(product => product.category === category);
    }
    
    return filtered;
}

// Search produk berdasarkan nama
function searchProducts(query) {
    const lowercaseQuery = query.toLowerCase();
    return coffeeProducts.filter(product => 
        product.name.toLowerCase().includes(lowercaseQuery)
    );
}

// Sort produk
function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch(sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name-asc':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'name-desc':
            return sorted.sort((a, b) => b.name.localeCompare(a.name));
        default:
            return sorted;
    }
}

// Format harga ke format Rupiah
function formatPrice(price) {
    return 'Rp ' + price.toLocaleString('id-ID');
}

// Mendapatkan nama kategori yang lebih readable
function getCategoryName(category) {
    const categories = {
        'espresso': 'Espresso',
        'latte': 'Latte',
        'manual-brew': 'Manual Brew',
        'signature': 'Signature'
    };
    return categories[category] || category;
}

// Log untuk debugging
console.log('✅ Data loaded: ' + coffeeProducts.length + ' products');