const openButton = document.getElementById("openButton");

const welcomeScreen = document.querySelector(".welcome-screen");

const balloonScreen = document.getElementById("balloonScreen");

const balloons = document.querySelectorAll(".balloon");

const balloonCount = document.getElementById("balloonCount");

const balloonSuccess = document.getElementById("balloonSuccess");

const continueButton = document.getElementById("continueButton");


// Cake elements

const cakeScreen = document.getElementById("cakeScreen");

const blowButton = document.getElementById("blowButton");

const flame = document.getElementById("flame");

const blowHint = document.querySelector(".blow-hint");

const cakeSuccess = document.getElementById("cakeSuccess");

const cakeContinueButton = document.getElementById("cakeContinueButton");


let remainingBalloons = balloons.length;


/* =========================
   1. OPEN SURPRISE
========================= */

openButton.addEventListener("click", function () {

    welcomeScreen.style.display = "none";

    balloonScreen.style.display = "flex";

});


/* =========================
   2. POP BALLOONS
========================= */

balloons.forEach(function (balloon) {

    balloon.addEventListener("click", function () {

        balloon.style.transform = "scale(0)";

        balloon.style.opacity = "0";

        balloon.style.pointerEvents = "none";


        remainingBalloons--;

        balloonCount.textContent = remainingBalloons;


        // All balloons popped

        if (remainingBalloons === 0) {

            setTimeout(function () {

                document.querySelector(".game-content h2").style.display = "none";

                document.querySelector(".game-label").style.display = "none";

                document.querySelector(".game-instruction").style.display = "none";

                document.querySelector(".balloon-area").style.display = "none";

                document.querySelector(".balloon-counter").style.display = "none";


                balloonSuccess.style.display = "block";

            }, 500);

        }

    });

});


/* =========================
   3. GO TO CAKE SCREEN
========================= */

continueButton.addEventListener("click", function () {

    // Hide balloon screen

    balloonScreen.style.display = "none";


    // Show cake screen

    cakeScreen.style.display = "flex";

});

/* =========================
   4. REAL BLOW THE CANDLE
========================= */

blowButton.addEventListener("click", async function () {

    try {

        // Ask for microphone permission

        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true
        });


        // Create audio context

        const audioContext =
            new (window.AudioContext || window.webkitAudioContext)();


        const analyser = audioContext.createAnalyser();

        analyser.fftSize = 512;


        const microphone =
            audioContext.createMediaStreamSource(stream);


        microphone.connect(analyser);


        const dataArray =
            new Uint8Array(analyser.fftSize);


        // Change button text

        blowButton.textContent = "💨 Blow Now!";


        blowHint.textContent =
            "Blow into your microphone now! 💨";


        let blowingStarted = false;


        function detectBlow() {

            analyser.getByteTimeDomainData(dataArray);


            let sum = 0;


            for (let i = 0; i < dataArray.length; i++) {

                const value =
                    (dataArray[i] - 128) / 128;

                sum += value * value;

            }


            const volume =
                Math.sqrt(sum / dataArray.length);


            /*
             * If the sound is loud enough,
             * we consider it a blow.
             */

            if (volume > 0.12) {

                blowingStarted = true;

            }


            if (blowingStarted && volume < 0.08) {

                turnOffCandle();

                return;

            }


            requestAnimationFrame(detectBlow);

        }


        detectBlow();


        /*
         * Stop microphone and show
         * birthday success screen.
         */

        function turnOffCandle() {

            flame.style.display = "none";


            blowButton.style.display = "none";

            blowHint.style.display = "none";


            stream.getTracks().forEach(function (track) {

                track.stop();

            });


            audioContext.close();


            setTimeout(function () {

                document.querySelector(".cake-label").style.display = "none";

                document.querySelector(".cake-content h2").style.display = "none";

                document.querySelector(".cake-instruction").style.display = "none";

                document.querySelector(".cake-container").style.display = "none";


                cakeSuccess.style.display = "block";

            }, 700);

        }


    } catch (error) {

        console.log(error);


        /*
         * If microphone permission is denied,
         * provide a simple fallback.
         */

        blowButton.textContent =
            "🔥 Tap To Blow Candle";


        blowHint.textContent =
            "Microphone unavailable — tap the button instead. ❤️";


        blowButton.onclick = function () {

            flame.style.display = "none";

            blowButton.style.display = "none";

            blowHint.style.display = "none";


            setTimeout(function () {

                document.querySelector(".cake-label").style.display = "none";

                document.querySelector(".cake-content h2").style.display = "none";

                document.querySelector(".cake-instruction").style.display = "none";

                document.querySelector(".cake-container").style.display = "none";


                cakeSuccess.style.display = "block";

            }, 700);

        };

    }

});

/* =========================
   5. GO TO LETTER
========================= */

const letterScreen = document.getElementById("letterScreen");

const letterText = document.getElementById("letterText");

const memoryButton = document.getElementById("memoryButton");


