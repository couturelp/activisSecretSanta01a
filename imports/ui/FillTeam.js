import React from 'react';
import PrivateHeader from './PrivateHeader';
import AddPlayer from './AddPlayer';
import PlayerList from './PlayerList';
import {Participants} from './../api/participants';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <PrivateHeader title="Please enter your team's details."/>
      <div className="page-content">
      <PlayerList/>
      <AddPlayer/>
      </div>
    </div>
  );
};