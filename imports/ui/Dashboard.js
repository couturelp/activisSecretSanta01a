import React from 'react';
import PrivateHeader from './PrivateHeader';
import YourInfos from './YourInfos';
import {Participants} from './../api/participants';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <div>
      <PrivateHeader title='Activis Secret Santa'/>
      <div className="page-content">
      <YourInfos/>
      </div>
    </div>
  );
};