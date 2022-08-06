
let shows = [
    {
        date: "Mon Sept 06 2021",
        venue: "Ronald Lane",
        location: "San Francisco, CA"
    },
    {
        date: "Tue Sept 21 2021",
        venue: "Pier 3 East",
        location: "San Francisco, CA "
    },
    {
        date: "Fri Oct 15 2021",
        venue: "View Lounge",
        location: "San Francisco, CA"
    },
    {
        date: "Sat Nov 06 2021",
        venue: "Hyatt Agency",
        location: "San Francisco, CA"
    },
    {
        date: "Fri Nov 26 2021",
        venue: "Moscow Center",
        location: "San Francisco, CA"
    },
    {
        date: "Wed Dec 15 2021",
        venue: "Press Club",
        location: "San Francisco, CA"
    }
]

let showsEl = document.querySelector(".shows")
const titles = ["Date", "Venue", "Location"];

// create titles displayed on tablet + desktop
function createTable(showCards) {
    const showTitles = document.createElement("div");
    showTitles.classList.add("shows__text-row", "shows__text-row--titles");

    for (let i = 0; i < titles.length; i++) {
        const title = document.createElement("span");
        title.classList.add("shows__subheader", "shows__subheader--row");
        title.innerText = titles[i];
        showTitles.appendChild(title);
    }
    showCards.appendChild(showTitles);

    //create card

    for (let i = 0; i < shows.length; i++) {

        const card = document.createElement("div");
        card.classList.add("shows__text-row");


        //create first textbox
        let textbox = document.createElement("div");
        textbox.classList.add("shows__textbox");
        card.appendChild(textbox);

        let subheader = document.createElement("span");
        subheader.classList.add("shows__subheader", "shows__subheader--col");
        subheader.innerText = "Date";
        textbox.appendChild(subheader);

        let text = document.createElement("span");
        text.classList.add("shows__text", "shows__date");
        text.innerHTML = shows[i].date;
        textbox.appendChild(text);

        //create second textbox
        textbox = document.createElement("div");
        textbox.classList.add("shows__textbox");
        card.appendChild(textbox);

        subheader = document.createElement("span");
        subheader.classList.add("shows__subheader", "shows__subheader--col");
        subheader.innerText = "Venue";
        card.appendChild(subheader);

        text = document.createElement("span");
        text.classList.add("shows__text");

        text.innerHTML = shows[i].venue;
        card.appendChild(text);

        //create third textbox {
        textbox = document.createElement("div");
        textbox.classList.add("shows__textbox");
        card.appendChild(textbox);

        subheader = document.createElement("span");
        subheader.classList.add("shows__subheader", "shows__subheader--col");
        subheader.innerText = "Location";
        card.appendChild(subheader);

        text = document.createElement("span");
        text.classList.add("shows__text");

        text.innerHTML = shows[i].location;
        card.appendChild(text);

        //create button
        let button = document.createElement("span");
        button.classList.add("shows__button");
        let link = document.createElement("a");
        link.classList.add("shows__link");
        link.innerText = "Buy Tickets";
        button.appendChild(link);

        card.appendChild(button)

        showCards.appendChild(card)
    }

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

createContainer();

