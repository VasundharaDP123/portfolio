# Vasundhara DP-AIML Engineer Portfolio

Welcome to my personal developer portfolio! This is a modern, high-performance, single-page web application designed to showcase my skills, projects, work experience, and achievements in Artificial Intelligence, Machine Learning, Computer Vision, and Full-Stack development.

Built entirely using **semantic HTML5**, **custom Vanilla CSS** (featuring obsidian glassmorphism, responsive grids, and smooth animations), and **modular JavaScript** (handling scroll-reveal tracking, project filtering, and local picture fallbacks).

---

## ✨ Features & Highlights

* **🎨 Obsidian Glassmorphism Design**: Premium dark-mode aesthetics using modern HSL variable palettes, glowing ambient light blobs, and semi-transparent cards with backdrop-blur filters.
* **📱 Responsive Layout**: Hand-crafted CSS Grid and Flexbox structures that scale seamlessly from 4K desktop screens down to mobile viewports.
* **✍️ Interactive Typing Engine**: A custom JavaScript-driven typing animation in the Hero header that cycles through core professional focuses.
* **🔍 Project Category Filtering**: A dynamic project filtering system (All, AI/ML, Computer Vision, Web Dev) that shows/hides cards with scale-down and fade transitions.
* **🛡️ Local Profile Photo Fallback**: Auto-detects the presence of `profile.jpg` in the root folder. If present, it loads and renders the profile headshot inside a morphing gradient shape; if absent, it silently falls back to displaying a code visualizer mock.
* **🎛️ Scrollspy & Viewport Reveal**: Highlight navigation headers automatically during page scrolling and slide elements up using the browser's native `IntersectionObserver` API.

---

## 🛠️ Technology Stack

* **Frontend**: HTML5, Vanilla CSS3, JavaScript (ES6+).
* **Typography**: Google Fonts (*Space Grotesk* for headlines, *Inter* for body copy).
* **Icons**: FontAwesome v6.

---

## 🗂️ Portfolio Sections

1. **Hero**: Interactive typing header, social links, resume download action, and a morphing graphic.
2. **About Me**: Brief bio, academics (Sir MVIT B.E. in AI/ML), achievements summary.
3. **Skills**: Badges organized by category (Languages, AI/ML, Backend/DevOps, Frontend, Computer Vision, Data/Databases).
4. **Projects**: Detailed project cards with tags, descriptions, code repositories, and filter triggers.
   * *SineWave AI* (Sign Language Translation)
   * *HeatShield* (AI Heatwave Prediction)
   * *DocuMind* (Enterprise RAG App)
   * *Face Mesh Visualization* (Real-Time CV Tracking)
   * *Hospital Management System* (Django booking portal)
   * *SecureVision Edge* (Suspicion behavior tracking)
5. **Work Experience**: Extended bullet points of freelancing achievements (Styvoe AI travel stylist).
6. **Open Source**: Highlights of database transaction migrations, role security guards, and Jest testing optimizations during GSSoC '26.
7. **Certifications**: NPTEL Elite, Oracle Cloud, and Database certifications.
8. **Contact**: Floating label contact form with full validation and submit status spinner simulation.

---

## 🚀 How to Run Locally

Since this portfolio is built with pure static vanilla files, it has no dependencies or build steps:

### Option A: Double-Click
Simply navigate to the project directory and double-click **`index.html`** to load it directly in your web browser.

### Option B: Simple Python Server (Recommended)
To run it on a local loopback server to test hyperlinks and download assets:
1. Open your terminal inside the folder and run:
   ```bash
   python -m http.server 8000
   ```
2. Open your browser and navigate to `http://localhost:8000`.

---

## 📸 Personalization

* **Profile Picture**: Crop your headshot to a square format, name it **`profile.jpg`**, and drop it in the root folder. It will load automatically.
* **Resume**: Rename your PDF CV to **`resume.pdf`** and drop it in the root folder to link the "Download CV" action.
