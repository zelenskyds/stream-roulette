import { combineReducers } from 'redux';

import currentState from './current-state';
import discount from './discount';
import money from './money';
import assets from './assets';
import repeats from './repeats';
import spinChances from './spin-chances';
import tasks from './tasks';
import tokens from './tokens';
import windows from './windows';

export default combineReducers({
    currentState,
    discount,
    money,
    assets,
    repeats,
    spinChances,
    tasks,
    tokens,
    windows
});