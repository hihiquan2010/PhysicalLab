const canvas = document.getElementById("simCanvas");
const ctx = canvas.getContext("2d");

const m = 1.0;
const k = 20.0;
const g = 9.8;
let mu = 0.05;
let x = 1.0;
let v = 0;
let time = 0;
let isStopped = false;
let centerX = 0;
let wallX = 0;
let ballY = 0;
let scale = 100;

const sliderMu = document.getElementById("sliderMu");
const btnReset = document.getElementById("btn-reset");
const outT = document.getElementById("out-t");
const outX = document.getElementById("out-x");
const outStatus = document.getElementById("out-status");

function resizeCanvas() {
  const wrapper = canvas.parentElement;
  canvas.width = wrapper.clientWidth;
  canvas.height = wrapper.clientHeight;
  centerX = canvas.width / 2;
  wallX = canvas.width * 0.15;
  ballY = canvas.height * 0.4;
  scale = Math.min(120, canvas.width * 0.15);
}
window.addEventListener("resize", resizeCanvas);

sliderMu.addEventListener("input", (e) => {
  mu = parseFloat(e.target.value);
  document.getElementById("valMu").innerText = mu.toFixed(2);
  reset();
});
btnReset.addEventListener("click", reset);

function reset() {
  x = 1.0;
  v = 0;
  time = 0;
  isStopped = false;
  outStatus.innerText = "Đang dao động";
  outStatus.style.color = "#64748b";
}

function drawSpring(startX, endX, y, coils) {
  ctx.beginPath();
  ctx.moveTo(startX, y);
  const length = endX - startX;
  const coilWidth = length / coils;
  const width = 20;
  for (let i = 0; i < coils; i++) {
    let dir = i % 2 === 0 ? 1 : -1;
    ctx.lineTo(startX + coilWidth * i + coilWidth / 2, y + width * dir);
  }
  ctx.lineTo(endX, y);
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Mặt bàn & Tường
  ctx.fillStyle = "#f1f5f9";
  ctx.fillRect(0, ballY + 30, canvas.width, canvas.height - ballY);
  ctx.fillStyle = "#cbd5e1";
  ctx.fillRect(wallX - 10, ballY - 80, 10, 160);

  // VTCB
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(centerX, ballY - 60);
  ctx.lineTo(centerX, ballY + 40);
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#64748b";
  ctx.font = "14px Inter";
  ctx.fillText("VTCB", centerX - 20, ballY - 70);

  let ballX = centerX + x * scale;
  let ballRadius = 30;

  drawSpring(wallX, ballX - ballRadius, ballY, 15);

  // Quả cầu
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  let gradient = ctx.createRadialGradient(
    ballX - 10,
    ballY - 10,
    5,
    ballX,
    ballY,
    ballRadius,
  );
  gradient.addColorStop(0, "#ef4444");
  gradient.addColorStop(1, "#b91c1c");
  ctx.fillStyle = gradient;
  ctx.fill();
  ctx.strokeStyle = "#7f1d1d";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Vector ma sát
  if (!isStopped && Math.abs(v) > 0.05) {
    let dir = v > 0 ? -1 : 1;
    ctx.beginPath();
    ctx.moveTo(ballX + ballRadius * dir, ballY + ballRadius + 15);
    ctx.lineTo(ballX + (ballRadius + 40) * dir, ballY + ballRadius + 15);
    ctx.strokeStyle = "#f59e0b";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  // HUD
  outT.innerText = time.toFixed(2) + " s";
  outX.innerText = x.toFixed(2) + " m";

  // --- ĐỒ THỊ x(t) ---
  const graphTop = canvas.height * 0.7;
  const graphHeight = canvas.height * 0.25;
  const graphMidY = graphTop + graphHeight / 2;
  ctx.beginPath();
  ctx.moveTo(0, graphMidY);
  ctx.lineTo(canvas.width, graphMidY);
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1;
  ctx.stroke();

  graphData.push({ x: x });
  if (graphData.length > 400) graphData.shift();

  if (graphData.length > 1) {
    ctx.beginPath();
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2.5;
    for (let i = 0; i < graphData.length; i++) {
      let px = (i / 400) * canvas.width;
      let py = graphMidY - (graphData[i].x / 2) * graphHeight;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  requestAnimationFrame(draw);
}

let graphData = [];
let lastTime = performance.now();

function update(currentTime) {
  let dt = (currentTime - lastTime) / 1000;
  lastTime = currentTime;
  if (dt > 0.1) dt = 0.1;

  if (!isStopped) {
    let F_spring = -k * x;
    let F_friction_max = mu * m * g;

    if (Math.abs(v) < 0.01 && Math.abs(F_spring) <= F_friction_max) {
      v = 0;
      isStopped = true;
      outStatus.innerText = "Đã dừng hẳn";
      outStatus.style.color = "#dc2626";
    } else {
      let F_friction = -Math.sign(v) * F_friction_max;
      let a = (F_spring + F_friction) / m;
      v += a * dt;
      x += v * dt;
      time += dt;
    }
  }
  requestAnimationFrame(update);
}

resizeCanvas();
reset();
draw();
requestAnimationFrame(update);
