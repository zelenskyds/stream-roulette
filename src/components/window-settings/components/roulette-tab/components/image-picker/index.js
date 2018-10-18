import React, { Component, Fragment } from 'react';
import Scrollbars from 'react-custom-scrollbars';
import './styles.css';

class ImagePicker extends Component {
    constructor(props) {
        super( props );
        this.state = {
            isOpen: false,
            value: props.defaultValue
        }
    }


    open = () => {
        this.setState({
            isOpen: true
        })
    };

    close = () => {
        this.setState({
            isOpen: false
        })
    };

    makeHandleClick(img) {
        return () => {
            this.props.onChange(img);
            this.setState({
                value: img
            });
            this.close();
        }
    }

    render() {
        return (
            <div
                className="image-picker"
            >
                {this.state.value?
                    <img
                        onClick={ this.open }
                        className="image-picker-preview"
                        src={ 'file://' + this.state.value.path }
                    />
                    :
                    <div
                        className="image-picker-preview"
                        onClick={ this.open }
                    />
                }
                { this.state.isOpen &&
                    <Fragment>
                        <div onClick={ this.close } className="image-picker-overlay"/>
                        <div className="image-picker-popup">
                            <Scrollbars universal>
                                <div className="image-picker-popup-inner">
                                    <button
                                        className="image-picker-img"
                                        onClick={ this.makeHandleClick(null) }
                                    >
                                        ✕
                                    </button>
                                    {
                                        this.props.images.map(
                                            img => (
                                                <button
                                                    className="image-picker-img"
                                                    key={ img.id }
                                                    onClick={ this.makeHandleClick(img) }
                                                >
                                                    <img src={ 'file://' + img.path } />
                                                </button>
                                            )

                                        )
                                    }
                                </div>
                            </Scrollbars>
                        </div>
                    </Fragment>
                }

            </div>
        );
    }
}

export default ImagePicker;