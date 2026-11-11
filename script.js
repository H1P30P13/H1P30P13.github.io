// --- Pixel character, drawn from a text map (edit the letters to redraw it) ---
const PALETTE = {
  h: "#7a4a2b", // hair
  s: "#f2c08f", // skin
  e: "#1b1a33", // eyes
  m: "#c0504d", // mouth
  b: "#ef476f", // shirt
  p: "#2d2f66", // pants
  k: "#f3eedd", // shoes
};

const SPRITE = [
  "...hhhhhh...",
  "..hhhhhhhh..",
  "..hssssssh..",
  "..sesssses..",
  "..ssssssss..",
  "...ssmmss...",
  "....ssss....",
  "..bbbbbbbb..",
  ".sbbbbbbbbs.",
  ".sbbbbbbbbs.",
  "..bbbbbbbb..",
  "..pppppppp..",
  "..ppp..ppp..",
  "..ppp..ppp..",
  "..kkk..kkk..",
];

function drawSprite(blink) {
  const svg = document.getElementById("sprite-svg");
  let out = "";
  SPRITE.forEach((row, y) => {
    [...row].forEach((ch, x) => {
      if (ch === ".") return;
      const key = blink && ch === "e" ? "s" : ch;
      out += `<rect x="${x}" y="${y}" width="1" height="1" fill="${PALETTE[key]}"/>`;
    });
  });
  svg.innerHTML = out;
}

drawSprite(false);

// Blink every few seconds
setInterval(() => {
  drawSprite(true);
  setTimeout(() => drawSprite(false), 150);
}, 3500);

// Click to jump
const wrap = document.getElementById("sprite");
wrap.addEventListener("click", () => {
  wrap.classList.remove("jump");
  void wrap.offsetWidth; // restart animation
  wrap.classList.add("jump");
});

// --- Skill bars: fill segments from data-level (0-10) ---
document.querySelectorAll(".bar").forEach((bar) => {
  const level = Number(bar.dataset.level) || 0;
  for (let i = 0; i < 10; i++) {
    const seg = document.createElement("i");
    if (i < level) seg.className = "on";
    bar.appendChild(seg);
  }
  bar.setAttribute("role", "img");
  bar.setAttribute("aria-label", `${level} out of 10`);
});

// --- Footer year ---
document.getElementById("year").textContent = new Date().getFullYear();
