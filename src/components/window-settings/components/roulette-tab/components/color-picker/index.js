import React, { Component, Fragment } from 'react';
import { BlockPicker } from 'react-color';
import './styles.css';

class ColorPicker extends Component {
    state = {
        show: false,
        color: '',
    };

    componentDidMount() {
        this.setState({
            color: this.props.color
        });
    }

    close = () => {
        this.setState({
            show: false
        });
    };

    open = () => {
        this.setState({
            show: !this.state.show
        });
    };

    handleChangeComplete = (color) => {
        this.setState({ color: color.hex });
        this.props.onChange(color.hex);
    };

    handleOverlayClick = (event) => {
        // event.preventDefault();
        this.close();
    };

    render() {
        return (
            <div
                className="color-picker"
            >
                <div
                    onClick={ this.open }
                    style={{backgroundColor: this.state.color}}
                    className="color-picker-color"
                />
                {this.state.show &&
                    <Fragment>
                        <div
                            onClick={ this.handleOverlayClick }
                            className="color-picker-overlay"
                        />
                        <div
                            className="color-picker-container"
                            style={{
                                left: this.props.left && 0,
                                right: !this.props.left && 0
                            }}
                        >
                            <BlockPicker
                                triangle="hide"
                                color={this.state.color}
                                onChangeComplete={ this.handleChangeComplete }
                                colors={[
                                    "#00ff00",
                                    "#ff0000",
                                    "#0000ff",
                                    "#f47373",
                                    "#37d67a",
                                    "#2ccce4",
                                    "#dce775",
                                    "#ff8a65",
                                    "#ba68c8"
                                ]}
                            />
                            <button
                                onClick={this.close}
                            >
                                ✕
                            </button>
                        </div>
                    </Fragment>
                }
            </div>
        );
    }
}

export default ColorPicker;