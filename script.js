const allCards = ['fa fa-diamond','fa fa-diamond',
                'fa fa-paper-plane-o', 'fa fa-paper-plane-o',
                'fa fa-anchor','fa fa-anchor', 'fa fa-bolt','fa fa-bolt',
                'fa fa-cube','fa fa-cube','fa fa-leaf', 'fa fa-leaf',
                'fa fa-bicycle', 'fa fa-bicycle', 'fa fa-bomb', 'fa fa-bomb'];

const cardsContainer = document.querySelector(".deck");

let openCards = [];
let matchCards = [];
let moves = 0;
let interval = null;
const playerTime = null;
const playerMoves = null;
const stars = null; 

/*   
*   Timer Function
*/

let timer = document.querySelector("#timer");
let seconds = 0; minutes = 0;
let intervalTime = function () {
    timer.innerHTML = minutes + " Minutes " + seconds + " Seconds ";
    seconds++;
    if (seconds == 60){
        minutes++;
        seconds = 0;
    }
};

/*
*   Start the Game
*/
startGame();


function startGame(){
    interval = setInterval(intervalTime, 1000);
    shuffle(allCards); 
    for(let i=0; i<allCards.length; i++){
    const card = document.createElement("li");
    card.classList.add('card');
    card.innerHTML = "<i class = ' " + allCards[i] + " '</i>";
    // select the parent and append to the grid
    cardsContainer.appendChild(card);
    //no longer static, the cards are dynamic   
   
    //Add Click Event to each Card
    clickOnCard(card);
    
    
    }
};


/*
*   Click Card Event
*/
   
function clickOnCard(card) {    
    card.addEventListener('click', function() {    
        if(openCards.length === 1){  
            const currentCard = this;
            const previousCard = openCards[0];
            card.classList.add('open', 'show', 'disable');
            openCards.push(this);
            
            countMoves();
            checkScore();
              
            //compare the cards here (matching area)

            if(currentCard.innerHTML === previousCard.innerHTML){
                
                currentCard.classList.add("match");
                previousCard.classList.add("match");

                /*
                should reset the open cards array to add the next one as 
                add elements to matchcards array
                */

                matchCards.push(currentCard, previousCard);
                openCards = [];
                
                //Declare whether or not game is over//
                
                    gameOver();
                                    
            } else {
                //delay action so we can see the card after being click
               setTimeout(function(){
                    currentCard.classList.remove('open', 'show', 'disable');
                    previousCard.classList.remove('open', 'show', 'disable');
                    openCards = []; 
                }, 504);
            
                }
            } else {
        // does not have the open card
        card.classList.add('open', 'show', 'disable');
        openCards.push(this);
        }
                
    });
        
};

/*
*   Move Counter
*/

function countMoves(){
    const moveCounter = document.querySelector('.moves');
    moves++;
    moveCounter.innerHTML = moves;
};

/*
*   Restart Button
*/
const restartButton = document.querySelector(".restart");
restartButton.addEventListener('click', function(){
    location.reload();
});
    



/*
*   Remove Stars
*/
function checkScore() {
    if (moves === 16){
        hideAStar();
    }   
    if (moves === 24){
        hideAStar();
    }      
}

function hideAStar(){
    const starList = document.querySelectorAll('.stars li');
    for (star of starList){
        if (star.style.display !== 'none') {
            star.style.display = 'none';
            break;
        }
    }
}

/*
*   End ofGame
*/

function gameOver(){
     if (matchCards.length === 16){
        clearInterval(interval);
        toggleModal();    
    }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function toggleModal(){
    modalStats();
    const modal = document.querySelector ('.modal_background');
    modal.classList.toggle('hide');

    document.querySelector('.modal_close').addEventListener('click',() => {
        toggleModal();
    });

    document.querySelector('.modal_cancel').addEventListener('click',() => {
        toggleModal();
    });

    document.querySelector('.modal_replay').addEventListener('click',() => {
        location.reload();
    });
};



function modalStats(){
    const playerTime = document.querySelector('.modal_time');
    playerTime.innerHTML = "Time:  " + minutes + " Minutes " + seconds + " Seconds ";

    const playerMoves = document.querySelector('.modal_moves');
    playerMoves.innerHTML = "Moves:  " + moves;  

    const starsStat = document.querySelector('.modal_stars');
    const stars = getStars();

    starsStat.innerHTML = "Stars:  " + stars; 
};


function getStars(){
    const stars = document.querySelectorAll('.stars li');
    starCount = 0;
    for (star of stars){
        if (star.style.display !== 'none') {
            starCount++;
        }
    }
    console.log(starCount);
    return starCount;
}

