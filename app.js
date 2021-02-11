/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
"use strict";

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import dice1 from './dice-1.png';
import dice2 from './dice-2.png';
import dice3 from './dice-3.png';
import dice4 from './dice-4.png';
import dice5 from './dice-5.png';
import dice6 from './dice-6.png';

const btnNewEle = document.querySelector(".btn-new");
const btnRollEle = document.querySelector(".btn-roll");
const btnHoldEle = document.querySelector(".btn-hold");
const diceEle = document.querySelector(".dice");

const player0El = document.querySelector(".player-0-panel");
const player1El = document.querySelector(".player-1-panel");

let currScore, activePlayer, score, playing;

const init = function(){

     currScore = 0;
     activePlayer = 0;

     score = [0, 0];

     playing = true;

    document.getElementById("score-1").textContent = 0;
    document.getElementById("score-0").textContent = 0;
    
    document.getElementById("current-0").textContent = 0;
    document.getElementById("current-1").textContent = 0;  

    diceEle.classList.add("hidden");
    player0El.classList.add('active');
    player1El.classList.remove('active');

    player0El.classList.remove('winner');
    player1El.classList.remove('winner');
}

init();

const switchPlayer = function () {
    player0El.classList.toggle("active");
    player1El.classList.toggle("active");
    currScore = 0;
    document.getElementById(`current-${activePlayer}`).textContent = currScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
};

btnRollEle.addEventListener("click", function () {
    if (playing) {
       
        const dice = Math.trunc(Math.random() * 6) + 1;
        console.log(dice);

        let ele;

        if(dice === 1) ele = dice1;
        if(dice === 2) ele = dice2;
        if(dice === 3) ele = dice3;
        if(dice === 4) ele = dice4;
        if(dice === 5) ele = dice5;
        if(dice === 6) ele = dice6;
        diceEle.src = `${ele}`;
        


        diceEle.classList.remove("hidden");

        if (dice != 1) {
            currScore += dice;
            document.getElementById(
                `current-${activePlayer}`
            ).textContent = currScore;
        } else {
            switchPlayer();
        }
    }
});

btnHoldEle.addEventListener("click", function () {
    if (playing) {
        score[activePlayer] += currScore;
        document.getElementById(`score-${activePlayer}`).textContent =
            score[activePlayer];

        if (score[activePlayer] >= 100) {
            playing = false;
            document
                .querySelector(`.player-${activePlayer}-panel`)
                .classList.add("winner");
            document
                .querySelector(`.player-${activePlayer}-panel`)
                .classList.remove("active");
        } else {
            switchPlayer();
        }
    }
});

btnNewEle.addEventListener("click", init);


