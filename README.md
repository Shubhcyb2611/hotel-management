# 🏨 Hotel Room Reservation System

A full-stack Hotel Room Reservation System built for the Unstop SDE-3 assessment.

This system optimally allocates hotel rooms based on travel time, floor priority, and booking constraints, while providing a clean and intuitive UI.

---

## 📌 Problem Overview

- Hotel has **97 rooms across 10 floors**
- Floors 1–9 → 10 rooms each
- Floor 10 → 7 rooms
- Staircase/Lift on left
- Horizontal movement → 1 min per room
- Vertical movement → 2 min per floor
- Max **5 rooms per booking**
- Priority:
  1. Same floor booking
  2. Minimum total travel time
  3. Optimized cross-floor allocation

---

## 🚀 Features

### Frontend
- Floor-wise hotel layout visualization
- Real-time room booking
- Color-coded room states
- Controls:
  - Book Rooms
  - Reset Booking
  - Random Occupancy
- Responsive, clean UI

### Backend
- REST APIs for room management
- Optimized booking logic
- Travel time calculation
- Stateless API design

---

## 🧠 Booking Logic Summary

1. Try to allocate rooms on the same floor
2. If not enough rooms:
   - Evaluate combinations across floors
   - Minimize total vertical + horizontal travel time
3. Update availability atomically

---

## 🧱 Tech Stack

### Frontend
- React
- TypeScript
- Axios
- CSS (custom, no UI library)

### Backend
- Node.js
- NestJS / Express
- Prisma ORM
- PostgreSQL

---

## 📁 Project Structure



hotel-management/
│
├── frontend/
│ ├── src/
│ │ ├── App.tsx
│ │ ├── App.css
│ │ └── services/api.ts
│ └── package.json
│
├── backend/
│ ├── src/
│ │ ├── hotel/
│ │ ├── booking/
│ │ └── main.ts
│ ├── prisma/
│ │ └── schema.prisma
│ └── openapi.yaml
│
└── README.md


---

## 🔌 Backend API Endpoints

| Method | Endpoint | Description |
|------|---------|-------------|
| GET | `/api/hotel/rooms` | Fetch all rooms |
| POST | `/api/hotel/book` | Book rooms |
| POST | `/api/hotel/reset` | Reset hotel |
| POST | `/api/hotel/randomize` | Random occupancy |

---

## ▶️ How to Run

### Backend
```bash
cd backend
npm install
npx prisma migrate dev
npm run start

Frontend
cd frontend
npm install
npm run dev
