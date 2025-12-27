# Twitter_API

Absolutely! I can help you create a **comprehensive README** for your X Account Finder group project following your instructor’s format. I’ll structure it professionally and include placeholders for sensitive keys, team roles, and instructions. You can fill in specific details as needed.

---

# X Account Finder - Group Project

# Project Overview

**X Account Finder** is a web application that allows users to search for X (formerly Twitter) accounts by username and view profile information dynamically. The project uses the X API v2 and demonstrates API integration, DOM manipulation, responsive design, and error handling.


# 1. Base URL

```
https://api.twitter.com/2/
```


# 2. Endpoints

| Endpoint                       | Method | Description                                                                                                                             |
| ------------------------------ | ------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| `/users/by/username/:username` | GET    | Fetches a user profile by username. Returns basic user info such as ID, name, username, profile image, description, and public metrics. |
| `/tweets`                      | GET    | Retrieves a user’s recent tweets. (Optional extension for timeline feature)                                                             |
| `/users/:id/followers`         | GET    | Returns a list of followers for the specified user ID. (Optional extension for analytics)                                               |

> **Primary endpoint used in project:** `/users/by/username/:username`


# 3. Required Parameters

| Parameter       | Type       | Description                                                                                                            |
| --------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| `username`      | path/query | The X username to search for (required)                                                                                |
| `user.fields`   | query      | Comma-separated fields to include in the response (e.g., `profile_image_url,name,username,description,public_metrics`) |
| `Authorization` | header     | Bearer token for OAuth 2.0 authentication                                                                              |


# 4. Authentication

The application uses **OAuth 2.0 Bearer Token** authentication for secure API requests.

* **Header Example:**

```
Authorization: Bearer YOUR_BEARER_TOKEN_HERE
```


# 5. Sample JSON Response

```json
{
  "data": {
    "id": "123456789",
    "name": "John Doe",
    "username": "john_doe",
    "profile_image_url": "https://pbs.twimg.com/profile_images/.../profile.jpg",
    "description": "Web Developer and Tech Enthusiast",
    "public_metrics": {
      "followers_count": 150,
      "following_count": 75,
      "tweet_count": 300
    }
  }
}
```

**Fields displayed on UI:**

* `profile_image_url` → Profile picture
* `name` → User full name
* `username` → Displayed as `@username`
* `id` → User ID
* `description` → User bio
* `public_metrics` → Followers, Following, Tweets


# 6. API Testing Using POSTMAN

* **Setup:**

  * Authorization: Bearer Token (OAuth 2.0)
  * Headers: `Authorization: Bearer YOUR_BEARER_TOKEN_HERE`
  * Query Parameters: `username`, `user.fields`
* **Test Cases:**

  1. **Successful Response (200):** Returns user profile data.
  2. **Error 401:** Invalid or missing token.
  3. **Error 404:** Username not found.
  4. **Error 429:** Search limit exceeded for free tier.
* Screenshots of Postman requests/responses must be included in demo video.


# 7. Fetch the Data (JavaScript)

* Uses `fetch()` with `async/await` to retrieve data.
* API logic is modular and reusable:

```javascript
async function fetchUser(username) {
  const response = await fetch(`/search?username=${encodeURIComponent(username)}`);
  const data = await response.json();
  return data;
}
```


# 8. Display Data in HTML (DOM)

* Dynamic DOM manipulation is used:

  * **Cards:** Display user profile info
  * **Images:** Profile picture
  * **Text:** Name, username, bio
  * **Metrics:** Followers, Following, Tweets


# 9. Error Handling

* No results found → shows error message
* Invalid input → prompts user to enter a valid username
* Failed API request → shows server error message
* Authentication errors → shows relevant error
* Loading state → “Loading…” text while fetching


# 10. Input Validation

* Empty inputs prevented
* Whitespace trimmed automatically
* Buttons disabled during API calls
* Invalid characters prevented


# 11. Loading State

* Displays “Loading…” text while data is being fetched from the API.


# 12. Responsive Design

* Works on desktop and mobile screens.
* Container, cards, and search bar adjust based on screen width.


# 13. File Requirements

| File         | Description                                            |
| ------------ | ------------------------------------------------------ |
| `index.html` | Main HTML structure                                    |
| `style.css`  | Styles for dark/light mode, responsive layout          |
| `script.js`  | Fetching API, DOM updates, input validation, dark mode |


# 14. Code Organization

* Functions separated by responsibility:

  * API calls → `fetchUser()`
  * DOM updates → `displayProfile()`
  * Utility → `showError()`, `hideError()`
* No duplicated code


# 15. UI Requirements

* Search input field
* Search button
* Profile result container (card)
* Error message container
* Dark mode toggle
* Footer for API credits


# 16. API Key & Token Security

* **Do not commit tokens to GitHub**
* Use placeholders in public repository:

```javascript
const BEARER_TOKEN = "YOUR_BEARER_TOKEN_HERE";
```


# 17. GitHub Collaboration Requirements

* Shared GitHub repository
* Each member works on own branch
* Meaningful commits and pull requests (PR)
* Merge conflicts resolved properly
* Screenshots of collaboration included


# 18. Role Assignment

*  Llena,  John Patrick B. -  API & Authentication Handler,  GitHub & Documentation Manager
* Versoza, Jhon Paul D.    -  JavaScript Logic / Data Processing
* Dumaquit, Rachelle Ann   -  UI & CSS Designer 


# 19. Demo Video

* Must demonstrate:

  * Postman testing
  * UI interaction
  * Error handling
  * Dark mode toggle
  * Free tier search limitation


