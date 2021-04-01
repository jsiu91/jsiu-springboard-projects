const gameContainer = document.getElementById("game");
const restartGameBtn = document.querySelector('#restart-game');

let cardCounter = 0;
let faceUpCards = [];
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// add function to restart button
restartGameBtn.addEventListener("click", restartGame);

// TODO: Implement this function!
function handleCardClick(event) {
  // prevent from continuously clicking
  if (noClicking) return;
  // faceup card and adding to faceUpCards array
  event.target.style.backgroundColor = event.target.classList;
  let card = event.target.classList;
  card.add("isUp");
  faceUpCards.push(card);
  // prevent from clicking more than 2
  if(faceUpCards.length < 2){
    noClicking = false;
  } else{
    noClicking = true;
  }
  // show only two cards at a time
  if (faceUpCards.length === 2){
    //find match
    if (faceUpCards[0].value === faceUpCards[1].value){
      matched();
      cardCounter += 2;
    } else{
      setTimeout(function(){
        unmatched();
      }, 1000);
    }
  }
  if(cardCounter === COLORS.length) restartGameBtn.style.visibility = "visible";
}

function matched(){
  faceUpCards = [];
  noClicking = false;
}

function unmatched(){
  document.getElementsByClassName(`${faceUpCards[0].value}`)[0].style.backgroundColor = "transparent";
  document.getElementsByClassName(`${faceUpCards[1].value}`)[0].style.backgroundColor = "transparent";
  faceUpCards[0].remove("isUp");
  faceUpCards[1].remove("isUp");
  faceUpCards = [];
  noClicking = false;
}

function restartGame(){
  while (gameContainer.firstChild) gameContainer.removeChild (gameContainer.firstChild);
  shuffledColors = shuffle(COLORS);
  createDivsForColors(shuffledColors);
  cardCounter = 0;
}
// when the DOM loads
window.addEventListener("DOMContentLoaded", function(){
  createDivsForColors(shuffledColors);
});

