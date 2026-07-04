const releaseDate = new Date("August 3, 2026 00:00:00").getTime();

/* Countdown */
function updateCountdown() {
    const now = new Date().getTime();
    const distance = releaseDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, '0');
    document.getElementById("hours").innerText = String(hours).padStart(2, '0');
    document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
    document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* Music */
const musicFrame = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");
let playing = true;

function toggleMusic() {
    if (playing) {
        musicFrame.src = "https://www.youtube.com/embed/6Z6-daOCLEU";
        btn.innerText = "🔇 MUSIC";
    } else {
        musicFrame.src = "https://www.youtube.com/embed/6Z6-daOCLEU?autoplay=1&loop=1&playlist=6Z6-daOCLEU";
        btn.innerText = "🔊 MUSIC";
    }
    playing = !playing;
}
