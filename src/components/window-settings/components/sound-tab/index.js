import React, { Component } from 'react';
import { Upload, Button, Icon } from 'antd';
import TabContainer from "../tab-container";

import './style.css';

class SoundTab extends Component {
    handleAudioAdd = ({ file: { path, name } }) => {
        const action = this.props.actions.addSound({
            path,
            name,
            volume: 1.0,
            id: Date.now()
        });

        action.payload.loading = true;
        action.meta = {
            copy: true,
            type: 'sound'
        };

        this.props.onChange(action);
    };

    handleAudioChange({ id, volume }) {
        return ({ target }) => {
            if(volume === target.volume) {
                return;
            }

            this.props.onChange(this.props.actions.updateSound({
                volume: target.volume,
                id
            }));
        };
    };

    render() {
        return (
            <TabContainer>
                {
                    this.props.sounds.map(
                        sound => (
                            <div key={ sound.id } className="sound-tab-container">
                                { sound.name }
                                <audio
                                    src={ 'file://' + sound.path }
                                    controls
                                    ref={ audio => audio && (audio.volume = sound.volume) }
                                    onVolumeChange={ this.handleAudioChange(sound) }
                                />
                            </div>
                        )
                    )
                }
                <Upload
                    accept="audio/*"
                    fileList={ [] }
                    onChange={ this.handleAudioAdd }
                    beforeUpload={()=>false}>
                    <Button>
                        <Icon type="plus" /> Добавить аудиофайл
                    </Button>
                </Upload>
            </TabContainer>
        );
    }
}

export default SoundTab;