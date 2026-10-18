const canvas = document.getElementById("simCanvas");
const ctx = canvas.getContext("2d");

let f = 1.5;
let A = 1.0;
let time = 0;
let waveSpeed = 150;
let lambda = waveSpeed / f;
let channelTop = 0;
let channelBottom = 0;
let waterLevel = 0;
let pistonX = 0;
let spongeX = 0;
const numPoints = 300;

const sliderF = document.getElementById("slider-f");
const sliderA = document.getElementById("slider-a");

function resizeCanvas() {
  const wrapper = canvas.parentElement;
  canvas.width = wrapper.clientWidth;
  canvas.height = wrapper.clientHeight;
  channelTop = canvas.height * 0.3;
  channelBottom = canvas.height * 0.8;
  waterLevel = (channelTop + channelBottom) / 2;
  pistonX = canvas.width * 0.15;
  spongeX = canvas.width * 0.65;
}
window.addEventListener("resize", resizeCanvas);

sliderF.addEventListener("input", (e) => {
  f = parseFloat(e.target.value);
  document.getElementById("val-f").innerText = f.toFixed(1) + " Hz";
  lambda = waveSpeed / f;
});
sliderA.addEventListener("input", (e) => {
  A = parseFloat(e.target.value);
  document.getElementById("val-a").innerText = A.toFixed(1);
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Kênh nước
  ctx.fillStyle = "#f1f5f9";
  ctx.fillRect(0, channelBottom, canvas.width, canvas.height - channelBottom);
  ctx.fillStyle = "#cbd5e1";
  ctx.fillRect(canvas.width - 20, channelTop, 20, channelBottom - channelTop);

  let omega = 2 * Math.PI * f;
  let k = (2 * Math.PI) / lambda;
  let amp = A * 30;

  // Vẽ mặt nước (từ piston đến cuối)
  ctx.beginPath();
  ctx.moveTo(0, channelBottom);
  let points = [];
  let step = canvas.width / numPoints;

  for (let i = 0; i <= numPoints; i++) {
    let x = i * step;
    let y = waterLevel;
    if (x >= pistonX) {
      let realX = x - pistonX;
      y = waterLevel + amp * Math.sin(omega * time - k * realX);
    }
    points.push({ x: x, y: y });
    ctx.lineTo(x, y);
  }
  ctx.lineTo(canvas.width, channelBottom);
  ctx.lineTo(0, channelBottom);
  ctx.closePath();

  let waterGradient = ctx.createLinearGradient(0, channelTop, 0, channelBottom);
  waterGradient.addColorStop(0, "rgba(59, 130, 246, 0.6)");
  waterGradient.addColorStop(1, "rgba(29, 78, 216, 0.8)");
  ctx.fillStyle = waterGradient;
  ctx.fill();

  // Viền mặt nước
  ctx.beginPath();
  for (let i = 0; i < points.length; i++) {
    if (i === 0) ctx.moveTo(points[i].x, points[i].y);
    else ctx.lineTo(points[i].x, points[i].y);
  }
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Miếng xốp
  let spongeY = waterLevel;
  if (spongeX >= pistonX)
    spongeY =
      waterLevel + amp * Math.sin(omega * time - k * (spongeX - pistonX));

  ctx.fillStyle = "#f59e0b";
  ctx.fillRect(spongeX - 15, spongeY - 15, 30, 15);
  ctx.strokeStyle = "#b45309";
  ctx.lineWidth = 2;
  ctx.strokeRect(spongeX - 15, spongeY - 15, 30, 15);

  // Đường nét đứt VTCB của xốp
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(spongeX, waterLevel);
  ctx.lineTo(spongeX, spongeY - 20);
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]);

  // Piston
  let pistonY = waterLevel + amp * Math.sin(omega * time);
  ctx.fillStyle = "#64748b";
  ctx.fillRect(pistonX - 15, pistonY - 40, 15, 80);
  ctx.fillStyle = "#475569";
  ctx.fillRect(pistonX - 5, pistonY - 25, 5, 50);

  // Chú thích
  ctx.fillStyle = "#1e293b";
  ctx.font = "14px Inter";
  ctx.fillText("Miếng xốp (dao động tại chỗ)", spongeX + 20, spongeY - 20);
  ctx.fillText("Nguồn sóng (Piston)", pistonX - 60, pistonY - 50);

  // Phương truyền sóng
  ctx.beginPath();
  ctx.moveTo(pistonX + 20, waterLevel - 80);
  ctx.lineTo(canvas.width - 40, waterLevel - 80);
  ctx.strokeStyle = "#64748b";
  ctx.setLineDash([10, 5]);
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#475569";
  ctx.fillText("Phương truyền sóng", canvas.width / 2 - 60, waterLevel - 90);

  time += 0.02;
  requestAnimationFrame(draw);
}

resizeCanvas();
requestAnimationFrame(draw);
