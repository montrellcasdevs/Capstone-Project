# Bookstore Capstone (React + Node + MongoDB)

## Overview
This project is a full-stack bookstore application with:
- React frontend (search, product details, cart, checkout flow)
- Express + MongoDB backend (auth, products, orders)
- JWT authentication for protected user/order routes

## Tech Stack
- Frontend: React, React Router, Context API, Tailwind CSS
- Backend: Node.js, Express, Mongoose, JWT, bcrypt
- Database: MongoDB Atlas

## Project Structure
- `src/` - React frontend
- `server/` - Express API and MongoDB models/routes
- `API_PLAN.md` - planned API specifications for the capstone

## API Summary (Current)
### Public
- `GET /` - health check
- `POST /login`
- `POST /register`
- `GET /444/products`
- `GET /444/products/:id`
- `GET /444/featured_products`

### Protected (JWT)
- `GET /600/users/:id`
- `GET /660/orders?user.id=:id`
- `POST /660/orders`

## Local Setup
### 1) Install frontend dependencies
```powershell
npm install
```

### 2) Install backend dependencies
```powershell
npm --prefix server install
```

### 3) Configure environment variables
Create `server/.env`:
```env
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
PORT=8000
NODE_ENV=development
```

Create `.env` in project root:
```env
REACT_APP_HOST=http://localhost:8000
REACT_APP_GUEST_LOGIN=guest@example.com
REACT_APP_GUEST_PASSWORD=guest123
```

### 4) Run backend
```powershell
npm --prefix server start
```

### 5) Run frontend
```powershell
npm start
```

## Build
```powershell
npm run build
```

## Testing Status
- Manual API and app flow checks completed.
- Automated unit/integration tests are planned as a follow-up milestone.

## Submission Workflow
- Develop on `dev` branch.
- Open Pull Request from `dev` -> `main` when ready for mentor review.
- Do not merge PR before formal grading.

## Deployment (Capstone `dev`)

### Backend on Render
1. In Render, create a new Web Service from this repository.
2. Use Blueprint (`render.yaml`) or set manually:
	- Root Directory: `server`
	- Build Command: `npm install`
	- Start Command: `npm start`
3. Add environment variables in Render:
	- `MONGODB_URI`
	- `JWT_SECRET`
	- `NODE_ENV=production`
4. Deploy and copy the backend URL (example: `https://capstone-bookstore-api.onrender.com`).

### Frontend on Netlify
1. In Netlify, import the same repository.
2. Set branch to `dev` for your dev deployment.
3. Build settings (also defined in `netlify.toml`):
	- Build command: `npm run build`
	- Publish directory: `build`
4. Add environment variable in Netlify:
	- `REACT_APP_HOST=https://your-render-backend-url.onrender.com`
5. Deploy and validate app + API flows.

### Notes
- Frontend and backend must use separate hosts in production (Netlify + Render).
- Keep real secrets only in platform environment settings, never in committed `.env` files.
