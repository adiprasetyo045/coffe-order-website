/**
 * MENU.JS - FINAL VERSION
 * JavaScript untuk halaman menu
 * - Load products
 * - Filter by type & category
 * - Sort products
 * - Search products
 */

// =====================================
// GLOBAL VARIABLES
// =====================================

let currentFilters = {
    type: 'all',
    category: 'all',
    sort: 'default',
    search: ''
};

// =====================================
// INITIALIZE MENU PAGE
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the menu page
    if (!document.getElementById('productsGrid')) return;
    
    console.log('📋 Initializing Menu Page...');
    
    // Load all products
    loadProducts();
    
    // Setup event listeners
    setupFilterListeners();
    setupSearchListener();
    setupSortListener();
    setupResetButton();
    
    console.log('✅ Menu page initialized!');
});

// =====================================
// LOAD AND DISPLAY PRODUCTS
// =====================================

/**
 * Load and display products based on current filters
 */
function loadProducts() {
    let products = getAllProducts();
    
    // Apply filters
    products = applyFilters(products);
    
    // Apply search
    if (currentFilters.search) {
        products = products.filter(product => 
            product.name.toLowerCase().includes(currentFilters.search.toLowerCase()) ||
            product.description.toLowerCase().includes(currentFilters.search.toLowerCase())
        );
    }
    
    // Apply sorting
    products = sortProducts(products, currentFilters.sort);
    
    // Display products
    displayProducts(products);
    
    // Update results count
    updateResultsCount(products.length);
}

/**
 * Apply type and category filters
 */
function applyFilters(products) {
    let filtered = products;
    
    // Filter by type (hot/ice)
    if (currentFilters.type !== 'all') {
        filtered = filtered.filter(product => product.type === currentFilters.type);
    }
    
    // Filter by category
    if (currentFilters.category !== 'all') {
        filtered = filtered.filter(product => product.category === currentFilters.category);
    }
    
    return filtered;
}

/**
 * Display products in grid
 */
function displayProducts(products) {
    const container = document.getElementById('productsGrid');
    const noResults = document.getElementById('noResults');
    
    if (!container) {
        console.error('Products grid container not found');
        return;
    }
    
    // Show/hide no results message
    if (products.length === 0) {
        container.style.display = 'none';
        if (noResults) noResults.style.display = 'block';
        return;
    } else {
        container.style.display = 'grid';
        if (noResults) noResults.style.display = 'none';
    }
    
    // Create product cards
    container.innerHTML = products.map(product => createEnhancedProductCard(product)).join('');
    
    // Add event listeners to "Add to Cart" buttons
    container.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
        });
    });
    
    // Add animation to cards
    animateCards();
}

/**
 * Create enhanced product card with type badge
 */
function createEnhancedProductCard(product) {
    const typeIcon = product.type === 'hot' ? '🔥' : '❄️';
    const typeBadge = product.type === 'hot' ? 'Hot' : 'Ice';
    const isImageFile = product.image && (product.image.includes('/') || product.image.includes('.'));
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
            <div class="product-image" style="position: relative;">
                ${isImageFile 
                    ? `<img src="${product.image}" alt="${product.imageAlt || product.name}" loading="lazy" onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:100px\\'>☕</span>';">` 
                    : `<span style="font-size: 100px;">${product.image}</span>`
                }
                <span style="position: absolute; top: 10px; left: 10px; background: rgba(255,255,255,0.9); padding: 5px 10px; border-radius: 20px; font-size: 14px; font-weight: 600;" title="${typeBadge}">
                    ${typeIcon} ${typeBadge}
                </span>
            </div>
            <div class="product-info">
                <p class="product-category">${getCategoryName(product.category)}</p>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">${formatPrice(product.price)}</span>
                    <button class="btn-add-cart" data-id="${product.id}">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Animate product cards on load
 */
function animateCards() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.3s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 50);
    });
}

/**
 * Update results count display
 */
function updateResultsCount(count) {
    const resultsCount = document.getElementById('resultsCount');
    
    if (resultsCount) {
        resultsCount.innerHTML = `Menampilkan <strong>${count}</strong> produk`;
    }
}

// =====================================
// FILTER FUNCTIONALITY
// =====================================

