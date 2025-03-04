let score = 0;
let timeLeft = 60;
let timer;
let correctAnswers = 0;
let wrongAnswers = 0;
let currentQuestion = {};
let correctStreak = 0; // Tracks consecutive correct answers

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatEquation(m, b) {
    let slope = m === 1 ? "" : m === -1 ? "-" : m === 0 ? "" : m;
    let intercept = b === 0 ? "" : (b > 0 ? ` + ${b}` : ` - ${Math.abs(b)}`);
    return b === 0 && m === 0 ? "y = 0" : b === 0 ? `y = ${slope}x` : m === 0 ? `y = ${b}` : `y = ${slope}x${intercept}`;
}

function generateQuestion() {
    const m = getRandomInt(-10, 10);
    const b = getRandomInt(-10, 10);
    const caseType = getRandomInt(1, 3);

    let question = "";
    let answer = "";
    let hint = "";

    switch (caseType) {
        case 1:
            question = `What is the slope of the equation
                         ${formatEquation(m, b)}?`;
            answer = m.toString();
            hint = "Remember: The slope (m) is the coefficient of x.";
            break;
        case 2:
            question = `What is the y-intercept of the equation
                         ${formatEquation(m, b)}?`;
            answer = b.toString();
            hint = "The y-intercept (b) is the constant term — where the line crosses the y-axis.";
            break;
        case 3:
            question = `Write the equation of the line 
                        with slope ${m} and y-intercept ${b}.`;
            answer = formatEquation(m, b);
            hint = "Use the slope-intercept form: y = mx + b.";
            break;
    }

    currentQuestion = { question, answer, hint };
    document.getElementById("question").innerText = currentQuestion.question;
    document.getElementById("answer").value = "";
    document.getElementById("hintText").style.display = "none";
    document.getElementById("hintText").innerText = ""; // Use innerText for consistency
    document.getElementById("hintButton").textContent = "Show Hint";
}

document.getElementById("hintButton").addEventListener("click", function() {
    const hintText = document.getElementById("hintText");

    if (currentQuestion.hint) {
        if (hintText.style.display === "none") {
            hintText.style.display = "block";
            hintText.innerText = currentQuestion.hint;
            this.textContent = "Hide Hint";
        } else {
            hintText.style.display = "none";
            this.textContent = "Show Hint";
        }
    }
});



function checkAnswer() {
    let userAnswer = document.getElementById("answer").value.replace(/\s+/g, ''); // Remove spaces
    if (userAnswer === currentQuestion.answer.replace(/\s+/g, '')) {
        score++;
        correctAnswers++;
        correctStreak++;

        let positiveFeedback = [
            "Great job! 🎉",
            "You're a slope and intercept form master! 🔥",
            "Keep it up! 🚀",
            "Awesome work! ✅",
            "You’re nailing this! 🌟"
        ];

        let feedbackMessage = positiveFeedback[Math.floor(Math.random() * positiveFeedback.length)];

        if (correctStreak === 3) {
            feedbackMessage = "Incredible! You're on fire! 🔥🔥🔥";
        } else if (correctStreak === 5) {
            feedbackMessage = "Math genius alert! 🚀💡";
        } else if (correctStreak === 10) {
            feedbackMessage = "Unstoppable! 🏆 You should be teaching this! 👏";
        }

        document.getElementById("feedback").innerText = feedbackMessage;
    } else {
        wrongAnswers++;
        correctStreak = 0;
        document.getElementById("feedback").innerText = "❌ Incorrect, try again!";
    }

    document.getElementById("score").textContent = score;
    generateQuestion();
}

// Allow Enter key to submit answer
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("startButton").addEventListener("click", startGame);

    document.getElementById("answer").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    document.getElementById("submitButton").addEventListener("click", checkAnswer);

    document.getElementById("hintButton").addEventListener("click", function() {
        const hintText = document.getElementById("hintText");

        if (currentQuestion.hint) {
            if (hintText.style.display === "none" || hintText.innerText === "") {
                hintText.style.display = "block";
                hintText.innerText = currentQuestion.hint; // innerText is better here
                this.textContent = "Hide Hint";
            } else {
                hintText.style.display = "none";
                this.textContent = "Show Hint";
            }
        }
    });

    generateQuestion();
});


