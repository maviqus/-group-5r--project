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
