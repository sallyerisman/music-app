const searchForm = document.querySelector("#search-form");
const userInput = document.querySelector('#user-input');
const croppedUrl = "https://deezerdevs-deezer.p.rapidapi.com/search?q=";


// Function for getting and storing user input, and then emptying the search field:
const getSearch = function() {
    let userSearch = userInput.value;
    userInput.value = "";
    userSearch = userSearch.replace(/\s/g, "-").toLowerCase();
    return userSearch;
};

// Function for creating new URL based on the user's search:
const createUrl = function() {
    let urlEnding = getSearch();
    let newUrl = croppedUrl + urlEnding;
    return newUrl;
}

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();

    // console.log(createUrl());

});






