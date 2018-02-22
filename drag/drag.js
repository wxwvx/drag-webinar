const dropzone = document.querySelector('.dropzone');
const imagesList = document.querySelector('.images__list')
const dropList = document.querySelector('.drop-list');

imagesList.addEventListener('dragstart', e => {
  const id = "id" + Math.round(Math.random() * 100);

  e.target.id = id;

  e.dataTransfer.setData("elem", e.target.innerHTML);
  e.dataTransfer.setData("id", id);

  e.dataTransfer.effectAllowed = "copy"
});

dropzone.addEventListener('dragover', e => {
  e.preventDefault();

  dropzone.classList.add('active');
  
  e.dataTransfer.dropEffect = "move"
});


dropzone.addEventListener('dragleave', e => {
  dropzone.classList.remove('active');
})

dropzone.addEventListener('drop', e => {
  dropzone.classList.remove('active');

  const elem = document.createElement('li');
  const draggeElement = document.getElementById(e.dataTransfer.getData("id"));

  elem.className = 'drop-list__item'
  elem.innerHTML = e.dataTransfer.getData("elem"); 

  dropList.appendChild(elem);
  imagesList.removeChild(draggeElement);

});


// dropzone.addEventListener('drag', e => {
//   console.log(e);
// });

// dropzone.addEventListener('dragend', e => {
//   console.log(e);
// });

// dropzone.addEventListener('dregenter', e => {
//   console.log(e);
// });

// dropzone.addEventListener('dragover', e => {
//   console.log(e);
// });

// dropzone.addEventListener('dragleave', e => {
//   console.log(e);
// });

