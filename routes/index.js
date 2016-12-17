
var express     = require('express');
var router      = express.Router();
var request     = require('request');
var emailModule = require('./emailModule');

// sendgrid - primary provider
const SENDGRID_URL      = 'https://api.sendgrid.com/v3/mail/send';
const SENDGRID_USER     = '';
const SENDGRID_API_KEY = 'Bearer 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';  

// mailgun - secondary provider (failover)
const MAIL_GUN_URL     = 'https://api.mailgun.net/v3/sandboxa4d6f1777ca24f768187097a4d72ddf9.mailgun.org/messages';
const MAIL_GUN_USER    = 'api';
const MAIL_GUN_API_KEY = 'key-31a6b59573fbce3322f016573f3abeb2';

const FROM_EMAIL       = 'rodrigo.rubio@gmail.com';  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express ***' });
});

router.post('/testMailGunPost', function(req, res, next){

  var subject      = req.body['emailSubject'];
  var emailMessage = req.body['emailMessage'];
  var to  = emailModule.mailGunList(req.body['toEmail']);
  var cc  = emailModule.mailGunList(req.body['ccEmail']);
  var bcc = emailModule.mailGunList(req.body['bccEmail']);

  var options = {
    "method": "POST",
    "headers": {"Content-Type":"application/x-www-form-urlencoded"},
    "url": MAIL_GUN_URL,
    "auth": {
        "username": MAIL_GUN_USER,
        "password": MAIL_GUN_API_KEY,
    },
    "formData": {
      "from": to,
      "to": to,
      "cc": cc,
      "bcc": bcc,
      "subject": JSON.parse(subject),
      "text": JSON.parse(emailMessage)
    }
  }
 
  var resTest;
  request(options, function(error, response, body) {
    res.status(200).send({ 'status' : response.statusCode });
  });  
});

router.post('/testPostSendgrid', function(req, res, next) {

var emails = {};
emails['subject']  = req.body['emailSubject'];
emails['emailMessage'] = req.body['emailMessage'];
emails['recipients'] = emailModule.sendGridList(req.body['toEmail'], req.body['ccEmail'], req.body['bccEmail']);

console.log(emails['recipients']);

var options = { method: 'POST',
  url: SENDGRID_URL,
  headers: 
   { 
     'content-type': 'application/json',
     authorization: SENDGRID_API_KEY 
  },
  body:{ 
    personalizations: emails['recipients'],
     from: { email: FROM_EMAIL },
     subject: emails['subject'],
     content: [ { type: 'text/plain', value: emails['emailMessage'] } ] 
    },
    json: true 
}; 

  request(options, function(error, response, formContent) { 
    
    if(response.statusCode == 200 || response.statusCode == 202) {
      res.status(response.statusCode).send({ 'status' : response.statusCode });    
    } else {
      //NOTE: Error expected here due to none unique email address
      //      to demonstrate failover. Only when cc & bcc are the same.      
      res.status(response.statusCode).send({ 'status' : response.statusCode });
    }

  });

});

router.post('/postTest', function(req, res, next){

  res.status(400).send({'status' : 400});

});

module.exports = router;
