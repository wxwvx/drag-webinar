const dropzone = document.querySelector(".dropzone");
const droplist = document.querySelector(".drop-list");
const imagesList = document.querySelector(".images__list");

imagesList.addEventListener("dragstart", e => {
  const id = "id" + Math.round(Math.random() * 100);

  e.target.id = id;

  e.dataTransfer.setData("elem", e.target.innerHTML);
  e.dataTransfer.setData("id", id);

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