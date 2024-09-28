document.getElementById('suggestionForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    // Collect form data
    const recipientName = document.getElementById('recipientName').value;
    const age = document.getElementById('age').value;
    const occasion = document.getElementById('occasion').value;
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const preferences = document.getElementById('preferences').value;

    try {
        // Fetch data from the JSON file
        const response = await fetch('../products.json');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const suggestions = await response.json();
        // Filter suggestions based on the user input
        const filteredSuggestions = suggestions.filter(suggestion => {
            const matchesAge = (age < 18 && suggestion.age === "teen") || 
                               (age >= 18 && suggestion.age === "adult") || 
                               suggestion.age === "all";
            return matchesAge && suggestion.occasion === occasion && (suggestion.gender === gender || suggestion.gender === "all");
        });

        // Store user input data in local storage
        const recipientData = {
            name: recipientName,
            age: age,
            occasion: occasion,
            gender: gender,
            preferences: preferences
        };
        localStorage.setItem('recipientData', JSON.stringify(recipientData));

        // Redirect to display.html after storing data
        localStorage.setItem('filteredSuggestions', JSON.stringify(filteredSuggestions));
        window.location.href = 'display.html';
        
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        alert('Failed to fetch suggestions. Please try again later.');
    }
});

// The displaySuggestions function is now called in display.html