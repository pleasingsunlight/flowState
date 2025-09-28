# 🌊 FlowState – Groundwater Resource Management App

FlowState is a **groundwater resource management system** designed to help communities, researchers, and policymakers monitor, analyze, and manage water resources effectively. It integrates **machine learning models** with **real-time data visualization**, offering tailored dashboards for different user roles.

---

## ✨ Features

* 📊 **Researchers Dashboard** – Detailed analytics, trends, and exportable data.
* 🏛️ **Policymakers Dashboard** – High-level summaries, alerts, and decision insights.
* 🌍 **Location Mapping** – Interactive map to track water levels and quality across regions.
* 🤖 **Machine Learning Integration** – Predict water quality using trained `.keras` and `.pkl` models.
* 🔔 **Alerts System** – Real-time notifications for water scarcity or contamination risks.
* 👤 **User Management** – Role-based access (Researchers, Policymakers, Admins).

---

## 🏗️ Project Structure

```
FlowState/
│
├─ backend/                # FastAPI backend
│   ├─ app/
│   │   ├─ main.py
│   │   ├─ database.py
│   │   ├─ models.py
│   │   ├─ schemas.py
│   │   ├─ auth.py
│   │   ├─ routes/
│   │   │   ├─ users.py
│   │   │   ├─ locations.py
│   │   │   ├─ water_data.py
│   │   │   └─ ml_predict.py
│   │   └─ utils.py
│   ├─ models/             # Trained ML models
│   │   ├─ groundwater_model.keras
│   │   └─ scaler.pkl
│   ├─ requirements.txt
│   └─ .env
│
├─ frontend/               # React frontend (UI)
│   ├─ src/
│   │   ├─ components/
│   │   ├─ pages/
│   │   └─ services/
│   └─ package.json
│
├─ guidelines.md           # Development and design rules
├─ README.md               # Project overview
└─ CONTRIBUTING.md         # Contribution guidelines (optional)
```

---

## ⚙️ Tech Stack

**Frontend:** React, Axios, TailwindCSS (or your chosen UI lib)
**Backend:** FastAPI, SQLAlchemy, JWT Auth
**Database:** PostgreSQL / MySQL / SQLite (configurable)
**ML Models:** TensorFlow/Keras (.keras), Scikit-learn (.pkl)
**Deployment:** Docker, Nginx, or cloud platforms (AWS/GCP/Azure)

---

## 🚀 Getting Started

### 1. Clone Repository

```bash
git clone https://github.com/your-username/flowstate.git
cd flowstate
```

### 2. Backend Setup

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs at: `http://127.0.0.1:8000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

## 🔑 Environment Variables

Create a `.env` file inside `backend/` with:

```
DATABASE_URL=postgresql://user:password@localhost:5432/flowstate
SECRET_KEY=your-secret-key
```

---

## 📡 API Endpoints (Sample)

| Method | Endpoint          | Description                      |
| ------ | ----------------- | -------------------------------- |
| POST   | `/users/register` | Register new user                |
| POST   | `/users/login`    | Authenticate user & get JWT      |
| GET    | `/locations`      | Get all locations                |
| POST   | `/water`          | Add new water data               |
| POST   | `/ml/predict`     | Predict water quality (ML model) |

---

## 📊 Dashboards

* **Researchers:** Analytics charts, historical trends, detailed reports.
* **Policymakers:** High-level KPIs, alerts, and actionable insights.

---

## 🛡️ Guidelines & Standards

Please read [guidelines.md](./guidelines.md) before contributing.
It covers coding style, UI/UX rules, and system architecture.

---

## 🤝 Contributing

Contributions are welcome!

* Fork the repo
* Create a feature branch
* Commit with descriptive messages
* Open a Pull Request

---

## 📜 License

MIT License – feel free to use, modify, and distribute with attribution.

---

## 🌍 Vision

FlowState aims to become a **scalable water resource management tool** that bridges the gap between **scientific research and policy-making**, ensuring sustainable groundwater use for future generations.
