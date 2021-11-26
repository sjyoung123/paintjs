const canvas = document.getElementById("jsCanvas");

let painting = false;

const stopPainting = () => {
  painting = false;
};

const handleCanvasMove = (event) => {
  const { offsetX: x, offsetY: y } = event;
};

const handleMouseDown = (event) => {
  painting = true;
};

const handleMouseUp = (event) => {
  stopPainting();
};

if (canvas) {
  canvas.addEventListener("mousemove", handleCanvasMove);
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mouseleave", stopPainting);
}
