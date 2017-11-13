import React from 'react';

import {Participants} from './../api/participants';

export default class Player extends React.Component {
  render() {
    let itemClassName = `item item--position-4`;
    return (
      <div key={this.props._id} className={itemClassName}>
        <div className='player'> 
          <div>
            <h3 className='player__name'>{this.props.participant.name} </h3>
            <p className='player__stats'>
              {this.props.participant.email}
            </p>
          </div>
          <div className='player__actions'>
            <button className='buttonList button--round' onClick={() => Meteor.call('participants.remove',this.props.participant._id)}>X</button>
          </div>
        </div>
      </div>
    );
  }
};