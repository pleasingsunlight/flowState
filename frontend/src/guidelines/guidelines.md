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
* Use **JWT tokens** for authenti
