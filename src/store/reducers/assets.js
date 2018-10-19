import { ADD_IMAGE, ADD_SOUND, REMOVE_IMAGE, REMOVE_SOUND, UPDATE_IMAGE, UPDATE_SOUND } from '../constants'

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

        case ADD_SOUND:
            return {
                ...state,
                sounds: addElement(state.sounds, payload)
            };

        case UPDATE_SOUND:
            return {
                ...state,
                sounds: updateElement(state.sounds, payload)
            };

        case REMOVE_SOUND:
            return {
                ...state,
                sounds: removeElement(state.sounds, payload)
            };

        default:
            return state;
    }
}