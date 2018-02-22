const dropzone = document.querySelector(".dropzone");
const droplist = document.querySelector(".drop-list");
const imagesList = document.querySelector(".images__list");

droplist.addEventListener("dragstart", e => e.preventDefault());

imagesList.addEventListener("dragstart", e => {
  const src = e.target.getAttribute("src");
  const id = "id" + Math.round(Math.random() * 100);

  e.target.id = id;

  e.dataTransfer.setData("elem", e.target.innerHTML);
  e.dataTransfer.setData("id", id);

  console.log(id);
  // e.dataTransfer.effectAllowed = "copy"
});

dropzone.addEventListener("dragover", e => {
  e.preventDefault();
  dropzone.classList.add("active");
  // e.dataTransfer.dropEffect = "copy"
});

dropzone.addEventListener("dragleave", e => {
  e.preventDefault();
  dropzone.classList.remove("active");
});

dropzone.addEventListener("drop", e => {
  e.preventDefault();
  dropzone.classList.remove("active");

  const elem = document.createElement("li");
  const draggedElement = document.getElementById(e.dataTransfer.getData("id"));

  elem.className = "drop-list__item";
  elem.innerHTML = e.dataTransfer.getData("elem");

  droplist.appendChild(elem);
  imagesList.removeChild(draggedElement);
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
