async function fetchProfile() {
    let username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a GitHub username!");
        return;
    }
    
    try {
        let response = await fetch(`http://localhost:5000/api/user/${username}`);
        let data = await response.json();
        
        if (data.avatar_url) {
            document.getElementById("result").innerHTML = `
                <img src="${data.avatar_url}" width="150" alt="Profile Picture">
                <p><strong>Name:</strong> ${data.name}</p>
                <p><strong>Bio:</strong> ${data.bio || 'No bio available'}</p>
                <p><strong>Followers:</strong> ${data.followers}</p>
                <p><strong>Following:</strong> ${data.following}</p>`;
        } else {
            document.getElementById("result").innerHTML = "<p style='color:red;'>User not found!</p>";
        }
    } catch (error) {
        document.getElementById("result").innerHTML = "<p style='color:red;'>Error fetching user data</p>";
    }
}

async function fetchRepos() {
    let username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a GitHub username!");
        return;
    }
    
    try {
        let response = await fetch(`http://localhost:5000/api/user/${username}/repos`);
        let repos = await response.json();
        let repoList = repos.map(repo => `<li><a href="${repo.html_url}" target="_blank">${repo.name}</a></li>`).join('');
        document.getElementById("result").innerHTML = `<h3>Repositories:</h3><ul>${repoList}</ul>`;
    } catch (error) {
        document.getElementById("result").innerHTML = "<p style='color:red;'>Error fetching repositories</p>";
    }
}

async function fetchCommits() {
    let username = document.getElementById("username").value;
    if (!username) {
        alert("Please enter a GitHub username!");
        return;
    }
    
    try {
        let response = await fetch(`http://localhost:5000/api/user/${username}/commits`);
        let data = await response.json();
        document.getElementById("result").innerHTML = `<h3>Total Commits: ${data.totalCommits}</h3>`;
    } catch (error) {
        document.getElementById("result").innerHTML = "<p style='color:red;'>Error fetching commits</p>";
    }
}
