# Bookstore Backend - MongoDB Atlas Setup

## 🚀 Setup Instructions

### 1. MongoDB Atlas Configuration

1. **Create MongoDB Atlas Account**
   - Go to [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose the FREE tier (M0)
   - Select your preferred cloud provider and region
   - Name your cluster (e.g., "bookstore-cluster")

3. **Create Database User**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create a username and strong password (save these!)
   - Set role to "Read and write to any database"

4. **Configure Network Access**
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your specific IP addresses

5. **Get Connection String**
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/`)

### 2. Backend Installation

```powershell
# Navigate to the server directory
cd server

# Install dependencies
npm install

# Create .env file from example
Copy-Item .env.example .env

# Edit .env file with your MongoDB Atlas credentials
notepad .env
```

### 3. Environment Variables

Edit the `.env` file with your actual credentials:

```env
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/bookstore?retryWrites=true&w=majority
JWT_SECRET=your_random_long_secret_key_here
PORT=8000
NODE_ENV=development
```

**Important:** Replace:
- `YOUR_USERNAME` - Your MongoDB Atlas database user
- `YOUR_PASSWORD` - Your database user password (URL encode special characters)
- `YOUR_CLUSTER` - Your cluster name from Atlas

### 4. Seed the Database

```powershell
# Load products into MongoDB Atlas
npm run seed
```

### 5. Start the Backend Server

```powershell
# Development mode (with auto-restart)
npm run dev

# Or production mode
npm start
```

Server will run on `http://localhost:8000`

### 6. Update React Frontend

Create a `.env` file in the root directory (bookstore folder):

```env
REACT_APP_HOST=http://localhost:8000
```

### 7. Start the React Application

```powershell
# From the root bookstore directory
npm start
```

## 📡 API Endpoints

### Public Routes
- `GET /` - Health check (`{"message":"Bookstore API is running"}`)
- `GET /444/products` - Get all products (with optional ?name_like= search)
- `GET /444/products/:id` - Get single product
- `GET /444/featured_products` - Get featured products
- `POST /login` - User login
- `POST /register` - User registration

### Protected Routes (require JWT token)
- `GET /600/users/:id` - Get user profile
- `GET /660/orders?user.id=:userId` - Get user orders
- `POST /660/orders` - Create new order

## 🔧 Troubleshooting

### Connection Issues
- Verify your IP is whitelisted in MongoDB Atlas Network Access
- Check your connection string is correct in `.env`
- Ensure your password doesn't have special characters (or URL encode them)

### Authentication Issues
- Make sure JWT_SECRET is set in `.env`
- Check that the token is being sent in Authorization header

### Request Body Issues
- If a request body contains malformed JSON, Express may return a generic `500` response from the current error handler
- Ensure requests use valid JSON with header `Content-Type: application/json`

### Seeding Issues
- Verify MongoDB connection string is correct
- Check that the database user has write permissions

## 📝 Notes

- The server maintains the same API structure as json-server for compatibility
- JWT tokens expire after 7 days
- All passwords are hashed using bcrypt before storage
- User IDs are now MongoDB ObjectIDs instead of integers

## 🔄 Migrating from json-server

The backend is designed to be a drop-in replacement for json-server. The frontend code doesn't need changes except for the `REACT_APP_HOST` environment variable pointing to your new backend.

**Key differences:**
- User IDs are now MongoDB ObjectIDs (strings) instead of integers
- Passwords are properly hashed (more secure than json-server-auth)
- Real database persistence (not just a JSON file)
