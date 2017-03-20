var http = require("http");
var urlUtils = require('url');
var requestUtils = require('request');

// var cors = require('cors');
// use it before all route definitions
// app.use(cors({origin: 'http://localhost:8080'}));

function onRequest(request, response) {
  var params = urlUtils.parse(request.url, true);

  params.protocol = 'https:';

  delete params.pathname;
  delete params.host;
  params.hostname = 'translate.yandex.net/api/v1.5/tr.json/translate';

  var link = urlUtils.format(params);

  requestUtils.get(link, function (err, res, body) {
    if (err) {
      console.error(err);
    } else {
      // console.log(body);
      response.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
      response.writeHead(200, {'Content-Type': 'Text/plain', 'Cache-Control': 'max-age=31536000'});

      response.write(body);
      response.end();
    }
  });
}

http.createServer(onRequest).listen(8080);
console.log('Server started');
