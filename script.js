let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read
}


Book.prototype.info = function() {
    return `Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read:${this.read}`
}


function addBookToLibrary(title, author, pages, read) {
    var newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    return newBook;
}


function displayLibrary() {
    console.table(myLibrary);
    
    /*for(let index = 0; index < myLibrary.length ; index++) {
        var currentBook = myLibrary[index];
        console.table(currentBook.info());
    }*/
}


addBookToLibrary("Starship Troopers", "Robert Heinlein", 400, true);
addBookToLibrary("Foundation", "Isaac Asimov", 214, true);
addBookToLibrary("Troy", "Stephen Fry", 400, true);
addBookToLibrary("The Colour of Magic", "Terry Pratchett", 376, true);
addBookToLibrary("Hyperion", "Dan Simmons", 482, true);
addBookToLibrary("Goethe", "Robert Heinlein", 400, true);

displayLibrary();
