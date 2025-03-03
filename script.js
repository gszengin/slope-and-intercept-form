<!DOCTYPE html>
<html lang="en">
<head>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Slope and Intercept Form Challenge</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container-1">
        <h1>Slope and Intercept Form Challenge</h1>
    </div>

    <div class="container-2">
        <p id="question">Loading question...</p>
    </div>

    <div class="container-3">

        <div class="scoreboard">
            <p>Score: <span id="score">0</span></p>
        </div>

        <div id="question-box">
            <input type="text" id="answer" placeholder="" autocomplete="off">
            <button onclick="checkAnswer()">Submit</button>
        </div>

        <div class="feedback"> 
            <p id="feedback"></p>
            <p id="hintText" style="display: none;"></p>
        </div>
        
        <div class="hintTimerStart">
            <button id="hintButton">Show Hint</button>
            Time Left: <span id="timer">60</span> seconds
            <button id="startButton">Start Challenge</button>
        </div>  

    </div>

    <div class="container-4">

                    <div>
                        <label>Select Challenge Time:</label> 
                    </div>
        
                    <div id="timerOptions">
                        <input type="radio" id="time1" name="timer" value="60" checked>
                        <label for="time1">1 Minute</label>
                
                        <input type="radio" id="time2" name="timer" value="120">
                        <label for="time2">2 Minutes</label>

                        <input type="radio" id="time3" name="timer" value="180">
                        <label for="time3">3 Minutes</label>
                    </div>
                    
                    <div id="timerOptions">
                        <input type="radio" id="time4" name="timer" value="240">
                        <label for="time4">4 Minutes</label>

                        <input type="radio" id="time5" name="timer" value="300">
                        <label for="time5">5 Minutes</label>

                        <input type="radio" id="time3" name="timer" value="600">
                        <label for="time3">10 Minutes</label>
                    </div>
            
        </div>
    
    </div>

    <div id="end-screen" class="hidden">
        <h2>Slope and Intercept Form Challenge is Over!</h2>
        <p>Your final score: <span id="final-score">0</span></p>
        <label for="player-name">Enter your name:</label>
        <input type="text" id="player-name" placeholder="Your Name">
        <button onclick="generateCertificate()">Get Certificate</button>

        <div id="certificate"></div>
        <button onclick="saveCertificateAsImage()">Save as Image</button>
        <button onclick="saveCertificateAsPDF()">Save as PDF</button>
    </div>
        
        
    <script src="script.js"></script>
</body>
</html>
