/*
YOUR 3 CHALLENGES
Change the game to follow these rules:
1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. (Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/

let scores, roundScore, activePlayer, gamePlaying, defaultWinningScore, dices, i, previousDice1, previousDice2;

defaultWinningScore = 30;
dices = document.getElementsByClassName('dice');

function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    document.getElementById('winning-score').value = '';
    document.querySelector('.winning-score-label').textContent = 'Winning score: ' + defaultWinningScore;
    document.getElementById('score-0').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
    for (i = 0; i < dices.length; i++) {
        dices[i].style.display = 'none';
    }
}

function nextPlayer() {

    activePlayer === 1 ? activePlayer = 0 : activePlayer = 1;
    roundScore = 0;
    previousDice = 0;

    document.getElementById('current-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
}


document.getElementById('winning-score').addEventListener('change', function () {

    if (this.validity.valid && this.value > Math.max(...scores)) {
        document.querySelector('.winning-score-label').textContent = 'Winning score: ' + this.value;
    } else {
        this.value = '';
    }

    if(!this.value) {
        document.querySelector('.winning-score-label').textContent = 'Winning score: ' + defaultWinningScore;
    }
});



init();


document.querySelector('.btn-roll').addEventListener('click', function() {

    if(gamePlaying) {

        const dice1 = Math.floor(Math.random() * 6) + 1;
        const dice2 = Math.floor(Math.random() * 6) + 1;

        const diceDOM1 = document.querySelector('#dice1');
        const diceDOM2 = document.querySelector('#dice2');

        for (let i = 0; i < dices.length; i++) {
            dices[i].style.display = 'block';
        }

        diceDOM1.src = 'dice-' + dice1 + '.png';
        diceDOM2.src = 'dice-' + dice2 + '.png';

        if((previousDice1 === 6 && previousDice2 ===6) && (dice1 === 6 && dice2 === 6)) {

            scores[activePlayer] = 0;
            document.getElementById('score-' + activePlayer).textContent = '0';
            nextPlayer();
        }

        else if (dice1 !==1 && dice2 !== 1) {

            roundScore += dice1 + dice2;
            document.getElementById('current-' + activePlayer).textContent = roundScore;
        }

        else {
            nextPlayer();
        }

        previousDice1 = dice1;
        previousDice2 = dice2;
    }
});

document.querySelector('.btn-hold').addEventListener('click', function() {
    const input = document.getElementById('winning-score').value;


    if(gamePlaying) {

        let winningScore;

        scores[activePlayer] += roundScore;
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        if(input) {
            winningScore = input;
        } else {
            winningScore = defaultWinningScore;
        }

        if (scores[activePlayer] >= winningScore) {

            gamePlaying = false;
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-0-panel').classList.remove('active');
            document.querySelector('.player-1-panel').classList.remove('active');

            for (i = 0; i < dices.length; i++) {
                dices[i].style.display = 'none';
            }

        } else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);