// scripts.js
window.addEventListener("DOMContentLoaded", () => {
  const countdownEl = document.getElementById("countdown");
  const countdownContainer = document.getElementById("countdown-container");
  const mainContent = document.getElementById("main-content");
  const toggleLightsBtn = document.getElementById("toggle-lights");
  const toggleMusicBtn = document.getElementById("toggle-music");
  const music = document.getElementById("bg-music");
  const cake = document.getElementById("cake");
  const cutCakeBtn = document.getElementById("cut-cake");
  const finalMsgBtn = document.getElementById("final-message-button");
  const finalMsg = document.getElementById("final-message-section");
  const balloonsContainer = document.getElementById("balloons-container");

  // Countdown logic
  let timeLeft = 10;
  const countdownInterval = setInterval(() => {
    countdownEl.textContent = timeLeft;
    timeLeft--;
    if (timeLeft < 0) {
      clearInterval(countdownInterval);
      countdownContainer.style.display = "none";
      mainContent.style.display = "block";
      launchFireworks();
      createBalloons();
    }
  }, 1000);

  // Toggle lights
  let lightOn = false;
  toggleLightsBtn.addEventListener("click", () => {
    lightOn = !lightOn;
    document.body.style.backgroundColor = lightOn ? "#fff" : "#000";
    document.body.style.color = lightOn ? "#000" : "#fff";
  });

  // Toggle music
  toggleMusicBtn.addEventListener("click", () => {
    if (music.paused) music.play();
    else music.pause();
  });

  // Cake cutting
  cutCakeBtn.addEventListener("click", () => {
    cake.classList.toggle("cut");
  });

  // Final message
  finalMsgBtn.addEventListener("click", () => {
    finalMsg.style.display = "block";
  });

  // Fireworks
  function launchFireworks() {
    const canvas = document.getElementById("fireworks-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let fireworks = [];
    class Firework {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height;
        this.targetY = Math.random() * canvas.height / 2;
        this.radius = 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        if (this.y > this.targetY) this.y -= 4;
        else {
          for (let i = 0; i < 30; i++) {
            fireworks.push(new Particle(this.x, this.y, this.color));
          }
          return false;
        }
        this.draw();
        return true;
      }
    }

    class Particle {
      constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.radius = 2;
        this.color = color;
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        this.alpha = 1;
      }
      draw() {
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 0.02;
        this.draw();
        return this.alpha > 0;
      }
    }

    setInterval(() => {
      fireworks.push(new Firework());
    }, 800);

    function animate() {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      fireworks = fireworks.filter(f => f.update());
      requestAnimationFrame(animate);
    }
    animate();
  }

  // Balloon generator
  function createBalloons() {
    for (let i = 0; i < 30; i++) {
      const balloon = document.createElement("div");
      balloon.classList.add("ballon");
      balloon.style.left = `${Math.random() * 100}vw`;
      balloon.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      balloon.style.animationDuration = `${10 + Math.random() * 10}s`;
      balloonsContainer.appendChild(balloon);
    }
  }
});
