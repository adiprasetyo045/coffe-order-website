/**
 * CART.JS - FINAL VERSION
 * JavaScript untuk halaman cart (keranjang belanja)
 * - Display cart items
 * - Update quantities
 * - Remove items
 * - Calculate totals
 * - Checkout functionality
 */

// =====================================
// INITIALIZE CART PAGE
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the cart page
    if (!document.getElementById('cartItems')) return;
    
    console.log('🛒 Initializing Cart Page...');
    
    // Load cart items
    loadCartItems();
    
    // Setup checkout button
    setupCheckoutButton();
    
    // Update cart count
    updateCartCount();
    
    console.log('✅ Cart page initialized!');
});

// =====================================
// LOAD AND DISPLAY CART ITEMS
// =====================================

/**
 * Load and display all cart items
 */
function loadCartItems() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    
    if (!cartItemsContainer) {
        console.error('Cart items container not found');
        return;
    }
    
    // Check if cart is empty
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        if (emptyCart) emptyCart.style.display = 'block';
        updateCartSummary(0, 0, 0, 0);
        return;
    }
    
    // Show cart items
    cartItemsContainer.style.display = 'block';
    if (emptyCart) emptyCart.style.display = 'none';
    
    // Generate cart items HTML
    cartItemsContainer.innerHTML = cart.map(item => createCartItemHTML(item)).join('');
    
    // Setup event listeners for cart actions
    setupCartActions();
    
    // Update cart summary
    updateCartSummary();
}

/**
 * Create HTML for single cart item
 */
function createCartItemHTML(item) {
    const itemTotal = item.price * item.quantity;
    const isImageFile = item.image && (item.image.includes('/') || item.image.includes('.'));
    
    return `
        <div class="cart-item" data-id="${item.id}">
            <div class="cart-item-image">
                ${isImageFile 
                    ? `<img src="${item.image}" alt="${item.name}" style="width:100%; height:100%; object-fit:cover; border-radius:8px;" onerror="this.onerror=null; this.style.display='none'; this.parentElement.innerHTML='<span style=\\'font-size:50px\\'>☕</span>';">` 
                    : `<span style="font-size: 50px;">${item.image || '☕'}</span>`
                }
            </div>
            <div class="cart-item-details">
                <h3 class="cart-item-name">${item.name}</h3>
                <p class="cart-item-price">${formatPrice(item.price)} / item</p>
                
                <div class="cart-item-actions">
                    <div class="quantity-control">
                        <button class="qty-btn qty-decrease" data-id="${item.id}" aria-label="Kurangi jumlah">
                            −
                        </button>
                        <span class="qty-value">${item.quantity}</span>
                        <button class="qty-btn qty-increase" data-id="${item.id}" aria-label="Tambah jumlah">
                            +
                        </button>
                    </div>
                    
                    <button class="btn-remove" data-id="${item.id}" aria-label="Hapus item">
                        🗑️ Hapus
                    </button>
                </div>
                
                <p style="margin-top: 10px; font-weight: 600; color: var(--primary-color);">
                    Subtotal: ${formatPrice(itemTotal)}
                </p>
            </div>
        </div>
    `;
}

// =====================================
// CART ACTIONS EVENT LISTENERS
// =====================================

/**
 * Setup event listeners for cart actions
 */
function setupCartActions() {
    // Increase quantity buttons
    document.querySelectorAll('.qty-increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const cart = getCart();
            const item = cart.find(i => i.id === productId);
            
            if (item) {
                updateQuantity(productId, item.quantity + 1);
            }
        });
    });
    
    // Decrease quantity buttons
    document.querySelectorAll('.qty-decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const cart = getCart();
            const item = cart.find(i => i.id === productId);
            
            if (item) {
                if (item.quantity > 1) {
                    updateQuantity(productId, item.quantity - 1);
                } else {
                    // Confirm removal if quantity is 1
                    if (confirm('Hapus item dari keranjang?')) {
                        removeFromCart(productId);
                    }
                }
            }
        });
    });
    
    // Remove buttons
    document.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            
            if (confirm('Hapus item dari keranjang?')) {
                removeFromCart(productId);
            }
        });
    });
}

// =====================================
// CART SUMMARY CALCULATIONS
// =====================================

/**
 * Update cart summary (subtotal, tax, shipping, total)
 */
function updateCartSummary() {
    const cart = getCart();
    
    // Calculate values
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxRate = 0.1; // 10% tax
    const tax = subtotal * taxRate;
    const shippingCost = subtotal > 0 ? 10000 : 0; // Free shipping if cart is empty
    const total = subtotal + tax + shippingCost;
    
    // Update display elements
    updateElement('subtotal', formatPrice(subtotal));
    updateElement('tax', formatPrice(tax));
    updateElement('shipping', formatPrice(shippingCost));
    updateElement('total', formatPrice(total));
}

/**
 * Helper function to update element text content
 */
function updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
        element.textContent = value;
    }
}

/**
 * Get cart summary data (for checkout page)
 */
