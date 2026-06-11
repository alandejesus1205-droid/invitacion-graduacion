const openBtn = document.getElementById("openBtn");
const cover = document.getElementById("cover");
const invite = document.getElementById("invite");
const music = document.getElementById("music");

openBtn.addEventListener("click", () => {
  cover.classList.add("hidden");
  invite.classList.remove("hidden");
  music.play().catch(() => {});
});

const eventDate = new Date("2026-07-10T20:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    document.getElementById("countdown").innerHTML = "<p>¡Hoy es la gran noche!</p>";
    return;
  }

  document.getElementById("days").textContent = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("hours").textContent = Math.floor((distance / (1000 * 60 * 60)) % 24);
  document.getElementById("minutes").textContent = Math.floor((distance / (1000 * 60)) % 60);
  document.getElementById("seconds").textContent = Math.floor((distance / 1000) % 60);
}

setInterval(updateCountdown, 1000);
updateCountdown();

const qrText = window.location.href;
new QRCode(document.getElementById("qrcode"), {
  text: qrText,
  width: 180,
  height: 180
});