/**
 * AUTH.JS - FINAL VERSION
 * Handles user authentication (Login, Register, Logout)
 * Uses LocalStorage for demo purposes (Portfolio version)
 */

// =====================================
// INITIALIZE
// =====================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('🔐 Initializing Auth System...');
    
    // Check which page we're on
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Setup login form
    if (loginForm) {
        setupLoginForm();
        setupPasswordToggle('togglePassword', 'password');
        console.log('Login form ready');
    }
    
    // Setup register form
    if (registerForm) {
        setupRegisterForm();
        setupPasswordToggle('togglePassword', 'password');
        setupPasswordToggle('toggleConfirmPassword', 'confirmPassword');
        console.log('Register form ready');
    }
    
    // Initialize demo account
    initializeDemoAccount();
    
    // Update navbar based on login status
    updateNavbar();
    
    console.log('✅ Auth system initialized!');
});

// =====================================
// DEMO ACCOUNT INITIALIZATION
// =====================================

/**
 * Create demo account for testing
 */
function initializeDemoAccount() {
    const users = getUsers();
    
    // Check if demo account exists
    const demoExists = users.find(u => u.email === 'demo@coffee.com');
    
    if (!demoExists) {
        users.push({
            id: Date.now(),
            fullName: 'Demo User',
            email: 'demo@coffee.com',
            phone: '081234567890',
            password: 'demo123', // WARNING: In production, ALWAYS hash passwords!
            createdAt: new Date().toISOString(),
            role: 'customer'
        });
        
        localStorage.setItem('users', JSON.stringify(users));
        console.log('✅ Demo account created');
    }
}

// =====================================
// LOGIN FUNCTIONALITY
// =====================================

/**
 * Setup login form
 */
function setupLoginForm() {
    const form = document.getElementById('loginForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const rememberMe = document.getElementById('rememberMe')?.checked || false;
        
        // Validate inputs
        if (!email || !password) {
            showToast('Email dan password harus diisi!', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showToast('Format email tidak valid!', 'error');
            return;
        }
        
        // Attempt login
        const result = loginUser(email, password, rememberMe);
        
        if (result.success) {
            showToast(`Selamat datang, ${result.user.fullName}!`, 'success');
            
            // Redirect after 1 second
            setTimeout(() => {
                // Check if there's a redirect URL
                const urlParams = new URLSearchParams(window.location.search);
                const redirect = urlParams.get('redirect') || 'index.html';
                window.location.href = redirect;
            }, 1000);
        } else {
            showToast(result.message, 'error');
        }
    });
}

/**
 * Login user
 */
function loginUser(email, password, rememberMe) {
    const users = getUsers();
    
    // Find user
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return {
            success: false,
            message: 'Email tidak terdaftar!'
        };
    }
    
    // Check password
    // WARNING: In production, use bcrypt or similar for password hashing!
    if (user.password !== password) {
        return {
            success: false,
            message: 'Password salah!'
        };
    }
    
    // Create session
    const session = {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role || 'customer',
        loginAt: new Date().toISOString()
    };
    
    // Save session
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('userSession', JSON.stringify(session));
    
    console.log('✅ User logged in:', email);
    
    return {
        success: true,
        user: session
    };
}

// =====================================
// REGISTER FUNCTIONALITY
// =====================================

/**
 * Setup register form
 */
function setupRegisterForm() {
    const form = document.getElementById('registerForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const fullName = document.getElementById('fullName').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const agreeTerms = document.getElementById('agreeTerms')?.checked || false;
        
        // Validation
        if (!fullName || !email || !phone || !password || !confirmPassword) {
            showToast('Semua field harus diisi!', 'error');
            return;
        }
        
        if (!agreeTerms) {
            showToast('Anda harus menyetujui Syarat & Ketentuan', 'error');
            return;
        }
        
        if (password.length < 8) {
            showToast('Password minimal 8 karakter!', 'error');
            return;
        }
        
        if (password !== confirmPassword) {
            showToast('Password tidak cocok!', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showToast('Format email tidak valid!', 'error');
            return;
        }
        
        if (!isValidPhone(phone)) {
            showToast('Format nomor telepon tidak valid! (08xxxxxxxxxx)', 'error');
            return;
        }
        
        // Attempt register
        const result = registerUser({ fullName, email, phone, password });
        
        if (result.success) {
            showToast('Registrasi berhasil! Redirecting to login...', 'success');
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } else {
            showToast(result.message, 'error');
        }
    });
}

/**
 * Register new user
 */
function registerUser(userData) {
    const users = getUsers();
    
    // Check if email already exists
    const emailExists = users.find(u => u.email === userData.email);
    
    if (emailExists) {
        return {
            success: false,
            message: 'Email sudah terdaftar!'
        };
    }
    
    // Create new user
    // WARNING: In production, ALWAYS hash passwords!
    const newUser = {
        id: Date.now(),
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone,
        password: userData.password, // Should be hashed in production!
        role: 'customer',
        createdAt: new Date().toISOString()
    };
    
    // Save user
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    console.log('✅ New user registered:', userData.email);
    
    return {
        success: true,
        user: {
            id: newUser.id,
            fullName: newUser.fullName,
            email: newUser.email
        }
    };
}

