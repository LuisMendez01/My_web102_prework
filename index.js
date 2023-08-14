/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    // loop over each item in the data
    for (const index in games) {

        // create a new div element, which will become the game card
        var createdDiv = document.createElement('div');// - creates an HTML element


        // add the class game-card to the list
        createdDiv.className = 'game-card';//Add the class game-card to the the div's class list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")
        createdDiv.innerHTML = `<img src="${games[index].img}" width="300" height="150"> <br> 
                                <h3> ${games[index].name} </h3>
                                ${games[index].description} </p>
                                ${games[index].backers}`; //sets the inner HTML of an element


        // append the game to the games-container
        document.getElementById('games-container').appendChild(createdDiv);
    }
}

// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games
addGamesToPage(GAMES_JSON);

/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/

// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const numOfBackers = GAMES_JSON.reduce((acc, property) => { return acc + property.backers },0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
document.getElementById('num-contributions').innerHTML = (numOfBackers).toLocaleString('en-US');


// grab the amount raised card, then use reduce() to find the total amount raised
const amountRaised = GAMES_JSON.reduce((acc, property) => { return acc + property.pledged },0);
const raisedCard = document.getElementById("total-raised");

// set inner HTML using template literal
raisedCard.innerHTML = `$${(amountRaised).toLocaleString('en-US')}`;


// grab number of games card and set its inner HTML
const numOfGames = GAMES_JSON.length;
const gamesCard = document.getElementById("num-games");
gamesCard.innerHTML = (numOfGames).toLocaleString('en-US');


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unFundedGamesOnly = GAMES_JSON.filter(property => property.pledged < property.goal);

    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unFundedGamesOnly);

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGamesOnly = GAMES_JSON.filter(property => property.pledged >= property.goal);

    // use the function we previously created to add unfunded games to the DOM
    addGamesToPage(fundedGamesOnly);

}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON);

}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

// add event listeners with the correct functions to each button
unfundedBtn.addEventListener('click',filterUnfundedOnly);
fundedBtn.addEventListener('click', filterFundedOnly);
allBtn.addEventListener('click',showAllGames);


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const unfundedGames = GAMES_JSON.reduce((acc, property) => (property.pledged < property.goal) ? (acc + 1) : (acc + 0) , 0);
const fundedGames = GAMES_JSON.filter( property => property.pledged >= property.goal);
const fundedGamesRaisedMoney = fundedGames.reduce( (acc, property) => acc + property.pledged ,0);

// create a string that explains the number of unfunded games using the ternary operator
const displayString = `A total of $${fundedGamesRaisedMoney.toLocaleString('en-US')} has been raised for ${fundedGames.length} games. Currently ${GAMES_JSON.length - fundedGames.length} games remain unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const newElement = document.createElement('p');
newElement.innerHTML = displayString;
document.getElementById('description-container').appendChild(newElement);

/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
let [firstGame, secondGame] = sortedGames;

console.log('firstGame');
console.log(firstGame.name);
console.log('secondGame');
console.log(secondGame.name);

// create a new element to hold the name of the top pledge game, then append it to the correct element
const e1 = document.createElement('p');
e1.innerHTML = firstGame.name;
document.getElementById('first-game').appendChild(e1);


// do the same for the runner up item
const e2 = document.createElement('p');
e2.innerHTML = secondGame.name;
document.getElementById('second-game').appendChild(e2);

const Search4Games = () => {
    
    deleteChildElements(gamesContainer);
    const input = document.getElementById('searchBox').value;
    const gamesSearched = GAMES_JSON.filter( property => property.name.toLowerCase().includes(input.toLowerCase()) )
    console.log(gamesSearched.length);
    addGamesToPage(gamesSearched);
}

document.getElementById('searchBox').addEventListener('input',Search4Games);