var http = require("http");
var urlUtils = require('url');
var requestUtils = require('request');

function onRequest(request, responsee) {
  console.log('request', request);
  var params = urlUtils.parse(request.url, true);
  console.dir(params);

  var addr = 'https://translate.yandex.net/api/v1.5/tr.json/translate?' +
    params.query.key + '&' +  params.query.lang + '&' + params.query.text;

  requestUtils.get(addr, function(error, response, body) {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
      console.log(response.status);

      // var response1 = JSON.parse(response);
      // console.log('resp', response);
      // console.log('resp1', response1);
      //
      // delete params.host;
      // params.hostname = request.url;
      //
      // delete params.search;
      // params.query = {
      //   key: response1.key,
      //   lang: response1.lang,
      //   text: response1.text,
      // };
      // responsee = urlUtils.format(params);
    }

  });


  responsee.writeHead(200, {'Content-Type': 'Text/plain'});
  responsee.write('Hello');

}

http.createServer(onRequest).listen(8080);
console.log('Server started');