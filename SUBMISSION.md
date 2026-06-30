# 📋 Submission Details

> **Instructions:** Fill out every section below before submitting. Replace all placeholder text. Check boxes for features you implemented. Be honest — your self-assessment matters.

---

## 👤 Candidate Information

| Field | Your Details |
|-------|-------------|
| **Full Name** | Onkar Doke |
| **Email** | [onkardoke9696@gmail.com] |
| **Phone** | 7745042879|
| **GitHub Username** | OmDoke |
| **LinkedIn (optional)** | https://www.linkedin.com/in/onkar-doke |
| **Current Location** | Pune |

---

## 🔗 Repository & Deployment Links

| Link | URL |
|------|-----|
| **GitHub Repo** (forked) | `https://github.com/OmDoke/cadmech-fullstack-assessment` |
| **Live Frontend** (GitHub Pages) | `https://omdoke.github.io/cadmech-fullstack-assessment/` |
| **Live Backend** (Render/Railway) | `https://cadmech-api.onrender.com` |

---

## 🛠️ Tech Choices

| Choice | Your Answer |
|--------|------------|
| **Database Used** | SQLite |
| **ORM / Query Builder** | raw SQL |
| **Additional Frontend Libraries** | lucide-react, react-router-dom |
| **Additional Backend Libraries** | cors, dotenv, express, sqlite3 |
| **CSS Approach** | Vanilla CSS |

---

## ✅ Features Implemented

- [x] Dashboard with summary statistics
- [x] Equipment list view (table/grid)
- [x] Add new equipment with validation
- [x] Edit existing equipment
- [x] Delete equipment with confirmation dialog
- [x] Search by name
- [x] Filter by type and/or status
- [x] Responsive design (desktop + mobile)
- [x] REST API with proper error handling
- [x] Database with schema
- [x] Frontend deployed to GitHub Pages
- [x] Backend deployed to Render/Railway

---

## 💬 Self Assessment

### What went well?

> I was able to quickly understand the requirements and implement them effectively. The integration between the React frontend and the Node.js backend went smoothly, resulting in a cohesive user experience.

### What was the hardest part?

> The hardest part was deploying the backend to Render, particularly dealing with the sqlite3 GLIBC compatibility error on newer Node.js versions. I pushed through by downgrading the Node.js version on Render to a stable 20 LTS version which had compatible glibc requirements.

### What would you do differently with more time?

> With more time, I would implement robust authentication and authorization to secure the equipment manager. I would also write a comprehensive suite of unit and integration tests for both the frontend and backend to ensure reliability.

### AI Tools Usage

> I used AI assistants (like Gemini) to help troubleshoot the Render deployment error with `sqlite3` and `GLIBC`. The AI explained the root cause (glibc version mismatch) and suggested the correct fix of downgrading the Node.js version to 20 LTS via Render environment variables.

---

## ⏱️ Time Spent

| Area | Hours |
|------|-------|
| **Frontend UI/UX & Responsive Design** | 2 hours |
| **Backend API Development & DB** | 2 hours |
| **Deployment (FE + BE)** | 1 hour |
| **Documentation & Cleanup** | 1 hour |
| **Total** | 6 hours |

---

## 📌 Additional Notes

> *(Known issues, design trade-offs, things you'd like the evaluator to know)*

---

> **⚠️ Checklist before submitting:**
> - [x] All links are working and publicly accessible
> - [x] Code is pushed to your forked repo
> - [x] Commit history shows progressive development
