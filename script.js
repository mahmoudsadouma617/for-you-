/* =========================================
   SETTINGS
========================================= */

const SECRET_PASSWORD = "19/9/25";

// Birthday (month is 1-12). The countdown repeats every year automatically.
const BIRTHDAY_MONTH = 11;
const BIRTHDAY_DAY = 22;

const MESSAGE = ` birthday to my beautiful girl, my Nody, my favorite person in the whole world. 🥳🎂❤️

I honestly don’t know where to start, but I just want you to know how happy I am to have you in my life. You have a special place in my heart that nobody else could ever take, and I’m so grateful for every moment we share together. You make my days better in ways you probably don’t even realize, and even the smallest things become special when they’re with you.

I wish you a year full of happiness, success, love, and beautiful memories. I hope you achieve everything you’ve ever dreamed of, and I hope your smile never leaves your beautiful face. You deserve all the good things in this world, and I hope life gives you a million reasons to be happy.

I know we might not always be perfect, but I hope we always keep choosing each other, understanding each other, and making beautiful memories together. I want to celebrate so many more birthdays with you, make you laugh when you’re sad, share every little detail of our days, and be part of all the beautiful things waiting for you in the future. ❤️🥹

You’re not just my girlfriend; you’re my daughter, my best friend, my favorite girl, and someone who means more to me than I can explain. I love your smile, your laugh, your personality, and all the little things that make you the girl I fell in love with.

Happy birthday, my princess. I hope this year is as beautiful as your heart, and I hope you always remember how loved and special you are to me. I love you so much, Nody, and I’m so lucky to call you mine👩🏻‍❤️‍💋‍👨🏻🤩❤️
محظوظ جداً بحنيتك عليا واهتمامك بيا وبكل حاجه تخصني وحبك ليا وبجد محظوظ بوجودك في حياتي ياروح قلب لولو🫂🖇️.  

بحبك قد البحر وسمكاته🤪🌏❣️

`;


/* =========================================
   PASSWORD
========================================= */

const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

const passwordScreen = document.getElementById("passwordScreen");
const hero = document.getElementById("hero");

if (passwordForm) {

    passwordForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const enteredPassword = passwordInput.value.trim();

        if (enteredPassword === SECRET_PASSWORD) {

            passwordError.style.display = "none";

            passwordScreen.classList.add("hidden");

            hero.classList.remove("hidden");

            passwordInput.value = "";

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } else {

            passwordError.style.display = "block";

            passwordInput.value = "";

            passwordInput.focus();

        }

    });

}


/* =========================================
   OPEN YOUR GIFT
========================================= */

const openGiftButton = document.getElementById("openGiftButton");
const mainContent = document.getElementById("mainContent");

if (openGiftButton && mainContent) {

    openGiftButton.addEventListener("click", function () {

        mainContent.classList.remove("hidden");

        mainContent.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    });

}


/* =========================================
   COUNTDOWN
========================================= */

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");


const countdownTitle = document.getElementById("countdownTitle");

function getNextBirthday() {

    const now = new Date();

    let target = new Date(
        now.getFullYear(),
        BIRTHDAY_MONTH - 1,
        BIRTHDAY_DAY,
        0, 0, 0
    );

    const isToday =
        now.getMonth() === BIRTHDAY_MONTH - 1 &&
        now.getDate() === BIRTHDAY_DAY;

    if (!isToday && target.getTime() < now.getTime()) {
        target = new Date(
            now.getFullYear() + 1,
            BIRTHDAY_MONTH - 1,
            BIRTHDAY_DAY,
            0, 0, 0
        );
    }

    return { target: target, isToday: isToday };

}


function setCountdown(d, h, m, s) {

    if (daysElement) daysElement.textContent = String(d).padStart(2, "0");
    if (hoursElement) hoursElement.textContent = String(h).padStart(2, "0");
    if (minutesElement) minutesElement.textContent = String(m).padStart(2, "0");
    if (secondsElement) secondsElement.textContent = String(s).padStart(2, "0");

}


