// Get references to the search button, overlay, input field, and close button
const searchBtn = document.querySelector('.search-btn');
const searchOverlay = document.getElementById('search-overlay');
const searchInput = document.getElementById('search-input');
const suggestionsList = document.getElementById('suggestions');
const closeBtn = document.getElementById('close-btn');

// Trending search suggestions
const trendingSuggestions = [
    { text: 'Home Design', logo: 'image/logo/logo.svg', link: 'home-design.html' },
    { text: 'About Us', logo: 'image/logo/logo.svg', link: 'about-us.html' },
    { text: 'Contact Support', logo: 'image/logo/logo.svg', link: 'contact-support.html' },
    { text: 'Donate Today', logo: 'image/logo/logo.svg', link: 'donate.html' },
    { text: 'Our Projects', logo: 'image/logo/logo.svg', link: 'projects.html' },
    { text: 'Volunteer', logo: 'image/logo/logo.svg', link: 'volunteer.html' },
    { text: 'Blog', logo: 'image/logo/logo.svg', link: 'blog.html' },
    { text: 'Join Us', logo: 'image/logo/logo.svg', link: 'join-us.html' }, // New suggestion
    { text: 'Events', logo: 'image/logo/logo.svg', link: 'events.html' } // New suggestion
];

// Function to render suggestions in the search box, limiting to 7 suggestions
function renderTrendingSuggestions() {
    suggestionsList.innerHTML = ''; // Clear any existing suggestions
    trendingSuggestions.slice(0, 7).forEach(suggestion => {
        const li = document.createElement('li');

        // Create image element for site logo
        const logo = document.createElement('img');
        logo.src = suggestion.logo;
        logo.alt = 'Site Logo';

        // Create text element for the suggestion
        const text = document.createElement('span');
        text.textContent = suggestion.text;

        // Create link element for the suggestion
        const link = document.createElement('a');
        link.href = suggestion.link;
        link.textContent = suggestion.text;
        link.classList.add('suggestion-link');

        li.appendChild(logo);
        li.appendChild(link);

        // Handle click on the suggestion
        li.addEventListener('click', () => {
            searchInput.value = suggestion.text;
            suggestionsList.innerHTML = ''; // Clear suggestions after selection
        });

        suggestionsList.appendChild(li);
    });
}

// Show trending search suggestions when the page loads
window.addEventListener('DOMContentLoaded', () => {
    renderTrendingSuggestions();  // Render trending suggestions on page load
});

// Open the search overlay when the search button is clicked
searchBtn.addEventListener('click', () => {
    searchOverlay.classList.add('open');
    searchInput.focus();
});

// Close the search overlay when the close button is clicked
closeBtn.addEventListener('click', () => {
    searchOverlay.classList.remove('open');
});

// Auto-suggest feature for the search input
searchInput.addEventListener('input', () => {
    const query = searchInput.value.toLowerCase();
    suggestionsList.innerHTML = '';  // Clear previous suggestions

    if (query) {
        const filteredSuggestions = trendingSuggestions.filter(item =>
            item.text.toLowerCase().includes(query)
        );

        filteredSuggestions.slice(0, 7).forEach(suggestion => {
            const li = document.createElement('li');

            const logo = document.createElement('img');
            logo.src = suggestion.logo;
            logo.alt = 'Site Logo';

            const text = document.createElement('span');
            text.textContent = suggestion.text;

            const link = document.createElement('a');
            link.href = suggestion.link;
            link.textContent = suggestion.text;
            link.classList.add('suggestion-link');

            li.appendChild(logo);
            li.appendChild(link);

            li.addEventListener('click', () => {
                searchInput.value = suggestion.text;
                suggestionsList.innerHTML = '';  // Clear suggestions after selection
            });

            suggestionsList.appendChild(li);
        });
    } else {
        // If no query, show all trending suggestions
        renderTrendingSuggestions();
    }
});

// Close the search overlay if clicked outside the search box
document.addEventListener('click', (e) => {
    if (!searchOverlay.contains(e.target) && !searchBtn.contains(e.target)) {
        searchOverlay.classList.remove('open');
    }
});
