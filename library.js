
// Book constructor
function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
};

// Book constructor prototype
Book.prototype.info = function () {
    return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.read ? "read" : "not read"}`;
};
Book.prototype.readToggle = function () {
    this.read = !this.read;
}

// Add to library
function addBookToLibrary(title, author, pageCount, read) {
    const newBook = new Book(title, author, pageCount, read);
    myLibrary.push(newBook);
}

// The library
const myLibrary = [];

// Manually adding books for testing
addBookToLibrary("20,000 leagues Under the Sea", "Jules Verne", 739, true);
addBookToLibrary("Murder on the Orient Express", "Agatha Christie", 256, true);
addBookToLibrary("Gone with the Wind", "Margaret Mitchell", 1037, false);

for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    addBook(book, i);
}

// Build in DOM
function addBook(book) {
    // Create tile
    const libraryGrid = document.getElementById("libraryGrid");
    const libraryTile = libraryGrid.appendChild(document.createElement("div"));
    libraryTile.classList.add("libraryTile");

    // Placeholder for cover img
    const bookCover = libraryTile.appendChild(document.createElement("img"));
    bookCover.classList.add("bookCover");

    // Book details
    const bookInfo = libraryTile.appendChild(document.createElement("div"));
    bookInfo.classList.add("bookInfo");

    const bookTitle = bookInfo.appendChild(document.createElement("h3"));
    bookTitle.classList.add("bookTitle");
    bookTitle.textContent = book.title;

    const bookAuthor = bookInfo.appendChild(document.createElement("p"));
    bookAuthor.classList.add("bookAuthor");
    bookAuthor.textContent = book.author;

    const bookXtra = bookInfo.appendChild(document.createElement("div"));
    bookXtra.classList.add("bookXtra");

    const bookPageCount = bookXtra.appendChild(document.createElement("p"));
    bookPageCount.classList.add("bookPageCount");
    bookPageCount.textContent = `${book.pageCount} pages`;

    const bookRead = bookXtra.appendChild(document.createElement("p"));
    bookRead.classList.add("bookRead");
    bookRead.textContent = book.read ? "✅︎ read" : "❌ read";

    const closeCrossContainer = libraryTile.appendChild(document.createElement("div"));
    closeCrossContainer.classList.add("closeCrossContainer");

    const closeCross = closeCrossContainer.appendChild(document.createElement("input"));
    closeCross.classList.add("closeCross");
    closeCross.setAttribute("type", "image")
    closeCross.setAttribute("src", "./Close button.svg")
}

// Check if new book form is filled
function isValid() {
    const form = document.querySelector("#newBookForm");
    return form.checkValidity();
}

// New book from form
const newBookButton = document.getElementById("newBookButton");
newBookButton.addEventListener("click", () => {
    if (isValid()) {
        const newBookForm = document.getElementById("newBookForm");
        const formData = new FormData(newBookForm);

        const formDataObject = {};
        for (let [key, value] of formData.entries()) {
            formDataObject[key] = value;
        }

        const book = new Book(
            formDataObject.title,
            formDataObject.author,
            formDataObject.pageCount,
            formDataObject.read === "read" ? true : false
        );

        addBookToLibrary(book.title, book.author, book.pageCount, book.read)

        addBook(book);

        newBookForm.reset();
    } else {
        console.log("The form is invalid")
    }
});

// Delete book tile
const bookGrid = document.querySelector("#libraryGrid");
bookGrid.addEventListener("click", removeButtons);

function removeButtons(event) {
    if (event.target.classList.contains('closeCross')) {
        const bookTitle = event.target.closest('.libraryTile').querySelector('.bookTitle').textContent;
        const bookIndex = myLibrary.findIndex(book => book.title === bookTitle);
        
        myLibrary.splice(bookIndex, 1);

        console.table(myLibrary);

        const cardToDelete = event.target.closest('.libraryTile');
        cardToDelete.parentNode.removeChild(cardToDelete);
    }
}