import { UPDATE_ROULETTE_IMAGES, UPDATE_WINDOWS } from "../constants";

export default function(state={}, { type, payload }) {
    switch (type) {
        case UPDATE_WINDOWS:
            const result = { ...state };
            if( payload.roulette !== undefined ) {
                result.roulette = {
                    ...result.roulette,
                    ...payload.roulette,
                }
            }

            if( payload.score !== undefined ) {
                result.score = {
                    ...result.score,
                    ...payload.score,
                }
            }

            return result;
        case UPDATE_ROULETTE_IMAGES:
            return {
                ...state,
                roulette: {
                    ...state.roulette,
                    images: {
                        ...state.roulette.images,
                        ...payload
                    }
                }
            };
        default:
            return state
    }
}