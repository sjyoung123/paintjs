const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, 500, 500); //default background-color

ctx.strokeStyle = "black";
ctx.fillStyle = "black";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

const stopPainting = () => {
  painting = false;
};
const startPainting = (event) => {
  if (!filling && event.which === 1) {
    painting = true;
  }
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

const clickCanvas = () => {
  if (filling) {
    ctx.fillRect(0, 0, 500, 500);
  }
};

if (canvas) {
  canvas.addEventListener("mousemove", handleCanvasMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", clickCanvas);
  canvas.addEventListener("contextmenu", (event) => event.preventDefault());
}

const handleColor = (event) => {
  const {
    target: {
      style: { backgroundColor: color },
    },
  } = event;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
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

const handleMode = () => {
  if (filling) {
    filling = false;
    mode.innerText = "Fill";
    range.disabled = false;
  } else {
    filling = true;
    mode.innerText = "Paint";
    range.disabled = true;
  }
};

if (mode) {
  mode.addEventListener("click", handleMode);
}

if (saveBtn) {
  saveBtn.addEventListener("click", () => {
    const canvasUrl = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = canvasUrl;
    link.download = "canvas-image";
    link.click();
  });
}
