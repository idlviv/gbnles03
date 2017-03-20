'use strict';
window.addEventListener('load', function() {
  var myDiv = document.createElement('div');
  var myDiv2 = document.createElement('div');
  var place = document.querySelector('body');
  var myInput = document.querySelector('#inp');
  var myButton = document.querySelector('#btn');
  place.appendChild(myDiv);
  place.appendChild(myDiv2);
  // place.insertBefore(myDiv, myButton);

  myButton.addEventListener('click', function() {
    var key = myInput.value;
    var req = new XMLHttpRequest();
    // req.open('GET', 'http://localhost:8080');

    req.open('GET', 'http://localhost:8080?' +
      'key=trnsl.1.1.20140416T130443Z.49db75a946e5d9df.baa803157e4482838c0612cb9c5aa513643049a4&lang=en-uk&text='+ key );
    req.send();
    req.addEventListener('readystatechange', function() {
      if (req.readyState === req.DONE) {
        if (req.status === 200) {
          var response = JSON.parse(req.responseText);
          myDiv.innerText = response.text;
          console.dir(response);
          var headers = req.getAllResponseHeaders();
          myDiv2.innerText = headers;
          console.dir(typeof headers);
        }
      }
    });

  });





});