function updateCountdown() {

    const info = getNextBirthday();

    if (info.isToday) {

        setCountdown(0, 0, 0, 0);

        if (countdownTitle) {
            countdownTitle.textContent = "Today is your special day 🎉";
        }

        return;
    }

    const difference = info.target.getTime() - Date.now();

    setCountdown(
        Math.floor(difference / (1000 * 60 * 60 * 24)),
        Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        Math.floor((difference % (1000 * 60)) / 1000)
    );

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   TYPEWRITER
========================================= */

const typewriterElement =
    document.getElementById("typewriterText");

let typewriterStarted = false;


function startTypewriter() {

    if (!typewriterElement) {
        return;
    }

    if (typewriterStarted) {
        return;
    }

    typewriterStarted = true;

    const characters = Array.from(MESSAGE.trim());

    let index = 0;

    typewriterElement.textContent = "";


    function typeCharacter() {

        if (index < characters.length) {

            typewriterElement.textContent += characters[index];

            index++;

            setTimeout(typeCharacter, 25);

        }

    }


    typeCharacter();

}


// Start typing only when the letter is actually on screen
const letterElement = document.querySelector(".letter");

if (letterElement) {

    if ("IntersectionObserver" in window) {

        const letterObserver = new IntersectionObserver(
            function (entries) {

                if (entries[0].isIntersecting) {
                    startTypewriter();
                    letterObserver.disconnect();
                }

            },
            { threshold: 0.3 }
        );

        letterObserver.observe(letterElement);

    } else {

        startTypewriter();

    }

}


/* =========================================
   MUSIC
========================================= */

const music =
    document.getElementById("backgroundMusic");

const musicButton =
    document.getElementById("musicButton");

let musicPlaying = false;


if (musicButton && music) {

    musicButton.addEventListener(
        "click",
        async function () {

            try {

                if (!musicPlaying) {

                    await music.play();

                    musicPlaying = true;

                    musicButton.textContent = "🔊";

                } else {

                    music.pause();

                    musicPlaying = false;

                    musicButton.textContent = "🎵";

                }

            } catch (error) {

                alert(
                    "Add your music file inside the music folder first."
                );

            }

        }
    );

}


/* =========================================
   FLOATING HEARTS
========================================= */

const heartsContainer =
    document.getElementById("hearts");


function createHeart() {

    if (!heartsContainer) {
        return;
    }

    if (document.hidden) {
        return;
    }


    const heart =
        document.createElement("div");

    heart.className = "heart";


    const heartSymbols = [
        "❤️",
        "💕",
        "💗",
        "💖",
        "💓",
        "💞"
    ];


    heart.textContent =
        heartSymbols[
            Math.floor(
                Math.random() *
                heartSymbols.length
            )
        ];


    heart.style.left =
        Math.random() * 100 + "vw";


    heart.style.fontSize =
        (12 + Math.random() * 15) + "px";


    heart.style.animationDuration =
        (5 + Math.random() * 5) + "s";


    heartsContainer.appendChild(heart);


    setTimeout(function () {

        heart.remove();

    }, 10000);

}


setInterval(createHeart, 700);


/* =========================================
   SCROLL ANIMATIONS
========================================= */

const animatedElements =
    document.querySelectorAll(
        ".photo-card, .reason-card, .timeline-card, .count-box"
    );


if ("IntersectionObserver" in window) {

    const observer = new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    const element = entry.target;

                    element.classList.add("visible");

                    observer.unobserve(element);

                    // Once revealed, drop the helper classes so
                    // the normal hover effects work again
                    setTimeout(function () {
                        element.classList.remove("reveal", "visible");
                    }, 900);

                }

            });

        },
        { threshold: 0.15 }
    );


    animatedElements.forEach(function (element) {

        element.classList.add("reveal");

        observer.observe(element);

    });

}
const giftVideo = document.getElementById("giftVideo");

if (giftVideo && music && musicButton) {
    giftVideo.addEventListener("play", function () {
        if (musicPlaying) {
            music.pause();
            musicPlaying = false;
            musicButton.textContent = "🎵";
        }
    });
}