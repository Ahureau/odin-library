// Index to create unique IDs. (Future Alex: Now I know this is bad...)
let uniqueID = 0;

// Book class

class Book {
    constructor(title, author, pageCount, read) {
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.read = read;
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pageCount} pages, ${this.read ? "read" : "not read"}`;
    };

    readToggle() {
        this.read = !this.read;
    }
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
    bookCover.style.backgroundColor = randomColor();

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

    const bookReadContainer = bookXtra.appendChild(document.createElement("div"));
    bookReadContainer.classList.add("readToggleContainer");
    const bookReadLabel = bookReadContainer.appendChild(document.createElement("label"));
    bookReadLabel.classList.add("bookReadLabel");
    bookReadLabel.textContent = "Read"
    bookReadLabel.setAttribute("for", "checkbox"+uniqueID) // We use the uniqueID here but don't increment yet
    const bookReadInput = bookReadContainer.appendChild(document.createElement("input"));
    bookReadInput.classList.add("bookReadInput");
    bookReadInput.setAttribute("type", "checkbox");
    bookReadInput.setAttribute("id", "checkbox"+uniqueID++); // Now we increment because we're done using the ID here
    book.read ? bookReadInput.checked = true : bookReadInput.checked = false;

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

        const cardToDelete = event.target.closest('.libraryTile');
        cardToDelete.parentNode.removeChild(cardToDelete);
    }
}

// Switch read and not read status using input
bookGrid.addEventListener("change", (event) => {
    const checkbox = event.target;
    const bookTitle = event.target.closest('.libraryTile').querySelector('.bookTitle').textContent;
    const bookIndex = myLibrary.findIndex(book => book.title === bookTitle);
    if (checkbox.checked) {
        myLibrary[bookIndex].readToggle();
    } else {
        myLibrary[bookIndex].readToggle();
    }
});


// Random color generator for the book cover placeholder

function randomColor() {
    let randomColor = '#';
    for (let i = 0; i < 6; i++) {
        randomColor += '0123456789ABCDEF'[Math.floor(Math.random() * 16)];
    }

    return randomColor;
}