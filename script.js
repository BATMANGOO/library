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

class Book {
  constructor(title, author, pages, read) {
    this.id = myLibrary.length + 1;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
  }

  toggleRead(elem) {
    let elemId = document.getElementById(`book-${elem.id}`);
    let readBtn = elemId.querySelector('.book-button');
    readBtn.innerText = readBtn.innerText === 'Read' ? 'Unread' : 'Read';
    elem.read = !elem.read;
  }

  addBookToLibrary() {
    if (this.checkValidity(this.title, this.author, this.pages)) {
      myLibrary.push({
        id: myLibrary.length + 1,
        title: this.title,
        author: this.author,
        pages: this.pages,
        read: this.read
      });
      form.reset();
      this.createBook();
    } else {
      alert('Please fill in all fields');
    };
  }

  checkValidity(title, author, pages) {
    if ((title === '' || myLibrary.some(obj => obj.title == title)) || author === '' || pages === '') {
      return false;
    } else {
      return true;
    }
  }

  createBook() {
    for (let i = 0; i < myLibrary.length; i++) {
      let selectedBook = document.querySelector(`#book-${myLibrary[i].id}`);
      // check if dom already has book
      if (selectedBook) {
        continue;
      } else {
        // create book
        let book = document.createElement('div');
        let bookTitle = document.createElement('h3');
        let bookAuthor = document.createElement('p');
        let bookPages = document.createElement('p');
        let bookReadBtn = document.createElement('button');
        let bookDeleteBtn = document.createElement('button');
        let currentBook = myLibrary[i];
        // create the HTML elements for the book
        book.classList.add('book');
        book.setAttribute('id', `book-${myLibrary[i].id}`);
        bookTitle.classList.add('title');
        bookTitle.innerText = `Title: ${myLibrary[i].title}`;
        bookAuthor.classList.add('author');
        bookAuthor.innerText = `Author: ${myLibrary[i].author}`;
        bookPages.classList.add('number-of-pages');
        bookPages.innerText = `${myLibrary[i].pages} pages`;
        bookReadBtn.innerText = myLibrary[i].read ? 'Read' : 'Unread';
        bookReadBtn.classList.add('book-button');
        bookReadBtn.addEventListener('click', () => {
          this.toggleRead(currentBook);
        });
        bookDeleteBtn.innerText = 'Delete';
        bookDeleteBtn.classList.add('delete-btn');
        // add onclick attribute to bookDeleteBtn
        bookDeleteBtn.addEventListener('click', function (e) {
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
  }

  deleteBook(elem) {
    elem.parentElement.remove();
  }
};

addBtn.addEventListener('click', function (e) {
  formContainer.classList.remove('form-hide');
  appBody.classList.add('grey-out');
});

cancelBtn.addEventListener('click', function (e) {
  e.preventDefault();
  formContainer.classList.add('form-hide');
  appBody.classList.remove('grey-out');
});

submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  let titleVal = form.elements.title.value;
  let authorVal = form.elements.author.value;
  let pagesVal = form.elements.pages.value;
  let readVal = form.elements.read.checked;
  let newBook = new Book(titleVal, authorVal, pagesVal, readVal);
  newBook.addBookToLibrary(titleVal, authorVal, pagesVal, readVal);

  formContainer.classList.add('form-hide');
  appBody.classList.remove('grey-out');
});

let aBook = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
aBook.addBookToLibrary();