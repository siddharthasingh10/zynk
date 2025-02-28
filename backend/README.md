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
## Post Routes

### Create a Post
```
POST /posts
```
**Request Body:**
```json
{
  "caption": "My first post",
  "image": "imageUrlString"
}
```
**Responses:**
- `201 Created`: Post created successfully.
- `400 Bad Request`: Validation errors.

---
### Get Posts
```
GET /posts
```
**Responses:**
- `200 OK`: Returns list of posts.

---
### Like a Post
```
POST /posts/:id/like
```
**Path Parameter:**
- `id`: Post ID

**Responses:**
- `200 OK`: Liked/unliked successfully.

---
### Comment on a Post
```
POST /posts/:id/comment
```
**Request Body:**
```json
{
  "comment": "Nice post!"
}
```
**Responses:**
- `201 Created`: Comment added successfully.
- `400 Bad Request`: Validation errors.

---
## Error Handling
Common error responses include:
- `400 Bad Request`: Missing or invalid input.
- `401 Unauthorized`: Authentication required.
- `403 Forbidden`: Not authorized to perform this action.
- `404 Not Found`: Resource does not exist.
- `500 Internal Server Error`: Unexpected server error.

---
## Notes
- Authentication is required for most actions except registering and logging in.
- JWT token should be passed in cookies for authentication.

For any additional details, refer to the full API documentation or contact the developer team.

