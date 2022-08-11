// const comments = [
//     {
//         name: "Connor Walton",
//         date: "02/17/2021",
//         comment: "This is art. This is inexplicable magic expressed in the purest way, everything that makes up this majestic work deserves reverence. Let us appreciate this for what it is and what it contains."
//     },
//     {
//         name: "Emilie Beach",
//         date: "01/09/2021",
//         comment: "I feel blessed to have seen them in person. What a show! They were just perfection. If there was one day of my life I could relive, this would be it. What an incredible day."
//     },
//     {
//         name: "Miles Acosta",
//         date: "12/20/2020",
//         comment: "I can't stop listening. Every time I hear one of their songs - the vocals - it gives me goosebumps. Shivers straight down my spine. What a beautiful expression of creativity. Can't get enough."
//     },
// ]
const commentSection = document.querySelector(".comments");
let container = document.createElement("div");
container.classList.add("comments__container");

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

createInputSection();

function displayComments(commentsData) {

    //card
    let card = document.createElement("div");
    card.classList.add("comments__section", "comments__section--added");
    container.appendChild(card);

    //profile image
    let img = document.createElement("img");
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
    date.innerText = commentsData.timestamp;
    header.appendChild(date);

    //comment text
    let commentText = document.createElement("span");
    commentText.classList.add("comments__comment");
    commentText.innerText = commentsData.comment;
    textContainer.appendChild(commentText);

    commentSection.appendChild(container);

}

const url = "https://project-1-api.herokuapp.com/comments?api_key=";
const apiKey = "9e60fcc9-dfb8-4c05-9dd2-617a77fdbfa1";

getComments();

let form = document.querySelector(".comments__form");
let nameInput = document.querySelector(".comments__name-input");
let commentInput = document.querySelector(".comments__text-input");
let commentList = document.querySelector(".comments__container");

//reset form fields
function formReset() {
    nameInput.value = "";
    commentInput.value = "";
    nameInput.classList.remove("comments__input--required");
    commentInput.classList.remove("comments__input--required");
};

//form submit
form.addEventListener("submit", (event) => {
    event.preventDefault();

    // checkInputLength;

    let requestBody =
    {
        "name": nameInput.value,
        "comment": commentInput.value,
    }

    postComment(requestBody);
    formReset();
});

//arrays of comment card elements
let dateEl = document.querySelectorAll(".comments__date");
let nameEl = document.querySelectorAll(".comments__username");
let commentEl = document.querySelectorAll(".comments__comment");

function getComments() {

    axios
        .get(url + apiKey)
        .then(response => {
            let commentsData = response.data;

            //SORT BY TIMESTAMP!!!!!

            for (let i = 0; i < commentsData.length; i++) {

                displayComments(commentsData[i]);

            }
        })
}

function postComment(requestBody) {

    axios
        .post((url + apiKey), requestBody)

        .then(response => {

            let commentData = response.data
            container.innerHTML = "";
            displayComments(commentData);
            getComments();
        })
}










// let date = new Date(dateData);
// console.log(date);

//gets date for comment time stamp
// function getDate() {
//     let date = new Date();
//     let currentDate = date.getMonth() + "/" + date.getDay() + "/" + date.getFullYear();
//     return currentDate;
// }



// function getTimeStamp(commentsData) {
//     console.log("this is commentsData in getTimeStamp:", commentsData);
//     let seconds = commentsData / 1000;

//     switch (true) {
//         case seconds > 883008000:
//             let num = Math.floor(seconds / 883008000);
//             if (num < 2) {
//                 return num + " year ago";
//             } else {
//                 return num + " years ago";
//             }
//         case seconds > 24192000:
//             dateEl.innerText = "";
//             break;
//         case seconds > 604800:
//             dateEl.innerText = "";
//             break;
//         case seconds > 86400:
//             dateEl.innerText = "";
//             break;
//         case seconds > 3600:
//             dateEl.innerText = "";
//             break;
//         case seconds > 60:
//             dateEl.innerText = "";
//             break;

//         default:
//             dateEl.innerText = "Just Now";
//     }

// }


//input length check and handler
// function checkInputLength() {
//     if ((nameInput.value.length < 1) || (commentInput.value.length < 1)) {
//         //check name length 
//         if (nameInput.value.length < 1) {
//             nameInput.classList.add("comments__input--required");
//         } else {
//             nameInput.classList.remove("comments__input--required");
//         }

//         //check comment length {
//         if (commentInput.value.length < 1) {
//             commentInput.classList.add("comments__input--required");

//         } else {
//             commentInput.classList.remove("comments__input--required");
//         }
//     } else {
//         //newComment();
//         // postComment(requestBody);
//     }
// }



