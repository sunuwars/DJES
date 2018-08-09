/* eslint-disable */
var searchBtn = document.getElementById("search-btn");
var input = document.querySelector("#search-input");

function request(url, cb) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      cb(null, xhr.responseText);
    } else {
      cb("error" + xhr.responseType);
    }
  };
  xhr.open("GET", url, true);
  xhr.send();
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
    request("/search?q=" + inputValue, updateDom);
  }
});

function updateDom(err, data) {
  if (err) {
    console.log(err);
  } else {
    console.log("updateDom reached");

    var items = JSON.parse(data);
    var table = document.getElementById("items-table");

    items.forEach(function(item) {
      // adding our item names
      var row = document.createElement("tr");
      var name = document.createElement("td");
      name.innerHTML = item.name;
      row.appendChild(name);

      // adding our item descriptions
      var description = document.createElement("td");
      description.innerHTML = item.description;
      row.appendChild(description);

      // add everything to the table
      table.appendChild(row);
    });
  }
}

request("/testing", updateDom);
