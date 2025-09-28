# FlowState Project Guidelines

This document outlines the standards, conventions, and workflows to be followed while working on the FlowState Groundwater Resource Management project. The goal is to ensure **clarity, maintainability, and scalability** across the frontend, backend, and data science components.

---

## 1. Project Structure

```
flowstate/
│── frontend/            # Mobile app UI (Figma prototypes → React Native/Flutter codebase)
│── backend/             # Express.js backend
│   ├── models/          # Database schemas and ML models
│   ├── routes/          # API routes
│   ├── controllers/     # Business logic
│   ├── middlewares/     # Authentication, logging, etc.
│   └── utils/           # Helper functions
│── data/                # Sample datasets, pre-processing scripts
│── ml_models/           # .keras and .pkl models
│── docs/                # Documentation (README, Guidelines, API docs)
│── tests/               # Unit and integration tests
```

---

## 2. Coding Standards

* **Language choices:**

  * Frontend → **React Native (preferred)** or Flutter
  * Backend → **Node.js with Express**
  * Database → **PostgreSQL** (scalable, relational) or MongoDB (flexible schema, optional)
  * Machine Learning → **Python (TensorFlow/Scikit-learn)**, exported as `.keras` or `.pkl`

* **Naming conventions:**

  * Variables & functions → `camelCase`
  * Classes → `PascalCase`
  * Files → `kebab-case.js` for JavaScript, `snake_case.py` for Python scripts

* **Comments:**

  * JSDoc for JavaScript
  * Docstrings for Python functions/classes
  * Keep comments updated when refactoring

---

## 3. Git & Version Control

* **Branching strategy:**

  * `main` → Production-ready code
  * `dev` → Active development
  * `feature/<feature-name>` → Individual features
  * `bugfix/<issue>` → Bug fixes

* **Commits:**

  * Use clear commit messages:

    * `feat: add user authentication`
    * `fix: resolve API timeout issue`
    * `docs: update README.md`

* **Pull Requests:**

  * All features/bugfixes must go through PR review before merging to `dev`.

---

## 4. Backend Guidelines

* **API Design:**

  * Follow RESTful principles.
  * Use `GET, POST, PUT, DELETE` consistently.
  * Version APIs (`/api/v1/…`).

* **Security:**

  * Implement **JWT authentication** for users.
  * Sanitize inputs to prevent SQL injection & XSS.
  * Use HTTPS in production.

* **Error Handling:**

  * Standardized error responses:

    ```json
    {
      "status": "error",
      "message": "Resource not found"
    }
    ```

* **ML Model Integration:**

  * Store `.keras` and `.pkl` in `ml_models/`.
  * Serve predictions via `/api/v1/predict`.

---

## 5. Frontend Guidelines

* Follow **Figma design specifications** for consistency.
* Keep components **modular and reusable**.
* State management → **Redux Toolkit** or **React Context API**.
* Ensure **mobile responsiveness** and accessibility.
* Follow **industry-standard UI practices** (soothing, formal, easy to read).

---

## 6. Database Guidelines

* Use **PostgreSQL** for structured groundwater + user data.

* Schema should include:

  * Users (with roles: admin, researcher, policymaker, general)
  * Locations (geographical metadata)
  * Model metadata (stored ML models, versioning)
  * Predictions (historical outputs for auditing)

* Implement migrations using **Prisma** or **Sequelize**.

---

## 7. Testing

* **Unit tests:** Mocha/Chai for backend, Jest for frontend.
* **Integration tests:** Ensure endpoints, database, and models interact correctly.
* **ML validation:** Compare model predictions with benchmark datasets.

---

## 8. Deployment

* Use **Docker** for containerization.

* Deployment platforms:

  * Backend → **Heroku / AWS ECS**
  * Frontend → **Expo / Vercel**
  * Database → **AWS RDS / MongoDB Atlas**

* CI/CD with **GitHub Actions**:

  * Linting
  * Running tests
  * Auto-deploy to staging

---

## 9. Contribution Workflow

1. Clone the repository & create a feature branch.
2. Implement the feature following coding standards.
3. Write/Update tests if applicable.
4. Commit changes with a clear message.
5. Push branch and open a Pull Request.
6. Request peer review before merging.

---

## 10. Future Enhancements

* Advanced ML integration with federated learning.
* Interactive GIS-based groundwater maps.
* Multi-language support in the frontend.
* Role-based dashboards (researchers & policymakers).

---

**Adherence to these guidelines ensures FlowState remains reliable, scalable, and impactful.**
