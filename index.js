import { fifaData } from './fifa.js';
console.log(fifaData);

// ⚽️ M  V P ⚽️ //

/* Task 1: Investigate the data above. Practice accessing data by console.log-ing the following pieces of data 

(a) Home Team name for 2014 world cup final
(b) Away Team name for 2014 world cup final
(c) Home Team goals for 2014 world cup final
(d) Away Team goals for 2014 world cup final
(e) Winner of 2014 world cup final */

let final = fifaData.find(match => match.Stage === "Final" && match.Year === 2014);
console.log(`Home Team: ${final["Home Team Name"]}`);
console.log(`Away Team: ${final["Away Team Name"]}`);
console.log(`Home Goals: ${final["Home Team Goals"]}`);
console.log(`Away Goals: ${final["Away Team Goals"]}`);
if (final["Home Team Goals"] > final["Away Team Goals"]) {
    console.log(`Winner: ${final["Home Team Name"]}`)
} else {
    console.log(`Winner: ${final["Home Team Name"]}`);
}

/* Task 2: Create a function called  getFinals that takes `data` as an argument and returns an array of objects with only finals data */
const getFinals = data => data.filter(match => match.Stage === 'Final');
console.log(getFinals(fifaData));

/* Task 3: Implement a higher-order function called `getYears` that accepts the callback function `getFinals`, and returns an array called `years` containing all of the years in the dataset */

const getYears = (finals, data) => {
    const finalsYears = [];
    finals(data).map(match => finalsYears.push(match.Year));
    return finalsYears;
};
console.log(getYears(getFinals, fifaData));

/* Task 5: Implement a higher-order function called `getWinners`, that accepts the callback function `getFinals()` and determine the winner (home or away) of each `finals` game. Return the name of all winning countries in an array called `winners` */

const getWinners = (finals, data) => {
    let winners = [];
    finals(data).map(match => {
        if (match['Home Team Goals'] > match['Away Team Goals']) {
            winners.push(match['Home Team Name']);
        }
        else if (match['Home Team Goals'] < match['Away Team Goals']) {
            winners.push(match['Away Team Name']);
        }
        else {
            winners.push(`Tie Game: ${match['Home Team Name']} &  ${match['Away Team Name']}`);
        }
    })
    return winners;
};
console.log(getWinners(getFinals, fifaData));

/* Task 6: Implement a higher-order function called `getWinnersByYear` that accepts the following parameters and returns a set of strings "In {year}, {country} won the world cup!" 

Parameters: 
 * callback function getWinners
 * callback function getYears
 */

function getAllWinners(wins, years) {
    let winner = wins(getFinals, fifaData);
    let year = years(getFinals, fifaData);
    let arrWins = [];
    for (let i = 0; i < winner.length; i++) {
        arrWins.push(`In ${year[i]}, ${winner[i]} won the world cup!`);
    }
    return arrWins;
};

console.log(getAllWinners(getWinners, getYears));


/* Task 7: Create a function called `getCountryWins` that takes the parameters `data` and `team initials` and returns the number of world cup wins that country has had. 

Hint: Investigate your data to find "team initials"!
Hint: use `.reduce` */

function getCountryWins(data, initials) {
    initials = initials.toUpperCase()
    const wins = data.reduce((acc, game) => {
        if (game.Stage === "Final") {
            let winnerInitials;
            if (game["Home Team Goals"] > game["Away Team Goals"]) {
                winnerInitials = game["Home Team Initials"];
            } else if (game["Home Team Goals"] < game["Away Team Goals"]) {
                winnerInitials = game["Away Team Initials"];
            } else {
                winnerInitials = game["Away Team Initials"] + game["Home Team Initials"]
            }
            if (winnerInitials === initials) {
                return acc + 1;
            }
        }
        return acc;
    }, 0);
    return wins;
};
console.log(getCountryWins(fifaData, "ita"));

/* Task 8: Write a function called `getAverageGoals` that accepts a parameter `data` and returns the the average number of home team goals and away team goals scored per match (Hint: use .reduce and do this in 2 steps) */

function getAverageGoals(data) {
    let homeTeamGoalsAvg = data.reduce((goals, game, index) => {
        let gameCounter = index + 1;
        return goals + game["Home Team Goals"] / gameCounter;
    }, 0);
    let awayTeamGoalsAvg = data.reduce((goals, game, index) => {
        let gameCounter = index + 1;
        return goals + game["Away Team Goals"] / gameCounter;
    }, 0);
    return {
        homeTeamGoalsAvg,
        awayTeamGoalsAvg
    }
};
console.log(getAverageGoals(fifaData));

/// STRETCH 🥅 //

/* STRETCH 1: Write a function called getGoals() that accepts a parameter `data` and returns the team with the most goals score per appearance (average goals for) in the World Cup finals */

function getGoals(/* code here */) {

    /* code here */

};

getGoals();


/* STRETCH 2: Write a function called badDefense() that accepts a parameter `data` and calculates the team with the most goals scored against them per appearance (average goals against) in the World Cup finals */

function badDefense(/* code here */) {

    /* code here */

};

badDefense();

/* If you still have time, use the space below to work on any stretch goals of your chosing as listed in the README file. */
