import React from 'react';
import { Button } from 'antd';
import './styles.css';

const Controls = (props) => {
    const { isRouletteShow, isSpinning, onSettingClick, onSpinClick, onRunClick, onCloseClick } = props;
    return (
        <div className="controls">
            <Button
                htmlType="button"
                type="primary"
                icon="setting"
                onClick={ onSettingClick }
            >
                Настройки
            </Button>
            <Button
                htmlType="button"
                disabled={ !isRouletteShow || isSpinning }
                type="primary"
                icon="redo"
                onClick={ onSpinClick }
            >
                Крутить
            </Button>
            { isRouletteShow ?
                <Button
                    htmlType="button"
                    type="primary"
                    icon="close-circle"
                    onClick={ onCloseClick }
                >
                    Выключить
                </Button>
                :
                <Button
                    htmlType="button"
                    type="primary"
                    icon="play-circle"
                    onClick={ onRunClick }
                >
                    Включить
                </Button>
            }
        </div>
    );
};

export default Controls;