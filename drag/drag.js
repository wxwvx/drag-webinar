const dropzone = document.querySelector(".dropzone");
const droplist = document.querySelector(".drop-list");
const imagesList = document.querySelector(".images__list");

droplist.addEventListener("dragstart", e => e.preventDefault());


imagesList.addEventListener("dragstart", e => {
  const src = e.target.getAttribute("src");
  e.dataTransfer.setData("src", src);
  e.dataTransfer.effectAllowed = "copy"
});

dropzone.addEventListener("dragover", e => {
  e.preventDefault();
  dropzone.classList.add("active");
  e.dataTransfer.dropEffect = "copy"
});


dropzone.addEventListener("dragleave", e => {
  e.preventDefault();
  dropzone.classList.remove("active");
});

dropzone.addEventListener("drop", e => {
  e.preventDefault();
  dropzone.classList.remove("active");

  const src = e.dataTransfer.getData("src");
  const elem = createItem(src);

  const draggedElement = document.querySelector(`[src="${src}"]`).parentElement;

  imagesList.removeChild(draggedElement);

  droplist.appendChild(elem);
});

function createItem(src) {
  const elem = document.createElement("li");
  const img = document.createElement("img");

  elem.className = "drop-list__item";

  img.src = src;
  img.className = "drop-list__img";

  elem.appendChild(img);

  return elem;
}
