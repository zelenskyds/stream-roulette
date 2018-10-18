import { UPDATE_REPEATS } from '../constants';

export default function(state={}, { type, payload }) {
    switch(type) {
        case UPDATE_REPEATS:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
}