const apiKey = 'YOUR_API_KEY';  // Replace with your valid NewsAPI key
const defaultApiUrl = `https://gnews.io/api/v4/top-headlines?category=technology&country=us&apikey=${apiKey}`;

// Fetch news from the API
async function fetchNews(apiUrl = defaultApiUrl) {
    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response:", data);  // Debugging log

        if (!data.articles || data.articles.length === 0) {
            console.error("No articles found!", data);
            document.getElementById('newsContainer').innerHTML = "<p>No news available.</p>";
            return;
        }

        displayNews(data.articles);
    } catch (error) {
        console.error('Error fetching news:', error);
        document.getElementById('newsContainer').innerHTML = `<p>Error fetching news. Please try again.</p>`;
    }
}

// Display news on the webpage
function displayNews(articles) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';  // Clear previous content

    articles.forEach(article => {
        const articleElement = document.createElement('article');
        articleElement.classList.add('article-item');

        const { title, description, url, urlToImage } = article;

        articleElement.innerHTML = `
            <h2><a href="${url}" target="_blank">${title}</a></h2>
            <p>${description ? description : "No description available."}</p>
            ${urlToImage ? `<img src="${urlToImage}" alt="${title}">` : ''}
        `;

        newsContainer.appendChild(articleElement);
    });
}

// Fetch news on page load
document.addEventListener('DOMContentLoaded', () => {
    fetchNews();

    // Search form event listener
    document.getElementById('searchForm').addEventListener('submit', async (event) => {
        event.preventDefault();
        const searchInput = document.getElementById('searchInput').value.trim();

        if (!searchInput) {
            alert("Please enter a search term.");
            return;
        }

        const searchUrl = `https://newsapi.org/v2/everything?q=${encodeURIComponent(searchInput)}&apiKey=${apiKey}`;
        fetchNews(searchUrl);
    });
});
