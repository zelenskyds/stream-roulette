import camel from 'to-camel-case';
import * as constants from './constants';

const actions = {};
for(const constant in constants) {
    actions[camel(constant)] = (payload) => ({
        type: constant,
        payload
    })
}

export default actions;