"use strict";

showBookList()


// DOM selection 
const addBookBtn = document.getElementById('add-book');
const updateBtn = document.getElementById('update');
const deleteBtns = document.querySelectorAll('.delete')
const editBtns = document.querySelectorAll('.edit');

// add book to the book list function defined here
function addToBookList(e){
    event.preventDefault();
    const message = document.getElementById('msg');
    let bookListArr = getBookListFromLocalStorage();
    let bookName = document.getElementById('book-name').value;
    let authorName = document.getElementById('author-name').value;
    let totalPage = document.getElementById('total-page').value;
    if (bookName=='') {
        message.className = "warning";
        message.innerHTML = `Please fill up the form`;
        msgClear()
    }else{
        if (bookListArr==null) {
            let bookArr={};
            let data = [bookArr];
            bookArr.bookName = bookName;
            bookArr.authorName = authorName;
            bookArr.readPage = 'Not begin';
            bookArr.totalPage = totalPage;
            bookArr.readingStatus = 'Not read';
            setBookListToLocalStorage(data);
            showBookList()
            document.getElementById('book-name').value = '';
            document.getElementById('author-name').value = '';
            document.getElementById('total-page').value = '';
            message.className = "success";
            message.innerHTML = `Data Added successfully`;
            msgClear();
        }else if(bookListArr==undefined){
            localStorage.clear();
            showBookList();
        }else{
            let bookArr={};
            bookArr.bookName = bookName;
            bookArr.authorName = authorName;
            bookArr.readPage = 'Not begin';
            bookArr.totalPage = totalPage;
            bookArr.readingStatus = 'Not read';
            bookListArr.splice(0,0,bookArr);
            setBookListToLocalStorage(bookListArr);
            showBookList();
            message.className = "success";
            message.innerHTML = `Data Added successfully`;
            msgClear();
            document.getElementById('book-name').value = '';
            document.getElementById('author-name').value = '';
            document.getElementById('total-page').value = '';
        }
    }
}

//Showing book list to the DOM function defined here.
function showBookList(){
    let bookListArr = getBookListFromLocalStorage();
    if (bookListArr!=null) {
        let bookListHtml = '';
        let srNo = 1;
        for(let bookIndex in bookListArr){
            let book = bookListArr[bookIndex];
            bookListHtml = bookListHtml +
            `
            <tr>
                <td class="sr-no">${srNo}</td>
                <td class="book-name">${book.bookName}</td>
                <td class="author">${book.authorName}</td>
                <td class="page-no">${book.readPage}</td>
                <td class="total-page">${book.totalPage}</td>
                <td class="reading-status">${book.readingStatus}</td>
                <td class="action-btn">
                    <button type="button" class="edit" onclick="editBookList(${bookIndex})">Edit</button>
                    <button type="button" class="delete" onclick="deleteBookFromList(${bookIndex})">Delete</button>
                </td>
            </tr>`;
            srNo++            
        }

        
        

        document.getElementById('book-list').innerHTML = bookListHtml;

        

    }else if(bookListArr.length==0){
        document.getElementById("msg").className = "warning";
        document.getElementById("msg").innerHTML = "No record found!";
        console.log("empty");
    }else{
        document.getElementById("msg").className = "warning";
        document.getElementById("msg").innerHTML = "No record found!";
    }  
}


//This function is defined due to data setting to local storage 
function setBookListToLocalStorage(bookListArr){
    return localStorage.setItem('bookListArr', JSON.stringify(bookListArr));
}

//This function is defined due to data fetching from local storage.
function getBookListFromLocalStorage(){
    return JSON.parse(localStorage.getItem('bookListArr'));
}


//Edit function

