import React, { Component } from 'react';
import { Input, InputNumber, Menu, Button } from 'antd';
import ImagePicker from "../../../roulette-tab/components/image-picker";
import ColorPicker from "../../../roulette-tab/components/color-picker";
import { getImageById } from "../../../../../../store/helpers/relations";
import YesNoCheckbox from "../yes-no-checkbox";

import './styles.css';

class Widget extends Component {

    constructor(props) {
        super( props );

        this.state = {};

        if(props.layers.length >= 1) {
            this.state.current = props.layers[0].id.toString();
            this.state.duration = props.layers[0].duration;
            this.state.text = props.layers[0].text;
        } else {
            this.state.current = "";
        }

    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props === prevProps) {
            return
        }

        if(this.props.layers.findIndex( l => l.id.toString() === this.state.current ) === -1) {
            if(this.props.layers[0]) {
                this.handleChangeMenu({ key: this.props.layers[0].id.toString() })    ;
            }
        }
    }

    handleChangeMenu = ({key}) => {
        if(key !== "add") {
            const layer = this.props.layers.find( l => l.id.toString() === key.toString() );

            this.setState({
                current: key.toString() ,
                duration: layer.duration,
                text: layer.text
            });
            return
        }

        const id = Date.now();
        this.props.onChange(
            this.props.actions.addLayer({
                id,
                condition: {
                    spinning: null,
                    discount: null,
                },
                text: '',
                duration: 2
            }, { widget: this.props.id })
        );
        this.setState({
            current: id.toString(),
            duration: 2,
            text: ''
        });
    };

    render() {
        const layer = this.props.layers.find( l => l.id.toString() === this.state.current );

        return (
            <div className="widget-settings">
                <div className="widget-settings-title">
                    { this.props.name }
                </div>
                <div className="widget-settings-line">
                    Ширина&nbsp;
                    <InputNumber
                        onChange={
                            (value) => this.props.onChange(
                                this.props.actions.updateWidget({
                                    id: this.props.id,
                                    width: value
                                })
                            )
                        }
                        defaultValue={ this.props.width }
                    />

                    &emsp;Высота&nbsp;
                    <InputNumber
                        onChange={
                            (value) => this.props.onChange(
                                this.props.actions.updateWidget({
                                    id: this.props.id,
                                    height: value
                                })
                            )
                        }
                        defaultValue={ this.props.height }
                    />

                    &emsp;Фон&nbsp;
                    <ImagePicker
                        defaultValue={ getImageById(this.props.bg) }
                        images={ this.props.images }
                        onChange={
                            (img) => this.props.onChange(
                                this.props.actions.updateWidget({
                                    id: this.props.id,
                                    bg: img && img.id
                                })
                            )
                        }
                    />

                    &emsp;Цвет&nbsp;
                    <ColorPicker
                        color={ this.props.color }
                        left
                        onChange={
                            (color) => this.props.onChange(
                                this.props.actions.updateWidget({
                                    id: this.props.id,
                                    color
                                })
                            )
                        }
                    />
                </div>

                <Menu
                    onClick={ this.handleChangeMenu }
                    selectedKeys={[ this.state.current ]}
                    mode="horizontal"
                    className="widget-settings-layers-picker"
                >
                    {
                        this.props.layers.map(
                            ({id, text}, index) => (
                                <Menu.Item key={ id.toString() } className="widget-settings-layer">
                                    Слой { index + 1 }
                                </Menu.Item>
                            )
                        )
                    }
                    <Menu.Item key="add">
                        +
                    </Menu.Item>
                </Menu>

                {layer &&
                    <div className="widget-settings-layer-info">
                        <div className="widget-settings-conditions">
                            <YesNoCheckbox
                                onChange={
                                    (value) =>
                                        this.props.onChange(
                                            this.props.actions.updateLayer({
                                                id: layer.id,
                                                condition: {
                                                    ...layer.condition,
                                                    spinning: value
                                                }
                                            })
                                        )
                                }
                                label="Рулетка крутится"
                                value={ layer.condition.spinning }
                            />&emsp;
                            <YesNoCheckbox
                                onChange={
                                    (value) =>
                                        this.props.onChange(
                                            this.props.actions.updateLayer({
                                                id: layer.id,
                                                condition: {
                                                    ...layer.condition,
                                                    discount: value
                                                }
                                            })
                                        )
                                }
                                label="Скидка"
                                value={ layer.condition.discount }
                            />
                        </div>
                        <div className="widget-settings-line">
                            Время показа&nbsp;
                            <InputNumber
                                value={this.state.duration}
                                onChange={
                                    (value) => {
                                        this.props.onChange(
                                            this.props.actions.updateLayer({
                                                id: layer.id,
                                                duration: value
                                            })
                                        );

                                        this.setState({
                                            duration: value
                                        });
                                    }
                                }
                            />
                            &emsp;Цвет текста&nbsp;
                            <ColorPicker
                                color={ layer.color || "#ffffff" }
                                left
                                onChange={
                                    (color) => this.props.onChange(
                                        this.props.actions.updateLayer({
                                            id: layer.id,
                                            color
                                        })
                                    )
                                }
                            />
                        </div>
                        <div className="widget-settings-text">
                            <Input.TextArea
                                value={ this.state.text }
                                onChange={
                                    ({ target: { value } }) => {
                                        this.props.onChange(
                                            this.props.actions.updateLayer({
                                                id: layer.id,
                                                text: value
                                            })
                                        );

                                        this.setState({
                                            text: value
                                        });
                                    }
                                }
                            />
                        </div>
                        <div className="widget-layer-buttons">
                            <Button
                                className="widget-layer-button"
                                htmlType="button"
                                icon="up"
                                disabled={ this.props.layers[0].id === layer.id }
                                onClick={
                                    () => {
                                        this.props.onChange(
                                            this.props.actions.upLayer({
                                                id: layer.id
                                            })
                                        );
                                    }
                                }
                            >
                                Поднять выше
                            </Button>
                            <Button
                                className="widget-layer-button"
                                htmlType="button"
                                icon="down"
                                disabled={ this.props.layers[this.props.layers.length - 1].id === layer.id }
                                onClick={
                                    () => {
                                        this.props.onChange(
                                            this.props.actions.downLayer({
                                                id: layer.id
                                            })
                                        );
                                    }
                                }
                            >
                                Опустить ниже
                            </Button>
                            <Button
                                className="widget-layer-button"
                                htmlType="button"
                                icon="delete"
                                type="danger"
                                onClick={
                                    () => {
                                        this.props.onChange(
                                            this.props.actions.removeLayer({
                                                id: layer.id
                                            })
                                        );
                                    }
                                }
                            >
                                Удалить
                            </Button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Widget;