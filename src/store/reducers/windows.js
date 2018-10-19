import { UPDATE_ROULETTE_IMAGES, UPDATE_ROULETTE_SOUNDS, UPDATE_WINDOWS } from "../constants";

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

        case UPDATE_ROULETTE_SOUNDS:
            console.log( {
                ...state,
                roulette: {
                    ...state.roulette,
                    sound: {
                        ...state.roulette.sound,
                        ...payload
                    }
                }
            } );
            return {
                ...state,
                roulette: {
                    ...state.roulette,
                    sound: {
                        ...state.roulette.sound,
                        ...payload
                    }
                }
            };

        default:
            return state
    }
}