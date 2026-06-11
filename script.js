const music = document.getElementById("music");

// Reproducir música automáticamente
window.addEventListener('load', () => {
  music.play().catch(() => {
    console.log('Autoplay bloqueado');
  });
});

const eventDate = new Date("2026-07-10T20:00:00").getTime();

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  if (distance <= 0) {
    document.getElementById("days").textContent = "0";
    document.getElementById("hours").textContent = "0";
    document.getElementById("minutes").textContent = "0";
    document.getElementById("seconds").textContent = "0";
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
  width: 200,
  height: 200,
  colorDark: "#d4af37",
  colorLight: "#0a0a0a"
});