// =====================================
// PASSWORD TOGGLE
// =====================================

/**
 * Setup password visibility toggle
 */
function setupPasswordToggle(buttonId, inputId) {
    const toggleBtn = document.getElementById(buttonId);
    const passwordInput = document.getElementById(inputId);
    
    if (!toggleBtn || !passwordInput) return;
    
    toggleBtn.addEventListener('click', function() {
        const type = passwordInput.type === 'password' ? 'text' : 'password';
        passwordInput.type = type;
        
        // Change icon
        this.textContent = type === 'password' ? '👁️' : '🙈';
    });
}

// =====================================
// LOGOUT FUNCTIONALITY
// =====================================

/**
 * Logout user
 */
function logoutUser() {
    const user = getCurrentUser();
    
    if (!user) {
        showToast('Anda belum login', 'warning');
        return;
    }
    
    // Clear sessions
    localStorage.removeItem('userSession');
    sessionStorage.removeItem('userSession');
    
    console.log('✅ User logged out:', user.email);
    
    showToast('Logout berhasil!', 'success');
    
    // Redirect to home
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

// =====================================
// SESSION MANAGEMENT
// =====================================

/**
 * Get current user session
 */
function getCurrentUser() {
    const sessionData = localStorage.getItem('userSession') || sessionStorage.getItem('userSession');
    
    if (sessionData) {
        try {
            return JSON.parse(sessionData);
        } catch (error) {
            console.error('Error parsing session:', error);
            return null;
        }
    }
    
    return null;
}

/**
 * Check if user is logged in
 */
function isLoggedIn() {
    return getCurrentUser() !== null;
}

/**
 * Require login (redirect to login if not logged in)
 */
function requireLogin(redirectUrl = null) {
    if (!isLoggedIn()) {
        showToast('Silakan login terlebih dahulu', 'warning');
        
        const currentPage = redirectUrl || window.location.pathname;
        
        setTimeout(() => {
            window.location.href = `login.html?redirect=${encodeURIComponent(currentPage)}`;
        }, 1500);
        
        return false;
    }
    return true;
}

// =====================================
// USER DATA MANAGEMENT
// =====================================

/**
 * Get all users from localStorage
 */
function getUsers() {
    try {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    } catch (error) {
        console.error('Error getting users:', error);
        return [];
    }
}

/**
 * Get user by ID
 */
function getUserById(userId) {
    const users = getUsers();
    return users.find(u => u.id === userId);
}

/**
 * Update user profile
 */
function updateUserProfile(userId, updates) {
    const users = getUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        // Merge updates
        users[userIndex] = { 
            ...users[userIndex], 
            ...updates,
            updatedAt: new Date().toISOString()
        };
        
        localStorage.setItem('users', JSON.stringify(users));
        
        // Update session if current user
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.userId === userId) {
            const session = { ...currentUser, ...updates };
            const storage = localStorage.getItem('userSession') ? localStorage : sessionStorage;
            storage.setItem('userSession', JSON.stringify(session));
        }
        
        console.log('✅ User profile updated:', userId);
        return { success: true };
    }
    
    return { success: false, message: 'User not found' };
}

// =====================================
// NAVBAR UPDATE
// =====================================

/**
 * Update navbar based on login status
 */
function updateNavbar() {
    const user = getCurrentUser();
    const navMenu = document.getElementById('navMenu');
    
    if (!navMenu) return;
    
    // Remove existing user menu or login button
    const existingUserMenu = navMenu.querySelector('.user-menu, .login-menu');
    if (existingUserMenu) {
        existingUserMenu.remove();
    }
    
    if (user) {
        // Add user menu
        const userMenuItem = document.createElement('li');
        userMenuItem.className = 'user-menu';
        userMenuItem.innerHTML = `
            <div class="user-dropdown">
                <button class="user-button">
                    👤 ${user.fullName}
                </button>
                <div class="user-dropdown-content">
                    <a href="#" onclick="alert('Fitur Profil coming soon!'); return false;">📋 Profil</a>
                    <a href="#" onclick="alert('Fitur Pesanan coming soon!'); return false;">📦 Pesanan Saya</a>
                    <a href="#" onclick="logoutUser(); return false;">🚪 Logout</a>
                </div>
            </div>
        `;
        
        navMenu.appendChild(userMenuItem);
    } else {
        // Add login button
        const loginMenuItem = document.createElement('li');
        loginMenuItem.className = 'login-menu';
        loginMenuItem.innerHTML = `<a href="login.html" class="btn-login">Login</a>`;
        navMenu.appendChild(loginMenuItem);
    }
}

// =====================================
// EXPORT FOR DEBUGGING
// =====================================

window.authDebug = {
    getCurrentUser,
    isLoggedIn,
    getUsers,
    logoutUser,
    requireLogin,
    updateUserProfile
};

console.log('✅ Auth.js loaded successfully!');