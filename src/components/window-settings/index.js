import { connect } from 'react-redux';
import actions from '../../store/actions';
import WindowSettings from './window-settings';

// const { updateEarned, updateCurrentAmount, updateDiscount, updateWindowState, addSpinResult } = actions;

const mapStateToProps = state => state;
const mapDispatchToProps = dispatch => ({
    actions,
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    WindowSettings
);