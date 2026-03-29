// ================================
// Configuration
// ================================
const API_BASE = 'https://jsonplaceholder.typicode.com';
const POSTS_LIMIT = 5;
const REQUEST_TIMEOUT = 10000;

// ================================
// DOM Elements
// ================================
const elements = {
    loadBtn: document.getElementById('loadBtn'),
    loadSingleBtn: document.getElementById('loadSingleBtn'),
    clearBtn: document.getElementById('clearBtn'),
    status: document.getElementById('status'),
    container: document.getElementById('posts-container')
};

// ================================
// Utility Functions
// ================================
function showStatus(message, type = '') {
    elements.status.textContent = message;
    elements.status.className = type;
}

function resetContainer() {
    elements.container.innerHTML = '';
}

function showPlaceholder() {
    elements.container.innerHTML = '<p class="placeholder">Click a button to load data from the API.</p>';
}

function setButtonsDisabled(disabled) {
    elements.loadBtn.disabled = disabled;
    elements.loadSingleBtn.disabled = disabled;
}

// ================================
// Fetch Helpers
// ================================
async function fetchWithTimeout(url, timeout = REQUEST_TIMEOUT) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
        const response = await fetch(url, { signal: controller.signal });
        clearTimeout(timeoutId);
        return response;
    } catch (error) {
        clearTimeout(timeoutId);

        if (error.name === 'AbortError') {
            throw new Error('Request timed out. Please try again.');
        }

        throw error;
    }
}

async function safeFetch(url) {
    let response;

    try {
        response = await fetchWithTimeout(url);
    } catch (networkError) {
        if (networkError.message.includes('timed out')) {
            throw networkError;
        }

        throw new Error('Network error: Unable to connect. Please check your internet connection.');
    }

    if (!response.ok) {
        if (response.status === 404) {
            throw new Error('The requested resource was not found.');
        }

        if (response.status === 500) {
            throw new Error('Server error. Please try again later.');
        }

        throw new Error(`HTTP error: ${response.status}`);
    }

    try {
        return await response.json();
    } catch (parseError) {
        throw new Error('Error parsing response data.');
    }
}

async function fetchWithRetry(url, maxRetries = 3) {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            console.log(`Attempt ${attempt}/${maxRetries}`);
            return await safeFetch(url);
        } catch (error) {
            lastError = error;
            console.warn(`Attempt ${attempt} failed:`, error.message);

            if (error.message.includes('not found')) {
                throw error;
            }

            if (attempt < maxRetries) {
                await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
        }
    }

    throw lastError;
}

// ================================
// API Functions
// ================================
async function fetchPosts(limit = POSTS_LIMIT) {
    return await fetchWithRetry(`${API_BASE}/posts?_limit=${limit}`);
}

async function fetchPost(id) {
    return await fetchWithRetry(`${API_BASE}/posts/${id}`);
}

// ================================
// Validation Functions
// ================================
function validatePost(post) {
    if (!post || typeof post !== 'object') {
        return false;
    }

    if (!post.id || !post.title || !post.body) {
        return false;
    }

    return true;
}

function validatePosts(posts) {
    if (!Array.isArray(posts)) {
        throw new Error('Expected an array of posts.');
    }

    const validPosts = posts.filter(validatePost);

    if (validPosts.length === 0) {
        throw new Error('No valid posts found.');
    }

    return validPosts;
}

// ================================
// Display Functions
// ================================
function displayPosts(posts) {
    const html = posts.map(post => `
        <article class="post-card">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <div class="meta">Post #${post.id} by User #${post.userId}</div>
        </article>
    `).join('');

    elements.container.innerHTML = html;
}

function displaySinglePost(post) {
    elements.container.innerHTML = `
        <article class="post-card">
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <div class="meta">Post #${post.id} by User #${post.userId}</div>
        </article>
    `;
}

function showError(error, retryFn = null) {
    const errorHtml = `
        <div class="error-message">
            <h3>Something went wrong</h3>
            <p>${error.message}</p>
            ${retryFn ? '<button class="retry-btn">Try Again</button>' : ''}
        </div>
    `;

    elements.container.innerHTML = errorHtml;
    elements.status.textContent = '';
    elements.status.className = '';

    if (retryFn) {
        const retryBtn = document.querySelector('.retry-btn');
        retryBtn.addEventListener('click', retryFn);
    }
}

function clearPosts() {
    showStatus('');
    showPlaceholder();
}

// ================================
// Event Handlers
// ================================
async function handleLoadPosts() {
    setButtonsDisabled(true);
    showStatus('Loading posts...', 'loading');
    resetContainer();

    try {
        const data = await fetchPosts();
        console.log('Posts data:', data);

        const posts = validatePosts(data);
        displayPosts(posts);
        showStatus(`Loaded ${posts.length} posts successfully.`, 'success');
    } catch (error) {
        console.error('Failed to load posts:', error);
        showError(error, handleLoadPosts);
    } finally {
        setButtonsDisabled(false);
    }
}

async function handleLoadSinglePost() {
    setButtonsDisabled(true);
    showStatus('Loading single post...', 'loading');
    resetContainer();

    try {
        const post = await fetchPost(1);
        console.log('Single post data:', post);

        if (!validatePost(post)) {
            throw new Error('The post data is invalid.');
        }

        displaySinglePost(post);
        showStatus('Loaded post #1 successfully.', 'success');
    } catch (error) {
        console.error('Failed to load single post:', error);
        showError(error, handleLoadSinglePost);
    } finally {
        setButtonsDisabled(false);
    }
}

// ================================
// Initialisation
// ================================
function init() {
    elements.loadBtn.addEventListener('click', handleLoadPosts);
    elements.loadSingleBtn.addEventListener('click', handleLoadSinglePost);
    elements.clearBtn.addEventListener('click', clearPosts);

    console.log('API Fetcher app loaded successfully.');
}

document.addEventListener('DOMContentLoaded', init);