/**
 * This file creates email list as per expected format from 
 * providers.
 */


var request = require('request');
var exports = module.exports = {};

exports.sendGridList = function(emailTo, emailCc, emailBcc) {
    var toList = (typeof emailTo != 'undefined' || emailTo != '') ? emailTo.replace(/"/g,"") : '';
    toList = toList.split(',');

    var ccList = (typeof emailCc != 'undefined' || emailCc != '') ? emailCc.replace(/"/g,"") : '';
    ccList = ccList.split(',');

    var bccList = (typeof emailBcc != 'undefined' || emailBcc != '') ? emailBcc.replace(/"/g,"") : '';
    bccList = bccList.split(',');

    var listMail = new Object();
    var perso    = [];    
    var toMail   = [];
    var ccMail   = [];
    var bccMail  = [];

    if(toList.length > 0 && toList != '') {
        for(var i = 0; i < toList.length; i++) {
            if(typeof emailTo != 'undefined' && emailTo != '') {                                
                toMail.push ({
                    email: toList[i]
                });                        
            }
        }

        listMail['to'] = toMail;
    }

    if(ccList.length > 0 && ccList != '') {
        for(var i = 0; i < ccList.length; i++) {
            if(typeof emailCc != 'undefined' && emailCc != '') {                                
                ccMail.push ({
                    email: ccList[i]
                });                        
            }
        }

        listMail['cc'] = ccMail;
    }

    if(bccList.length > 0 && bccList != '') {
        for(var i = 0; i < bccList.length; i++) {
            if(typeof emailBcc != 'undefined' && emailBcc != '') {                                
                bccMail.push ({
                    email: bccList[i]
                });                        
            }
        }

        listMail['bcc'] = bccMail;
    }

    perso.push(listMail);

    return perso;
};

exports.mailGunList = function(emailList) {
    var eList = (typeof emailList != 'undefined' || emailList != '') ? emailList.replace(/"/g,"") : '';
    eList = eList.split(',');
    
    var mailList = '';
    if(eList.length > 0 && eList != '') {
        for(var i = 0; i < eList.length; i++) {
            mailList = (mailList == '') ? eList[i] : mailList + ',' + eList[i];        
        }
    } else { mailList = "rodrigo.rubio@gmail.com" };

    return mailList;
};
