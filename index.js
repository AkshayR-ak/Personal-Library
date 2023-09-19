
function Book(title, author, yearPublished, readStatus) {
    this.title = title;
    this.author = author;
    this.yearPublished = yearPublished;
    this.readStatus = readStatus;
}

Book.prototype.getSummary = function () {
    return `${this.title} by ${this.author}, ${this.yearPublished}. Status: ${this.readStatus}`;
};

Book.prototype.toggleReadStatus = function () {
    this.readStatus = this.readStatus === 'read' ? 'unread' : 'read';
};

const library = [];

function addBook(book) {
    library.push(book);
}

function removeLastBook() {
    library.pop();
}

function addBookToFront(book) {
    library.unshift(book);
}

function removeFirstBook() {
    library.shift();
}

function getAllTitles() {
    return library.map(book => book.title);
}

function getBooksByAuthor(author) {
    return library.filter(book => book.author === author);
}

function getTotalBooksPublishedBefore(year) {
    return library.filter(book => book.yearPublished < year).length;
}

function removeBookByTitle(title) {
    const index = library.findIndex(book => book.title === title);
    if (index !== -1) {
        library.splice(index, 1);
    }
}

function getBooksByReadStatus(status) {
    return library.filter(book => book.readStatus === status);
}

function getSubLibrary(start, end) {
    return library.slice(start, end);
}

document.getElementById('addBookForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const year = parseInt(document.getElementById('year').value);
    const readStatus = document.getElementById('readStatus').value;

    const newBook = new Book(title, author, year, readStatus);
    addBook(newBook);
    displayLibrary();
    this.reset();
});

function displayLibrary() {
    const libraryList = document.getElementById('libraryList');
    libraryList.innerHTML = '';

    library.forEach(book => {
        const li = document.createElement('li');
        li.textContent = book.getSummary();
        libraryList.appendChild(li);
    });
}

document.getElementById('removeButton').addEventListener('click', function () {
    removeLastBook();
    displayLibrary();
});

document.getElementById('searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const searchAuthor = document.getElementById('searchAuthor').value;
    const searchResults = getBooksByAuthor(searchAuthor);
    displaySearchResults(searchResults);
});

function displaySearchResults(results) {
    const searchResultsList = document.getElementById('searchResults');
    searchResultsList.innerHTML = '';

    results.forEach(book => {
        const li = document.createElement('li');
        li.textContent = book.getSummary();
        searchResultsList.appendChild(li);
    });
}

displayLibrary();