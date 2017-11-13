import React from 'react';

import {Participants} from './../api/participants';
import {GroupOwner} from './../api/groupOwner';
import { Link } from 'react-router-dom';

import { withRouter } from "react-router-dom";
import history from './../routes/history' 


import { Meteor } from 'meteor/meteor';



export default class YourInfos extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: "Your name",
      company: "Your company",
      includeSelf: false
    };
  }
  componentDidMount(){
    console.log("componentDidMount YourInfos")

    this.groupOwnerTracker = Tracker.autorun(()=>{
    Meteor.subscribe('groupOwner');
    const myGroupOwner = GroupOwner.findOne({})
    if (myGroupOwner){
      this.setState({name:myGroupOwner.name, company:myGroupOwner.company, includeSelf:myGroupOwner.includeSelf});
      let checkbox = this.refs.chkboxSelf;
      checkbox.checked = myGroupOwner.includeSelf;
    }
    console.log ('myGroupOwner : ', myGroupOwner);
    });
}
componentWillUnmount(){
    console.log("componentWillNumount YourInfos");
    this.groupOwnerTracker.stop();
}
  showEmail(){
    let email = Meteor.user().emails[0].address;
    console.log(email);
  }
  handleChange(e){
    if (e.target.name == "groupOwnerName"){
      this.setState({ groupOwnerName: e.target.value });
    }
    else if (e.target.name == "groupOwnerCompany"){
      this.setState({ groupOwnerCompany: e.target.value });
    }
  }
  handleSubmition(){
    let name = null;
    let company = null;
    let includeSelf = null;
    if (this.state.groupOwnerName){
      name = this.state.groupOwnerName
    }else {
      name = this.state.name;
    }
    if (this.state.groupOwnerCompany){
      company = this.state.groupOwnerCompany
    }else {
      company = this.state.company;
    }
    includeSelf = this.state.includeSelf;
    console.log("Submitted with " + includeSelf);
    let email = Meteor.user().emails[0].address;
      Meteor.call('groupOwner.data', name, email, company, includeSelf, function(err,resp){
        history.push('/fillteam');
      });
  }
  returnPreviousValue(type){
    switch (type){
      case 'name':
        return this.state.name;
        break;
      case 'company':
        return this.state.company;
        break;
      default:
        return 'no value';
      }
  }
  changeIncludeSelf(){
    let previousVal = this.state.includeSelf;
    previousVal = !previousVal;
    this.setState({includeSelf: previousVal});
  }
  handleCheckboxChange(e){
    this.setState({includeSelf:e.target.checked});
    console.log("Now " + e.target.checked);
  }
  handleCheckboxChk(){
    if (this.state.includeSelf != null){
      console.log("not null : " +  this.state.includeSelf);
      return this.state.includeSelf;
    }else {
      console.log("null");
      return false;
    }
  }
  
  render() {
    return (
      <div className="item">
      <h1>Your infos</h1>
        <form className="form">
          <input className="form__input" type="text" ref="groupOwnerName" name="groupOwnerName" placeholder="Your Name" defaultValue={this.returnPreviousValue('name')} key={this.state.name} onChange={this.handleChange.bind(this)}/>
          <input className="form__input" type="text" ref="groupOwnerCompany" name="groupOwnerCompany" placeholder="Your Company" defaultValue={this.returnPreviousValue('company')} key={this.state.company} onChange={this.handleChange.bind(this)}/>
        </form>
        <div>
          <input type="checkbox" id="includeSelf" ref="chkboxSelf" name="includeSelf" value="includeSelf" onChange={this.handleCheckboxChange.bind(this)}/>
          <label>Should we include yourself in the list?</label>
      </div>
        <button className='buttonList buttonList__send buttonMargin' onClick={this.handleSubmition.bind(this)}>Continue</button>
      </div>
    );
  }
};
