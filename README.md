# Email Backend

Send emails using sendgrid and mailgun.

## This project uses ExpressJS and NodeJS.

execute `npm install` in order to install project dependencies.

## Server API credentials for mail providers

Enter your own credentials under the `index.js` file

`
// sendgrid - primary provider
const SENDGRID_URL      = 'https://api.sendgrid.com/v3/mail/send';
const SENDGRID_API_KEY = '<YOUR_API_KEY>';  

// mailgun - secondary provider (failover)
const MAIL_GUN_URL     = '<YOUR_GUNMAIL_DOMAIN_HERE>';
const MAIL_GUN_USER    = 'api';
const MAIL_GUN_API_KEY = '<YOUR_API_KEY>';

const FROM_EMAIL       = '<YOUR_FROM_EMAIL>';  
`

## Development server
Run `npm start` for a dev server. Navigate to `http://localhost3000/serverstatus/errorcount` 
you should see and output similar to this - 

`{"errorCount":0}`

## Making POST requests to API

Primary provider (sendgrid)
`http://localhost:3000/testPostSendgrid`

Secondary (failover) provider

`http://localhost:3000/testMailGunPost`
