const countries = [
    "Bahrain", "Egypten", "Iran", "Irak", 
    "Palestina", "Libanon", "Jordanien", "Kuwait", 
    "Oman", "Qatar", "Saudiarabien", "Syrien", 
    "Turkiet", "Förenade Arabemiraten", "Jemen",
];

const countrySongs = [
    "bn.mp3", "egy.mp3", "in.mp3", 
    "ik.mp3", "ps.mp3", "lb.mp3", "jd.mp3", 
    "kuw.mp3", "om.mp3", "qt.mp3", "ksa.mp3", 
    "syr.mp3", "tr.mp3", "uae.mp3", "je.mp3",
];

const hintsArray = [
"En liten ö-nation i Persiska viken, känd för sina pärlor och motorsport.",
"Hem till antika monument och en av de äldsta civilisationerna vid en stor flod.",
"Känd för sin rika kultur och poesi, tidigare känt under ett annat namn.",
"Här låg en av de äldsta civilisationerna, ofta kallad civilisationens vagga.",
"Området med lång historia och pågående konflikt, där en helig stad ligger.",
"Känd för sina träd och huvudstad, tidigare kallad mellanösterns Paris.",
"Här ligger en antik stad, huggen direkt ur klipporna.",
"En rik oljenation vid Persiska viken som invaderades av ett grannland 1990.",
"Känd för sina traditionella marknader och en unik moské.",
"En liten men rik oljenation som kommer vara värd för stora sportevenemang.",
"Hem till en av de heligaste platserna inom en stor religion.",
"Här ligger en av de äldsta kontinuerligt bebodda städerna i världen.",
"Sträcker sig över två kontinenter och är känt för en stor stad med rik historia.",
"Känd för sin moderna arkitektur och världens högsta byggnad.",
"Har en lång historia av sjöfart och handel, och är hem för en legendarisk drottning."
];

let random = Math.floor(Math.random() * countries.length);
let answer = countries[random];


const guessSubmit = document.querySelector('.guessSubmit');
const guessField = document.querySelector('.guessField');
const resetButton = document.querySelector('.resetButton');
const border = document.querySelector('.border');

const guesses = document.getElementById('guesses');
const lastResult = document.getElementById('lastResult');
const hint = document.getElementById('hint');
const lastGuess = document.getElementById('lastGuess');

let guessCount = 5;

let winAudio = new Audio(`media/${countrySongs[random]}`);
let wrongAudio = new Audio("media/wrong.mp3");
let failAudio = new Audio("media/fail.mp3");

function checkGuess() {

    let userGuess = guessField.value;

    if (guessCount === 5) {
        lastGuess.textContent = 'Tidigare gissningar: ';
    }
    lastGuess.textContent += ` ${userGuess}, `;

    if (userGuess.toLowerCase() === answer.toLowerCase()) {
        lastResult.textContent = 'Grattis! Du har rätt!';
        border.style.backgroundColor = 'rgba(13, 110, 0, 0.664)';
        border.classList.add('vitText');
        lastGuess.style.display = 'none';
        winAudio.play();
        setGameOver();
    } else {
        guessCount--;
        if (guessCount === 0) {
            
            lastResult.textContent = 'Tyvärr! Du klarade inte det! Ge det ett nytt försök vetja!';
            border.style.backgroundColor = 'rgba(109, 1, 1, 0.575)';
            
            hint.textContent = `Rätt svar är: ${answer}`;
            border.classList.add('vitText');
            failAudio.play(); 
            setGameOver(); 

        } else {
            lastResult.textContent = 'Fel svar! Försök igen!';
            // lastResult.style.backgroundColor = 'red';
            wrongAudio.play();
            border.classList.add('skakaDEN');
            setTimeout(() => {
                border.classList.remove('skakaDEN');
            }, 500);
            wrongAudio.currentTime = 0;
        }
    }

    guesses.textContent = `Antal liv kvar: ${guessCount} `;
    guessField.value = '';
    guessField.focus();
}



guessField.addEventListener('keydown', function(enterTryck) {
    if (enterTryck.key === 'Enter') {
        enterTryck.preventDefault();
        guessSubmit.click();
    }
});

guesses.textContent = `Antal liv kvar: ${guessCount} `;
guessSubmit.addEventListener('click', checkGuess);
hint.textContent = `Ledtråd: ${hintsArray[random]}`;

function setGameOver() {
    guessField.disabled = false;
    guessSubmit.disabled = true;
    resetButton.style.display = 'block';
}

function resetGame() {
    guessCount = 5;
    random = Math.floor(Math.random() * countries.length);
    answer = countries[random];


    if (!winAudio.paused) {
        winAudio.pause();
        winAudio.currentTime = 0; 
    }
    winAudio = new Audio(`media/${countrySongs[random]}`);




    const resetParas = document.querySelectorAll('.border p');
    for (const resetPara of resetParas) {
        resetPara.textContent = '';
    }


    
    resetButton.style.display = 'none';
    guessSubmit.disabled = false;
    guessField.value = '';
    guessField.focus();
    border.style.backgroundColor = 'rgba(181, 187, 185, 0.664)'; 
    guesses.textContent = `Antal liv kvar: ${guessCount}`;
    hint.textContent = `Ledtråd: ${hintsArray[random]}`;
    lastGuess.style.display = 'block';
    guesses.style.display = 'block';


    border.classList.remove('skakaDEN'); 
    border.classList.remove('vitText');

    
}

resetButton.addEventListener('click', resetGame);
resetButton.style.display = 'none';
