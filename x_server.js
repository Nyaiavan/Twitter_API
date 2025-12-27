// Import required modules
import express from "express";        // Express framework for server
import fetch from "node-fetch";       // To make HTTP requests to X API
import path from "path";              // To handle file paths
import { fileURLToPath } from "url";  // To work with ES modules' __dirname

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Express app
const app = express();
const PORT = 5502; // Port to run server

// X API Bearer Token - used for authentication with X API
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAALPu6QEAAAAAlXTKxpoAqWpkz6TOx4E81EEqcYw%3DSDsgzM9ftIUGNY8QGN6iklk3K5rhUO9ss6UdI1GfcdnvWNqvST";

// Serve static files (CSS, JS, images) from current directory
app.use(express.static(__dirname));

// Track searches for free tier limitation
let searchCount = 0;       // Only counts new username searches
const cache = {};          // Cache object to store previously fetched usernames

/**
 * GET /search
 * Query parameter: username
 * Fetches user profile from X API or returns from cache
 */
app.get("/search", async (req, res) => {
  const username = req.query.username; // Get username from query parameter
  if (!username) return res.status(400).json({ error: "Username required" }); // If missing, send error

  // If username is already cached, serve it immediately
  if (cache[username]) return res.json(cache[username]);

  // Check free-tier search limit
  if (searchCount >= 3) {
    return res.status(429).json({
      error: "Free tier allows only 3 searches for new usernames. Wait 15 minutes."
    });
  }

  try {
    // Fetch user data from X API
    const response = await fetch(
      `https://api.twitter.com/2/users/by/username/${username}?user.fields=profile_image_url,username,name,description,public_metrics`,
      {
        headers: { Authorization: `Bearer ${BEARER_TOKEN}` } // Authenticate with Bearer token
      }
    );

    // Handle non-OK responses
    if (!response.ok) {
      const errText = await response.text();
      return res.status(response.status).json({ error: errText });
    }

    // Convert response to JSON
    const data = await response.json();

    // Handle X API errors
    if (data.errors) return res.status(404).json({ error: data.errors[0].detail });

    // Cache the result for future requests
    cache[username] = data.data;

    // Increase search count for free-tier limit
    searchCount++;

    // Return the user profile data
    res.json(data.data);

  } catch (err) {
    // Handle unexpected server or network errors
    res.status(500).json({ error: err.message });
  }
});

// Serve main HTML page
app.get("/", (req, res) => res.sendFile(path.join(__dirname, "index.html")));

// Start server and listen on PORT
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
