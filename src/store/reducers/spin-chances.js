import { UPDATE_SPIN_CHANCES } from "../constants";

export default function(state={}, { type, payload }) {
    switch (type) {
        case UPDATE_SPIN_CHANCES:
            if( payload.silver !== undefined ) {
                payload.silver = +payload.silver;
            }

            if( payload.gold !== undefined ) {
                payload.gold = +payload.gold;
            }
            return {
                ...state,
                ...payload
            };
        default:
            return state
    }
}