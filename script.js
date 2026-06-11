// COUNTDOWN
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

// CONFETTI
function launchConfetti() {
  const colors = ['#d4af37', '#f0e68c', '#b8a878', '#e8d87e'];
  for (let i = 0; i < 50; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + '%';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = '50%';
    confetti.style.zIndex = '9999';
    confetti.style.pointerEvents = 'none';
    document.body.appendChild(confetti);

    let top = 0;
    let left = parseFloat(confetti.style.left);
    const fallSpeed = Math.random() * 5 + 3;
    const swayAmount = Math.random() * 100 - 50;

    const interval = setInterval(() => {
      top += fallSpeed;
      left += Math.sin(top / 50) * 0.5;
      confetti.style.top = top + 'px';
      confetti.style.left = left + '%';
      confetti.style.opacity = 1 - (top / window.innerHeight);

      if (top > window.innerHeight) {
        clearInterval(interval);
        confetti.remove();
      }
    }, 30);
  }
}

// RSVP
let rsvpSelected = null;

window.selectRSVP = function(response, btn) {
  rsvpSelected = response;
  document.querySelectorAll('.rsvp-btn').forEach(b => {
    b.style.opacity = '0.6';
    b.style.transform = 'scale(0.95)';
  });
  btn.style.opacity = '1';
  btn.style.transform = 'scale(1.05)';
};

window.enviarRSVP = function() {
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const acompanantes = document.getElementById('acompanantes').value;

  if (!nombre) {
    alert('Por favor ingresa tu nombre');
    return;
  }

  if (!rsvpSelected) {
    alert('Por favor selecciona si irás o no');
    return;
  }

  const mensaje = `Hola! Me llamo ${nombre}. Mi respuesta es: ${rsvpSelected === 'si' ? 'Iré' : rsvpSelected === 'no' ? 'No puedo' : 'Quizás'}. Asistirán ${acompanantes} personas. Email: ${email}`;

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(mensaje)}`;
  window.open(whatsappUrl, '_blank');

  alert('¡Gracias por confirmar! 🎉');
};

// GOOGLE MAPS
window.openMaps = function() {
  const location = "Centro+de+Convenciones,+Calle+Principal+123";
  window.open(`https://maps.google.com/?q=${location}`, '_blank');
};

// TIMELINE EXPAND
window.expandTimeline = function(element) {
  element.style.transform = element.style.transform === 'scale(1.05)' ? 'scale(1)' : 'scale(1.05)';
};

// TRANSPORT TOGGLE
window.toggleTransport = function(element) {
  element.style.opacity = element.style.opacity === '0.6' ? '1' : '0.6';
};

// GALLERY HOVER
window.hoverGallery = function(element) {
  element.style.transform = 'translateY(-15px) scale(1.08)';
};

window.unhoverGallery = function(element) {
  element.style.transform = 'translateY(0) scale(1)';
};

// DRESS ITEM TOGGLE
window.toggleDressItem = function(checkbox) {
  const parent = checkbox.parentElement;
  if (checkbox.checked) {
    parent.style.color = '#d4af37';
    parent.style.fontWeight = 'bold';
  } else {
    parent.style.color = '';
    parent.style.fontWeight = '';
  }
};

// QR CODE
document.addEventListener('DOMContentLoaded', () => {
  const qrContainer = document.getElementById('qrcode');
  if (qrContainer && qrContainer.innerHTML === '') {
    new QRCode(qrContainer, {
      text: window.location.href,
      width: 200,
      height: 200,
      colorDark: "#d4af37",
      colorLight: "#0a0a0a"
    });
  }

  // MUSIC
  const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
  audio.loop = true;
  let isPlaying = false;

  document.getElementById('musicToggle').addEventListener('click', function() {
    if (isPlaying) {
      audio.pause();
      this.textContent = '🔊 Música';
      isPlaying = false;
    } else {
      audio.play().catch(() => console.log('Autoplay bloqueado'));
      this.textContent = '🔇 Silencio';
      isPlaying = true;
    }
  });

  // ANIMACIONES AL SCROLL
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInScale 0.8s ease forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
  });

  // FLOATING PARTICLES ADICIONALES
  createFloatingElements();
});

function createFloatingElements() {
  const container = document.querySelector('.floating-particles');
  const emojis = ['✨', '⭐', '💫', '🎓', '🎉'];

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.fontSize = Math.random() * 20 + 10 + 'px';
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particle.style.animation = `floatParticle ${Math.random() * 20 + 20}s linear infinite`;
    particle.style.zIndex = '-1';

    container.appendChild(particle);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatParticle {
      0% { transform: translateY(0) translateX(0) rotate(0deg); }
      25% { transform: translateY(-100px) translateX(50px) rotate(90deg); }
      50% { transform: translateY(-200px) translateX(0) rotate(180deg); }
      75% { transform: translateY(-100px) translateX(-50px) rotate(270deg); }
      100% { transform: translateY(0) translateX(0) rotate(360deg); }
    }
    
    @keyframes fadeInScale {
      from { opacity: 0; transform: scale(0.8); }
      to { opacity: 1; transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
}