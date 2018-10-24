import React, { Component } from 'react';
import { Button, Slider } from 'antd';
import './styles.css';

class Sound extends Component {
    state = {
        playing: false
    };

    componentDidMount() {
        this.setVolume(this.props.volume);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.volume !== prevProps.volume) {
            this.setVolume(this.props.volume);
        }
    }

    setVolume(value) {
        if(this.refs.audio) {
            this.refs.audio.volume = value;
        }
    }

    handleVolumeChange = (volume) => {
        if(volume !== this.props.volume) {
            this.props.onVolumeChange && this.props.onVolumeChange(volume);
            this.setVolume(volume)
        }
    };

    handleAudioClick = () => {
        if(this.state.playing) {
            this.pause();
        } else {
            this.play();
        }
    };

    play() {
        if(!this.refs.audio) {
            return;
        }

        this.setState({
            playing: true
        });

        this.refs.audio.play();
    }

    pause() {
        if(!this.refs.audio) {
            return;
        }

        this.setState({
            playing: false
        });

        this.refs.audio.pause();
    }

    stop() {
        if(!this.refs.audio) {
            return;
        }

        this.setState({
            playing: false
        });

        this.refs.audio.pause();
        this.refs.audio.currentTime = 0;
    }

    render() {
        const { src, name, controls, volume, onRemove, loading } = this.props;

        return (
            <div className="sound">
                {src && !loading &&
                    <audio
                        ref="audio"
                        loop
                        src={ 'file://' +  src}
                    />
                }
                {src && controls &&
                    <div className="sound-control">
                        <div className="sound-title">
                            <span className="sound-title-name">
                                { name }
                            </span>
                            &nbsp;
                            <Button
                                className="sound-title-remove"
                                htmlType="button"
                                shape="circle"
                                type="danger"
                                size="small"
                                icon="delete"
                                onClick={ onRemove }
                            />
                        </div>
                        <div className="sound-body">
                            <Button
                                className="sound-body-play"
                                htmlType="button"
                                type="ghost"
                                shape="circle"
                                icon={
                                    loading?
                                        'loading'
                                        :
                                        this.state.playing?
                                            "pause":
                                            "caret-right"
                                }
                                onClick={ this.handleAudioClick }
                            />
                            <Slider
                                className="sound-body-volume"
                                min={0}
                                max={1}
                                step={0.1}
                                value={ volume }
                                onChange={ this.handleVolumeChange }
                            />
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Sound;