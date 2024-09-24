const container = document.querySelector(".container");

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

const myLibrary = [];

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function displayLibrary() {
  container.innerHTML = "";
  myLibrary.forEach((book, i) => {
    container.innerHTML += `
    <div class="book" id="${i}">
      <p>${book.title}</p>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <p>Status: ${book.status}</p>
    </div>`;
  });
}

const newBookBtn = document.querySelector("#newBookBtn");
const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector("#closeDialogBtn");
const form = document.querySelector("#form");

newBookBtn.addEventListener("click", () => dialog.setAttribute("open", true));
closeDialogBtn.addEventListener("click", () => dialog.removeAttribute("open"));
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = document.querySelector("#pages").value;
  const status = document.querySelector("#status").value;
  const book = new Book(title, author, pages, status);
  addBookToLibrary(book);
  displayLibrary();
});
