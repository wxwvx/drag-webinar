const blockElem = document.getElementById("block");
const wrapElem = document.getElementById("wrap");

const coords = {};

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

const setupBlockPosition = (block, wrap) => {
  if (block.x < 0) block.x = 0;
  if (block.y < 0) block.y = 0;

  if (block.x > wrap.width - block.width) {
    block.x = wrap.width - block.width;
  }

  if (block.y > wrap.height - block.height) {
    block.y = wrap.height - block.height;
  }

  blockElem.style.left = `${block.x}px`;
  blockElem.style.top = `${block.y}px`;
};

const moveElement = e => {
  if (wrapElem.classList.contains("allow-drag") === false) return;

  const { block, wrap } = coords;

  block.x = e.pageX - wrap.offsetLeft - block.clickedX - wrap.borderWidth;
  block.y = e.pageY - wrap.offsetTop - block.clickedY - wrap.borderWidth;

  setupBlockPosition(block, wrap);  
};

const cancelDrag = e => {
  wrap.classList.remove("allow-drag");
};

blockElem.addEventListener("mousedown", setupMeasures);
document.addEventListener("mousemove", moveElement);
document.addEventListener("mouseup", cancelDrag);
