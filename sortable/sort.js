const sortlist = document.querySelector(".sortable__list");

sortlist.addEventListener("dragstart", e => {
  const target = e.target;

  e.dataTransfer.setData("html", target.outerHTML);
  target.parentElement.classList.add("hidden");
});

sortlist.addEventListener("dragenter", e => {
  const target = e.target.parentElement;
  if (!target.matches("li")) return;

  const elem = document.createElement("li");
  const placeholders = document.querySelectorAll(".placeholder");

  Array.from(placeholders).forEach(elem => sortlist.removeChild(elem));

  elem.className = "sortable__item placeholder";

  target.parentElement.insertBefore(elem, target);
});

sortlist.addEventListener("dragover", e => {
  e.preventDefault();
});

sortlist.addEventListener("drop", e => {
  const hiddenElem = document.querySelector(".hidden");
  const placeholder = document.querySelector(".placeholder");
  const elem = e.dataTransfer.getData("html");

  placeholder.innerHTML = elem;
  sortlist.removeChild(hiddenElem);
  placeholder.classList.remove("placeholder");
});

sortlist.addEventListener("dragend", e => {
  const hiddenElem = document.querySelector(".hidden");
  const placeholder = document.querySelector(".placeholder");

  sortlist.removeChild(placeholder);
  hiddenElem.classList.remove("hidden");
});
