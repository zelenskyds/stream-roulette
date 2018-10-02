import React, { Component } from 'react';
import { Button } from 'antd';
import './styles.css';

class SettingsControls extends Component {
    render() {
        return (
            <div className="settings-controls">
                <Button
                    htmlType="button"
                    type="primary"
                    onClick={ this.props.onSave }
                    disabled={!this.props.settingChanged}
                >
                    Сохранить
                </Button>
            </div>
        );
    }
}

export default SettingsControls;