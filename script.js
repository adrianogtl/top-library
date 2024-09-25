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

function removeBookFromLibrary(id) {
  myLibrary.splice(id, 1);
  displayLibrary();
}

function toggleBookStatus(id) {
  myLibrary[id].status = myLibrary[id].status === "Unread" ? "Read" : "Unread";
  displayLibrary();
}

function displayLibrary() {
  container.innerHTML = "";
  myLibrary.forEach((book, i) => {
    container.innerHTML += `
    <div class="book" id="${i}">
    <p>${book.title}</p>
    <p>${book.author}</p>
    <p>${book.pages} ${book.pages > 1 ? "pages" : "page"}</p>
    <p>Status: ${book.status}</p>
    <button onclick="removeBookFromLibrary(${i})" class="removeBtn" title="Remove book from the library">Remove</button>
    <button onclick="toggleBookStatus(${i})" class="statusToggleBtn">Change status</button>
    </div>`;
  });
}

const container = document.querySelector(".container");
const newBookBtn = document.querySelector("#newBookBtn");
const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector("#closeDialogBtn");
const form = document.querySelector("#form");

const openDialog = () => dialog.setAttribute("open", true);
const closeDialog = () => {
  dialog.removeAttribute("open");
  form.reset();
};

const sanitizeInput = (input) =>
  input
    .trim()
    .replace(/</g, "&lt;") // html tags
    .replace(/>/g, "&gt;")
    .replace(/\s{2,}/g, " "); // two or more spaces

newBookBtn.addEventListener("click", openDialog);
closeDialogBtn.addEventListener("click", closeDialog);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = sanitizeInput(document.querySelector("#title").value);
  const author = sanitizeInput(document.querySelector("#author").value);
  const pages = document.querySelector("#pages").valueAsNumber;
  const status =
    document.querySelector("#status").value === "0" ? "Read" : "Unread";

  const onlyNumbers = /^\d+$/g;
  if (!String(pages).match(onlyNumbers) || pages === 0) {
    closeDialog();
    return;
  }

  const book = new Book(title, author, pages, status);
  addBookToLibrary(book);
  displayLibrary();
  closeDialog();
});
