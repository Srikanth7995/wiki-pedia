let searchInputEl = document.getElementById("searchInput");
let searchResultEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

function createAndAppendResult(result) {
    let {
        title,
        link,
        description
    } = result;
    //1. div container = result-item
    let resultItemEl = document.createElement("div");
    resultItemEl.classList.add("result-item");
    searchResultEl.appendChild(resultItemEl);

    //2. Anchor title = result-title 
    let resultTitleEl = document.createElement("a");
    resultTitleEl.classList.add("result-title");
    resultTitleEl.textContent = title;
    resultTitleEl.href = link;
    resultTitleEl.target = "_blank";
    resultItemEl.appendChild(resultTitleEl);

    //3. Title break element
    let titleBreakEl = document.createElement("br");
    resultItemEl.appendChild(titleBreakEl);
    //4. Anchor url = result-url 
    let resultLinkEl = document.createElement("a");
    resultLinkEl.classList.add("result-url");
    resultLinkEl.textContent = link;
    resultLinkEl.href = link;
    resultLinkEl.target = "_blank";
    resultItemEl.appendChild(resultLinkEl);

    //5. line break
    let linkBreakEl = document.createElement("br");
    resultItemEl.appendChild(linkBreakEl);

    //6. description = result-description
    let resultDescriptionEl = document.createElement("p");
    resultDescriptionEl.classList.add("line-description");
    resultDescriptionEl.textContent = description;
    resultItemEl.appendChild(resultDescriptionEl);
}

function displayResults(searchResults) {
    spinnerEl.classList.toggle("d-none");
    for (let result of searchResults) {
        createAndAppendResult(result);
    }
}

function searchWikipedia(event) {
    if (event.key === "Enter") {
        searchResultEl.textContent = "";
        spinnerEl.classList.toggle("d-none");
        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        let options = {
            method: "GET",
        };
        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displayResults(search_results);
            });
    }
}
searchInputEl.addEventListener("keydown", searchWikipedia);