/* eslint-disable */
var searchBtn = document.getElementById("search-btn");
var input = document.querySelector("#search-input");
var requestBtn = document.getElementById("request-btn");
var borrowerName = document.querySelector("#name-input");
var borrowerEmail = document.querySelector("#email-input");
var itemIdInput = document.getElementById("item-id");
var successDiv = document.getElementById("success");
var reqForm = document.getElementById("request-form");
var submitItemBtn = document.getElementById("submit-item");
var allItemsBtn = document.getElementById("all-items-btn");
var nameCol = document.getElementById("name-column");
var descCol = document.getElementById("desc-column");
var borrowH3 = document.getElementById("borrow-item-title");

function request(url, method, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    } else {
      cb("error" + xhr.responseType);
    }
  };
  xhr.open(method, url, true);
  xhr.send();
}

// functions to clear population on each button click
function clearList(list) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

submitItemBtn.addEventListener("click", function(e) {
  e.preventDefault();
  var itemName = document.getElementById("item-name").value;
  var itemDesc = document.getElementById("item-desc").value;

  var xhrPost = new XMLHttpRequest();

  xhrPost.onreadystatechange = function() {
    setTimeout(() => {
      // horrible hacky fix for 302 redirect
      console.log("submit item by lender successful!");
      request("/populate-all", "GET", updateDom);
    }, 500);
  };

  xhrPost.open("POST", "/add-item", true);
  xhrPost.setRequestHeader("content-type", "application/json");
  var postData = {
    itemName,
    itemDesc
  };
  xhrPost.send(JSON.stringify(postData));
});

// requestBtn.addEventListener("click", function(e) {
//   e.preventDefault();
//   var name = borrowerName.value;
//   var email = borrowerEmail.value;
//   var id = itemIdInput.value;
//   var xhrPost = new XMLHttpRequest();
//   xhrPost.onreadystatechange = function() {
//     if (xhrPost.readyState === 4 && xhrPost.status === 200) {
//       console.log("post data response successful");
//       reqForm.classList.add("hidden");
//       var success = document.createElement("div");
//       success.innerText = "Loan requested! :)";
//       successDiv.appendChild(success);
//     } else {
//       // cb("error" + xhrPost.responseType);
//     }
//   };
//   xhrPost.open("POST", "/request-item", true);
//   xhrPost.setRequestHeader("content-type", "application/json");
//   var postData = {
//     name: name,
//     email: email,
//     item: id
//   };
//   xhrPost.send(JSON.stringify(postData));
// });

function borrow(id, name) {
  // reqForm.classList.remove("hidden");
  // itemIdInput.value = id;
  // console.log("name: ", name);
  // borrowH3.innerText = "Borrow " + name.toLowerCase();
  console.log(id, name);
  var xhrPost = new XMLHttpRequest();
  xhrPost.onreadystatechange = function() {
    if (xhrPost.readyState === 4 && xhrPost.status === 200) {
      console.log("borrow data response successful");
      var success = document.createElement("div");
      success.innerText = "Loan requested! :)";
      successDiv.appendChild(success);
    } else {
      // cb("error" + xhrPost.responseType);
    }
  };
  xhrPost.open("POST", "/request-item", true);
  xhrPost.setRequestHeader("content-type", "application/json");
  var postData = {
    item: id
  };
  xhrPost.send(JSON.stringify(postData));

  // look at their cookie 
  // validate cookie
  // get their email (for query)
  // we automatically have item id
  // look up borrowers id using their email

}

searchBtn.addEventListener("click", function(e) {
  e.preventDefault();
  var inputValue = encodeURIComponent(input.value);
  console.log("input " + inputValue);

  // add validation alert if buttons gets clicked without input val
  if (inputValue.trim() == "") {
    alert("Please enter a search Term");
    return;
  } else {
    // requestData uses a callback populate/ musicPopulate to populate the DOM
    request("/search?q=" + inputValue, "GET", updateDom);
  }
});

allItemsBtn.addEventListener("click", function(e) {
  e.preventDefault();

  // requestData uses a callback populate/ musicPopulate to populate the DOM
  request("/search?q=", "GET", updateDom);
});

function updateDom(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("updateDom reached");

    var items = JSON.parse(data);
    var table = document.getElementById("items-table");
    clearList(table);

    //add headers
    var nameHeader = document.createElement("th");
    var availHeader = document.createElement("th");
    var descHeader = document.createElement("th");
    var buttonHeader = document.createElement("th");
    var row = document.createElement("tr");

    nameHeader.className = "itm-name-col";
    availHeader.className = "itm-avail-col";
    descHeader.className = "itm-descr-col";
    buttonHeader.className = "itm-borrow-col";

    nameHeader.textContent = "Item";
    availHeader.textContent = "Available";
    descHeader.textContent = "Description";
    buttonHeader.textContent = "Borrow";
    row.appendChild(nameHeader);
    row.appendChild(availHeader);
    row.appendChild(descHeader);
    row.appendChild(buttonHeader);
    table.appendChild(row);

    if (items.length > 0) {
      items.forEach(function(item) {
        console.log(item);
        // adding our item names
        var row = document.createElement("tr");
        var name = document.createElement("td");
        name.className = "itm-name-col";
        var available = document.createElement("td");
        available.className = "itm-avail-col";
        available.innerHTML = item.on_loan;
        var loanBtn = document.createElement("button");
        loanBtn.textContent = "borrow";
        loanBtn.className = "itm-borrow-col";
        loanBtn.setAttribute("id", item.id);
        loanBtn.setAttribute(
          "onclick",
          "borrow(this.id, " + "'" + item.name + "')"
        );
        name.innerHTML = item.name;
        row.appendChild(name);
        row.appendChild(available);
        // adding our item descriptions
        var description = document.createElement("td");
        description.className = "itm-descr-col";
        description.innerHTML = item.description;
        row.appendChild(description);
        row.appendChild(loanBtn);
        // add everything to the table
        table.appendChild(row);
      });
    } else {
      var errorMsg = document.createElement("h3");
      errorMsg.textContent = "Sorry no items match that search";
      table.appendChild(errorMsg);
    }
  }
}

