// Init
let myLibrary = [];
let headers = ['Title', 'Author', 'Pages', 'Read', 'Update Status', 'Remove'];

const bookTable = document.querySelector('#bookTable');

// Book Class
class Book
{
    constructor(title, author, pages, read ) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    info() {
        return `Title: ${this.title}, Author: ${this.author}, Pages: ${this.pages}, Read:${this.read}`;
    }
    toggleReadStatus() {
        this.read = this.read == false ? true : false;
    }
    remove() {
        var indexToRemove = myLibrary.indexOf(this);
        myLibrary.splice(indexToRemove, 1);
    }
    addToLibrary() {
        myLibrary.push(this);
        updateLibrary(true);
    }
}

// Functions
function updateLibrary() {
    clearData(true);
    displayLibrary();
}

function clearData(table = false) {
    var inputData = ['title', 'author', 'pages', 'read']
    inputData.forEach(dataId => {
        document.getElementById(dataId).value = "";
    });

    if(table) {
        var libraryTable = document.querySelector('table')
        if (libraryTable) libraryTable.remove();
    }
}

function displayLibrary() {    
    // Create table with header
    let table = document.createElement('table');
    let headerRow = document.createElement('tr');

    // Add Headers
    headers.forEach(headerText => {
        let header = document.createElement('th');
        let textNode = document.createTextNode(headerText);
        header.appendChild(textNode);
        headerRow.appendChild(header);
    })

    table.appendChild(headerRow);    

    // Loop through myLibrary and for each book create a row
    myLibrary.forEach(book => {
        let row = document.createElement('tr');

        Object.values(book).forEach(text => {
            let cell = document.createElement('td');
            let textNode = document.createTextNode(text);
            
            cell.appendChild(textNode);
            row.appendChild(cell)
        })

        // Add Change Status Button
        let updateReadStatusCell = document.createElement('td');
        let updateReadStatusButton = document.createElement('button');
        updateReadStatusButton.textContent = 'Change Status';
        updateReadStatusButton.className = 'updateReadStatusButton'
        updateReadStatusCell.appendChild(updateReadStatusButton);

        row.appendChild(updateReadStatusCell);

        // Add Removal Button
        let removeButtonCell = document.createElement('td');
        let removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.className = 'removeButton';
        removeButtonCell.appendChild(removeButton);        
        row.appendChild(removeButtonCell);
        
        // Add Row to Table
        table.appendChild(row);
    })

    // Build
    bookTable.appendChild(table);
  }
// End Functions


//Event Listeners
document.getElementById('addBook').addEventListener('click', (e) => {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').value;

    if (!title || !author || !pages || !read) alert("Not all data has been entered correctly");
    else {
        var newBook = new Book(title, author, pages, read);
        newBook.addToLibrary();
    }        
});

bookTable.addEventListener('click', (e) => {
    const currentTarget = e.target.parentNode.parentNode;
    const currentBookTitle = currentTarget.childNodes[0].textContent;
    const currentBookAuthor = currentTarget.childNodes[1].textContent;
    var currentBook = myLibrary.find(book => (book.title == currentBookTitle) && (book.author == currentBookAuthor));

    if (e.target.className == 'removeButton') {
        if(confirm('Are you sure you wish to remove this book?') && currentBook) {
            currentBook.remove();     
            updateLibrary();           
        }        
    }

    if (e.target.className == 'updateReadStatusButton') {        
        if(currentBook) {
            currentBook.toggleReadStatus();
            updateLibrary();
        }
    }
});

// Initalize
initStartingData();
//displayLibrary();

function initStartingData()
{
    new Book("Starship Troopers", "Robert Heinlein", 400, true).addToLibrary();
    new Book("Foundation", "Isaac Asimov", 214, true ).addToLibrary();
    new Book("Troy", "Stephen Fry", 400, true ).addToLibrary();
    new Book("The Colour of Magic", "Terry Pratchett", 376, true ).addToLibrary();
    new Book("Hyperion", "Dan Simmons", 482, true ).addToLibrary();
}