cakeContinueButton.addEventListener("click", function () {

    // Hide cake screen

    cakeScreen.style.display = "none";


    // Show letter screen

    letterScreen.style.display = "flex";


    // Start typing the letter

    typeLetter();

});


/* =========================
   TYPEWRITER EFFECT
========================= */

function typeLetter() {

    const message = `Dear Kashish, ❤️

It's actually funny when I think about how our story started.

When I went to college on the last day of graduation, we weren't even best friends. We were just classmates. And somehow, on that day, we randomly ended up clicking a photo together. Little did we know that this random picture would become the first photo of a friendship that was yet to come. 🥹📸

And honestly, I don't know how we became this close in just one year. 😂❤️

But the funniest and probably my favourite thing about us is our MIND's BLUETOOTH CONNECTION. 🤣
Which is like........"Bluetooth device connected successfully." 🔵📱😂

From random talks to stupid jokes, from going out for no particular reason to sharing food, from understanding each other's expressions without saying a word — this one year has given me so many memories that I genuinely wouldn't want to replace.

And yes, you are also the same pagal, harami girl who somehow became my best friend. 😂❤️

I hope you keep singing, keep smiling, keep annoying everyone with your beautiful voice, and most importantly, keep being the same crazy and amazing Kashish you are. 🎶🫶

On your birthday, I just want to say...

Thank you for becoming my person so unexpectedly.

I hope life gives you everything you deserve — happiness, success, love, peace, and lots and lots of reasons to smile.

And no matter how much time passes, I hope our mind Bluetooth connection never gets disconnected. 😂❤️

Happy Birthday, Kashish! 🎂🎉

Stay crazy.....Stay happy.
And please never stop being my favourite pagal. ❤️`;



    letterText.textContent = "";

    memoryButton.style.display = "none";


    let index = 0;

    const typingSpeed = 35;


    function typeNextCharacter() {

        if (index < message.length) {

            letterText.textContent += message.charAt(index);

            index++;

            setTimeout(
                typeNextCharacter,
                typingSpeed
            );

        } else {

            // Letter finished

            memoryButton.style.display = "inline-block";

        }

    }


    typeNextCharacter();

}
/* =========================
   6. MEMORY GALLERY
========================= */

const memoryScreen =
    document.getElementById("memoryScreen");

const finalBirthdayButton =
    document.getElementById("finalBirthdayButton");


memoryButton.addEventListener("click", function () {

    // Hide letter

    letterScreen.style.display = "none";


    // Show memory gallery

    memoryScreen.style.display = "block";


    // Start gallery from top

    memoryScreen.scrollTop = 0;

});
/* =================================
   7. FINAL BIRTHDAY SURPRISE
================================= */

const finalScreen =
    document.getElementById("finalScreen");

const replayButton =
    document.getElementById("replayButton");


/* One Last Surprise button */

finalBirthdayButton.addEventListener("click", function () {

    // Hide Memory Gallery

    memoryScreen.style.display = "none";


    // Show Final Birthday Screen

    finalScreen.style.display = "block";


    // Start from top

    finalScreen.scrollTop = 0;


    // Start confetti

    createConfetti();


    playBirthdayMusic();

});


/* =================================
   CONFETTI
================================= */

function createConfetti() {

    const confettiSymbols = [
        "🎉",
        "🎊",
        "❤️",
        "💖",
        "✨",
        "💕",
        "🌸"
    ];


    for (let i = 0; i < 45; i++) {

        const confetti =
            document.createElement("div");


        confetti.className =
            "birthday-confetti";


        confetti.innerText =
            confettiSymbols[
                Math.floor(
                    Math.random() *
                    confettiSymbols.length
                )
            ];


        confetti.style.left =
            Math.random() * 100 + "vw";


        confetti.style.animationDuration =
            (3 + Math.random() * 3) + "s";


        confetti.style.animationDelay =
            Math.random() * 1.5 + "s";


        document.body.appendChild(
            confetti
        );


        setTimeout(function () {

            confetti.remove();

        }, 7000);

    }

}


/* =================================
   REPLAY STORY
================================= */

replayButton.addEventListener(
    "click",
    function () {

        finalScreen.style.display =
            "none";

        memoryScreen.style.display =
            "block";

        memoryScreen.scrollTop = 0;

    }
);
/* =================================
   REAL BIRTHDAY MUSIC
================================= */

let birthdayMusic = new Audio("music/birthday-piano.mp3");

birthdayMusic.loop = true;

birthdayMusic.volume = 0.35;


function playBirthdayMusic() {

    birthdayMusic.currentTime = 0;

    birthdayMusic.play().catch(function(error) {

        console.log("Music could not start:", error);

    });

}
/* =====================================
   LOADING SCREEN
   ===================================== */

window.addEventListener("load", function () {

    setTimeout(function () {

        const loadingScreen = document.getElementById("loadingScreen");

        if (loadingScreen) {
            loadingScreen.classList.add("hide-loading");
        }

    }, 1500);

});