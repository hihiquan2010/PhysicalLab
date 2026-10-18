const canvas = document.getElementById("simCanvas");
const ctx = canvas.getContext("2d");

let A = 100;
let omega = 2;
let time = 0;
let centerX = 0;
let anchorY = 0;
let equilibriumY = 0;
let graphData = [];
const maxGraphPoints = 300;

const sliderA = document.getElementById("sliderA");
const sliderW = document.getElementById("sliderW");
const outX = document.getElementById("out-x");
const outV = document.getElementById("out-v");
const outA = document.getElementById("out-a");
const outT = document.getElementById("out-t");

function resizeCanvas() {
  const wrapper = canvas.parentElement;
  canvas.width = wrapper.clientWidth;
  canvas.height = wrapper.clientHeight;
  centerX = canvas.width / 2;
  const topMargin = canvas.height * 0.2;
  const bottomMargin = canvas.height * 0.3; // Chừa chỗ cho đồ thị
  const drawZoneHeight = canvas.height - topMargin - bottomMargin;
  anchorY = topMargin;
  equilibriumY = anchorY + drawZoneHeight / 2;
}
window.addEventListener("resize", resizeCanvas);

sliderA.addEventListener("input", (e) => {
  A = parseFloat(e.target.value);
  document.getElementById("valA").innerText = A;
});
sliderW.addEventListener("input", (e) => {
  omega = parseFloat(e.target.value);
  document.getElementById("valW").innerText = omega.toFixed(1);
});

function drawSpring(startX, startY, endX, endY, coils) {
  ctx.beginPath();
  ctx.moveTo(startX, startY);
  const length = endY - startY;
  const coilHeight = length / coils;
  const width = 25;
  for (let i = 0; i < coils; i++) {
    let dir = i % 2 === 0 ? 1 : -1;
    ctx.lineTo(startX + width * dir, startY + coilHeight * i + coilHeight / 2);
  }
  ctx.lineTo(endX, endY);
  ctx.strokeStyle = "#475569";
  ctx.lineWidth = 3;
  ctx.stroke();
}

function drawArrow(fromX, fromY, toX, toY, color, label) {
  const headlen = 10;
  const angle = Math.atan2(toY - fromY, toX - fromX);
  ctx.beginPath();
  ctx.moveTo(fromX, fromY);
  ctx.lineTo(toX, toY);
  ctx.strokeStyle = color;
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(toX, toY);
  ctx.lineTo(
    toX - headlen * Math.cos(angle - Math.PI / 6),
    toY - headlen * Math.sin(angle - Math.PI / 6),
  );
  ctx.lineTo(
    toX - headlen * Math.cos(angle + Math.PI / 6),
    toY - headlen * Math.sin(angle + Math.PI / 6),
  );
  ctx.lineTo(toX, toY);
  ctx.fillStyle = color;
  ctx.fill();
  if (label) {
    ctx.fillStyle = color;
    ctx.font = "bold 16px sans-serif";
    ctx.fillText(label, toX + 10, toY + 5);
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Vẽ trục VTCB
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(0, equilibriumY);
  ctx.lineTo(canvas.width, equilibriumY);
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]);
  ctx.fillStyle = "#64748b";
  ctx.font = "14px Inter";
  ctx.fillText("VTCB", canvas.width - 60, equilibriumY - 10);

  // Giá treo
  ctx.fillStyle = "#334155";
  ctx.fillRect(centerX - 60, anchorY - 10, 120, 12);

  let displacement = A * Math.cos(omega * time);
  let ballY = equilibriumY + displacement;
  let ballRadius = 30;

  drawSpring(centerX, anchorY + 2, centerX, ballY - ballRadius, 12);

  // Quả cầu
  ctx.beginPath();
  ctx.arc(centerX, ballY, ballRadius, 0, Math.PI * 2);
  let gradient = ctx.createRadialGradient(
    centerX - 10,
    ballY - 10,
    5,
    centerX,
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

  // Vector
  let v = -A * omega * Math.sin(omega * time);
  let a = -omega * omega * displacement;
  if (Math.abs(v) > 1)
    drawArrow(
      centerX + ballRadius,
      ballY,
      centerX + ballRadius,
      ballY + v * 0.3,
      "#16a34a",
      "v",
    );
  if (Math.abs(a) > 1)
    drawArrow(
      centerX - ballRadius,
      ballY,
      centerX - ballRadius,
      ballY + a * 0.1,
      "#dc2626",
      "a",
    );

  // Cập nhật HUD
  outT.innerText = time.toFixed(2) + " s";
  outX.innerText = (displacement / 100).toFixed(2) + " m";
  outV.innerText = (v / 100).toFixed(2) + " m/s";
  outA.innerText = (a / 100).toFixed(2) + " m/s²";

  // --- VẼ ĐỒ THỊ x(t) ---
  const graphTop = canvas.height * 0.75;
  const graphHeight = canvas.height * 0.2;
  const graphMidY = graphTop + graphHeight / 2;

  // Trục đồ thị
  ctx.beginPath();
  ctx.moveTo(0, graphMidY);
  ctx.lineTo(canvas.width, graphMidY);
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1;
  ctx.stroke();

  graphData.push({ t: time, x: displacement });
  if (graphData.length > maxGraphPoints) graphData.shift();

  if (graphData.length > 1) {
    ctx.beginPath();
    ctx.strokeStyle = "#3b82f6";
    ctx.lineWidth = 2.5;
    for (let i = 0; i < graphData.length; i++) {
      let px = (i / maxGraphPoints) * canvas.width;
      let py = graphMidY - (graphData[i].x / 200) * graphHeight;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  time += 0.02;
  requestAnimationFrame(draw);
}

resizeCanvas();
requestAnimationFrame(draw);
