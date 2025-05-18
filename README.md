# Cinema Seat Reservation App 🎬

This is a full-stack modular movie ticket booking app with seat selection, time-based reservation hold logic, and a real-time-ready architecture.

## ✨ Features

- 🎥 Cinema and movie structure with multiple screening times per movie
- 🪑 Seat selection with visual grid UI and per-user seat ownership
- ⏳ 15-minute timer holds seats temporarily until reservation
- ✅ Seat availability updates after reservation
- 🚫 Conflict prevention: blocks already reserved seats
- 🔐 Simple user name entry (no authentication system required)
- 🧠 Redux Toolkit for state management
- ⚛️ React + TypeScript frontend
- 🎨 TailwindCSS for styling
- 🔥 TanStack React Query for data fetching
- 🌐 Node.js + Express backend with MongoDB + Mongoose
- ♻️ Modular separation: services, controllers, routes

## 📦 Tech Stack

| Layer     | Technology                     |
|-----------|--------------------------------|
| Frontend  | React, TypeScript, Redux Toolkit, React Query, TailwindCSS |
| Backend   | Node.js, Express, TypeScript   |
| Database  | MongoDB (Mongoose ODM)         |
| Real-time | Socket.IO (planned)            |

## 📁 Project Structure Highlights

```
├── client/
│   ├── components/         # Reusable UI like <Timer />
│   ├── hooks/              # Custom React hooks (e.g. useCinemas)
│   ├── store/              # Redux slices (user, cinema, movie)
│   ├── pages/              # Page views (e.g. Home.tsx)
│   └── routes/             # React Router setup
├── server/
│   ├── controllers/        # Logic for routes (e.g. reservationController)
│   ├── models/             # Mongoose schemas
│   ├── routes/             # Express routers
│   └── services/           # DB service layer
```

## 🧪 Key Functional Logic

- Seats can only be selected if available
- Up to 4 seats can be selected at once
- Timer shown while holding seats (15-minute timeout)
- Reservation updates DB and UI
- Color coding:
  - White: Available
  - Green: Reserved by you
  - Red: Reserved by someone else


## 🚀 How to Run

1. Clone the repo and install dependencies:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
2. Start the backend:
   ```bash
   npm run dev
   ```
3. Start the frontend:
   ```bash
   npm run dev
   ```

## 🙏 Notes

- No authentication yet – user enters a name on load
- Real-time updates (via Socket.IO) can be added later
- Designed for modularity, scalability, and clean maintainable code

---

Made with ❤️ by Itay
