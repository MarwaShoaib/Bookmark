var nameInput = document.getElementById("name");
var urlInput = document.getElementById("url");
var tBody = document.getElementById("table-body");
var layer = document.getElementById("layer");

var bookList = [];
 

if (localStorage.getItem("bookList") != null) {
    bookList= JSON.parse(localStorage.getItem("bookList"));
    displayBook(bookList)
}

function addBook() {
    if (nameInput.value.length > 2  && urlInput.value.length > 2) {
        var check = false;
        for (var i = 0; i < bookList.length; i++) {
            if (bookList[i].url.toLowerCase() == urlInput.value.toLowerCase()) {
                check = true;
            }   
        }
        if (!check) {
            var booK ={
                name: nameInput.value,
                url : urlInput.value,
            }
            bookList.push(booK)
            localStorage.setItem("bookList", JSON.stringify(bookList));
            displayBook(bookList);
            clearForm();
            console.log(bookList);
        }else{
            console.log("this site is already in the list");
            
        }
        
    }
    else{
        layer.classList.remove("d-none");
        console.log("no");
        
    } 
}
function displayBook(list) {
    var cartona =``;
    for (var i = 0; i < list.length; i++) {
        cartona += `<tr>
                        <td>${i+1}</td>
                        <td>${list[i].name}</td>
                        <td><button onclick="visitSite(${i})" class="visit btn px-3"><i class="fa-regular fa-eye"></i> visit</button></td>
                        <td><button onclick="deletBook(${i})" class="delete btn"><i class="fa-solid fa-trash-can"></i> delete</button></td>
                    </tr>`
            
    }
    tBody.innerHTML = cartona;
}
function deletBook(index) {
    bookList.splice(index,1)
    localStorage.setItem("bookList", JSON.stringify(bookList));
    displayBook(bookList);
    
}
function visitSite(index) {
    URL= `https://${bookList[index].url}`
    window.open(URL, '_blank');
}

function clearForm() {
    nameInput.value = "";
    urlInput.value = "";
    nameInput.classList.remove("is-valid");
    urlInput.classList.remove("is-valid");
}
function closeBox() {
    console.log("close");
    
    layer.classList.add("d-none")
}
function validationName(elm) {
    var namRegex = /^\w{3,}(\s+\w+)*$/;
    var match = namRegex.test(elm.value);
    if (match) {
        console.log("matched");
        nameInput.classList.add("is-valid"); 
        nameInput.classList.remove("is-invalid");
    }else{
        console.log("not matched");
        nameInput.classList.add("is-invalid");
        nameInput.classList.remove("is-valid");
    }
    // if (nameInput.value.length > 2 ) {
    //     console.log("hi");
        
    //     nameInput.classList.add("is-valid");
    // }
}
function validationUrl(elm) {
    var urlRegex =/(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/;
    var match = urlRegex.test(elm.value);
    if (match) {
        console.log("matched");
        urlInput.classList.add("is-valid"); 
        urlInput.classList.remove("is-invalid");
    }else{
        console.log("not matched");
        urlInput.classList.add("is-invalid");
        urlInput.classList.remove("is-valid");
    }
}
function validation(elm) {
    var regex = {
        name: /^[a-zA-Z0-9\s]{3,}$/,
        url: /(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/
    }
    
    var match = regex[elm.id].test(elm.value);
    if (match) {
        console.log("matched");
        elm.classList.add("is-valid"); 
        elm.classList.remove("is-invalid");
    }else{
        console.log("not matched");
        elm.classList.add("is-invalid");
        elm.classList.remove("is-valid");
    }
}