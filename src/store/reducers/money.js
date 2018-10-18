import { UPDATE_MONEY } from "../constants";

export default function(state={}, { type, payload }) {
    switch (type) {
        case UPDATE_MONEY:
            if( payload.funcA !== undefined ) {
                payload.funcA = +payload.funcA;
            }

            if( payload.startAmountForSpin !== undefined ) {
                payload.startAmountForSpin = +payload.startAmountForSpin;
            }
            return {
                ...state,
                ...payload
            };
        default:
            return state
    }
}