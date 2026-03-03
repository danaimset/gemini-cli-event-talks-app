document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('categorySearch');
    const clearBtn = document.getElementById('clearSearch');
    let allTalks = [];

    // Fetch talks data from API
    async function fetchTalks() {
        try {
            const response = await fetch('/api/talks');
            allTalks = await response.json();
            renderSchedule(allTalks);
        } catch (error) {
            console.error('Error fetching talks:', error);
            scheduleContainer.innerHTML = '<div class="no-results">Error loading schedule. Please try again later.</div>';
        }
    }

    // Render the schedule based on talk data
    function renderSchedule(talks) {
        if (talks.length === 0) {
            scheduleContainer.innerHTML = '<div class="no-results">No talks found matching this category.</div>';
            return;
        }

        scheduleContainer.innerHTML = talks.map(item => {
            // Check if it's a break (lunch)
            if (item.type === 'break') {
                return `
                    <div class="card break">
                        <div class="time-col">
                            ${item.start_time} - ${item.end_time}
                            <span class="duration-tag">${item.duration}</span>
                        </div>
                        <div class="content-col" style="text-align: center;">
                            <h2>🍽️ ${item.title}</h2>
                            <p>${item.description}</p>
                        </div>
                    </div>
                `;
            }

            // Normal Talk Card
            return `
                <div class="card">
                    <div class="time-col">
                        ${item.start_time} - ${item.end_time}
                        <span class="duration-tag">${item.duration}</span>
                    </div>
                    <div class="content-col">
                        <div class="card-header">
                            <h2>${item.title}</h2>
                        </div>
                        <div class="speakers">🎤 ${item.speakers.join(' & ')}</div>
                        <p class="description">${item.description}</p>
                        <div class="categories">
                            ${item.categories.map(cat => `<span class="category-tag">${cat}</span>`).join('')}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Helper to apply the filter and re-render the schedule
    function applyFilter(searchTerm) {
        searchTerm = searchTerm.toLowerCase();

        const filteredTalks = allTalks.filter(item => {
            if (item.type === 'break') return true;
            
            const categoryMatch = item.categories.some(cat => 
                cat.toLowerCase().includes(searchTerm)
            );
            
            const speakerMatch = item.speakers.some(speaker => 
                speaker.toLowerCase().includes(searchTerm)
            );

            return categoryMatch || speakerMatch;
        });

        renderSchedule(filteredTalks);
    }

    // Filter talks based on search input
    searchInput.addEventListener('input', (e) => {
        const val = e.target.value;
        clearBtn.style.display = val.length > 0 ? 'flex' : 'none';
        applyFilter(val);
    });

    // Clear search functionality
    clearBtn.addEventListener('click', () => {
        searchInput.value = '';
        clearBtn.style.display = 'none';
        applyFilter('');
        searchInput.focus();
    });

    // Event delegation for clickable category tags
    scheduleContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-tag')) {
            const selectedCategory = e.target.textContent;
            searchInput.value = selectedCategory; // Update the UI
            clearBtn.style.display = 'flex'; // Show the clear button
            applyFilter(selectedCategory); // Trigger the filter
            
            // Smooth scroll to top to see results
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Initialize
    fetchTalks();
});
