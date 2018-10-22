import {
    ADD_LAYER,
    DOWN_LAYER,
    REMOVE_LAYER, UP_LAYER,
    UPDATE_LAYER,
    UPDATE_ROULETTE_IMAGES,
    UPDATE_ROULETTE_SOUNDS,
    UPDATE_WIDGET,
    UPDATE_WINDOWS
} from "../constants";
import { addElement, removeElement, updateElement } from "../helpers/array-actions";

export default function(state={}, { type, payload, meta }) {
    let widget;
    let layerIndex;
    let layer;

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

        case UPDATE_WIDGET:
            return {
                ...state,
                widgets: updateElement(state.widgets, payload)
            };

        case ADD_LAYER:
            widget = state.widgets.find( w => +w.id === +meta.widget );

            if(!widget) {
                return state;
            }

            widget = { ...widget };
            widget.layers = addElement(widget.layers, payload);
            state.widgets = updateElement(state.widgets, widget);

            return { ...state };

        case REMOVE_LAYER:
            for(widget of state.widgets) {
                layerIndex = widget.layers.findIndex( l => l.id === payload.id );
                if(layerIndex !== -1) {
                    break;
                }
            }

            if(layerIndex === -1) {
                return state
            }

            widget = { ...widget };
            widget.layers = removeElement(widget.layers, payload);
            state = { ...state };
            state.widgets = updateElement(state.widgets, widget);

            return state;

        case UPDATE_LAYER:
            for(widget of state.widgets) {
                layerIndex = widget.layers.findIndex( l => l.id === payload.id );
                if(layerIndex !== -1) {
                    break;
                }
            }

            if(layerIndex === -1) {
                return state
            }

            widget = { ...widget };
            widget.layers = updateElement(widget.layers, payload);
            state = { ...state };
            state.widgets = updateElement(state.widgets, widget);

            return state;

        case UP_LAYER:
            for(widget of state.widgets) {
                layerIndex = widget.layers.findIndex( l => l.id === payload.id );
                if(layerIndex !== -1) {
                    break;
                }
            }

            if(layerIndex === -1 || layerIndex === 0) {
                return state
            }

            widget = { ...widget };
            widget.layers = [...widget.layers];

            layer = widget.layers[layerIndex - 1];
            widget.layers[layerIndex - 1] = widget.layers[layerIndex];
            widget.layers[layerIndex] = layer;

            state = { ...state };
            state.widgets = updateElement(state.widgets, widget);

            return state;

        case DOWN_LAYER:
            for(widget of state.widgets) {
                layerIndex = widget.layers.findIndex( l => l.id === payload.id );
                if(layerIndex !== -1) {
                    break;
                }
            }

            if(layerIndex === -1 || layerIndex === widget.length - 1) {
                return state
            }

            widget = { ...widget };
            widget.layers = [...widget.layers];

            layer = widget.layers[layerIndex + 1];
            widget.layers[layerIndex + 1] = widget.layers[layerIndex];
            widget.layers[layerIndex] = layer;

            state = { ...state };
            state.widgets = updateElement(state.widgets, widget);

            return state;

        default:
            return state
    }
}