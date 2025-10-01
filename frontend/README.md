# 🌊 FlowState Frontend

FlowState is a mobile-first web application designed for **real-time groundwater resource evaluation** using data from Digital Water Level Recorders (DWLRs).
This repository contains the **frontend** built with React, TypeScript, and Vite.

---

## 🚀 Tech Stack

* **Framework:** [React](https://react.dev/) with [TypeScript](https://www.typescriptlang.org/)
* **Build Tool:** [Vite](https://vitejs.dev/)
* **Styling:** [TailwindCSS](https://tailwindcss.com/)
* **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (custom reusable UI primitives)
* **Icons:** [Lucide-react](https://lucide.dev/)
* **Visualization:** Placeholder components for charts & maps (to be connected with backend APIs later)
*  **Database:** SupaBase , MongoDB

---

## 📂 Project Structure

```
├── index.html                # Entry HTML
├── vite.config.ts            # Vite config
├── package.json              # Dependencies & scripts
└── src
    ├── main.tsx              # App entry point
    ├── App.tsx               # Root component
    ├── index.css             # Global styles
    ├── components
    │   ├── AuthScreens.tsx          # User login/signup
    │   ├── HomeDashboard.tsx        # Default dashboard
    │   ├── LocationMap.tsx          # Map view for groundwater sites
    │   ├── SiteDetails.tsx          # Individual site details
    │   ├── UserProfile.tsx          # Profile & settings
    │   ├── Notifications.tsx        # Alerts & updates
    │   ├── ResearcherDashboard.tsx  # Specialized view for researchers
    │   ├── PolicymakerDashboard.tsx # Specialized view for policymakers
    │   ├── BottomNavigation.tsx     # Mobile navigation bar
    │   └── ui/                      # Shared UI components (shadcn/ui)
```

---

## ⚡ Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/your-username/flowstate-frontend.git
cd flowstate-frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app will be available at:
👉 `http://localhost:5173`

---

## 🔑 Key Features

* 📊 **Role-based Dashboards** → Different views for researchers, policymakers, and general users
* 🌍 **Interactive Maps** → Visualize DWLR station data (future API integration)
* 🔔 **Real-time Notifications** → Updates on groundwater levels and alerts
* 👤 **User Profiles & Auth Screens** → Secure login system (to connect with backend)
* 📱 **Mobile-first UI** → Optimized for mobile and tablet use

---

## 📌 Next Steps

* Integrate backend APIs (Node/Express + Python ML services)
* Add data visualization using **Recharts/D3.js**
* Connect with **DWLR datasets** for real-time groundwater levels
* Secure authentication (JWT, OAuth)

---

## 👥 Contributors

This project is developed as part of **Smart India Hackathon (SIH) 2025**.
Team: *flowState*

---