/**
 * Setup filter event listeners
 */
function setupFilterListeners() {
    // Type filter (Hot/Ice)
    const typeFilters = document.querySelectorAll('input[name="type"]');
    typeFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            currentFilters.type = this.value;
            loadProducts();
            console.log('Filter type:', this.value);
        });
    });
    
    // Category filter
    const categoryFilters = document.querySelectorAll('input[name="category"]');
    categoryFilters.forEach(filter => {
        filter.addEventListener('change', function() {
            currentFilters.category = this.value;
            loadProducts();
            console.log('Filter category:', this.value);
        });
    });
}

// =====================================
// SEARCH FUNCTIONALITY
// =====================================

/**
 * Setup search functionality with debounce
 */
function setupSearchListener() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    if (!searchInput) return;
    
    // Debounced search on input (wait 500ms after user stops typing)
    const debouncedSearch = debounce(function(value) {
        currentFilters.search = value;
        loadProducts();
        console.log('Search:', value);
    }, 500);
    
    searchInput.addEventListener('input', function() {
        debouncedSearch(this.value);
    });
    
    // Search on button click
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            currentFilters.search = searchInput.value;
            loadProducts();
        });
    }
    
    // Search on Enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            currentFilters.search = this.value;
            loadProducts();
        }
    });
}

// =====================================
// SORT FUNCTIONALITY
// =====================================

/**
 * Setup sort functionality
 */
function setupSortListener() {
    const sortSelect = document.getElementById('sortSelect');
    
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        currentFilters.sort = this.value;
        loadProducts();
        console.log('Sort by:', this.value);
    });
}

// =====================================
// RESET FILTERS
// =====================================

/**
 * Setup reset button
 */
function setupResetButton() {
    const resetBtn = document.getElementById('resetBtn');
    
    if (!resetBtn) return;
    
    resetBtn.addEventListener('click', function() {
        resetFilters();
    });
}

/**
 * Reset all filters to default
 */
function resetFilters() {
    // Reset filter values
    currentFilters = {
        type: 'all',
        category: 'all',
        sort: 'default',
        search: ''
    };
    
    // Reset radio buttons
    const typeAllRadio = document.querySelector('input[name="type"][value="all"]');
    const categoryAllRadio = document.querySelector('input[name="category"][value="all"]');
    
    if (typeAllRadio) typeAllRadio.checked = true;
    if (categoryAllRadio) categoryAllRadio.checked = true;
    
    // Reset sort select
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) sortSelect.value = 'default';
    
    // Reset search input
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
    
    // Reload products
    loadProducts();
    
    // Show toast
    showToast('Filter direset', 'success');
    
    console.log('Filters reset');
}

// =====================================
// UTILITY FUNCTIONS
// =====================================

/**
 * Get active filter count (for display purposes)
 */
function getActiveFilterCount() {
    let count = 0;
    
    if (currentFilters.type !== 'all') count++;
    if (currentFilters.category !== 'all') count++;
    if (currentFilters.search !== '') count++;
    if (currentFilters.sort !== 'default') count++;
    
    return count;
}

/**
 * Get filter summary text
 */
function getFilterSummary() {
    const parts = [];
    
    if (currentFilters.type !== 'all') {
        parts.push(`Type: ${currentFilters.type}`);
    }
    
    if (currentFilters.category !== 'all') {
        parts.push(`Category: ${getCategoryName(currentFilters.category)}`);
    }
    
    if (currentFilters.search) {
        parts.push(`Search: "${currentFilters.search}"`);
    }
    
    if (currentFilters.sort !== 'default') {
        parts.push(`Sort: ${currentFilters.sort}`);
    }
    
    return parts.length > 0 ? parts.join(' | ') : 'No filters applied';
}

/**
 * Export current filters (for debugging)
 */
function exportCurrentFilters() {
    return {
        ...currentFilters,
        activeCount: getActiveFilterCount(),
        summary: getFilterSummary()
    };
}

// =====================================
// EXPORT FOR DEBUGGING
// =====================================

window.menuDebug = {
    currentFilters,
    loadProducts,
    resetFilters,
    getFilterSummary,
    getActiveFilterCount,
    exportCurrentFilters
};

console.log('✅ Menu.js loaded successfully!');