var regButton = document.getElementById("submit-reg");
var error = document.querySelector(".error");
var regForm = document.getElementById("reg-form");
var regFormInput = document.querySelectorAll("reg-form-input");
var regName = document.getElementById("reg-name");
var regEmail = document.getElementById("reg-email");
var password = document.getElementById("reg-password");
var confirmPassword = document.getElementById("reg-confirm-password");

regButton.addEventListener("click", function(e) {
  error.classList.add("passive");

  // checks that a name has been entered
  if (regName.validity.valueMissing) {
    error.innerHTML = "Please enter a name";
    error.className = "error";
    regName.classList.add("incorrect-field");
    return;
  }

  // checks that email is valid
  if (regEmail.validity.typeMismatch || regEmail.validity.valueMissing) {
    error.innerHTML = "Please enter a valid email address";
    error.className = "error";
    regEmail.classList.add("incorrect-field");
    return;
  }

  // checks that anything has been entered into password fields
  if (password.validity.valueMissing || confirmPassword.validity.valueMissing) {
    error.innerHTML = "Please enter a password and confirm your password";
    error.className = "error";
    password.classList.add("incorrect-field");
    confirmPassword.classList.add("incorrect-field");
    return;
  }

  // checks that email is valid
  if (regEmail.validity.typeMismatch || regEmail.validity.valueMissing) {
    console.log("reached");
    error.innerHTML = "Please enter a valid email address";
    error.className = "error";
    regEmail.classList.add("incorrect-field");
    return;
  }

  // checks that anything has been entered into password fields
  if (password.validity.valueMissing || confirmPassword.validity.valueMissing) {
    error.innerHTML = "Please enter a password and confirm your password";
    error.className = "error";
    password.classList.add("incorrect-field");
    confirmPassword.classList.add("incorrect-field");
    return;
  }

  // check that the passwords fit the required pattern
  if (
    password.validity.patternMismatch ||
    confirmPassword.validity.patternMisMatch
  ) {
    error.innerHTML =
      "Password must contain at least eight characters, including one letter and one number";
    error.className = "error";
    password.classList.add("incorrect-field");
    confirmPassword.classList.add("incorrect-field");
    return;
  }

  if (password.value != confirmPassword.value) {
    error.innerHTML = "Passwords do not match";
    error.className = "error";
    password.classList.add("incorrect-field");
    confirmPassword.classList.add("incorrect-field");
    return;
  } else {
    error.innerHTML = "";
    error.classList.add("passive");
  }
});

regForm.addEventListener("input", function(e) {
  for (let i = 0; i < regForm.length; i++) {
    if (regForm[i].validity.valid) {
      regForm[i].classList.remove("incorrect-field");
    }
  }
});

regEmail.addEventListener("focusout", function(e) {
  if (!regEmail.validity.valid) {
    regEmail.classList.add("invalid-input");
  } else if (regEmail.validity.valid) {
    regEmail.classList.remove("invalid-input");
  }
});

password.addEventListener("focusout", function(e) {
  if (password.validity.patternMismatch) {
    password.classList.add("invalid-input");
  } else if (password.validity.valid) {
    password.classList.remove("invalid-input");
  }
});

confirmPassword.addEventListener("focusout", function(e) {
  if (confirmPassword.validity.patternMismatch) {
    confirmPassword.classList.add("invalid-input");
  } else if (confirmPassword.validity.valid) {
    confirmPassword.classList.remove("invalid-input");
  }
});

const submitLogin = document.getElementById("submit-login");
const emailLogin = document.getElementById("login-email");
const psdLogin = document.getElementById("login-password");
const error1 = document.getElementById("error1");

emailLogin.addEventListener("focusout", function(e) {
  console.log("HERE");
  if (!emailLogin.validity.valid) {
    //console.log('email=',emailLogin.value);console.log('here')
    error1.innerHTML = "Please enter a valid email address";
    error1.className = "error";
    document.getElementById("login-email").classList.add("invalid-input");
    console.log(emailLogin.classList);
  } else if (emailLogin.validity.valid) {
    emailLogin.classList.remove("invalid-input");
    error1.classList.remove("error");
  }
});

request("/populate-all", "GET", updateDom);
