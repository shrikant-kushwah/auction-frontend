# Auctionary

A modern, real-time auction platform where users can explore, bid, and create auctions. Built with React, Vite, Tailwind CSS, Redux, and a Node.js/Express/MongoDB backend.

## Features

- **Live Auctions:** Bid in real-time and compete for top treasures.
- **User Authentication:** Register and log in to participate or host auctions.
- **Auction Management:** Create, view, and manage your own auctions.
- **Responsive UI:** Beautiful, mobile-friendly design with Tailwind CSS.
- **Real-time Updates:** Powered by Socket.IO for instant bid updates.
- **Persistent State:** Redux and redux-persist for robust state management.

## Tech Stack

- **Frontend:** React, Vite, Tailwind CSS, Redux, React Router, Axios, Socket.IO Client
- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.IO, JWT, Multer, Cloudinary

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- MongoDB instance (local or cloud)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/auctionary.git
cd auctionary
```

#### 2. Setup the Backend

```bash
cd auction-backend
npm install
# Create a .env file with your MongoDB URI and other secrets
npm run dev
```

#### 3. Setup the Frontend

```bash
cd ../auction-frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:5173` (default Vite port).

## Folder Structure

```
auctionary/
  ├── auction-frontend/   # React + Vite + Tailwind CSS app
  └── auction-backend/    # Node.js + Express + MongoDB API
```

## Environment Variables

- **Backend:** Create a `.env` file in `auction-backend/` with:
  ```
  MONGODB_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret
  CLOUDINARY_URL=your_cloudinary_url
  ```
- **Frontend:** (If needed, for API URLs, etc.)

## Scripts

- **Frontend:**
  - `npm run dev` – Start development server
  - `npm run build` – Build for production
  - `npm run lint` – Lint code
- **Backend:**
  - `npm run dev` – Start backend with nodemon
  - `npm start` – Start backend

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

