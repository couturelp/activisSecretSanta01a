import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export const GroupOwner = new Mongo.Collection('groupOwner');

if (Meteor.isServer){
    Meteor.publish('groupOwner', function () {
        return GroupOwner.find({userId:this.userId});
    });

}

Meteor.methods({
    'groupOwner.data': function(name, email, company, includeSelf){
        if (!this.userId) {
            throw new Meteor.Error('not-authorized');
        }
        let currentOwner = GroupOwner.findOne({userId: this.userId});
        if (currentOwner){
            GroupOwner.update({_id:currentOwner._id, userId:this.userId},{$set:{name:name, email:email, company:company, includeSelf:includeSelf}});
        }else{
            GroupOwner.insert({
                name: name,
                email: email,
                company: company,
                includeSelf: false,
                userId: this.userId
            });
        }
    }
});
