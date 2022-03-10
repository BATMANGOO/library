let form = document.querySelector('form');
let formContainer = document.querySelector('.form-container');
let addBtn = document.querySelector('.add-btn');
let appBody = document.querySelector('.cards-container');
let cancelBtn = document.querySelector('.cancel-btn');
let submitBtn = document.querySelector('.submit-btn');
let deleteBtn = document.querySelector('.delete-btn');
let books = document.querySelector('.book-collection');

let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary() {
  let titleVal = form.elements.title.value;
  let authorVal = form.elements.author.value;
  let pagesVal = form.elements.pages.value;
  let readVal = form.elements.read.checked;
  if (checkValidity(titleVal, authorVal, pagesVal)) {
    let newBook = new Book(titleVal, authorVal, pagesVal, readVal);
    myLibrary.push(newBook);
    form.reset();
    console.log(myLibrary);
  } else {
    alert('Please fill in all fields');
  };
}

function checkValidity(title, author, pages) {
  if ((title === '' || myLibrary.some(obj => obj.title == title)) || author === '' || pages === '') {
    return false;
  } else {
    return true;
  }
};

function displayBooks() {
  myLibrary.map(input => {
    let newCard = document.createElement('div');
    newCard.classList.add('book');
    newCard.innerHTML = `
    <p class="title">${input.title}</p>
    <p class="author">${input.author}</p>
    <p class="pages">
      pages: <span class="number-of-pages">${input.pages}</span>
    </p>
    <button class="read book-button">${input.read ? 'Read' : 'Unread'}</button>
    <button class="delete-btn" onCLick="deleteBook()">Delete</button>
    `
    books.appendChild(newCard);
    console.log(books.children);
  });
}

function deleteBook() { // Fix this
  deleteBtn.addEventListener('click', function(e) {
    e.preventDefault();
    console.log(e.target.parentElement);
  });
}

addBtn.addEventListener('click', function(e) {
  formContainer.classList.remove('form-hide');
  appBody.classList.add('grey-out');
});

submitBtn.addEventListener('click', function(e) {
  e.preventDefault();
  addBookToLibrary();
  displayBooks();
  formContainer.classList.add('form-hide');
  appBody.classList.remove('grey-out');
});

cancelBtn.addEventListener('click', function(e) {
  e.preventDefault();
  formContainer.classList.add('form-hide');
  appBody.classList.remove('grey-out');
});



