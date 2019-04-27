/*
 * Create a list that holds all of your cards
 */
let cards = ["fa-diamond x", "fa-diamond",
    "fa-anchor", "fa-anchor",
    "fa-bolt", "fa-bolt",
    "fa-cube", "fa-cube",
    "fa-leaf", "fa-leaf",
    "fa-bicycle", "fa-bicycle",
    "fa-paper-plane-o", "fa-paper-plane-o",
    "fa-bomb", "fa-bomb",
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

function generateCard(card) {
    return `<li class="card" data-card="${card}"><i class="fa ${card}"></i></li>`;
};

// Timer
const time = document.querySelector('.timer');
let countSeconds = 0;

function timerStart() {
    setInterval(function () {
        countSeconds++;
        time.innerHTML = countSeconds + 'secs.';
    }, 1000);
};

function timerStop() {
    clearInterval(timerStart);
};

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
};

function initGame() {
    let boardHTML = shuffle(cards).map(function (card) {
        return generateCard(card);
    });

    moves = 0;
    moveCount.innerText = moves;

    deck.innerHTML = boardHTML.join('');

    listenToCards();

    ;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

let beginGame = true;
let openedCards = [];
let moves = 0;
let score = 0;
let moveCount = document.querySelector('.moves');
let deck = document.querySelector('.deck');

// Modal handlers
const modal = document.querySelector('.modal');
const closeBtnModal = document.querySelector('.close-btn-modal');
const restartBtnModal = document.querySelector('.restart-btn-modal');
const timeModal = document.querySelector('.time-values');

initGame();

function listenToCards() {
    let grabAllCards = document.querySelectorAll('.card');
    grabAllCards.forEach(function (card) {
        console.log(card);
        card.addEventListener('click', function (e) {

            console.log(openedCards);

            const thisCard = this;
            const oldCard = openedCards[0];

            if (beginGame) {
                timerStart();
                beginGame = false;
            }

            if (openedCards.length === 1) {
                card.classList.add('open', 'show', 'disable');
                openedCards.push(card);
                checkCards(thisCard, oldCard);
                if (score == 1) {
                    timerStop();
                    modal.classList.add('show-modal');
                    timeModal.innerText = countSeconds;
                }

            } else {
                card.classList.add('open', 'show', 'disable');
                openedCards.push(card);
            }
        })
    })
};

function checkCards(thisCard, oldCard) {
    if (thisCard.dataset.card === oldCard.dataset.card) {
        thisCard.classList.add('match');
        oldCard.classList.add('match');
        score++;
        openedCards = [];

    } else {
        setTimeout(function () {
            thisCard.classList.remove('open', 'show', 'disable');
            oldCard.classList.remove('open', 'show', 'disable');

        }, 700);

        openedCards = [];

    }

    refreshMoves();
};

function refreshMoves() {
    moves += 1;
    moveCount.innerText = moves;
    stars();
};

const resetClick = document.querySelector('.restart');
resetClick.addEventListener('click', function () {

    // Clear current board
    deck.innerHTML = "";

    // Clear data
    clearAll();

    // Make a new board
    initGame();

});

restartBtnModal.addEventListener('click', function () {

    // Hide modal
    modal.classList.remove('show-modal');

    // Clear current board
    deck.innerHTML = "";

    // Clear data
    clearAll();

    // Make a new board
    initGame();

});

closeBtnModal.addEventListener('click', function () {

    // Hide modal
    modal.classList.remove('show-modal');

});

const rating = document.querySelector('.stars').childNodes;
const ratingModal = document.querySelector('.stars-modal').childNodes;
console.log(ratingModal);

function stars() {
    if (moves === 3) {
        console.log('star color');
        rating[5].classList.add('white');
        ratingModal[5].classList.add('white');
    } else if (moves === 5) {
        rating[3].classList.add('white');
        ratingModal[3].classList.add('white');
    }
};

function clearAll() {
    openedCards = [];
    countSeconds, score = 0;
    timerStop();
    rating[5].classList.remove('white');
    rating[3].classList.remove('white');
    ratingModal[5].classList.remove('white');
    ratingModal[3].classList.remove('white');
};