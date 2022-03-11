let form = document.querySelector('form');
let formContainer = document.querySelector('.form-container');
let addBtn = document.querySelector('.add-btn');
let appBody = document.querySelector('.cards-container');
let cancelBtn = document.querySelector('.cancel-btn');
let submitBtn = document.querySelector('.submit-btn');
let deleteBtn = document.querySelector('.delete-btn');
let readBtn = document.querySelector('.book-button');
let books = document.querySelector('.book-collection');

let myLibrary = [];

function Book(title, author, pages, read) {
  this.id = myLibrary.length + 1;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

let aBook = new Book('A Book', 'An Author', 66, true);
myLibrary.push(aBook);
console.log(myLibrary)

function toggleRead(elem) {
  elem.innerText = elem.innerText === 'Read' ? 'Unread' : 'Read';
  console.log(elem)
  grabbedTitle = elem.parentNode.children[0].innerHTML;
  if (myLibrary.some(obj => obj.title == grabbedTitle)) {
    let book = myLibrary.find(obj => obj.title == grabbedTitle);
    book.read = !book.read;
    console.log(myLibrary)
  } else {
    console.log('not found');
  }
};

function checkValidity(title, author, pages) {
  if ((title === '' || myLibrary.some(obj => obj.title == title)) || author === '' || pages === '') {
    return false;
  } else {
    return true;
  }
};

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
    createBook();
  } else {
    alert('Please fill in all fields');
  };
}

function createBook() {
  for(let i = 0; i < myLibrary.length; i++) {
    let selectedBook = document.querySelector(`#book-${myLibrary[i].id}`);
    // check if dom already has book
    if (selectedBook) {
      continue;
    } else {
      // create book
      let book = document.createElement('div');
      book.classList.add('book');
      book.setAttribute('id', `book-${myLibrary[i].id}`);
      let bookTitle = document.createElement('h3');
      bookTitle.classList.add('title');
      bookTitle.innerText = `Title: ${myLibrary[i].title}`;
      let bookAuthor = document.createElement('p');
      bookAuthor.classList.add('author');
      bookAuthor.innerText = `Author: ${myLibrary[i].author}`;
      let bookPages = document.createElement('p');
      bookPages.classList.add('number-of-pages');
      bookPages.innerText = `${myLibrary[i].pages} pages`;
      let bookReadBtn = document.createElement('button');
      bookReadBtn.innerText = myLibrary[i].read ? 'Read' : 'Unread';
      bookReadBtn.classList.add('book-button');
      bookReadBtn.addEventListener('click', function() {
        toggleRead(bookReadBtn);
      });
      let bookDeleteBtn = document.createElement('button');
      bookDeleteBtn.innerText = 'Delete';
      bookDeleteBtn.classList.add('delete-btn');
      // add onclick attribute to bookDeleteBtn
      bookDeleteBtn.addEventListener('click', function(e) {
        e.preventDefault();
        let bookId = e.target.parentNode.id.split('-')[1];
        let book = myLibrary.find(obj => obj.id == bookId);
        myLibrary.splice(myLibrary.indexOf(book), 1);
        e.target.parentNode.remove();
      });
      book.appendChild(bookTitle);
      book.appendChild(bookAuthor);
      book.appendChild(bookPages);
      book.appendChild(bookReadBtn);
      book.appendChild(bookDeleteBtn);
      books.appendChild(book);
    }
  };
};

function deleteBook(elem) {
  elem.parentElement.remove();
};
  
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

createBook();