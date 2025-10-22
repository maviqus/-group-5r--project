# -group-5r--project

This repository is a small full-stack demo project (frontend + backend) used for group exercises: merging branches, conflict resolution, and basic CRUD with MongoDB. The backend includes an Express server and Mongoose models; when no MongoDB connection string is provided the server starts an in-memory MongoDB for testing.

## Technologies

- Node.js + Express
- MongoDB (MongoDB Atlas or in-memory via `mongodb-memory-server` for testing)
- Mongoose
- CORS
- Frontend: React (simple components in `src/components`)

## Structure

- `backend/` - Express backend, routes and models
- `blackend/` - legacy/alternate backend folder used in exercise
- `frontend/` - frontend app (React)
- `src/components` - consolidated frontend components

## Run locally (backend)

1. Open a terminal and go to the backend folder:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3a. Optional: If you have a MongoDB Atlas URI, set `MONGO_URI` (or `MONGODB_URI`) in a `.env` file in `backend/` (see `.env.example`).

3b. If you don't have MongoDB, the backend will automatically start an in-memory MongoDB for testing.

4. Start the server:

```bash
node server.js
# or for development
npm run dev
```

Server runs on port 3000 by default.

## API (CRUD) — Users

Base path: `http://localhost:3000/api/users`

Examples (curl):

GET all users

```bash
curl -X GET http://localhost:3000/api/users
```

POST create user

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com"}'
```

GET user by id

```bash
curl -X GET http://localhost:3000/api/users/<id>
```

PUT update user

```bash
curl -X PUT http://localhost:3000/api/users/<id> \
  -H "Content-Type: application/json" \
  -d '{"name":"New Name"}'
```

DELETE user

```bash
curl -X DELETE http://localhost:3000/api/users/<id>
```

## Contributors (from git history)

- Nguyen Xuan Bach <user-xuanbach@example.com> (17 commits)
- Student 1 <student@example.com> (9 commits)
- student <student@example.com> (6 commits)
- NguyenHoangPhuc2003i <phuc2k3i@gmail.com> (4 commits)
- Bùi Thiên Sơn <86700612+Buithienson@users.noreply.github.com> (1 commit)
- maviqus <bachnguyn.work@gmail.com> (1 commit)

## Notes

- The repository was used to practice merging multiple branches into `main`, resolving conflicts, and squashing commits. The backend will run with an in-memory MongoDB automatically if no `MONGO_URI` is present, making CI and local testing easier.

## How to submit

- The final `main` branch contains merged code. You can create a Pull Request from any active branch into `main` using GitHub UI if needed.
# Frontend (React) — User Management

This small React app demonstrates GET and POST requests to a backend API at http://localhost:3000/users using axios.

Quick start (Windows PowerShell):

```powershell
cd "c:\hoạt động 4\frontend"
npm install

# Run the fake REST API (json-server) on port 3000 from the frontend folder:
# Requires json-server (bundled with node) - runs in background in this session with:
# npx json-server --watch db.json --port 3000

# Start the React dev server and point it to the backend.
# PowerShell (recommended):
# set the API URL and a different PORT for React (3001) then start:
# $env:REACT_APP_API_URL = 'http://localhost:3000'; $env:PORT = '3001'; npm start

# If you prefer single-run (cmd.exe style) on PowerShell use this form:
# cmd /c "set REACT_APP_API_URL=http://localhost:3000 && set PORT=3001 && npm start"

# Default start (will fall back to REACT_APP_API_URL=http://localhost:3000 if not set):
npm start
```

Pages / Components:
- `src/components/UserList.jsx` — fetches users with GET `http://localhost:3000/users` and displays them. It listens for a `user:added` event to refresh.
- `src/components/AddUser.jsx` — posts new users to POST `http://localhost:3000/users` with JSON `{ name, email }`.

Notes:
- Ensure your backend server is running on the address in `REACT_APP_API_URL` (defaults to `http://localhost:3000`) and exposes the `/users` GET and POST endpoints.
- If you see ERR_CONNECTION_REFUSED when opening `http://localhost:3000` in the browser after running `npm start`, that's likely because the React dev server started on another port (for example 3001) or the backend isn't running.
- To avoid CORS issues, enable CORS on the backend or set the `REACT_APP_API_URL` to the correct backend URL.