function getCartSummaryData() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.1;
    const shipping = subtotal > 0 ? 10000 : 0;
    const total = subtotal + tax + shipping;
    
    return {
        subtotal,
        tax,
        shipping,
        total,
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
        uniqueItems: cart.length
    };
}

// =====================================
// CHECKOUT FUNCTIONALITY
// =====================================

/**
 * Setup checkout button
 */
function setupCheckoutButton() {
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    if (!checkoutBtn) return;
    
    checkoutBtn.addEventListener('click', function() {
        const cart = getCart();
        
        if (cart.length === 0) {
            showToast('Keranjang masih kosong', 'warning');
            return;
        }
        
        // Check if user is logged in (if auth is implemented)
        if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
            showToast('Silakan login terlebih dahulu', 'warning');
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
            return;
        }
        
        // Redirect to checkout page
        console.log('Proceeding to checkout...');
        window.location.href = 'checkout.html';
    });
}

// =====================================
// ADDITIONAL UTILITIES
// =====================================

/**
 * Calculate cart statistics
 */
function getCartStats() {
    const cart = getCart();
    
    if (cart.length === 0) {
        return {
            totalItems: 0,
            uniqueItems: 0,
            subtotal: 0,
            averagePrice: 0,
            mostExpensiveItem: null,
            cheapestItem: null
        };
    }
    
    return {
        totalItems: cart.reduce((sum, item) => sum + item.quantity, 0),
        uniqueItems: cart.length,
        subtotal: cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        averagePrice: cart.reduce((sum, item) => sum + item.price, 0) / cart.length,
        mostExpensiveItem: cart.reduce((max, item) => item.price > max.price ? item : max),
        cheapestItem: cart.reduce((min, item) => item.price < min.price ? item : min)
    };
}

/**
 * Check if product is in cart
 */
function isInCart(productId) {
    const cart = getCart();
    return cart.some(item => item.id === productId);
}

/**
 * Get item quantity in cart
 */
function getItemQuantity(productId) {
    const cart = getCart();
    const item = cart.find(i => i.id === productId);
    return item ? item.quantity : 0;
}

/**
 * Apply discount code (placeholder for future feature)
 */
function applyDiscount(code) {
    const discounts = {
        'WELCOME10': { type: 'percentage', value: 0.1, description: '10% off' },
        'COFFEE20': { type: 'percentage', value: 0.2, description: '20% off' },
        'FREESHIP': { type: 'shipping', value: 0, description: 'Free shipping' }
    };
    
    const discount = discounts[code.toUpperCase()];
    
    if (discount) {
        showToast(`Kode promo ${code} berhasil diterapkan! (${discount.description})`, 'success');
        return discount;
    } else {
        showToast('Kode promo tidak valid', 'error');
        return null;
    }
}

/**
 * Get suggested products based on cart (placeholder for future feature)
 */
function getSuggestedProducts() {
    const cart = getCart();
    const allProducts = getAllProducts();
    
    if (cart.length === 0) return [];
    
    // Get categories in cart
    const cartCategories = [...new Set(cart.map(item => {
        const product = getProductById(item.id);
        return product ? product.category : null;
    }).filter(Boolean))];
    
    // Find products from same categories not in cart
    return allProducts
        .filter(product => {
            return cartCategories.includes(product.category) && !isInCart(product.id);
        })
        .slice(0, 3); // Return max 3 suggestions
}

/**
 * Save cart for later (placeholder for future feature)
 */
function saveCartForLater() {
    const cart = getCart();
    
    if (cart.length === 0) {
        showToast('Keranjang kosong', 'warning');
        return false;
    }
    
    const timestamp = new Date().toISOString();
    
    try {
        localStorage.setItem('savedCart', JSON.stringify({
            cart,
            savedAt: timestamp
        }));
        
        showToast('Keranjang disimpan!', 'success');
        return true;
    } catch (error) {
        console.error('Error saving cart:', error);
        showToast('Gagal menyimpan keranjang', 'error');
        return false;
    }
}

/**
 * Restore saved cart (placeholder for future feature)
 */
function restoreSavedCart() {
    try {
        const saved = localStorage.getItem('savedCart');
        
        if (saved) {
            const data = JSON.parse(saved);
            saveCart(data.cart);
            loadCartItems();
            showToast('Keranjang berhasil dipulihkan!', 'success');
            return true;
        }
        
        showToast('Tidak ada keranjang tersimpan', 'warning');
        return false;
    } catch (error) {
        console.error('Error restoring cart:', error);
        showToast('Gagal memulihkan keranjang', 'error');
        return false;
    }
}

// =====================================
// EXPORT FOR DEBUGGING
// =====================================

window.cartDebug = {
    getCart,
    getCartStats,
    getCartSummaryData,
    getSuggestedProducts,
    applyDiscount,
    isInCart,
    getItemQuantity,
    saveCartForLater,
    restoreSavedCart
};

console.log('✅ Cart.js loaded successfully!');