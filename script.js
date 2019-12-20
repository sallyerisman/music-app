const searchForm = document.querySelector("#search-form");
const resultBox = document.querySelector("#result-box");



// Function for getting and storing user input, and then emptying the search field:
// const getSearch = function() {
//     const userInput = document.querySelector('#user-input');
//     const userSearch = userInput.value;
//     userInput.value = "";
//     userSearch = userSearch.replace(/\s/g, "-").toLowerCase();
//     return userSearch;
// };

// Function for making request: 
const makeRequest = async (url) => {
    const response = await fetch(url, {
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
const searchAll = async (request) => {
	return makeRequest(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${request}`);
};

// Artist search:
const searchArtists = async (request) => {
	return makeRequest(`https://deezerdevs-deezer.p.rapidapi.com/search/artist?q=${request}`);
};

// Album search:
const searchAlbums = async (request) => {
	return makeRequest(`https://deezerdevs-deezer.p.rapidapi.com/search/album?q=${request}`);
};

// Track search:
const searchTracks = async (request) => {
	return makeRequest(`https://deezerdevs-deezer.p.rapidapi.com/search/track?q=${request}`);
};

// Render artist:
const renderArtist = artist => {
	resultBox.innerHTML += `
		<div class="col">
			<div class="card bg-light text-dark">
				<img src="${artist.picture_big}" class="card-img-top">
				<div class="card-body">
					<h5 class="card-title">${artist.name}</h5>
					<p class="card-text">${artist.nb_album} albums</p>
				</div>
			</div>
		</div>
	`;
};

const renderAlbum = album => {
	resultBox.innerHTML += `
		<div class="col">
			<div class="card bg-light text-dark">
				<img src="${album.cover_big}" class="card-img-top">
				<div class="card-body">
					<h5 class="card-title">${album.title}</h5>
					<h6 class="card-title">${album.artist.name}</h5>
					<p class="card-text">${album.nb_tracks} tracks</p>
				</div>
			</div>
		</div>
	`;
};

const renderTrack = track => {
	resultBox.innerHTML += `
		<div class="col">
			<div class="card bg-light text-dark">
				<img src="${track.album.cover_big}" class="card-img-top">
				<div class="card-body">
					<h5 class="card-title">${track.title}</h5>
					<h6 class="card-title">${track.artist.name}</h5>
					<p class="card-text">${track.album.title}</p>
					<p class="card-text">${Math.floor(track.duration / 60)} minutes ${track.duration % 60} seconds</p>
				</div>
			</div>
		</div>
	`;
};

const manageResults = function(results) {
	resultBox.innerHTML = "";

	results.data.forEach(function(item) {
		switch (item.type) {
			case "artist":
				renderArtist(item);
				break;
			case "album":
				renderAlbum(item);
				break;
			case "track":
				renderTrack(item);
				break;
			default:
				// show unknown search result type
				console.warn("Got search result for unknown type!", item);
				break;
		}
	});
};

// Function for delivering error message:
const searchError = function(err) {
	resultBox.innerHTML = `<div class="alert alert-danger">Erroneous search. Reason for error: "${err}"</div>`;
};

// Event listener:
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const userInput = document.querySelector('#request');
    const userSearch = userInput.value;
    userInput.value = "";

	if (this.all.checked) {
		searchAll(userSearch).then(manageResults).catch(searchError);

	} else if (this.artists.checked) {
		searchArtists(userSearch).then(manageResults).catch(searchError);

	} else if (this.albums.checked) {
		searchAlbums(userSearch).then(manageResults).catch(searchError);

	} else if (this.tracks.checked) {
		searchTracks(userSearch).then(manageResults).catch(searchError);
	}
});




