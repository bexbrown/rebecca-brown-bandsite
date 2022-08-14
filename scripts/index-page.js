
const commentSection = document.querySelector(".comments");
let container = document.createElement("div");
container.classList.add("comments__container");

const url = "https://project-1-api.herokuapp.com/comments?api_key=";
const apiKey = "9e60fcc9-dfb8-4c05-9dd2-617a77fdbfa1";

function createInputSection() {

    //header
    let heading = document.createElement("h2");
    heading.classList.add("comments__heading");
    heading.innerText = "Join the Conversation";
    commentSection.appendChild(heading);

    //comments section div
    let container = document.createElement("div");
    container.classList.add("comments__section", "comments__section--main");

    //stock profile image
    let imgMain = document.createElement("img");
    imgMain.classList.add("comments__image", "comments__image--main");
    imgMain.setAttribute("src", "./assets/images/Mohan-muruge.jpg");
    imgMain.setAttribute("alt", "stock profile photo")
    container.appendChild(imgMain);

    //form
    let form = document.createElement("form");
    form.classList.add("comments__form");
    container.appendChild(form);

    //name label
    let nameLabel = document.createElement("label");
    nameLabel.classList.add("comments__label");
    nameLabel.setAttribute("for", "name");
    nameLabel.innerText = "Name";
    form.appendChild(nameLabel);

    //name input field
    let nameInput = document.createElement("input");
    nameInput.classList.add("comments__form-field", "comments__name-input");
    nameInput.setAttribute("type", "text");
    nameInput.setAttribute("for", "name");
    nameInput.setAttribute("placeholder", "Enter your name");
    form.appendChild(nameInput);

    //comment label
    let commentLabel = document.createElement("label");
    commentLabel.classList.add("comments__label");
    commentLabel.setAttribute("for", "comment");
    commentLabel.innerText = "Comment";
    form.appendChild(commentLabel);

    //comment input field
    let commentInput = document.createElement("textarea");
    commentInput.classList.add("comments__form-field", "comments__text-input");
    commentInput.setAttribute("placeholder", "Add a new comment");
    form.appendChild(commentInput);

    //button
    let button = document.createElement("input");
    button.classList.add("comments__button");
    button.setAttribute("type", "submit");
    button.setAttribute("value", "Comment");
    form.appendChild(button);

    //append to comment section
    commentSection.appendChild(container);
}

function createTimestamp(timeData) {
    let newDate = new Date(timeData);
    let month = newDate.getMonth() + 1;
    let day = newDate.getDate();
    let year = newDate.getFullYear();

    if (month < 10) {
        month = "0" + month;
    }
    if (day < 10) {
        day = "0" + day;
    }


    return month + "/" + day + "/" + year;
}

function displayComment(commentsData) {

    //card
    let card = document.createElement("div");
    card.classList.add("comments__section", "comments__section--added");
    container.appendChild(card);

    //profile image
    let img = document.createElement("div");
    img.classList.add("comments__image", "comments__image--added");
    card.appendChild(img);

    //text container
    let textContainer = document.createElement("div");
    textContainer.classList.add("comments__content");
    card.appendChild(textContainer);

    //comment header 
    let header = document.createElement("div");
    header.classList.add("comments__comment-header");
    textContainer.appendChild(header);

    //comment username
    let username = document.createElement("span");
    username.classList.add("comments__username");
    username.innerText = commentsData.name;
    header.appendChild(username);

    //date 
    let date = document.createElement("span");
    date.classList.add("comments__date");
    date.innerText = createTimestamp(commentsData.timestamp);
    header.appendChild(date);

    //comment text
    let commentText = document.createElement("span");
    commentText.classList.add("comments__comment");
    commentText.innerText = commentsData.comment;
    textContainer.appendChild(commentText);

    commentSection.appendChild(container);
}

function formReset() {
    nameInput.value = "";
    commentInput.value = "";
    nameInput.classList.remove("comments__input--required");
    commentInput.classList.remove("comments__input--required");
};

function getComments() {

    axios
        .get(url + apiKey)
        .then(response => {
            container.innerHTML = "";
            let commentsData = response.data;

            commentsData.sort(function (a, b) {
                return b.timestamp - a.timestamp
            })

            for (let i = 0; i < commentsData.length; i++) {
                displayComment(commentsData[i]);
            }
        })

        .catch(error => {
            console.log("Error:", error);
            form = document.querySelector(".comments__form");
            let errorMessage = document.createElement("span");
            errorMessage.innerText = "There was an error loading the shows..."
            errorMessage.classList.add("comments__error")
            form.appendChild(errorMessage);

        })
}

function postComment(requestBody) {

    axios
        .post((url + apiKey), requestBody)
        .then(response => {
            let commentData = response.data;
            getComments();

        })
        .catch(error => {
            console.log("Error:", error);

        })
}

function inputValidation(nameInput, commentInput, requestBody) {

    if ((nameInput.value.length < 1) || (commentInput.value.length < 1)) {

        //check name length 
        if (nameInput.value.length < 1) {
            nameInput.classList.add("comments__input--required");
        } else {
            nameInput.classList.remove("comments__input--required");
        }

        //check comment length {
        if (commentInput.value.length < 1) {
            commentInput.classList.add("comments__input--required");
        } else {
            commentInput.classList.remove("comments__input--required");
        }
    } else {
        postComment(requestBody);
        formReset();
    }
}

createInputSection();

let form = document.querySelector(".comments__form");
let nameInput = document.querySelector(".comments__name-input");
let commentInput = document.querySelector(".comments__text-input");
let commentList = document.querySelector(".comments__container");
let dateEl = document.querySelectorAll(".comments__date");
let nameEl = document.querySelectorAll(".comments__username");
let commentEl = document.querySelectorAll(".comments__comment");

getComments();

//form submit
form.addEventListener("submit", (event) => {
    event.preventDefault();

    let requestBody =
    {
        "name": nameInput.value,
        "comment": commentInput.value,
    }

    inputValidation(nameInput, commentInput, requestBody);

});





