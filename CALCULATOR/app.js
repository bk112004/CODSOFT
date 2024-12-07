let entries = document.querySelectorAll(".entries");
let screen = document.querySelector(".screen");
let audio = new Audio('click.mp3');


entries.forEach(function (entry) {
    entry.addEventListener("click", function () {
        audio.currentTime = 0;
        audio.play()
            .then(() => {
                setTimeout(() => {
                    audio.pause();
                }, 1000);
            })
            .catch(err => {
                console.error("Audio playback failed:", err);
            });
    });
});

function Clear() {
    screen.innerText = "0";
}

function Backspace() {
    let screen = document.querySelector(".screen");
    screen.innerText = screen.innerText.slice(0, -1) || '0';
}

function Solve(val) {
    if ("+-x*/".includes(screen.innerText.slice(-1)) && "+-x*/".includes(val)) {
        return;
    }
    if (screen.innerText === "0") {
        screen.innerText = val;
    } else {
        screen.innerText += val;
    }
}

function Result() {
    let screen = document.querySelector(".screen");
    let expression = screen.innerText;
    try {
        expression = expression.replace(/x/g, "*");
        let result = math.evaluate(expression);
        if (Number.isInteger(result)) {
            screen.innerText = result;
        } else {
            screen.innerText = parseFloat(result.toFixed(6));
        }
    }
    catch (error) {
        screen.innerText = "Error";
    }
}

