import React, { Component } from 'react';
import { Button } from 'antd';
import cn from 'classnames';
import './styles.css';

class SettingsControls extends Component {
    render() {
        return (
            <div className={cn("settings-controls", { "show": this.props.show })}>
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