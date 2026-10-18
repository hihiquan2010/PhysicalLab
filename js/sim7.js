const canvas = document.getElementById("simCanvas");
const ctx = canvas.getContext("2d");

let f = 2.0;
let f0 = 2.0;
let c = 0.3;

const sliderF = document.getElementById("slider-f");
const sliderF0 = document.getElementById("slider-f0");
const sliderC = document.getElementById("slider-c");

function resizeCanvas() {
  const wrapper = canvas.parentElement;
  canvas.width = wrapper.clientWidth;
  canvas.height = wrapper.clientHeight;
}
window.addEventListener("resize", () => {
  resizeCanvas();
  draw();
});

sliderF.addEventListener("input", (e) => {
  f = parseFloat(e.target.value);
  document.getElementById("val-f").innerText = f.toFixed(1) + " Hz";
  draw();
});
sliderF0.addEventListener("input", (e) => {
  f0 = parseFloat(e.target.value);
  document.getElementById("val-f0").innerText = f0.toFixed(1) + " Hz";
  draw();
});
sliderC.addEventListener("input", (e) => {
  c = parseFloat(e.target.value);
  document.getElementById("val-c").innerText = c.toFixed(1);
  draw();
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const originX = canvas.width * 0.1;
  const originY = canvas.height * 0.8;
  const graphW = canvas.width * 0.8;
  const graphH = canvas.height * 0.6;

  // Trục tọa độ
  ctx.beginPath();
  ctx.moveTo(originX, canvas.height * 0.1);
  ctx.lineTo(originX, originY);
  ctx.lineTo(originX + graphW, originY);
  ctx.strokeStyle = "#94a3b8";
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.fillStyle = "#64748b";
  ctx.font = "14px Inter";
  ctx.fillText("Biên độ A", originX - 80, canvas.height * 0.15);
  ctx.fillText("Tần số f (Hz)", originX + graphW - 80, originY + 30);

  // Đường cong cộng hưởng
  let w0 = f0 * Math.PI * 2;
  ctx.beginPath();
  ctx.strokeStyle = "#3b82f6";
  ctx.lineWidth = 3;

  for (let i = 0; i <= graphW; i++) {
    let currentF = 0.5 + (i / graphW) * 3.5;
    let w = currentF * Math.PI * 2;
    let A =
      (100 /
        Math.sqrt(Math.pow(w0 * w0 - w * w, 2) + Math.pow(2 * c * w0 * w, 2))) *
      50;
    let py = originY - Math.min(A, graphH);
    if (i === 0) ctx.moveTo(originX + i, py);
    else ctx.lineTo(originX + i, py);
  }
  ctx.stroke();

  // Điểm làm việc hiện tại
  let w = f * Math.PI * 2;
  let currentA =
    (100 /
      Math.sqrt(Math.pow(w0 * w0 - w * w, 2) + Math.pow(2 * c * w0 * w, 2))) *
    50;
  let px = originX + ((f - 0.5) / 3.5) * graphW;
  let py = originY - Math.min(currentA, graphH);

  // Đường gióng
  ctx.beginPath();
  ctx.setLineDash([5, 5]);
  ctx.moveTo(px, originY);
  ctx.lineTo(px, py);
  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 1;
  ctx.stroke();
  ctx.setLineDash([]);

  // Điểm sáng
  ctx.beginPath();
  ctx.arc(px, py, 8, 0, Math.PI * 2);
  ctx.fillStyle = "#dc2626";
  ctx.fill();
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 2;
  ctx.stroke();

  if (Math.abs(f - f0) < 0.05) {
    ctx.fillStyle = "#dc2626";
    ctx.font = "bold 18px Inter";
    ctx.fillText("CỘNG HƯỞNG!", px + 20, py - 20);
  }
}

resizeCanvas();
draw();
