# API Documentation

## Base URL
```
http://yourdomain.com/api
```

## Authentication
All protected routes require the user to be authenticated. Use the authentication token received on login in subsequent requests.

---
## User Routes

### Register a User
```
POST /register
```
**Request Body:**
```json
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "password123"
}
```
**Responses:**
- `201 Created`: User registered successfully.
- `400 Bad Request`: Validation errors or user already exists.

---
### Login
```
POST /login
```
**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
**Responses:**
- `200 OK`: Login successful, returns auth token.
- `400 Bad Request`: Invalid email or password.

---
### Logout
```
GET /logout
```
**Responses:**
- `200 OK`: Logged out successfully.

---
### Get User Details
```
GET /:id/user
```
**Path Parameter:**
- `id`: User ID

**Responses:**
- `200 OK`: Returns user details.
- `404 Not Found`: User does not exist.

---
### Edit Profile
```
PUT /profile/edit
```
**Request Body:**
```json
{
  "bio": "New bio here",
  "gender": "male",
  "profilePicture": "base64encodedString"
}
```
**Responses:**
- `200 OK`: Profile updated successfully.
- `404 Not Found`: User not found.

---
### Get Suggested Users
```
GET /suggested
```
**Responses:**
- `200 OK`: Returns a list of suggested users.

---
### Follow or Unfollow User
```
POST /:id/followorunfollow
```
**Path Parameter:**
- `id`: User ID to follow/unfollow

**Responses:**
- `200 OK`: Followed/Unfollowed successfully.
- `400 Bad Request`: Cannot follow yourself.
- `404 Not Found`: User not found.

---
