<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/TailwindCSS-4.0-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"/>
</p>

# 🎓 AIML Departmental Website

> A modern, full-stack web application for the Artificial Intelligence and Machine Learning Department — featuring an admin dashboard, real-time updates, and a stunning UI.

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-screenshots">Screenshots</a> •
  <a href="#-contributing">Contributing</a>
</p>

---

## ✨ Features

### 🏠 Public Portal
| Feature | Description |
|---------|-------------|
| **Dynamic Homepage** | Engaging landing page with hero sections, image carousels, and announcements |
| **Faculty Directory** | Comprehensive profiles of teaching and non-teaching staff |
| **Academic Programs** | Detailed information about courses, curriculum, and syllabi |
| **Events & News** | Live hackathon countdowns, past winners showcase, and real-time event updates |
| **Placements** | Showcase of placement statistics, interactive analytics charts, and top domains |
| **Resources & PYQs** | Download hub for syllabi, lab manuals, and previous year question papers |
| **Innovation Showcase** | Directory of student projects and faculty research publications |
| **Certificate Verifier** | Instant verification portal for digital event certificates with PDF download |
| **Command Palette** | Global CMD+K quick search navigation for instant access to resources |
| **Alumni Network** | Connection platform for department alumni |

### 🔐 Admin Dashboard
| Feature | Description |
|---------|-------------|
| **Content Management** | Full CRUD operations for all website content |
| **Image Upload** | Cloudinary-powered image management |
| **Real-time Updates** | Socket.IO integration for instant notifications |
| **User Authentication** | JWT-based secure authentication system |
| **Analytics Dashboard** | Visual insights with charts and statistics |

---

## 🛠 Tech Stack

### Frontend
```
React 18         → Modern UI library with hooks
Vite 6           → Lightning-fast build tool
TailwindCSS 4    → Utility-first CSS framework
Framer Motion    → Smooth animations
GSAP             → Advanced animations
Material UI      → Component library
Zustand          → Lightweight state management
React Router 7   → Client-side routing with React.lazy Code Splitting
Socket.IO        → Real-time communication
jsPDF            → Client-side PDF generation
Recharts         → Interactive data visualization
```

### Backend
```
Node.js          → JavaScript runtime
Express.js       → Web application framework
MongoDB          → NoSQL database
Mongoose         → ODM for MongoDB
JWT              → Authentication tokens
Cloudinary       → Cloud image storage
Socket.IO        → WebSocket implementation
Multer           → File upload handling
```

---

## 🏗 Architecture

```
📦 AIML-Departmental-Website
├── 📂 Frontend/
│   ├── 📂 src/
│   │   ├── 📂 Components/      # Reusable UI components
│   │   │   ├── Dashboard/      # Admin panel components
│   │   │   ├── Header/         # Navigation & header
│   │   │   ├── Footer/         # Site footer
│   │   │   ├── ImageGallery/   # Photo gallery
│   │   │   ├── ui/             # Shadcn UI components
│   │   │   └── ...
│   │   ├── 📂 pages/           # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Academics.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── ...
│   │   ├── 📂 store/           # Zustand state stores
│   │   ├── 📂 assets/          # Static assets
│   │   └── 📂 utils/           # Helper functions
│   └── 📄 vite.config.js
│
├── 📂 Backend/
│   ├── 📂 src/
│   │   ├── 📂 controllers/     # Route handlers
│   │   ├── 📂 models/          # Mongoose schemas
│   │   ├── 📂 routes/          # API routes
│   │   ├── 📂 middleware/      # Auth & validation
│   │   ├── 📂 utils/           # Helper utilities
│   │   ├── 📂 db/              # Database connection
│   │   └── 📄 index.js         # Entry point
│   └── 📄 package.json
│
└── 📄 README.md
```

---

## 🆕 Recent Updates (v1.1)

- **Mobile Responsiveness**: Rebuilt the Admin Dashboard with a collapsible sliding sidebar and hamburger menu for seamless usage on phones and tablets.
- **UI Consistency**: Fully transitioned all legacy dark-mode admin pages (Notices, Announcements, Club Events) and public portals (Events, Team Members) to a premium, unified Light Mode aesthetic.
- **Bug Fixes**: 
  - Fixed event data mappings (`event.dateTime`) to ensure public events render correctly.
  - Resolved `react-dropzone` MIME type restrictions so image previews and uploads for events work perfectly across all browsers.
  - Patched Dashboard layout constraints to ensure pages with long tables/forms can scroll smoothly.
  - Enhanced API Middleware to securely prioritize explicit Bearer tokens over legacy cookies.

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **Cloudinary** account (for image uploads)

### Environment Variables

Create `.env` files in both `Frontend` and `Backend` directories:

**Backend/.env**
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

**Frontend/.env**
```env
VITE_API_URL=http://localhost:5000
```

### Installation

```bash
# Clone the repository
git clone https://github.com/pranayb1256/Aiml-Departmental-Website.git
cd Aiml-Departmental-Website

# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

### Running Locally

```bash
# Terminal 1: Start backend server
cd Backend
npm run dev
# Server runs on http://localhost:5000

# Terminal 2: Start frontend dev server
cd Frontend
npm run dev
# App runs on http://localhost:5173
```

---

## 📸 Screenshots

<details>
<summary>🖼️ Click to view screenshots</summary>

### Homepage
> Modern landing page with dynamic content and smooth animations

### Faculty Directory
> Comprehensive staff profiles with search and filter

### Admin Dashboard
> Full-featured content management system

### Events Page
> Real-time event updates with calendar integration

</details>

---

## 🎯 Key Highlights

- **⚡ Performance**: Vite-powered builds with optimized chunking
- **📱 Responsive**: Mobile-first design that works on all devices
- **🔒 Secure**: JWT authentication with httpOnly cookies
- **☁️ Cloud-Ready**: Cloudinary integration for scalable image storage
- **🎨 Modern UI**: Glassmorphism, gradients, and micro-animations
- **♿ Accessible**: ARIA labels and keyboard navigation support
- **🔄 Real-time**: Socket.IO for instant updates and notifications

---

## 📊 Project Stats

| Metric | Value |
|--------|-------|
| Frontend Components | 25+ |
| API Endpoints | 40+ |
| Database Models | 14 |
| Pages | 12 |

---

## 🤝 Contributing

Contributions are always welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/AmazingFeature`
3. **Commit** your changes: `git commit -m 'Add AmazingFeature'`
4. **Push** to the branch: `git push origin feature/AmazingFeature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Pranay Bhoir**
**Hrishikesh Dongare**

[![GitHub](https://img.shields.io/badge/GitHub-pranayb1256-181717?style=flat-square&logo=github)](https://github.com/pranayb1256)

[![GitHub](https://img.shields.io/badge/GitHub-HrishikeshDongare-181717?style=flat-square&logo=github)](https://github.com/Hrishi-Code-tech)

---
[![Linkden](https://www.linkedin.com/in/pranay-bhoir-3a989b284/)]


<p align="center">
  <img src="https://img.shields.io/badge/Status-Active-success?style=flat-square" alt="Status"/>
  <img src="https://img.shields.io/badge/PRs-Welcome-brightgreen?style=flat-square" alt="PRs Welcome"/>
</p>
