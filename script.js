const searchForm = document.querySelector("#search-form");
const userInput = document.querySelector('#user-input');

let userSearch;

// Function for getting and storing user input, and then emptying the search field:
const getSearch = function() {
    userSearch = userInput.value;
    userInput.value = "";
    return userSearch;
};

searchForm.addEventListener("submit", function(e) {
    e.preventDefault();

    getSearch();
});




