const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");

canvas.width = 500;
canvas.height = 500;

ctx.strokeStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;

const stopPainting = () => {
  painting = false;
};
const startPainting = () => {
  painting = true;
};

const handleCanvasMove = (event) => {
  const { offsetX: x, offsetY: y } = event;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const handleMouseDown = (event) => {
  painting = true;
};

if (canvas) {
  canvas.addEventListener("mousemove", handleCanvasMove);
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}

const handleColor = (event) => {
  const {
    target: {
      style: { backgroundColor: color },
    },
  } = event;
  ctx.strokeStyle = color;
};

if (colors) {
  Array.from(colors).forEach((color) => {
    color.addEventListener("click", handleColor);
  });
}
const handleRange = (event) => {
  const {
    target: { value: size },
  } = event;
  ctx.lineWidth = size;
};

if (range) {
  range.addEventListener("input", handleRange);
}
