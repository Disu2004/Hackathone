// Retrieve recipient data from local storage
const recipientData = JSON.parse(localStorage.getItem('recipientData'));

// Display recipient details
const recipientDetailsContainer = document.getElementById('recipientDetails');
if (recipientData) {
    recipientDetailsContainer.innerHTML = `
        <p><strong>Your Gift Suggestions</strong><br><strong>Recipient's Details</strong></p>
        <p><strong>Name:</strong> ${recipientData.name}</p>
        <p><strong>Age:</strong> ${recipientData.age}</p>
        <p><strong>Occasion:</strong> ${recipientData.occasion}</p>
        <p><strong>Gender:</strong> ${recipientData.gender}</p>
        <p><strong>Preferences:</strong> ${recipientData.preferences}</p>
    `;
}

// Retrieve and display suggestions from local storage
const filteredSuggestions = JSON.parse(localStorage.getItem('filteredSuggestions'));

function displaySuggestions(suggestions) {
    const suggestionsContainer = document.querySelector('.suggestions-list');
    suggestionsContainer.innerHTML = ''; // Clear previous suggestions

    if (suggestions.length === 0) {
        suggestionsContainer.innerHTML = '<p>No suggestions found for the given criteria.</p>';
        return;
    }

    suggestions.forEach(suggestion => {
        // Create a suggestion card
        const suggestionCard = `
            <div class="card mb-3">
                <img src="${suggestion.image}" class="card-img-top" alt="${suggestion.title}">
                <div class="card-body">
                    <h5 class="card-title">${suggestion.title}</h5>
                    <p class="card-text">${suggestion.description}</p>
                </div>
            </div>
        `;
        suggestionsContainer.innerHTML += suggestionCard; // Append the card to the container
    });
}

// Display suggestions if available
if (filteredSuggestions) {
    displaySuggestions(filteredSuggestions);
}
