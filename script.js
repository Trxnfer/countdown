const CAMPAIGN_MS = 180 * 24 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

const releaseDate = Date.UTC(2026, 8, 10);
const COUNTDOWN_MS = 25 * 24 * 60 * 60 * 1000;

const pad = (n) => String(n).padStart(2, "0");

function formatReleaseDate() {
    const d = new Date(releaseDate);
    const month = d.toLocaleString("en-US", { month: "long" });
    return `${month.toUpperCase()} ${d.getDate()}, ${d.getFullYear()}`;
}

function tick() {
    const now = Date.now();
    const distance = releaseDate - now;
    const live = distance <= 0;

    const days = Math.floor(distance / DAY_MS);
    const hours = Math.floor(distance / 3600000) % 24;
    const minutes = Math.floor(distance / 60000) % 60;
    const seconds = Math.floor(distance / 1000) % 60;

    const set = (id, v) => {
        document.getElementById(id).innerText = live ? "00" : pad(v);
    };
    set("days", Math.max(days, 0));
    set("hours", Math.max(hours, 0));
    set("minutes", Math.max(minutes, 0));
    set("seconds", Math.max(seconds, 0));

    const campaignStart = releaseDate - CAMPAIGN_MS;
    const pct = Math.min(1, Math.max(0, (now - campaignStart) / CAMPAIGN_MS));
    document.getElementById("progressBar").style.width = (live ? 1 : pct) * 100 + "%";

    document.body.classList.toggle("live", live);
    const progressLabel = document.getElementById("progressLabel");
    if (live) {
        document.getElementById("releasingText").innerText = "NOW LIVE";
        document.getElementById("badge").innerText = "NYC: THE TRENCHES — OUT NOW";
        progressLabel.innerText = "SERVE THE CITY";
    } else {
        const dateText = formatReleaseDate();
        if (progressLabel.textContent !== dateText) progressLabel.textContent = dateText;
    }

    const roboTip = document.getElementById("roboTip");
    if (roboTip) {
        const d = Math.max(days, 0);
        roboTip.textContent = live
            ? "NOW LIVE — HEAD TO ROBLOX"
            : `NOT OUT YET · ${d} DAY${d === 1 ? "" : "S"} LEFT`;
    }
}

setInterval(tick, 1000);
tick();

const frame = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");
let playing = true;

const ICON_ON = '<span class="eq" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>SOUND ON</span>';

const ICON_OFF =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 5 6 9H2v6h4l5 4V5z"></path><line x1="22" x2="16" y1="9" y2="15"></line><line x1="16" x2="22" y1="9" y2="15"></line></svg><span>MUTED</span>';

btn.innerHTML = ICON_ON;

btn.addEventListener("click", () => {
    playing = !playing;
    btn.classList.toggle("muted", !playing);
    if (playing) {
        frame.src = "https://www.youtube.com/embed/6Z6-daOCLEU?autoplay=1&loop=1&playlist=6Z6-daOCLEU";
        btn.innerHTML = ICON_ON;
    } else {
        frame.src = "https://www.youtube.com/embed/6Z6-daOCLEU";
        btn.innerHTML = ICON_OFF;
    }
});

const canvas = document.getElementById("embers");
const ctx = canvas.getContext("2d");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

const dpr = Math.min(devicePixelRatio || 1, 2);
let W = 0;
let H = 0;

function resize() {
    W = canvas.width = innerWidth * dpr;
    H = canvas.height = innerHeight * dpr;
}

addEventListener("resize", resize);
resize();

function makeDrop() {
    return {
        x: Math.random(),
        y: Math.random(),
        len: 0.02 + Math.random() * 0.05,
        speed: 0.0005 + Math.random() * 0.0011,
        drift: (Math.random() - 0.5) * 0.00003,
        a: 0.04 + Math.random() * 0.06,
        seed: Math.random() * Math.PI * 2,
    };
}

const dropCount = Math.max(16, Math.round(innerWidth / 45));

let drops = [];
if (!reduced) {
    drops = Array.from({ length: dropCount }, makeDrop);
}

function step() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = "#d8dee6";
    ctx.lineWidth = Math.max(1, dpr * 0.6);
    for (const d of drops) {
        d.y += d.speed;
        d.x += d.drift + Math.sin(d.seed) * 0.000012;
        d.seed += 0.02;
        if (d.y > 1.05) {
            d.y = -0.06;
            d.x = Math.random();
        }
        const x = d.x * W;
        const y = d.y * H;
        ctx.globalAlpha = d.a;
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + d.drift * 40000, y + d.len * H);
        ctx.stroke();
    }
    ctx.globalAlpha = 1;
    requestAnimationFrame(step);
}

if (!reduced) {
    step();
}

const toast = document.getElementById("toast");

function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    if (toast.hideTimeout) {
        clearTimeout(toast.hideTimeout);
    }
    toast.hideTimeout = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

document.querySelectorAll("[data-clipboard]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const text = btn.getAttribute("data-clipboard");
        const message = btn.getAttribute("data-message") || "Link copied to clipboard!";
        if (!text) return;
        e.preventDefault();
        navigator.clipboard.writeText(text)
            .then(() => showToast(message))
            .catch(() => showToast("Could not copy link."));
    });
});

document.querySelectorAll("[data-message]").forEach((btn) => {
    btn.addEventListener("click", () => {
        if (btn.hasAttribute("data-clipboard")) return;
        showToast(btn.getAttribute("data-message"));
    });
});
