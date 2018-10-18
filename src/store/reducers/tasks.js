import {
    ADD_TASK,
    REMOVE_TASK,
    UPDATE_TASK
} from '../constants';

import {
    addElement,
    removeElement,
    updateElement
} from "../helpers/array-actions";

export default function tasks(state=[], { type, payload }) {
    switch (type) {
        case ADD_TASK:
            return addElement(state, payload);

        case REMOVE_TASK:
            return removeElement(state, payload);

        case UPDATE_TASK:
            return updateElement(state, payload);

        default:
            return state;
    }
}