function editBookList(bookIndex){
    let bookListArr = getBookListFromLocalStorage();
    document.getElementById("book-form").innerHTML = `

    <div class="input-container">
        <div class="input-label"><label for="book-name">Book Name:</label></div>
        <div class="input-feild"><input class="input-form" type="text" id="book-name" placeholder="Please write book name"></div>
    </div>

    <div class="input-container">
        <div class="input-label"><label for="author-name">Author Name:</label></div>
        <div class="input-feild"><input class="input-form" type="text" id="author-name" placeholder="Please write author name"></div>
    </div>

    <div class="input-container">
        <div class="input-label"><label for="read-page">Read Page:</label></div>
        <div class="input-feild"><input class="input-form" type="number" id="read-page" placeholder="Please write page no. have been already read"></div>
    </div>

    <div class="input-container">
        <div class="input-label"><label for="total-page">Total Page:</label></div>
        <div class="input-feild"><input class="input-form" type="number" id="total-page" placeholder="Please write total page"></div>
    </div>            

    <div class="input-container">
        <div id="save-button">
            <input class="btn" type="button" value="Update List" id="update-book" onclick="updateBookList(${bookIndex})">
        </div>
    </div>
    `;
    
    document.getElementById('book-name').value = bookListArr[bookIndex].bookName;
    document.getElementById('author-name').value = bookListArr[bookIndex].authorName;
    document.getElementById("read-page").value = bookListArr[bookIndex].readPage;
    document.getElementById('total-page').value = bookListArr[bookIndex].totalPage;
    showBookList();
}

// Update button function

function updateBookList(bookIndex){
    const message = document.getElementById('msg');
    let bookListArr = getBookListFromLocalStorage();
    let bookName = document.getElementById('book-name').value;
    let authorName = document.getElementById('author-name').value;
    let readPage = document.getElementById("read-page").value
    let totalPage = document.getElementById('total-page').value;
    let bookArr={};
    bookArr.bookName = bookName;
    bookArr.authorName = authorName;
    bookArr.readPage = readPage;
    bookArr.totalPage = totalPage;
    if(readPage==totalPage){
        bookArr.readingStatus = `Completed`;
    }else{
        bookArr.readingStatus = `Reading Continue`;
    }
    if(!document.getElementById("read-page").value||document.getElementById("read-page").value==0){
        bookArr.readPage = 'Not started';
        bookArr.readingStatus = `Not read`;
    }
    bookListArr.splice(bookIndex,1,bookArr);
    setBookListToLocalStorage(bookListArr);
    message.className = "success";
    message.innerHTML = `Data updated successfully`;
    msgClear();
    document.getElementById('book-form').innerHTML = `


        <div class="input-container">
            <div class="input-label"><label for="book-name">Book Name:</label></div>
            <div class="input-feild"><input class="input-form" type="text" id="book-name" placeholder="Please write book name"></div>
        </div>

        <div class="input-container">
            <div class="input-label"><label for="author-name">Author Name:</label></div>
            <div class="input-feild"><input class="input-form" type="text" id="author-name" placeholder="Please write author name"></div>
        </div>

        <div class="input-container">
            <div class="input-label"><label for="total-page">Total Page:</label></div>
            <div class="input-feild"><input class="input-form" type="text" id="total-page" placeholder="Please write total page"></div>
        </div>           

        <div class="input-container">
            <div id="save-button">
                <input class="btn" type="button" value="Add Book" id="add-book" onclick="addToBookList()">
            </div>
        </div>
    `;

    
    showBookList()
}

//Delete function
function deleteBookFromList(btnIndex){
    let bookListArr = getBookListFromLocalStorage();
    let deletedBook = bookListArr.splice(btnIndex,1);
    document.getElementById("msg").className = "warning";
    document.getElementById("msg").innerHTML = `${deletedBook[0].bookName} has been deleted from list.`;
    setTimeout(()=>{
        if(bookListArr.length==0){
            document.getElementById("msg").innerHTML = `No book in the list!`;
            msgClear()
        }else{
            document.getElementById("msg").innerHTML = ``
        }
        showBookList()
    },3000)
    setBookListToLocalStorage(bookListArr);
    showBookList();
}

//function for clearing the message
function msgClear(){
    setTimeout(()=>{
        document.getElementById("msg").className = "message";
        document.getElementById("msg").innerHTML = ``;
        showBookList()
    },3000)
}