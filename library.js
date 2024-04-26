
// Book constructor
function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.info = function () {
        return `${title} by ${author}, ${pageCount} pages, ${read ? "read" : "not read"}`
    }
};

// Add to library
function addBookToLibrary(title, author, pageCount, read) {
    const newBook = new Book(title, author, pageCount, read);
    myLibrary.push(newBook);
}

// The library
const myLibrary = [];

addBookToLibrary("somebook", "someauthor", 235, true);
addBookToLibrary("some other book", "some other author", 456, false);
addBookToLibrary("just one more book", "one more author with a long name", 235, true);

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
}

for (let i = 0; i < myLibrary.length; i++) {
    const book = myLibrary[i];
    addBook(book);
}