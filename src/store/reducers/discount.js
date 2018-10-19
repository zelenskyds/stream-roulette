import { UPDATE_DISCOUNT } from "../constants";

export default function(state={}, { type, payload }) {
    switch (type) {
        case UPDATE_DISCOUNT:
            if( payload.time !== undefined ) {
                payload.time = +payload.time;
            }

            if( payload.duration !== undefined ) {
                payload.duration = +payload.duration;
            }

            if( payload.chance !== undefined ) {
                payload.chance = +payload.chance;
            }

            return {
                ...state,
                ...payload
            };
        default:
            return state
    }
}