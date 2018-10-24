import React, { Component } from 'react';
import { Upload, Button, Icon } from 'antd';
import TabContainer from "../tab-container";
import Sound from "./sound";

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

    handleAudioChange({ id }) {
        return (volume) => {
            this.props.onChange(this.props.actions.updateSound({
                volume,
                id
            }));
        };
    };

    handleAudioRemove(id) {
        return () => {
            this.props.onChange(this.props.actions.removeSound({
                id
            }));
        }
    }

    render() {
        return (
            <TabContainer>
                <div className="sound-tab-container">
                    {
                        this.props.sounds.map(
                            sound => (
                                <Sound
                                    loading={ sound.loading }
                                    key={ sound.id }
                                    onRemove={ this.handleAudioRemove(sound.id) }
                                    controls
                                    name={ sound.name }
                                    src={ sound.path }
                                    volume={ sound.volume }
                                    onVolumeChange={ this.handleAudioChange(sound) }
                                />
                            )
                        )
                    }
                    <Upload
                        className="sound-tab-add-button"
                        accept="audio/*"
                        fileList={ [] }
                        onChange={ this.handleAudioAdd }
                        beforeUpload={()=>false}>
                        <Button htmlType="button">
                            <Icon type="plus" /> Добавить аудиофайл
                        </Button>
                    </Upload>
                </div>
            </TabContainer>
        );
    }
}

export default SoundTab;