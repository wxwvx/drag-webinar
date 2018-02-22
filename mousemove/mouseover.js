const blockElem = document.getElementById("block");
const wrapElem = document.getElementById("wrap");

let coords = {};

const measureElem = (elem, event) => {
  const measures = elem.getBoundingClientRect();
  const borderWidth = parseInt(getComputedStyle(elem)["border-width"]) * 2;

  return {
    offsetTop: measures.top,
    offsetLeft: measures.left,
    width: measures.width - borderWidth,
    height: measures.height - borderWidth,
    borderWidth: borderWidth,
    clickedX: event.layerX,
    clickedY: event.layerY
  };
};

const setupMeasures = e => {
  wrap.classList.add("allow-drag");

  coords.wrap = measureElem(wrapElem, e);
  coords.block = measureElem(blockElem, e);
};

const checkEdges = (block, wrap, fn) => {
  let x = block.x;
  let y = block.y;

  if (x < 0) x = 0;
  if (y < 0) y = 0;

  if (x > wrap.width - block.width) {
    x = wrap.width - block.width;
  }

  if (y > wrap.height - block.height) {
    y = wrap.height - block.height;
  }

  fn.call(this, x, y);
};

const setupBlockPosition = (x, y) => {
  blockElem.style.left = `${x}px`;
  blockElem.style.top = `${y}px`;
};

const moveElement = e => {
  if (wrapElem.classList.contains("allow-drag") === false) return;

  const { block, wrap } = coords;

  block.x = e.pageX - wrap.offsetLeft - block.clickedX - wrap.borderWidth;
  block.y = e.pageY - wrap.offsetTop - block.clickedY - wrap.borderWidth;

  checkEdges(block, wrap, setupBlockPosition);
};

const cancelDrag = e => {
  wrap.classList.remove("allow-drag");
};

blockElem.addEventListener("mousedown", setupMeasures);
document.addEventListener("mousemove", moveElement);
document.addEventListener("mouseup", cancelDrag);
