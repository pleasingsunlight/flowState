# FlowState Guidelines

This document defines the rules and standards to maintain consistency, scalability, and clarity in the FlowState project.
All contributors (including AI tools) must follow these guidelines.

---

## General Guidelines

* Keep code modular and clean — avoid overly large files.
* Use meaningful variable, function, and component names.
* Prefer **composition over duplication** — reuse components and helper functions where possible.
* Document complex functions and APIs with docstrings or comments.
* Maintain **role separation** in code: Researchers vs Policymakers dashboards should remain clearly distinct.
* Avoid hardcoding values — use configuration files or environment variables.

---

## Backend Guidelines

* Use **FastAPI** for all backend APIs.
* Follow RESTful principles: `/users`, `/water`, `/locations`, `/ml`.
* Passwords must always be **hashed** using bcrypt. Never store plaintext passwords.
* Use **JWT tokens** for authentication.
* All database interactions must go through SQLAlchemy ORM.
* Maintain migrations when schema changes (Alembic recommended).
* Separate ML model logic (`ml_predict.py`) from business logic.
* Log errors and API usage where possible.

---

## Frontend Guidelines

* Use **React + Axios** for API communication.
* Always prefer responsive layouts (Flexbox, Grid). Avoid fixed absolute positioning unless necessary.
* Keep state management organized (React Context or Redux if project scales).
* Use loading indicators for API calls.
* Ensure accessibility (labels, alt text, color contrast).

---

## Design System Guidelines

* The FlowState UI should feel **professional, soothing, and formal** — not flashy or futuristic.
* Follow industry standards for enterprise/utility apps.

### Typography

* Base font-size: **14px**
* Headings: Clear hierarchy (h1 > h2 > h3).
* Avoid decorative fonts — keep text clean and readable.

### Colors

* Use a **soothing palette** (blues, greens, grays).
* Avoid overly bright or neon colors.
* Alerts:

  * Red for critical warnings
  * Yellow for caution
  * Green for success

### Buttons

* **Primary Button**

  * Purpose: Main action (e.g., "Submit Data")
  * Style: Filled with primary brand color
  * Limit: One per screen section

* **Secondary Button**

  * Purpose: Supporting action (e.g., "Edit", "View Details")
  * Style: Outlined

* **Tertiary Button**

  * Purpose: Least important action (e.g., "Cancel")
  * Style: Text-only

---

## Role-Based Dashboards

### Researchers Dashboard

* Show detailed analytics: charts, data tables, historical trends.
* Provide data export/download options.
* Ensure scientific accuracy — units, legends, and labels must be clear.

### Policymakers Dashboard

* Show high-level summaries: KPIs, alerts, decision insights.
* Emphasize clarity and quick decision-making over raw detail.
* Use visual indicators (icons, badges, progress bars).

---

## Contribution Guidelines

* Commit messages must be descriptive (e.g., `feat: add water data API` or `fix: correct scaling bug`).
* Run tests before pushing changes.
* Never commit secrets or credentials — store them in `.env`.
* PRs should be reviewed before merging.

---

## Impacts of Following Guidelines

* **Consistency**: The app looks and behaves predictably across all screens.
* **Maintainability**: Future developers can quickly understand and extend the project.
* **Security**: User data and models remain safe.
* **Scalability**: The system can grow without becoming messy.
* **Professionalism**: FlowState feels like a polished, reliable industry product.
