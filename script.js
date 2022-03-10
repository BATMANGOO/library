let form = document.querySelector('form');
let formContainer = document.querySelector('.form-container');
let addBtn = document.querySelector('.add-btn');
let appBody = document.querySelector('.cards-container');
let cancelBtn = document.querySelector('.cancel-btn');
let submitBtn = document.querySelector('.submit-btn');

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  // do stuff here
  let titleVal = form.elements.title.value;
  let authorVal = form.elements.author.value;
  let pagesVal = form.elements.pages.value;
  let readVal = form.elements.read.checked;
  let newBook = new Book(titleVal, authorVal, pagesVal, readVal);
  myLibrary.push(newBook);
  console.log(myLibrary);
}

addBtn.addEventListener('click', function(e) {
  formContainer.classList.remove('form-hide');
  appBody.classList.add('grey-out');
});

submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  addBookToLibrary();
  formContainer.classList.add('form-hide');
  appBody.classList.remove('grey-out');
});

cancelBtn.addEventListener('click', function(e) {
  e.preventDefault();
  formContainer.classList.add('form-hide');
  appBody.classList.remove('grey-out');
});
