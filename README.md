# ☕ Coffee Order Website

Website pemesanan kopi modern dengan fitur lengkap untuk portofolio. Dibangun dengan HTML, CSS, dan JavaScript murni (Vanilla JS).

![Project Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-blue)

## 📋 Deskripsi

Website order coffee yang responsif dan user-friendly dengan fitur-fitur lengkap seperti filtering, sorting, searching, shopping cart, dan checkout simulation.

## ✨ Fitur Utama

### 🏠 Homepage
- Hero section dengan CTA button
- Menampilkan featured products
- Section "Why Choose Us"
- Fully responsive design

### 📖 Menu Page
- **Filter Products:**
  - By Type (Hot / Ice)
  - By Category (Espresso, Latte, Manual Brew, Signature)
- **Sort Products:**
  - Price: Low to High
  - Price: High to Low
  - Name: A-Z / Z-A
- **Search:** Real-time search by product name
- **Product Cards:** Detailed product information

### 🛒 Shopping Cart
- Add/Remove items
- Update quantity (increase/decrease)
- Auto-calculate subtotal
- Tax calculation (10%)
- Shipping cost
- Total price calculation
- Empty cart indicator

### ✅ Checkout
- Customer information form
- Delivery address form
- Payment method selection (dummy)
- Order summary
- Order confirmation with Order ID

## 🚀 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with:
  - CSS Grid & Flexbox
  - CSS Variables
  - Animations & Transitions
- **JavaScript (ES6+)** - Vanilla JavaScript:
  - LocalStorage for cart persistence
  - Dynamic rendering
  - Event handling
  - Filter, sort, search algorithms

## 📁 Struktur Folder

```
coffee-order-website/
│
├── index.html              # Homepage
├── menu.html              # Menu/Order page
├── cart.html              # Shopping cart page
├── checkout.html          # Checkout page
├── README.md             # Project documentation
│
├── css/
│   ├── style.css          # Main stylesheet
│   └── responsive.css     # Responsive design
│
└── js/
    ├── data.js            # Product data
    ├── main.js            # Main functions & utilities
    ├── menu.js            # Menu page logic
    └── cart.js            # Cart page logic
```

## 🎯 Cara Menjalankan Project

### Method 1: Direct Open (Recommended)
1. Download/clone repository
2. Buka `index.html` di browser
3. Website siap digunakan!

### Method 2: Live Server (VS Code)
1. Install extension "Live Server" di VS Code
2. Right-click pada `index.html`
3. Pilih "Open with Live Server"

### Method 3: Local Server
```bash
# Menggunakan Python
python -m http.server 8000

# Atau menggunakan Node.js
npx http-server
```

## 📱 Responsive Breakpoints

- **Desktop:** 1200px+
- **Laptop:** 992px - 1199px
- **Tablet:** 768px - 991px
- **Mobile:** < 768px

## 🎨 Color Palette

```css
--primary-color: #8B4513;     /* Saddle Brown */
--secondary-color: #D2691E;   /* Chocolate */
--accent-color: #FFD700;      /* Gold */
--bg-color: #FFF8DC;          /* Cornsilk */
--text-dark: #2C1810;         /* Dark Brown */
```

## 🔧 Fitur LocalStorage

Website menggunakan LocalStorage untuk:
- Menyimpan cart data
- Persistensi antar session
- Auto-save saat add/update/remove item

## 📊 Data Products

Total **24 produk kopi** dengan kategori:
- **Espresso** (4 items)
- **Latte** (6 items)
- **Manual Brew** (5 items)
- **Signature** (9 items)

## 🎓 Konsep yang Diimplementasikan

### JavaScript Concepts:
- ✅ Array methods (map, filter, reduce, find, sort)
- ✅ LocalStorage API
- ✅ DOM Manipulation
- ✅ Event Handling
- ✅ ES6+ Features (arrow functions, template literals, destructuring)
- ✅ Debouncing (search optimization)
- ✅ Dynamic rendering

### CSS Concepts:
- ✅ CSS Grid & Flexbox
- ✅ CSS Variables (Custom Properties)
- ✅ Media Queries
- ✅ Animations & Transitions
- ✅ Responsive Design
- ✅ Modern UI/UX patterns

## 🚀 Cara Push ke GitHub

### 1. Inisialisasi Git
```bash
cd coffee-order-website
git init
```

### 2. Tambahkan Remote Repository
```bash
git remote add origin https://github.com/adiprasetyo045/coffe-order-website.git
```

### 3. Tambahkan Files
```bash
git add .
```

### 4. Commit Changes
```bash
git commit -m "Initial commit: Coffee Order Website"
```

### 5. Push ke GitHub
```bash
git branch -M main
git push -u origin main
```

### 6. Deploy ke GitHub Pages (Optional)
1. Go to repository Settings
2. Navigate to Pages section
3. Source: Select `main` branch
4. Click Save
5. Website akan live di: [`https://username.github.io/coffee-order-website](https://github.com/adiprasetyo045/coffe-order-website.git)`

## 📸 Screenshots

### Homepage
![Homepage](screenshots/homepage.png)

### Menu Page
![Menu](screenshots/menu.png)

### Cart Page
![Cart](screenshots/cart.png)

### Checkout Page
![Checkout](screenshots/checkout.png)

## 🔮 Pengembangan Lanjutan

Ide untuk fitur tambahan:
- [ ] User authentication & profiles
- [ ] Product reviews & ratings
- [ ] Wishlist functionality
- [ ] Order history
- [ ] Real payment gateway integration
- [ ] Admin dashboard
- [ ] Database integration (Backend)
- [ ] Real-time order tracking
- [ ] Email notifications
- [ ] Discount/Promo code system
- [ ] Multiple language support
- [ ] Dark mode toggle
- [ ] Progressive Web App (PWA)

## 📝 License

MIT License - Feel free to use this project for your portfolio!

## 👤 Author

**Your Name**
- Portfolio: [https://adiprasetyo045.github.io/Website-Portofolio/]
- GitHub: [https://github.com/adiprasetyo045]
- LinkedIn: [Your LinkedIn]

## 🙏 Acknowledgments

- Google Fonts (Poppins)
- Coffee emoji icons
- Inspiration from modern e-commerce websites

---

⭐ **Star this repository if you find it helpful!**

📧 **Contact:** prasetyaadhi398@gmail.com

---

Made with ☕ and ❤️