'use strict';
window.addEventListener('load', function() {
  var divTranslateChild = document.createElement('div');
  var divTranslateChild2 = document.createElement('div');

  var divTranslate = document.querySelector('#div_translate');
  var inpTranslate = document.querySelector('#inp_translate');
  inpTranslate.value = 'text';
  var btnTranslate = document.querySelector('#btn_translate');

  var divNewsChild = document.createElement('div');
  var divNewsChild2 = document.createElement('div');
  var divNews = document.querySelector('#div_news');
  var btnNews = document.querySelector('#btn_news');

  divTranslate.appendChild(divTranslateChild);
  divTranslate.appendChild(divTranslateChild2);
  divNews.appendChild(divNewsChild);
  divNews.appendChild(divNewsChild2);
  // divTranslate.insertBefore(divTranslateChild, btnTranslate);

  // get translate
  btnTranslate.addEventListener('click', function() {
    var key = inpTranslate.value;
    var req = new XMLHttpRequest();

    req.open('GET', 'http://localhost:8080?' +
      'task=translate&key=trnsl.1.1.20140416T130443Z.49db75a946e5d9df.baa803157e4482838c0612cb9c5aa513643049a4&lang=en-uk&text='+ key );
    req.send();
    req.addEventListener('readystatechange', function() {
      if (req.readyState === req.DONE) {
        if (req.status === 200) {
          var response = JSON.parse(req.responseText);
          divTranslateChild.innerText = response.text;
          var headers = req.getAllResponseHeaders();
          divTranslateChild2.innerText = headers;
        }
      }
    });
  });

  // get news
  btnNews.addEventListener('click', function() {
    var req = new XMLHttpRequest();
    req.open('GET', 'http://localhost:8080?' +
      'task=news');
    req.send();
    req.addEventListener('readystatechange', function() {
      if (req.readyState === req.DONE) {
        if (req.status === 200) {
          var arrResponse = req.responseText.split('-');

          divNewsChild.innerHTML = 'usd buy - ' + arrResponse[0] + '<br>' +
            'usd sell - ' + arrResponse[1] + '<br>' +
            'eur buy - ' + arrResponse[2] + '<br>' +
            'eur sell - ' + arrResponse[3] + '<br>';

          var headers = req.getAllResponseHeaders();
          divNewsChild2.innerText = headers;
          // console.dir(typeof headers);
        }
      }
    });
  });
});
