import React, { Component, Fragment } from 'react';
import { getImageById } from "../../store/helpers/relations";
import render from '../../services/render-dot';
// import cn from 'classnames';
import './styles.css';

const { remote, ipcRenderer } = window.require('electron');

class WindowScore extends Component {
    state = {
        layer: null
    };

    interval = null;

    constructor(props) {
        super( props );

        this.id = this.props.location.hash.substr( 1 );

        remote.getCurrentWindow().on('close', () => {
            ipcRenderer.send('close-window', this.id);
        });
    }

    componentDidMount() {
        const widget = this.props.windows.widgets.find( w => +this.id === +w.id );
        this.renderLayers(widget);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps !== this.props) {
            const widget = this.props.windows.widgets.find( w => +this.id === +w.id );
            this.renderLayers(widget);
        }
    }

    renderLayers(widget) {
        clearTimeout(this.interval);
        const layers = [];

        for(const layer of widget.layers) {
            const text = render(layer.text, {
                donate: this.props.currentState.donate,
                money: {
                    ...this.props.currentState.money,
                    discount: this.props.discount.value
                },
                results: this.props.currentState.spinResults,
            });
            const show = layer.condition?
                Object.entries(layer.condition).map(
                    ([key, value]) => this.props.currentState.state[key] === value
                ).reduce( (accumulator, currentValue) => accumulator && currentValue, true )
                :
                true;

            if(show) {
                layers.push({
                    ...layer,
                    component: (
                        <span
                            key={ layer.id }
                            className="widget-layer"
                            style={{
                                color: layer.color
                            }}
                        >
                        { text }
                        </span>
                    )
                })
            }
        }

        this.setState({
            layer: layers[0].component
        });

        if(layers.length > 1) {
            this.changeLayer(layers, 1)
        }
    }

    changeLayer = (layers, index=0) => {
        clearTimeout(this.interval);
        this.interval = setTimeout(
            () => {
                this.setState({
                    layer: layers[index].component
                });
                index = (index + 1) % layers.length;
                this.changeLayer(layers, index);
            },
            layers[index].duration * 1000
        );
    };

    render() {
        const widget = this.props.windows.widgets.find( w => +this.id === +w.id );

        return (
            <div
                className="window-widget"
                style={{
                    backgroundColor: widget.color,
                    borderColor: widget.color
                }}
            >
                {widget.bg &&
                    <img
                        className="window-widget-bg"
                        src={ getImageById(widget.bg) }
                        alt="bg"
                    />
                }
                <span className="widget-scoreboard">
                    { this.state.layer }
                </span>
            </div>
        );
    }
}

export default WindowScore;