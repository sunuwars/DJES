/* eslint-disable */

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
