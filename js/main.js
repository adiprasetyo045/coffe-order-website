/**
 * MAIN.JS - FINAL VERSION
 * Berisi fungsi-fungsi utama yang digunakan di semua halaman
 * - Mobile Navigation
 * - Cart Management
 * - Toast Notifications
 * - Utilities
 */

// =====================================
// INITIALIZE ON PAGE LOAD
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Initializing Coffee Shop...');
    
    // Setup mobile navigation
    setupMobileNavigation();
    
    // Update cart count on page load
    updateCartCount();
    
    // Load featured products on homepage
    if (document.getElementById('featuredProducts')) {
        loadFeaturedProducts();
    }
    
    // Update navbar for logged-in users
    if (typeof updateNavbar === 'function') {
        updateNavbar();
    }
    
    console.log('✅ Coffee Shop initialized!');
});

// =====================================
// MOBILE NAVIGATION
// =====================================

/**
 * Setup mobile navigation (hamburger menu)
 */
function setupMobileNavigation() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    if (!hamburger || !navMenu) return;
    
    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close menu when clicking on a link
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        const isClickInsideNav = navMenu.contains(event.target);
        const isClickOnHamburger = hamburger.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// =====================================
// CART MANAGEMENT
// =====================================

/**
 * Get cart from localStorage
 */
function getCart() {
    try {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    } catch (error) {
        console.error('Error getting cart:', error);
        return [];
    }
}

/**
 * Save cart to localStorage
 */
function saveCart(cart) {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
    } catch (error) {
        console.error('Error saving cart:', error);
        showToast('Gagal menyimpan ke keranjang', 'error');
    }
}

/**
 * Add item to cart
 */
function addToCart(productId) {
    const product = getProductById(productId);
    
    if (!product) {
        showToast('Produk tidak ditemukan', 'error');
        return;
    }
    
    let cart = getCart();
    
    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
        showToast(`${product.name} ditambahkan (${existingItem.quantity})`, 'success');
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
        showToast(`${product.name} ditambahkan ke keranjang`, 'success');
    }
    
    saveCart(cart);
}

/**
 * Remove item from cart
 */
function removeFromCart(productId) {
    let cart = getCart();
    const removedItem = cart.find(item => item.id === productId);
    
    cart = cart.filter(item => item.id !== productId);
    saveCart(cart);
    
    if (removedItem) {
        showToast(`${removedItem.name} dihapus dari keranjang`, 'success');
    }
    
    // Reload cart page if on cart page
    if (typeof loadCartItems === 'function') {
        loadCartItems();
    }
}

/**
 * Update item quantity in cart
 */
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }
    
    let cart = getCart();
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        item.quantity = newQuantity;
        saveCart(cart);
        
        // Reload cart page if on cart page
        if (typeof loadCartItems === 'function') {
            loadCartItems();
        }
    }
}

/**
 * Get total items in cart
 */
function getCartTotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.quantity, 0);
}

/**
 * Get cart subtotal (total price)
 */
function getCartSubtotal() {
    const cart = getCart();
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

/**
 * Update cart count badge in navigation
 */
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('#cartCount');
    const total = getCartTotal();
    
    cartCountElements.forEach(element => {
        element.textContent = total;
        
        // Show/hide badge and add animation
        if (total > 0) {
            element.style.display = 'inline-block';
            element.classList.add('pulse');
            setTimeout(() => element.classList.remove('pulse'), 300);
        } else {
            element.style.display = 'none';
        }
    });
}

/**
 * Clear entire cart
 */
function clearCart() {
    if (confirm('Hapus semua item dari keranjang?')) {
        localStorage.removeItem('cart');
        updateCartCount();
        showToast('Keranjang dikosongkan', 'success');
        
        if (typeof loadCartItems === 'function') {
            loadCartItems();
        }
    }
}

// =====================================
// TOAST NOTIFICATIONS
// =====================================

