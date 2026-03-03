document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('categorySearch');
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

    // Filter talks based on search input
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Filter normal talks based on categories
        const filteredTalks = allTalks.filter(item => {
            // Always show the lunch break
            if (item.type === 'break') return true;
            
            // Check if any category matches the search term
            return item.categories.some(category => 
                category.toLowerCase().includes(searchTerm)
            );
        });

        renderSchedule(filteredTalks);
    });

    // Initialize
    fetchTalks();
});
