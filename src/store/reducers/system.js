import { UPDATE_SYSTEM } from "../constants";

export default function (state = {}, { type, payload }) {
    if(type === UPDATE_SYSTEM) {
        return {
            ...state,
            ...payload
        }
    }

    return state;
}