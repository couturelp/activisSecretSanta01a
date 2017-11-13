import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

var mandrill = require('mandrill-api/mandrill');
var apiKey = process.env.MANDRILL_API;
var mandrill_client = new mandrill.Mandrill(apiKey);

export const SentEmails = new Mongo.Collection('sentemails');

if (Meteor.isServer){
    Meteor.publish('sentemails', function () {
        return SentEmails.find({});
    });

}

Meteor.methods({
    'sentemails.sendEmail': function(groupOwner, targetPerson, packagePerson){
            var message = {
                "html": "<p>Hi <b>" + targetPerson.name + "</b>,<br> the owner of your group; " + groupOwner.name + " send you this Secret Santa email.<br> Your target is : <b><i> " + packagePerson.name + "</b> (" + packagePerson.email + ")<i> <br> Better start looking for a gift!</p><br> <p>*|SIGNATURE|*</p>",
                "subject": "Your secret santa pick from " + groupOwner.name + ".",
                "from_email": "secretsanta@gmaq.ca",
                "from_name": "Secret Santa",
                "to": [{
                        "email": targetPerson.email,
                        "name": targetPerson.name,
                        "type": "to"
                    }],
                "headers": {
                    "Reply-To": groupOwner.email
                },
                "auto_text": null,
                "auto_html": null,
                "inline_css": null,
                "merge": true,
                "merge_language": "mailchimp",
                "global_merge_vars": [{
                        "name": "signature",
                        "content": "Merry christmas! This was only a TEST."
                    }]
            };
        
            var async = false;
            var ip_pool = "Main Pool";
            var send_at = new Date();
            
            mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
                console.log(result);
            }, function(e) {
                // Mandrill returns the error as an object with name and message keys
                console.log('A mandrill error occurred: ' + e.name + ' - ' + e.message);
                // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
            });
            
    }
});