// import React from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import WindowControls from './window-controls';

const { updateEarned, updateCurrentAmount, updateDiscount, updateWindowState, addSpinResult } = actions;

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    updateCurrentAmount: amount => dispatch(updateCurrentAmount(amount)),
    updateEarned: amount => dispatch(updateEarned(amount)),
    updateDiscount: amount => dispatch(updateDiscount(amount)),
    updateWindowState: amount => dispatch(updateWindowState(amount)),
    addSpinResult: amount => dispatch(addSpinResult(amount)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    WindowControls
);