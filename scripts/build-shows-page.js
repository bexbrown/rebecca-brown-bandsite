
let showsEl = document.querySelector(".shows");
const url = "https://project-1-api.herokuapp.com/showdates?api_key=";
const apiKey = "9e60fcc9-dfb8-4c05-9dd2-617a77fdbfa1";

// create labels displayed on tablet + desktop
function createTable(showCards) {
    const showTitles = document.createElement("div");
    showTitles.classList.add("shows__row", "shows__row--titles");

    const titles = ["Date", "Venue", "Location"];

    for (let i = 0; i < titles.length; i++) {
        const title = document.createElement("span");
        title.classList.add("shows__label", "shows__label--row");
        title.innerText = titles[i];
        showTitles.appendChild(title);
    }
    showCards.appendChild(showTitles);
}

//Create the card container
function createContainer() {

    const showsContainer = document.createElement("div");
    showsContainer.classList.add("shows__container");
    showsEl.appendChild(showsContainer);

    const showsHeading = document.createElement("h2");
    showsHeading.classList.add("shows__header");
    showsHeading.innerText = "Shows";
    showsContainer.appendChild(showsHeading);

    const showCards = document.createElement("div");
    showCards.classList.add("shows__card");
    showsContainer.appendChild(showCards);

    createTable(showCards);
}

//create cards
function createCards(showData) {
    console.log(showData);
    let rows = [];
    for (let i = 0; i < showData.length; i++) {

        const card = document.createElement("div");
        card.classList.add("shows__row", "shows__row--shows");
        rows.push(card);

        //create first textbox
        let textbox = document.createElement("div");
        textbox.classList.add("shows__textbox");
        card.appendChild(textbox);

        let subheader = document.createElement("span");
        subheader.classList.add("shows__label", "shows__label--col");
        subheader.innerText = "Date";
        textbox.appendChild(subheader);

        let text = document.createElement("span");
        text.classList.add("shows__text", "shows__date");
        text.innerText = showData[i].date;
        textbox.appendChild(text);

        //create second textbox
        textbox = document.createElement("div");
        textbox.classList.add("shows__textbox");
        card.appendChild(textbox);

        subheader = document.createElement("span");
        subheader.classList.add("shows__label", "shows__label--col");
        subheader.innerText = "Venue";
        textbox.appendChild(subheader);

        text = document.createElement("span");
        text.classList.add("shows__text");
        text.innerText = showData[i].place;
        textbox.appendChild(text);

        //create third textbox {
        textbox = document.createElement("div");
        textbox.classList.add("shows__textbox");
        card.appendChild(textbox);

        subheader = document.createElement("span");
        subheader.classList.add("shows__label", "shows__label--col");
        subheader.innerText = "Location";
        textbox.appendChild(subheader);
        text = document.createElement("span");
        text.classList.add("shows__text");

        text.innerText = showData[i].location
        textbox.appendChild(text);

        //create button
        let button = document.createElement("span");
        button.classList.add("shows__button");
        let link = document.createElement("a");
        link.classList.add("shows__link");
        link.innerText = "Buy Tickets";
        button.appendChild(link);

        card.appendChild(button);

        cardEl.appendChild(card);


    }
    rowSelection(rows);
}

function getShowData() {
    axios
        .get(url + apiKey)
        .then(response => {
            let showsData = response.data;
            createCards(showsData)
        })
        .catch(error => {
            console.log("there was an error loading the shows...")
        })
}

createContainer();
getShowData();

let cardEl = document.querySelector(".shows__card");



// row active state status

function removeSelector(rows) {
    rows.forEach((row) => {
        row.classList.remove("shows__row--selected");
    })
}

function rowSelection(rows) {
    rows.forEach((row) => {
        row.addEventListener("click", () => {
            removeSelector(rows);
            row.classList.add("shows__row--selected");

        })
    })
}












