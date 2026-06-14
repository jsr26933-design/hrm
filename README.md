# WorkPilot HR — Enterprise HRMS

**Smart HR. Simplified Workforce Management.**

A fully functional, enterprise-grade Human Resource Management System built as a
single-page application. No build step required — runs directly in any modern browser.

---

## 🚀 Getting Started

### Option 1 — XAMPP (Recommended)
1. Place the `WorkPilot HR` folder inside `C:\xampp\htdocs\`
2. Start Apache in XAMPP Control Panel
3. Open: **http://localhost/WorkPilot%20HR/**

### Option 2 — VS Code Live Server
1. Open the folder in VS Code
2. Right-click `index.html` → **Open with Live Server**

### Option 3 — Direct File
- Double-click `index.html` (note: Google Fonts requires internet connection)

### Demo Login
| Field    | Value                  |
|----------|------------------------|
| Email    | admin@workpilot.hr     |
| Password | admin123               |

---

## 📦 Project Structure

```
WorkPilot HR/
├── index.html              # Entry point
├── assets/
│   └── favicon.svg
├── css/
│   ├── main.css            # Layout, login, sidebar, topbar, animations
│   ├── components.css      # Buttons, cards, tables, modals, forms, badges
│   └── modules.css         # Module-specific styles + loader
└── js/
    ├── data.js             # Mock data store (WP namespace)
    ├── app.js              # Core controller, routing, helpers, toast
    ├── dashboard.js        # Dashboard + charts
    ├── employees.js        # Employee management + profiles
    ├── attendance.js       # Attendance tracking + check-in
    ├── leaves.js           # Leave management + approvals
    ├── payroll.js          # Payroll processing + payslips
    ├── tasks.js            # Kanban task board + list view
    ├── tracking.js         # Workforce tracking + timeline
    ├── gps.js              # GPS map + selfie attendance
    ├── reports.js          # Analytics + report templates
    ├── selfservice.js      # Employee self-service portal
    ├── rbac.js             # Roles & access control
    └── settings.js         # All system settings
```

---

## 🎯 Core Modules

| Module | Features |
|--------|----------|
| **Dashboard** | Live KPIs, attendance donut, payroll trend chart, activity feed |
| **Employee Management** | Grid/list view, profiles, documents, org details |
| **Attendance** | Daily log, calendar heatmap, bulk upload, check-in widget |
| **Leave Management** | Multi-type balances, approval workflow, calendar, policy |
| **Payroll** | Salary register, payslip generator, statutory deductions, history |
| **Task Management** | Kanban board, list view, priority, progress tracking |
| **Workforce Tracking** | Productivity charts, overtime, activity timeline |
| **GPS Attendance** | Live map, geo-fence, selfie verification, live trackers |
| **Reports & Analytics** | 8 report templates, charts, heatmaps, KPIs |
| **Self Service Portal** | My payslips, leave apply, attendance, documents |
| **Roles & Access** | 6 roles, permissions matrix, user invite |
| **Settings** | 9 setting sections, integrations, billing |

---

## 🎨 Brand

| Token | Value |
|-------|-------|
| Primary | `#2563EB` (Professional Blue) |
| Secondary | `#0F172A` (Dark Navy) |
| Accent | `#F97316` (Orange) |
| Font | Inter (Google Fonts) |

---

## 🛠 Tech Stack

- **HTML5** — Semantic markup
- **CSS3** — Custom properties, Grid, Flexbox, animations
- **Vanilla JS** — ES6+, modular architecture
- **Chart.js 4.4** — Analytics charts (CDN)
- **Google Fonts** — Inter typeface (CDN)

---

## 📋 Browser Support

Chrome 90+, Firefox 88+, Safari 14+, Edge 90+

---

*WorkPilot HR © 2025 — Enterprise Edition v2.1*
