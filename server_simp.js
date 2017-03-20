var requestUtils = require('request');
var urlUtils = require('url');

var params = {};

params.protocol = 'https:';

delete params.host;
params.hostname = 'translate.yandex.net/api/v1.5/tr.json/translate';

delete params.search;
params.query = {
    key: 'trnsl.1.1.20140416T130443Z.49db75a946e5d9df.baa803157e4482838c0612cb9c5aa513643049a4',
    lang: 'en-uk',
    text: 'text',
  };

link = urlUtils.format(params);
console.log(link);

requestUtils.get(
  link,
  function(error, response, body) {
    if (error) {
      console.error(error);
    } else {
      console.log(body);
      console.log(response.statusCode);
      console.log(response.statusMessage);
      var bodyP = JSON.parse(body);
      console.log(bodyP.text);

      console.log();
    }
  }
);
