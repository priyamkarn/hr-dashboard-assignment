# 💼 HR Performance Dashboard

A modern HR dashboard built with [Next.js](https://nextjs.org), featuring real-time user data, filtering, analytics, and user interaction features like bookmarking and promotions.

🌐 **Live Demo**: [https://your-vercel-url.vercel.app](https://your-vercel-url.vercel.app)

---

## 🧑‍💼 Features

### 🎯 Core Features

#### 🏠 Dashboard Homepage (`/`)
- Fetches users from [`https://dummyjson.com/users?limit=20`](https://dummyjson.com/users?limit=20)
- Displays:
  - Full name, email, age
  - Department (mocked)
  - Performance rating (1–5 stars)
  - Action buttons: `View`, `Bookmark`, `Promote`

#### 🔍 Search & Filter
- Search by name, email, or department (case-insensitive)
- Multi-select filters:
  - Departments
  - Performance ratings

#### 👤 Dynamic User Details (`/employee/[id]`)
- Shows:
  - Address, phone, mock bio
  - Performance rating (stars & color badges)
  - Performance history
- Tabbed UI:
  - `Overview`, `Projects`, `Feedback` (mocked content)

#### 📌 Bookmark Manager (`/bookmarks`)
- View all bookmarked employees
- Remove bookmarks
- Trigger UI actions like “Promote” or “Assign to Project”

#### 📊 Analytics Dashboard (`/analytics`)
- Charts using Chart.js/Recharts:
  - Department-wise average performance
  - Bookmark trends (mocked)

---

## ⚙️ Additional Features

- ✅ Context API for global state management
- ✅ Mock authentication (login screen)
- ✅ “Create User” modal with form validation
- ✅ Infinite scroll on dashboard using Intersection Observer
- ✅ Dark mode toggle (context-driven)

---

## 🚀 Getting Started

### Clone the repo

```bash
git clone https://github.com/your-username/hr-performance-dashboard.git
cd hr-performance-dashboard
npm install
npm run dev
