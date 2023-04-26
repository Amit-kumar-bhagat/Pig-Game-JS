'use strict';

// selecting Elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const scores = [0, 0];
let currentscore = 0;
let activeplayer = 0;
let playing = true;

const switchplayer = function () {
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  if (activeplayer === 0) {
    activeplayer = activeplayer + 1;
    currentscore = 0;
  } else {
    activeplayer = 0;
  }
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// reset function
const reset = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll'
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display Dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Check for rolled 1

    if (dice !== 1) {
      // add dice to current score
      currentscore = currentscore + dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentscore;
    } else {
      // switch to next player
      switchplayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.add('hidden');
    // add currentscore to Activeplayer score

    scores[activeplayer] = scores[activeplayer] + currentscore;
    // scores[1] = scores[1]  + currentscore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scores[activeplayer];
    // check If the score is >=100
    if (scores[activeplayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
    } else {
      //Switch to the next player
      switchplayer();
    }
  }
});

document.querySelector('.btn--new').addEventListener('click', reset);
