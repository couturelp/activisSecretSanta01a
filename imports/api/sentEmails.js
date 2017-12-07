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
                "html": "<p>Salut <b>" + targetPerson.name + "</b>,<br> concernant le super souper de Noël chez " + groupOwner.name + " voici donc la fameuse personne à qui tu dois trouver un cadeau incroyable pour < 25 $.<br> Tu dois acheter un cadeau pour : <b><i> " + packagePerson.name + "</b> (" + packagePerson.email + ")<i> <br> Bonne chance !</p><br> <p>*|SIGNATURE|*</p>",
                "subject": "Cible pour échange de cadeaux chez " + groupOwner.name + ".",
                "from_email": "secretsanta@quantik.ca",
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
                        "content": "Joyeux Noël de la part du bot Quantik."
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