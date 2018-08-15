/* eslint-disable */
var searchBtn = document.getElementById("search-btn");
var input = document.querySelector("#search-input");
var requestBtn = document.getElementById("request-btn");
var borrowerName = document.querySelector("#name-input");
var borrowerEmail = document.querySelector("#email-input");
var itemIdInput = document.getElementById('item-id');
var successDiv= document.getElementById('success');
var reqForm = document.getElementById('request-form');
var submitItemBtn = document.getElementById('submit-item');
var allItemsBtn = document.getElementById('all-items-btn');

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

submitItemBtn.addEventListener("click", function(e){
  e.preventDefault();
  var name = document.getElementById('lender-name').value;
  var email = document.getElementById('lender-email').value;
  var itemName = document.getElementById('item-name').value;
  var itemDesc = document.getElementById('item-desc').value;
  var favColour = document.getElementById('fav-colour').value;

  var xhrPost = new XMLHttpRequest();

  xhrPost.onreadystatechange = function() {
    if(xhrPost.readyState === 4 && xhrPost.status === 200) {
      console.log("submit item by lender successful!");
      request("/testing", 'GET', updateDom);
    }
    
  };

  xhrPost.open('POST', '/add-item', true);
  xhrPost.setRequestHeader('content-type', 'application/json');
  var postData = {
    name,
    email,
    itemName,
    itemDesc,
    favColour: favColour.replace("#","")
  };
  xhrPost.send(JSON.stringify(postData));

  // this function will update the page style!
  updateStyle(favColour);

});

function updateStyle(hex) {
  var css = document.styleSheets[0];
  var RGB = hexToRgb(hex);
  var baseHSL = rgbToHsl(RGB.r, RGB.g, RGB.b);
  var modifiedHSL = [baseHSL[0] + 50, baseHSL[1], baseHSL[2]]
  console.log("RGB: ", RGB);
  console.log("baseHSL: ", baseHSL);
  console.log("modifiedHSL: ", modifiedHSL);

  console.log()

  css.insertRule("h1{color:hsl(" + baseHSL.join(",") + ")}", document.styleSheets[0].cssRules.length);

  css.insertRule("body{background-color:hsl(" + modifiedHSL.join(",") + ") }", document.styleSheets[0].cssRules.length)

  // convert hex to hsl
  // compute set of hsl values for style
  // update element styles to reflect new style
}

requestBtn.addEventListener("click", function(e) {
  e.preventDefault();
  var name = borrowerName.value;
  var email = borrowerEmail.value;
  var id = itemIdInput.value;
  var xhrPost = new XMLHttpRequest();
  xhrPost.onreadystatechange = function() {
    if (xhrPost.readyState === 4 && xhrPost.status === 200) {
      console.log("post data response successful");
      reqForm.classList.add('hidden');
      var success = document.createElement('div');
      success.innerText = 'Loan requested! :)';
      successDiv.appendChild(success);
    } else {
      // cb("error" + xhrPost.responseType);
    }
  };
  xhrPost.open('POST', '/request-item', true);
  xhrPost.setRequestHeader('content-type', 'application/json');
  var postData = {
    name: name,
    email: email,
    item: id
  };
  xhrPost.send(JSON.stringify(postData));
  
});

function borrow(id){
  reqForm.classList.remove('hidden');
  itemIdInput.value = id;
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
    request("/search?q=" + inputValue, 'GET', updateDom);
  }
});

allItemsBtn.addEventListener("click", function(e) {
  e.preventDefault();

 
    // requestData uses a callback populate/ musicPopulate to populate the DOM
    request("/search?q=", 'GET', updateDom);
  
});

function updateDom(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("updateDom reached");

    var items = JSON.parse(data);
    var table = document.getElementById("items-table");
    clearList(table);

    if(items.length > 0){
      items.forEach(function(item) {
        // adding our item names
        var row = document.createElement("tr");
        var name = document.createElement("td");
        var loanBtn = document.createElement('button');
        loanBtn.textContent = 'borrow';
        loanBtn.setAttribute('id', item.id);
        loanBtn.setAttribute('onclick', "borrow(this.id)");
        name.innerHTML = item.name;
        row.appendChild(name);
  
        // adding our item descriptions
        var description = document.createElement("td");
        description.innerHTML = item.description;
        row.appendChild(description);
        row.appendChild(loanBtn);
        // add everything to the table
        table.appendChild(row);
        
      });
    }
    else{
      var errorMsg = document.createElement('h3');
      errorMsg.textContent = 'Sorry no items match that search';
      table.appendChild(errorMsg);
    }
    
  }
}

request("/testing", 'GET', updateDom);

// Function to convert hex to rgb. Nicked by Dom from ? on Stackoverflow
function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
  } : null;
}


/* Function to convert rgb-to-hsl. Nicked by Dom from Pankaj Parashar on codepen */
function rgbToHsl(r, g, b){
  r /= 255, g /= 255, b /= 255;
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) { h = s = 0; } 
  else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max){
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    
    h /= 6;
  }
  
  return [(h*100+0.5)|0, ((s*100+0.5)|0) + '%', ((l*100+0.5)|0) + '%'];
};