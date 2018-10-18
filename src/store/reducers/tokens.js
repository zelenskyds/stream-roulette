import {
    UPDATE_TOKEN,
} from '../constants';

export default function (state={}, { type, payload }) {
    switch (type) {
        case UPDATE_TOKEN:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
}