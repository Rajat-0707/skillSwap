# SkillSwap

A skill-sharing platform where users can offer skills they know and find others to learn from. Connect, request skill exchanges, and chat in real time.

## Features

- **Authentication** — Sign up, log in, and JWT-based protected routes
- **Profile** — Manage your skills offered, skills wanted, bio, location, and education
- **Search** — Find users by skills they offer or want
- **View Profile** — Browse other users’ profiles and send skill exchange requests
- **Requests** — Send and respond to skill swap requests
- **Messages** — Real-time messaging with Socket.io
  - Inbox with recent conversations
  - One-on-one chat
- **Responsive** — Layout adapts to mobile, tablet, and desktop

## Tech Stack

| Layer     | Stack |
|-----------|-------|
| Frontend  | React 19, Vite, React Router, Axios, Socket.io Client, Lucide React |
| Backend   | Express 5, Node.js, TypeScript |
| Database  | MongoDB (Mongoose) |
| Real-time | Socket.io |
| Auth      | JWT |

## Project Structure

```
skillSwap/
├── skillSwapFrontend/    # React + Vite app
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── config/       # Axios config
│   │   ├── css/          # Stylesheets
│   │   ├── pages/        # Page components
│   │   └── socket.ts     # Socket.io client
│   └── package.json
├── skillSwapBackend/     # Express API + Socket.io
│   ├── db/               # MongoDB connection
│   ├── middleware/       # Auth middleware
│   ├── model/            # Mongoose models
│   ├── routes/           # API routes
│   ├── src/
│   │   └── server.ts     # Entry point
│   └── package.json
└── README.md
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)
- npm or yarn

## Setup

### 1. Clone the repository

```bash
git clone <repository-url>
cd skillSwap
```

### 2. Backend setup

```bash
cd skillSwapBackend
npm install
```

Create a `.env` file in `skillSwapBackend/`:

```env
MONGO_URI=mongodb://localhost:27017/skillswap
JWT_SECRET=your-secret-key-here
PORT=5000
```

### 3. Frontend setup

```bash
cd skillSwapFrontend
npm install
```

For local development, the default API URL is `http://localhost:5000`. To use a different backend URL:

Create a `.env` file in `skillSwapFrontend/`:

```env
VITE_API_URL=http://localhost:5000
```

## Running the App

### Development

1. Start the backend:
   ```bash
   cd skillSwapBackend
   npm run dev
   ```
   Server runs at `http://localhost:5000`

2. Start the frontend:
   ```bash
   cd skillSwapFrontend
   npm run dev
   ```
   App runs at `http://localhost:5173` (or the port Vite assigns)

### Production

1. Build the backend:
   ```bash
   cd skillSwapBackend
   npm run build
   npm start
   ```

2. Build the frontend:
   ```bash
   cd skillSwapFrontend
   npm run build
   ```
   Serve the `dist/` folder with a static server or your hosting platform.

## API Overview

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/login` | Login |
| POST | `/signup` | Register |
| GET | `/me` | Current user (auth required) |
| GET | `/search` | Search users |
| GET | `/viewProfile/:id` | Get user profile |
| PUT | `/updateProfile` | Update profile |
| GET | `/conversations` | List conversations (auth required) |
| GET | `/messages/:receiverId` | Get messages with a user (auth required) |

## Socket Events

- `privateMessage` — Send a message: `{ toUserId, message }`
- `receiveMessage` — Receive a new message

## Environment Variables

| Variable | Where | Description |
|----------|-------|-------------|
| `MONGO_URI` | Backend | MongoDB connection string |
| `JWT_SECRET` | Backend | Secret for JWT signing |
| `PORT` | Backend | Server port (default: 5000) |
| `VITE_API_URL` | Frontend | API base URL (default: http://localhost:5000) |

## License

MIT
