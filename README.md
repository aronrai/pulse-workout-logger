# Pulse

A minimalist, high-velocity workout logger designed to track training performance and calculate lifting volume in real time. Built using the MERN stack, Tailwind CSS, and Zustand.

---

## Core Features

- **Dynamic Dashboard (Home):** Displays today's total volume metrics and lists all workout logs completed within the current calendar day.
- **Lifetime Metrics (Profile):** Aggregates total historical data to display your lifetime weight lifted.
- **Log History:** A dedicated archive to review and audit all past training sessions.
- **Automated Volume Processing:** Eliminates manual calculations by computing volume instantly on the database layer.

**Volume Calculation:**
**Volume** = Weight × Reps × Sets

---

## Technical Toolkit

| Layer                | Technology              | Purpose                                                                                            |
| -------------------- | ----------------------- | -------------------------------------------------------------------------------------------------- |
| **Frontend UI**      | React.js & Tailwind CSS | Semantic HTML structural design with a clean, dark-mode aesthetic.                                 |
| **State Management** | Zustand                 | Atomic, decoupled global state management to eliminate unnecessary re-renders.                     |
| **Backend API**      | Node.js & Express       | Lightweight REST API routing handling secure payload verification.                                 |
| **Database Layer**   | MongoDB & Mongoose      | Schematized data storage utilizing indexing and aggregation pipelines for heavy math calculations. |
| **Deployment**       | Render                  | Production-grade hosting configuration for decoupled client/server architecture.                   |

---

## Architectural Data Flow

The application processes telemetry data using a strict **Source ➔ Destination ➔ Action** architectural pattern to ensure fast render times and strict data types.

```
[Client UI Input] ➔ [Zustand Actions] ➔ [Express API Route] ➔ [Mongoose Pipeline] ➔ [MongoDB BSON Storage]

```

---

## Configuration & Setup

### Environment Variables

To run this project locally, establish the following keys within your environment configuration files.

#### Backend (`/backend/.env`)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_jwt_passphrase

```

---

## Local Installation

1. **Clone the repository:**

```bash
git clone https://github.com/aronrai/pulse-workout-logger.git
cd pulse-workout-logger

```

2. **Initialize Backend Server:**

```bash
cd server
npm install
node app.js

```

3. **Initialize Frontend Client:**

```bash
   cd ../client
   npm install
   npm run dev

```

---

## Deployment Mechanics

This application is optimized for deployment on **Render** via a decoupled architecture:

- The **Backend API** is deployed as a Web Service running on a Node environment, utilizing environment variables to safely connect to MongoDB Atlas.
- The **Frontend Client** is built via Vite production bundling and deployed as a Static Site, configured with a single-page application rewrite rule (`/* -> /index.html`) to support client-side routing.

---

## Author

Designed and developed by **Aron Rai**. Focused on building clean, high-performance web applications with semantic code and minimalist interfaces.

```

```
