var http = require("http");
var urlUtils = require('url');
var requestUtils = require('request');
var cheerio = require('cheerio');

// var cors = require('cors');
// use it before all route definitions
// app.use(cors({origin: 'http://localhost:8080'}));

function onRequest(request, response) {
  var params = urlUtils.parse(request.url, true);

  if (params.query.task === 'translate'){
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

  } else if (params.query.task === 'news') {

    params.protocol = 'https:';
    delete params.pathname;
    delete params.host;
    params.hostname = 'kurs.com.ua/mezhbank';
    var link = urlUtils.format(params);

    requestUtils.get(link, function (err, res, html) {
      if (err) {
        console.error(err);
      } else {
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
        response.writeHead(200, {'Content-Type': 'Text/plain'});

        var $ = cheerio.load(html);
        p = $('.ipsKursTable_interbank');

        // $('.ipsKursTable_interbank').each(function(i, element) {
        //
        //   // console.log('i', typeof i.toString());
        //   // console.log('element', typeof element);
        //   // response.write(JSON.stringify(element));
        //   response.write(i.toString());
        // });
        // console.log(body);



        response.end();
      }
    });
  }

}

http.createServer(onRequest).listen(8080);
console.log('Server started');
