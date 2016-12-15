/**
 * This file creates email list as per expected format from 
 * providers.
 */


var request = require('request');
var exports = module.exports = {};

exports.sendGridList = function(emailList) {
    var eList = (typeof emailList != 'undefined' || emailList != '') ? emailList.replace(/"/g,"") : '';
    eList = eList.split(',');
    
    var mailList = '';
    if(eList.length > 0 && eList != '') {
        for(var i = 0; i < eList.length; i++) {
            mailList = (mailList == '') ? '{ "email": "' + eList[i] + '" }' : mailList + ', { "email": "' + eList[i] + '"}';        
        }
    } else { mailList = '{ "email": "rodrigo.rubio@gmail.com" }'; }

    return mailList;
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
