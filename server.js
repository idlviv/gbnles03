var http = require("http");
var urlUtils = require('url');
var requestUtils = require('request');
var cheerio = require('cheerio');

// var cors = require('cors');
// use it before all route definitions
// app.use(cors({origin: 'http://localhost:8080'}));

function onRequest(request, response) {
  var params = urlUtils.parse(request.url, true);

  // Task to translate
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
        response.setHeader('Access-Control-Allow-Origin', 'http://localhost:63342');
        response.writeHead(200, {'Content-Type': 'Text/plain', 'Cache-Control': 'max-age=31536000'});
        response.write(body);
        response.end();
      }
    });

    // Task to take news
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
        $('.ipsKursTable_interbank span.ipsKurs_rate').each(function(i, item) {
          response.write($(item).text()+'-');
        });

        // ----equal
        // $('.ipsKursTable_interbank span.ipsKurs_rate').each(function() {
        //   response.write($(this).text());
        // });

        response.end();
      }
    });
  }
}

http.createServer(onRequest).listen(8080);
console.log('Server started');