function startGame() {
    score = 0;
    correctAnswers = 0;
    wrongAnswers = 0;
    timeLeft = parseInt(document.querySelector('input[name="timer"]:checked').value);

    document.getElementById("score").textContent = score;
    document.getElementById("timer").textContent = timeLeft;

    if (timer) {
        clearInterval(timer);
    }

    document.getElementById("answer").disabled = false;
    document.querySelector("#question-box button").disabled = false;

    generateQuestion();

    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timer);
    document.getElementById("final-score").innerText = score;
    document.getElementById("end-screen").classList.remove("hidden");

    document.getElementById("answer").disabled = true;
    document.querySelector("#question-box button").disabled = true;
}

// Initialize the first question
generateQuestion();

cument.querySelector("#question-box button").disabled = true;


function generateCertificate() {

    document.getElementById("certificate").style.display = "block";


    let playerName = document.getElementById("player-name").value.trim();
    if (playerName === "") {
        playerName = "Student"; // Default if no name is entered
    }

    let totalQuestions = correctAnswers + wrongAnswers;
    let percentage = totalQuestions > 0 ? ((correctAnswers / totalQuestions) * 100).toFixed(2) : 0;

    // Achievement messages based on performance
    let achievementMessage = "";
    if (percentage === 100) {
        achievementMessage = "Outstanding performance! You achieved a perfect score! 🌟";
    } else if (percentage >= 90) {
        achievementMessage = "Amazing work! You're mastering slope and intercept form like a pro! 🚀";
    } else if (percentage >= 75) {
        achievementMessage = "Great job! You're on your way to becoming a slope and intercept form expert! 💡";
    } else if (percentage >= 50) {
        achievementMessage = "Good effort! Keep practicing and you'll be a pro in no time! 🔥";
    } else {
        achievementMessage = "Keep going! Every mistake is a step toward improvement. 💪";
    }

    // Get the selected timer challenge
    let selectedTimer = document.querySelector('input[name="timer"]:checked')?.value || "Unknown";

    // Certificate template
    let certificateHTML = `
        <h2>Slope and Intercept Form Challenge Certificate</h2>
        <p><strong>Congratulations, ${playerName}!</strong></p>
        <p>You completed the slope and intercept form challenge in <strong>${selectedTimer} seconds</strong> with the following results:</p>
        <ul>
            <p><strong>Score:</strong> ${score}</p>
            <p><strong>Correct Answers:</strong> ${correctAnswers} and <strong>Wrong Answers:</strong> ${wrongAnswers}</p>
            <p></p>
            <p><strong>Total Questions Attempted:</strong> ${totalQuestions}</p>
            <p><strong>Accuracy:</strong> ${percentage}%</p>
        </ul>
        <p>${achievementMessage}</p>
        <p>Keep up the great work, and continue sharpening your math skills! </p>
        <p><strong>www.richineducation.com</strong></p>
    `;

    document.getElementById("certificate").innerHTML = certificateHTML;
}

function saveCertificateAsImage() {
    const certificateElement = document.getElementById("certificate");

    html2canvas(certificateElement).then(canvas => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "Slope-and-Intercept-Form-Certificate.png";
        link.click();
    });
}

function saveCertificateAsPDF() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF({
        orientation: "landscape", // Landscape format
        unit: "in", // Use inches
        format: [11, 8.5] // US Letter size (11 x 8.5 inches)
    });

    const certificateElement = document.getElementById("certificate");

    html2canvas(certificateElement, { scale: 2 }).then(canvas => {
        const imgData = canvas.toDataURL("image/png");

        const margin = 0.5; // Adjust bottom margin (in inches)
        const imgWidth = 10.2; // Keep some space on left/right
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        pdf.setFontSize(15); // Adjust font size (default is 16)

        pdf.addImage(imgData, "PNG", margin, margin, imgWidth, imgHeight - margin); // Adds spacing at bottom
        pdf.save("Slope-and-Intercept-Form-Certificate.pdf");
    });
}


