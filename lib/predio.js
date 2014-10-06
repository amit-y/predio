var Q = require('q');
//var _ = require('lodash');
var request = require('request');

var config = require('../config');

var rnd = function (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

var reqObj = function(req) {
  //var qs = 'pio_appkey=' + config.pio.appkey; 
  /* if (req.options) {
    req.options.forEach(function(opt) {
      qs += '&' + opt + '=' + req.options[opt];
    });
  } */
  if (!req.options) req.options = {};
  req.options.pio_appkey = config.pio.appkey;

  if (!req.method) req.method = 'GET';

  if (!req.form) req.form = {};

  return {
    method: req.method, 
    uri: config.pio.apiurl + req.request + '.json',
    qs: req.options,
    form: req.form
  }
};

var pioReq = function(req,form) {
  return Q.Promise(function(resolve, reject) { console.log(reqObj(req));
    request(reqObj(req), function(err, response, body) {
      if (err) reject(err); console.log(response.statusCode);
      if (response.statusCode >= 400) reject(new Error(body));

      resolve(JSON.parse(body));
    });
  });
};

/*
var reqs = pioReq({request: 'users', method: 'POST', form: {'pio_uid': '1'}})
.then(function(data) {
  console.log(data);
  return pioReq({request: 'users/1'});
});

var reqs = pioReq({request: 'items', method: 'POST', form: {'pio_iid': '9','pio_itypes':'type 3,cat 3'}})
.then(function(data) {
  console.log(data);
  return pioReq({request: 'items/9'});
});
*/

//var reqs = pioReq({request: 'actions/u2i', method: 'POST', form: {'pio_uid': rnd(1,4).toString(),'pio_iid': rnd(1,10).toString(),'pio_action': 'view'}});

//var reqs = pioReq({request: 'engines/itemrec/reco-ngn/topn', options: {'pio_uid': rnd(1,4).toString(),'pio_n':3}});
var reqs = pioReq({request: 'engines/itemrec/reco-ngn/topn', options: {'pio_uid': rnd(1,4).toString(),'pio_n':2,'pio_itypes':'cat 1'}});


reqs.done(function(data) {
  console.log(data);
});
reqs.fail(function(data) {
  console.log('ERROR: '+data); 
});

