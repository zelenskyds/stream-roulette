// import React from 'react';
import { connect } from 'react-redux';
import WindowWidget from './window-widget';

export default connect(
    state => state
)(
    WindowWidget
);