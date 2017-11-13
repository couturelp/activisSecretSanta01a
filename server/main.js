import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';
import '../imports/api/users';

import '../imports/startup/simple-schema-conf';

import {SentEmails} from '../imports/api/sentEmails';
import {Participants} from '../imports/api/participants';
import {GroupOwner} from '../imports/api/groupOwner';



Meteor.startup(() => {


        let groupOwner = {
            name: "Rahat Hossen",
            email: "rahat@quantik.ca"
        }
        let targetPerson = {
            name: "Louis-Philippe Couture",
            email: "couturel@quantik.ca"
        }
        let packagePerson = {
            name: "Thierry Tanguay",
            email: "tanguayt@quantik.ca"
        }
        //Meteor.call('sentemails.sendEmail',groupOwner,targetPerson,packagePerson);


});
