var requestUtils = require('request');
var urlUtils = require('url');
var cheerio = require('cheerio');

var params = {};

params.protocol = 'https:';

// delete params.host;
params.hostname = 'kurs.com.ua/mezhbank/';

// delete params.search;
// params.query = {
//   key: 'trnsl.1.1.20140416T130443Z.49db75a946e5d9df.baa803157e4482838c0612cb9c5aa513643049a4',
//   lang: 'en-uk',
//   text: 'text',
// };

link = urlUtils.format(params);
console.log(link);

requestUtils.get(
  link,
  function(error, response, html) {
    if (!error && response.statusCode === 200) {

      var $ = cheerio.load(html);
      $('.ipsKurs_rate').each(function(i, element) {
        console.log('i', i);
        // console.log('element', element);
        });

      // console.log(html);
      // var bodyP = JSON.parse(body);
      // console.log(bodyP.text);

    } else {
      console.error(error);
    }
  }
);

