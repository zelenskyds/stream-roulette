// import React from 'react';
import { connect } from 'react-redux';
import actions from '../../store/actions';
import WindowControls from './window-controls';

const { updateDiscountEarned, updateEarned, updateCurrentAmount, updateDiscount, updateWindowState, addSpinResult, updateCurrentState } = actions;

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    updateCurrentAmount: amount => dispatch(updateCurrentAmount(amount)),
    updateEarned: amount => dispatch(updateEarned(amount)),
    updateDiscountEarned: earned => dispatch(updateDiscountEarned(earned)),
    updateDiscount: amount => dispatch(updateDiscount(amount)),
    updateWindowState: amount => dispatch(updateWindowState(amount)),
    addSpinResult: amount => dispatch(addSpinResult(amount)),
    updateCurrentState: state => dispatch(updateCurrentState(state)),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    WindowControls
);