# Bookstore API Plan (Capstone)

## Project Goal
Build a REST API that supports a bookstore frontend with authentication, product browsing/searching, checkout, and user order history.

## Architecture Choice
- API Style: REST (JSON)
- Versioning: `/api/v1`
- Auth: JWT Bearer tokens
- Roles: `user` (MVP), `admin` (future)

## Core Entities
- User
- Product
- Order
- Future: Review, Wishlist

## Authentication Endpoints
- `POST /api/v1/auth/register`
  - Create new user account.
- `POST /api/v1/auth/login`
  - Authenticate user and return access token.
- `GET /api/v1/auth/me`
  - Return currently logged-in user profile (protected).

## Product Endpoints
- `GET /api/v1/products`
  - List products with optional query params:
  - `search`, `category`, `sort`, `page`, `limit`, `inStock`
- `GET /api/v1/products/:id`
  - Get single product details.
- `GET /api/v1/products/featured`
  - Get featured/best-seller products.

## Order Endpoints (Protected)
- `POST /api/v1/orders`
  - Create a new order from cart items.
- `GET /api/v1/orders`
  - List current user’s order history.
- `GET /api/v1/orders/:id`
  - Get one order’s details (must belong to authenticated user).

## MVP Request/Response Contract
- Success:
  - `{ "success": true, "data": ..., "message": "..." }`
- Error:
  - `{ "success": false, "error": { "code": "...", "message": "..." } }`

## Common Status Codes
- `200 OK`
- `201 Created`
- `400 Bad Request`
- `401 Unauthorized`
- `403 Forbidden`
- `404 Not Found`
- `500 Internal Server Error`

## Validation Rules (General)
- Register: valid email, required name, password minimum length.
- Login: valid email/password required.
- Order creation: non-empty cart, valid product IDs, quantity > 0.
- Product list: enforce max page size for pagination.

## Security Plan
- Hash passwords with bcrypt.
- Store JWT secret in environment variables.
- Require `Authorization: Bearer <token>` on protected routes.
- Validate/sanitize request input on write operations.

## Future Enhancements (Bells and Whistles)
### Reviews
- `POST /api/v1/products/:id/reviews`
- `GET /api/v1/products/:id/reviews`

### Wishlist
- `GET /api/v1/wishlist`
- `POST /api/v1/wishlist`
- `DELETE /api/v1/wishlist/:productId`

### Admin Product Management
- `POST /api/v1/products`
- `PUT /api/v1/products/:id`
- `DELETE /api/v1/products/:id`

## Testing Checklist
- Auth flow: register/login/token validation.
- Product list/search/detail endpoints.
- Protected order routes with valid and invalid tokens.
- Error behavior for invalid payloads and missing resources.

## Notes
This is a general API plan and is expected to evolve while implementing the project.
