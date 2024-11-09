const words = ["авион", "ајвар", "кифла", "бурек", "драма", "злато", "камен", "оброк", "океан", "тигар"];
let word;
let attempts;
let playAgain;
let gameActive = true;

function randomWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
}

function randomIndexes() {
    let i1 = Math.floor(Math.random() * 5);
    let i2;
    do {
        i2 = Math.floor(Math.random() * 5);
    } while (i1 === i2);
    return [i1, i2];
}

function restartGame() {
    startGame();
}

function startGame() {
    attempts = 5;
    gameActive = true;
    word = randomWord();
    const Indexes = randomIndexes();
    const container = document.getElementById("wordContainer");
    document.getElementById("attemptsContainer").textContent = `Attempts left: ${attempts}`;
    container.innerHTML = "";
    let firstAvailableInput = null;

    for (let i = 0; i < word.length; i++) {
        const letter = word[i];
        const input = document.createElement("input");

        input.type = "text";
        input.maxLength = 1;
        input.classList.add("letter-box");

        if (Indexes.includes(i)) {
            input.value = letter;
            input.classList.add("hint");
            input.readOnly = true;
        } else {
            input.addEventListener("input", (event) => {
                if (!gameActive) return;
                if (!input.readOnly && input.value !== "") {
                    let nextInput = input.nextElementSibling;

                    while (nextInput && nextInput.readOnly) {
                        nextInput = nextInput.nextElementSibling;
                    }

                    if (nextInput) {
                        nextInput.focus();
                    }
                }
            });

            input.addEventListener("keydown", (event) => {
                if (!gameActive) return;
                if (event.key === "Backspace" && input.value === "") {
                    let prevInput = input.previousElementSibling;

                    while (prevInput && prevInput.readOnly) {
                        prevInput = prevInput.previousElementSibling;
                    }

                    if (prevInput) {
                        prevInput.focus();
                    }
                }
                if (event.key === "Enter") {
                    checkAnswer();
                }
            });
        }

        container.appendChild(input);

        if (!input.readOnly && firstAvailableInput === null) {
            firstAvailableInput = input;
        }
    }

    if (firstAvailableInput) {
        firstAvailableInput.focus();
    }
}

function checkAnswer() {
    if (!gameActive) return;

    const container = document.getElementById("wordContainer");
    const inputs = container.getElementsByTagName("input");
    let userGuess = "";

    for (let input of inputs) {
        userGuess += input.value;
    }

    const result = document.getElementById("result");
    const attemptsContainer = document.getElementById("attemptsContainer");

    if (userGuess === word && attempts > 0) {
        document.body.classList.add("flash-green");
        alert("Correct! You guessed the word!");

        setTimeout(() => {
            document.body.classList.remove("flash-green");
            playAgain = confirm("Do you want to play again?");
            if (playAgain) {
                startGame();
            } else {
                gameActive = false;
            }
        }, 500);
    } else {
        attempts--;
        result.textContent = "Try again!";
        attemptsContainer.textContent = "Attempts left: " + attempts;

        document.body.classList.add("shake", "flash-red");

        setTimeout(() => {
            document.body.classList.remove("shake", "flash-red");
        }, 500);

        if (attempts < 1) {
            alert("You lose!");
            playAgain = confirm("Do you want to play again?");
            if (playAgain) {
                startGame();
            } else {
                gameActive = false;
            }
        }
    }
}

window.onload = function () {
    startGame();
};