const searchForm = document.querySelector("#search-form");
const resultBox = document.querySelector("#result-box");


// Function for getting and storing user input, and then emptying the search field:
const getSearch = function() {
    const userSearch = document.querySelector('#user-input').value;
    userInput.value = "";
    userSearch = userSearch.replace(/\s/g, "-").toLowerCase();
    return userSearch;
};

// Function for getting request: 
const getRequest = async () => {
    const url = createUrl();
    const request = await fetch(url, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
            "x-rapidapi-key": "398fde3a05msh308a8e39370118dp1b26bdjsneb357ac3324a"
        }
	});
	if (!response.ok) {
		throw new Error("Response was not OK.");
	}
    
    return await response.json();
};

// Generic search:
const search = async (query) => {
	return getJSON(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${query}`);
};

// Artist search
const searchArtists = async (query) => {
	return getJSON(`https://deezerdevs-deezer.p.rapidapi.com/search/artist?q=${query}`);
};

// Album search:
const searchAlbums = async (query) => {
	return getJSON(`https://deezerdevs-deezer.p.rapidapi.com/search/album?q=${query}`);
};

// Track search:
const searchTracks = async (query) => {
	return getJSON(`https://deezerdevs-deezer.p.rapidapi.com/search/track?q=${query}`);
};

// Function for rendering result:
const renderResult = (response) => {
    response.data.forEach(data => {
        const card = `
            <div class="col mb-4">
                <div class="card bg-light text-dark">
                    <img src="${data.artist.picture_big}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">${data.artist.name}</h5>
                    </div>
                </div>
            </div>
        `;
        resultBox.innerHTML = card;
    });
};

// Event listener:
searchForm.addEventListener("submit", function(e) {
    e.preventDefault();

    getRequest().then(renderResult).catch(err => {
        alert("Error getting what you searched for. Error was: " + err);
    });
});




