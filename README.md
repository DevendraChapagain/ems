# Employee Management System (EMS)

A simple and efficient Employee Management System (EMS) built to manage employee records, track activities, and organize internal workflows.

> This project currently uses **Local Storage** for data persistence (no backend).

---

## Features

* Basic Login System (Frontend-based)
* Add, Edit, and Delete Employees
* Dashboard UI for overview
* Data stored in browser using Local Storage
* Fast and lightweight (no server required)

---

## Tech Stack

* **Frontend:** React.js
* **Styling:** Tailwind CSS
* **Storage:** Browser Local Storage

---

## Project Structure

```
ems/
│── src/
│   │── components/
│   │── pages/
│   │── assets/
│   │── App.jsx
│   │── main.jsx
│── public/
│── package.json
```

---

## Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ems.git
cd ems
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the project

```bash
npm run dev
```

---

## How Data Works

* All employee data is stored in **Local Storage**
* Data persists even after page refresh
* Data will be lost if:

  * Browser cache is cleared
  * Switched to another device/browser

---

## 📸 Screenshots

(Add your UI screenshots here)

---

## Limitations

* ❌ No real authentication (frontend only)
* ❌ No database (data stored locally)
* ❌ Not suitable for production use

---

## Future Improvements

* 🔗 Add Backend (Node.js / Django)
* 🗄️ Database Integration (MongoDB / PostgreSQL)
* 🔐 Secure Authentication (JWT)
* 💬 Real-time Chat System
* 📁 Advanced File Sharing System

## Author

Devendra Chapagain
🔗 https://www.linkedin.com/in/devendra-chapagain-765366281/