/**
 * Show toast notification
 */
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    
    if (!toast || !toastMessage) {
        console.warn('Toast elements not found');
        return;
    }
    
    // Set message
    toastMessage.textContent = message;
    
    // Set color based on type
    const colors = {
        'success': '#28A745',
        'error': '#DC3545',
        'warning': '#FFC107',
        'info': '#17A2B8'
    };
    
    toast.style.backgroundColor = colors[type] || colors['success'];
    
    // Show toast
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// =====================================
// FEATURED PRODUCTS (HOMEPAGE)
// =====================================

/**
 * Load featured products on homepage
 */
function loadFeaturedProducts() {
    const container = document.getElementById('featuredProducts');
    if (!container) return;
    
    const featured = getFeaturedProducts();
    
    if (featured.length === 0) {
        container.innerHTML = '<p>Belum ada produk featured</p>';
        return;
    }
    
    // Show only first 6 featured products
    const displayProducts = featured.slice(0, 6);
    
    container.innerHTML = displayProducts.map(product => createProductCard(product)).join('');
    
    // Add event listeners to "Add to Cart" buttons
    container.querySelectorAll('.btn-add-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
        });
    });
}

// =====================================
// PRODUCT CARD TEMPLATE
// =====================================

/**
 * Create product card HTML
 */
function createProductCard(product) {
    // Check if image is a file path or emoji
    const isImageFile = product.image && (product.image.includes('/') || product.image.includes('.'));
    
    return `
        <div class="product-card" data-product-id="${product.id}">
            ${product.featured ? '<span class="product-badge">Featured</span>' : ''}
            <div class="product-image">
                ${isImageFile 
                    ? `<img src="${product.image}" alt="${product.imageAlt || product.name}" loading="lazy" onerror="this.onerror=null; this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23ddd%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22sans-serif%22 font-size=%2220%22%3EImage Not Found%3C/text%3E%3C/svg%3E';">` 
                    : `<span style="font-size: 100px;">${product.image}</span>`
                }
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

// =====================================
// UTILITY FUNCTIONS
// =====================================

/**
 * Format price to Indonesian Rupiah
 */
function formatPrice(price) {
    return 'Rp ' + price.toLocaleString('id-ID');
}

/**
 * Smooth scroll to element
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Debounce function for optimizing search/scroll events
 */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Validate email format
 */
function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}

/**
 * Validate Indonesian phone number
 */
function isValidPhone(phone) {
    const re = /^(\+62|62|0)[0-9]{9,12}$/;
    return re.test(phone.replace(/\s/g, ''));
}

/**
 * Safe localStorage wrapper with error handling
 */
function safeLocalStorage(key, value) {
    try {
        if (value !== undefined) {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } else {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        }
    } catch (error) {
        console.error('LocalStorage error:', error);
        showToast('Terjadi kesalahan menyimpan data', 'error');
        return null;
    }
}

/**
 * Truncate text to specified length
 */
function truncateText(text, maxLength) {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// =====================================
// ANIMATIONS
// =====================================

// Add pulse animation CSS
const style = document.createElement('style');
style.textContent = `
    .pulse {
        animation: pulse 0.3s ease-in-out;
    }
    
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.3); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// =====================================
// ERROR HANDLING
// =====================================

/**
 * Global error handler
 */
window.addEventListener('error', function(e) {
    console.error('❌ Error occurred:', e.error);
});

/**
 * Handle unhandled promise rejections
 */
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Unhandled promise rejection:', e.reason);
});

// =====================================
// CONSOLE WELCOME MESSAGE
// =====================================

console.log('%c☕ Coffee Shop Website', 'font-size: 24px; font-weight: bold; color: #8B4513;');
console.log('%c✅ Portfolio Project - Ready to use!', 'font-size: 14px; color: #28A745;');
console.log('%c💻 Developed with ❤️', 'font-size: 12px; color: #999;');

// =====================================
// EXPORT FOR DEBUGGING (Optional)
// =====================================

window.coffeeShop = {
    getCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartSubtotal,
    version: '1.0.0'
};

console.log('✅ Main.js loaded successfully!');