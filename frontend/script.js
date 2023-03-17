const inputForm = document.getElementById("input-form");
const inputTextField = document.getElementById("search-input");
const separator = document.getElementById("separator");
const answer = document.getElementById("answer");
const recentSearches = document.getElementById("recent-searches");
const recentSearchesContainer = document.getElementById(
    "recent-searches-container"
);

// whenever the user submit what they typed
inputForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const inputValue = inputTextField.value;

    // if the user did not type anything
    if (inputValue.trim().length === 0) {
        return;
    }

    // create a new entry in the recently searched items to show whenever the user is typing
    const newSearch = document.createElement("h3");
    newSearch.textContent = inputValue;
    newSearch.classList.add("recent-search");
    recentSearches.prepend(newSearch);

    // call the api and pass it in the user input
    searchUserInput(inputValue);

    newSearch.addEventListener("click", () => {
        searchUserInput(inputValue);

        // hide the recent searches
        separator.classList.add("hide");
        recentSearchesContainer.classList.add("hide");
    });

    // clear the userInput
    inputForm.reset();
    inputTextField.blur();
});

// show the recent searches whenever the user clicks on the input field
inputTextField.addEventListener("focusin", () => {
    separator.classList.remove("hide");
    recentSearchesContainer.classList.remove("hide");
});

document.addEventListener("click", (event) => {
    const inputContainer = document.getElementById("input-container");
    if (
        event.target !== inputContainer &&
        !inputContainer.contains(event.target)
    ) {
        separator.classList.add("hide");
        recentSearchesContainer.classList.add("hide");
    }
});

async function searchUserInput(userInput) {
    // call the api and pass what ever the user typed
    const data = await fetch("/search", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            userInput: "Answer this question in 100 words: " + userInput,
        }),
    });

    // get whatever the api returned
    const response = await data.json();

    // display what the api returned
    answer.textContent = response.text;
}
