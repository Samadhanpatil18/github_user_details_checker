const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const GITHUB_API = "https://api.github.com/users/";

// Fetching user details
app.get("/api/user/:username", async (req, res) => {
    const { username } = req.params;
    try {
        console.log(`Fetching user: ${username}`);  // Debugging Log
        const userResponse = await axios.get(`${GITHUB_API}${username}`);
        res.json(userResponse.data);
    } catch (error) {
        console.error("Error fetching user:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


// Fetching user repositories
app.get("/api/user/:username/repos", async (req, res) => {
    const { username } = req.params;
    try {
        const reposResponse = await axios.get(`${GITHUB_API}${username}/repos`);
        res.json(reposResponse.data);
    } catch (error) {
        res.status(404).json({ error: "Repositories not found." });
    }
});

// Fetching user commit count across all repositories
app.get("/api/user/:username/commits", async (req, res) => {
    const { username } = req.params;
    try {
        const reposResponse = await axios.get(`${GITHUB_API}${username}/repos`);
        const repos = reposResponse.data;

        let totalCommits = 0;
        for (const repo of repos) {
            try {
                const commitsResponse = await axios.get(`https://api.github.com/repos/${username}/${repo.name}/commits`);
                totalCommits += commitsResponse.data.length;
            } catch (error) {
                console.error(`Error fetching commits for ${repo.name}:`, error.message);
            }
        }

        res.json({ totalCommits });
    } catch (error) {
        res.status(404).json({ error: "Commits not found." });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));