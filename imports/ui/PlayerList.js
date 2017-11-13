import React from 'react';
import FlipMove from 'react-flip-move';

import {Participants} from './../api/participants';

import Player from './Player';

export default class PlayerList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          participants: [],          
        };
    }
    componentDidMount(){
        console.log("componentDidMount PlayerList")

        this.participantTracker = Tracker.autorun(()=>{
        Meteor.subscribe('participants');
        Meteor.subscribe('groupOwner');
        const allParticipants = Participants.find({}).fetch();
        this.setState({participants:allParticipants});
        console.log ('All Participants : ', allParticipants);
        });
    }
    componentWillUnmount(){
        console.log("componentWillNumount LinksList");
        this.participantTracker.stop();
    }
  renderPlayers() {
    if (this.state.participants.length === 0) {
      return (
      <div className='item'>
          <p className='item__message'>Add your first participant to get started!</p>
      </div>
      )
    } else {
      return this.state.participants.map((participant) => {
        return <Player key={participant._id} participant={participant}/>;
      });
    }
  }
  render() {
    return (
      <div>
        <FlipMove duration={750} easing="ease-out" maintainContainerHeight={true}>
        {this.renderPlayers()}
        </FlipMove>
      </div>
    );
  }
};
