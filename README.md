# 📸 PixelCraft Studio — Professional Web Image Editor & Creative Landing Page

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![GSAP](https://img.shields.io/badge/GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white)](https://greensock.com/gsap/)
[![Canvas API](https://img.shields.io/badge/HTML5_Canvas-00599C?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API)

> **PixelCraft Studio** is a modern, high-performance web-based image manipulation suite and editorial creative studio landing page. Built with zero-latency GPU-accelerated CSS filter pipelines, native HTML5 Canvas export, custom fluid cursor physics, and layered 3D depth animations.

---

## 🌟 Key Highlights & Features

### 1. 🎭 Cinematic Editorial Hero Section
- **Layered 3D Depth**: Multi-layer visual hierarchy featuring background typography (`CREATIVE`), ambient amber studio spotlighting, and a foreground portrait model.
- **Seamless Cutout Model**: Central hero portrait model integrated with a dual-gradient CSS mask (`linear-gradient` bottom melt + `radial-gradient` edge blend) for zero hard borders and seamless blending into the dark luxury canvas.
- **GSAP Mouse Parallax**: Dynamic mouse tracking shifts foreground and background elements in opposite vectors to create tangible spatial depth.
- **Dynamic Typewriter Effect**: Real-time typewriter animation on the studio manifesto with realistic punctuation cadence.
- **Zero Scrollbar Architecture**: Strictly constrained viewport layout (`100vh`) with cross-browser scrollbar hiding for a distraction-free editorial experience.

### 2. 🎛️ Pro Studio Workspace (`editor.html`)
- **10 Core Realtime Color Controls**:
  - `Brightness` & `Exposure` (independent multiplier curves)
  - `Contrast`
  - `Saturation`
  - `Hue Rotation` (0° – 360°)
  - `Blur` (0px – 20px)
  - `Grayscale`
  - `Sepia`
  - `Opacity`
  - `Invert`
- **2-Column Responsive Grid**: All filter sliders are organized in an ergonomic 2-column layout, eliminating vertical scrollbars.
- **One-Click Instant Presets**: Pre-configured looks including *Default*, *Vintage 70s*, *B&W Noir*, *Warm Sun*, and *Cyberpunk*.
- **Hold to Compare**: Instant real-time comparison with the original unedited image via mouse hold or `Spacebar`.
- **Canvas Transformations**: Lossless 90° clockwise rotation and horizontal flipping.
- **High-Resolution PNG Export**: Renders all active CSS filters and matrix transformations directly onto a high-res HTML5 Canvas element for instant download.

### 3. 🖱️ Smooth Custom Cursor Follower
- **Dual-Element Cursor**: Glowing amber center point (`#cursor-dot`) with an outer trailing ring (`#cursor-follower`).
- **Lerp / Lag Physics**: Smooth tracking governed by linear interpolation (`0.16` smoothing factor) across **both** Landing Page and Editor Workspace.
- **Interactive States**: Dynamically scales and glows when hovering over buttons, sliders, preset chips, and cards.

### 4. 🔒 100% Privacy & Zero-Latency Performance
- **Pure Client-Side Processing**: All image adjustments, filters, and exports happen locally inside the user's browser using hardware acceleration (GPU).
- **Zero Uploads**: Images are never uploaded to any remote server, ensuring complete data privacy and security.

---

## 🎮 Keyboard Shortcuts

| Shortcut | Action |
| :--- | :--- |
| `Space` (Hold) | **Hold to Compare** (preview original image) |
| `Click + Drag` | Drag & Drop image files directly onto canvas |

---

## 🚀 Quick Start (Run Locally)

This project has **zero build steps** and requires no Node.js or npm packages. Simply open the files in your browser or run a lightweight local server:

### Option 1: Python HTTP Server (Recommended)
```bash
# Open terminal in project root directory:
python -m http.server 3000 --bind 127.0.0.1
```
Then visit:
- **Landing Page**: [http://127.0.0.1:3000/](http://127.0.0.1:3000/) or [http://127.0.0.1:3000/index.html](http://127.0.0.1:3000/index.html)
- **Editor Workspace**: [http://127.0.0.1:3000/editor.html](http://127.0.0.1:3000/editor.html)

### Option 2: VS Code Live Server
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` and select **"Open with Live Server"**.



## 📁 Repository Structure

```
Project_Three/
├── index.html               # Main Landing Page (Root entry point for GitHub Pages)
├── editor.html              # Full Photo Editor Workspace
├── script.js                # Canvas filter engine, transforms, presets & export
├── style.css                # Luxury studio layout, 2-column grid & cursor styles
├── variables.css            # Color tokens & theme constants
├── assets/
│   └── model-hero.png       # Transparent studio portrait model asset
└── README.md                # Project documentation
```

---

## 🛠️ Built With

- **HTML5** — Semantic, accessible markup & Canvas API
- **Tailwind CSS (CDN)** — Utility-first styling & layout
- **Modern JavaScript (ES6+)** — FileReader, Canvas 2D Context, Event Listeners
- **GSAP (GreenSock)** — Cinematic entrance animations & mouse parallax
- **Remix Icon & Google Fonts** — Plus Jakarta Sans typography and modern icons
