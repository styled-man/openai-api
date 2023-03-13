const inputForm = document.getElementById("input-form");
const inputTextField = document.getElementById("search-input");
const separator = document.getElementById("separator");
const answer = document.getElementById("answer");
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
    recentSearchesContainer.appendChild(newSearch);

    // call the api and pass it in the user input
    searchUserInput(inputValue);

    // clear the userInput
    inputForm.reset();
    inputTextField.blur();
});

// show the recent searches whenever the user clicks on the input field
inputTextField.addEventListener("focusin", () => {
    // if there are any previous searches
    if (recentSearchesContainer.childElementCount > 1) {
        separator.classList.remove("hide");
        recentSearchesContainer.classList.remove("hide");
    }
});

// hide the recent searches whenever the user is no longer on the input field
inputTextField.addEventListener("focusout", () => {
    separator.classList.add("hide");
    recentSearchesContainer.classList.add("hide");
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
            userInput: "Answer this question: " + userInput,
        }),
    });

    // get whatever the api returned
    const response = await data.json();

    // display what the api returned
    answer.textContent = response.text;
}
