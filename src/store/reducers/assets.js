import { ADD_IMAGE, REMOVE_IMAGE, UPDATE_IMAGE } from '../constants'

import {
    addElement,
    removeElement,
    updateElement
} from "../helpers/array-actions";

export default function(state={}, { type, payload }) {
    switch (type) {
        case ADD_IMAGE:
            return {
                ...state,
                images: addElement(state.images, payload)
            };

        case UPDATE_IMAGE:
            return {
                ...state,
                images: updateElement(state.images, payload)
            };

        case REMOVE_IMAGE:
            return {
                ...state,
                images: removeElement(state.images, payload)
            };

        default:
            return state;
    }
}