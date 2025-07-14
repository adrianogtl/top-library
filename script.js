class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
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
  myLibrary[id].status = !myLibrary[id].status;
  displayLibrary();
}

function displayLibrary() {
  container.innerHTML = "";
  myLibrary.forEach((book, i) => {
    container.innerHTML += `
    <div class="book" id="${i}">
      <p>
        <span class="fw-bold">Title:</span>
        ${book.title}
      </p>
      <p>
        <span class="fw-bold">Author:</span>
        ${book.author}
      </p>
      <p>
        <span class="fw-bold">Pages:</span>
        ${book.pages} ${book.pages > 1 ? "pages" : "page"}
      </p>
      <p>
        <span class="fw-bold">Status:</span>
        ${book.status ? "Read" : "Unread"}
      </p>
      <button onclick="toggleBookStatus(${i})" class="statusToggleBtn">Change status</button>
      <button onclick="removeBookFromLibrary(${i})" class="removeBtn" title="Remove book from the library">Remove</button>
    </div>`;
  });
}

const container = document.querySelector(".container");
const newBookBtn = document.querySelector("#newBookBtn");
const dialog = document.querySelector("dialog");
const closeDialogBtn = document.querySelector("#closeDialogBtn");
const form = document.querySelector("#form");

const openDialog = () => dialog.showModal();
const closeDialog = () => {
  dialog.close();
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
  const status = document.querySelector("#status").value === "0";

  const onlyNumbers = /^\d+$/g;
  if (
    !String(pages).match(onlyNumbers) ||
    pages === 0 ||
    title === "" ||
    author === "" ||
    title.length > 20 ||
    author.length > 20 ||
    String(pages).length > 4
  ) {
    alert("Invalid Input!");
    return;
  }

  const book = new Book(title, author, pages, status);
  addBookToLibrary(book);
  displayLibrary();
  closeDialog();
});

function generateDefaultBooks(quantity = 3) {
  const generateRandomNum = (min = 0, max = 1) =>
    Math.floor(Math.random() * (max - min + 1) + min);
  const randomPages = () => generateRandomNum(30, 100);
  const randomStatus = () => Boolean(generateRandomNum());

  for (let i = 0; i < quantity; i++) {
    const book = new Book(
      `Book #${i + 1}`,
      `Author ${i + 1}`,
      randomPages(),
      randomStatus()
    );
    addBookToLibrary(book);
  }
  displayLibrary();
}

generateDefaultBooks(10);
