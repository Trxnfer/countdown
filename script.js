const releaseDate = new Date("August 3, 2026 00:00:00").getTime();

/* countdown */
function updateCountdown() {
    const now = new Date().getTime();
    const distance = releaseDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

/* MUSIC */
const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

let playing = false;

function toggleMusic() {
    if (playing) {
        music.pause();
        btn.innerText = "🔇 Music";
    } else {
        music.play();
        btn.innerText = "🔊 Music";
    }
    playing = !playing;
}
