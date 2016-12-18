
var express     = require('express');
var router      = express.Router();
var request     = require('request');
var emailModule = require('./emailModule');

// sendgrid - primary provider
const SENDGRID_URL      = 'https://api.sendgrid.com/v3/mail/send';
const SENDGRID_API_KEY = '<YOUR_API_KEY>';  

// mailgun - secondary provider (failover)
const MAIL_GUN_URL     = '<YOUR_GUNMAIL_DOMAIN_HERE>';
const MAIL_GUN_USER    = 'api';
const MAIL_GUN_API_KEY = '<YOUR_API_KEY>';

const FROM_EMAIL       = '<YOUR_FROM_EMAIL>';  

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express ***' });
});

router.post('/testMailGunPost', function(req, res, next){

  var subject      = JSON.stringify(req.body.emailSubject);
  var emailMessage = JSON.stringify(req.body.emailMessage);
  var to  = emailModule.mailGunList(JSON.stringify(req.body.toEmail));
  var cc  = emailModule.mailGunList(JSON.stringify(req.body.ccEmail));
  var bcc = emailModule.mailGunList(JSON.stringify(req.body.bccEmail));

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
emails['subject']  = JSON.stringify(req.body.emailSubject);
emails['emailMessage'] = JSON.stringify(req.body.emailMessage);
emails['toEmail']  = emailModule.sendGridList(JSON.stringify(req.body.toEmail));
emails['ccEmail']  = emailModule.sendGridList(JSON.stringify(req.body.ccEmail));
emails['bccEmail'] = emailModule.sendGridList(JSON.stringify(req.body.bccEmail));

var options = { method: 'POST',
  url: SENDGRID_URL,
  headers: 
   { 
     'content-type': 'application/json',
     authorization: SENDGRID_API_KEY 
  },
  body: 
   { personalizations: [ { 
     to: [ 
       JSON.parse(emails['toEmail'])
     ],
     cc: [
       JSON.parse(emails['ccEmail']) 
     ],
     bcc: [
       JSON.parse(emails['bccEmail']) 
     ]
     } ],
     from: { email: FROM_EMAIL },
     subject: JSON.parse(emails['subject']),
     content: [ { type: 'text/plain', value: JSON.parse(emails['emailMessage']) } ] },
  json: true }; 


  console.log('OPTIONS :: ' + JSON.stringify(options));

  request(options, function(error, response, formContent) { 
    
    console.log('*** ERROR *** ' + JSON.stringify(error));
    console.log('*** RESPONSE *** ' + JSON.stringify(error));

    if(response.statusCode == 200 || response.statusCode == 202) {

      res.status(response.statusCode).send({ 'status' : response.statusCode });
    
    } else {
      console.log('*** ERROR *** ' + JSON.stringify(error));
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
