import {
    UPDATE_WINDOW_STATE,
    ADD_SPIN_RESULT,
    UPDATE_CURRENT_AMOUNT,
    UPDATE_EARNED,
    UPDATE_CURRENT_DONATE
} from '../constants';

export default function currentState(state={}, { type, payload }) {
    switch (type) {
        case ADD_SPIN_RESULT:
            return {
                ...state,
                spinResults: [...state.spinResults, { ...payload }],
            };

        case UPDATE_WINDOW_STATE:
            return {
                ...state,
                isOpened: {
                    ...state.isOpened,
                    ...payload
                }
            };

        case UPDATE_EARNED:
            return {
                ...state,
                money: {
                    ...state.money,
                    earned: payload
                },
            };

        case UPDATE_CURRENT_AMOUNT:
            return {
                ...state,
                money: {
                    ...state.money,
                    amountForSpin: payload
                },
            };

        case UPDATE_CURRENT_DONATE:
            return {
                ...state,
                donate: {
                    ...state.donate,
                    ...payload
                },
            };

        default:
            return state;
    }
}

