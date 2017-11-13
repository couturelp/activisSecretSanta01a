import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const Participants = new Mongo.Collection('participants');

if (Meteor.isServer){
    Meteor.publish('participants', function () {
        return Participants.find({userId:this.userId});
    });

}

Meteor.methods({
    'participants.insert': function(name, email){

        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }


        console.log("ADDING " + name + " : " + email);
        Participants.insert({
            name: name,
            email: email,
            userId: this.userId
        });
    },
    'participants.remove': function(_id){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        Participants.remove(_id);
        
    }
});
