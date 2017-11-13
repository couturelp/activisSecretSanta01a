import React from 'react';

import {Participants} from './../api/participants';
import {GroupOwner} from './../api/groupOwner';
import {SentEmails} from '../api/sentEmails';

import { Meteor } from 'meteor/meteor';

export default class AddPlayer extends React.Component {
  processEmails(){
    let isEven = function(n) {
      return n % 2 == 0;
    }
    let getRandomInt = function(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let partNumber = 0;
    let allParticipants = Participants.find({}).fetch();
    let groupOwnerObj = GroupOwner.findOne({});
    let roundParticipants = new Array;

    console.log(groupOwnerObj);
    if (groupOwnerObj.includeSelf){
      roundParticipants.push( {
        name: groupOwnerObj.name,
        email: groupOwnerObj.email
      });
    }
    for (part of allParticipants){
      roundParticipants.push( {
        name: part.name,
        email: part.email
      });
    }
    console.log("We have a total of " + roundParticipants.length + " participants.");
    if (isEven(roundParticipants.length)){
      let availableParticipants = roundParticipants.slice(0);
      let finalList = new Array();

      for (currentOne of roundParticipants){
        let matchIndex = getRandomInt(0,(availableParticipants.length-1));
        while (currentOne.name == availableParticipants[matchIndex].name){
          matchIndex = getRandomInt(0,(availableParticipants.length-1));
        }
        currentOne.match = {
          name: availableParticipants[matchIndex].name,
          email: availableParticipants[matchIndex].email
        }
        availableParticipants.splice(matchIndex, 1);
        finalList.push(currentOne);
      }
      console.log(finalList);
      console.log("about to send email");
      let sendEmailOfIndex = function(index){
        let person = finalList[index];
        let groupOwner = {
          name: groupOwnerObj.name,
          email: groupOwnerObj.email
        }
        let targetPerson = {
            name: person.name,
            email: person.email
        }
        let packagePerson = {
            name: person.match.name,
            email: person.match.email
        }
        let newIndex = index+1;
        console.log("about to send #" + index);
        Meteor.call('sentemails.sendEmail',groupOwner,targetPerson,packagePerson,
        function(err,resp){
          console.log("sent #" + index);
          if (newIndex < finalList.length){
            sendEmailOfIndex(newIndex);
          }
          else{
          }
        });
        
      }
      sendEmailOfIndex(0);
      this.refs.errormsg.textContent = "Done!";
    }else{
      this.refs.errormsg.textContent = "Your number of participants is not even, sorry";
    }


  }
  handleSubmit(e) {
    let name = e.target.participantName.value;
    let email = e.target.participantEmail.value;
    e.preventDefault();
    if (name) {
      e.target.participantName.value = '';
      e.target.participantEmail.value = '';
      Meteor.call('participants.insert', name, email);
    }
  }
  render() {
    return (
      <div className="item">
        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
          <input className="form__input" type="text" name="participantName" placeholder="Name"/>
          <input className="form__input" type="text" name="participantEmail" placeholder="Email"/>
          <button className='buttonList'>Add</button>
        </form>
        <div>
          <p></p>
          <button className='buttonList buttonList__send' onClick={this.processEmails.bind(this)}>Send emails</button>
          <p ref='errormsg'></p>
        </div>
      </div>
    );
  }
};
