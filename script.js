const releaseDate = new Date("August 3, 2026 00:00:00").getTime();

const btn = document.getElementById("playBtn");

function updateCountdown() {
    const now = new Date().getTime();
    const distance = releaseDate - now;

    if (distance <= 0) {
        document.querySelector(".countdown").innerHTML =
            "<h2>🚨 GAME IS NOW LIVE 🚨</h2>";

        btn.classList.remove("disabled");
        btn.textContent = "Play Now on Roblox";
        btn.href = "https://www.roblox.com"; // replace with your game link
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days;
    document.getElementById("hours").innerText = hours;
    document.getElementById("minutes").innerText = minutes;
    document.getElementById("seconds").innerText = seconds;
}

updateCountdown();
setInterval(updateCountdown, 1000);