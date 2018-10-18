import React, { Component } from 'react';
import { Input, InputNumber, Menu, Icon } from 'antd';
import './styles.css';
import ImagePicker from "../../../roulette-tab/components/image-picker";
import ColorPicker from "../../../roulette-tab/components/color-picker";
import { getImageById } from "../../../../../../store/helpers/relations";
import YesNoCheckbox from "../yes-no-checkbox";

class Widget extends Component {
    state = {
        current: "1",
        q: null
    };

    handleChangeMenu = ({key}) => {
        this.setState({ current: key })
    };

    render() {
        return (
            <div className="widget-settings">
                <div className="widget-settings-title">
                    { this.props.name }
                </div>
                <div className="widget-settings-line">
                    Ширина&nbsp;<InputNumber defaultValue={ this.props.width }/>&emsp;
                    Высота&nbsp;<InputNumber defaultValue={ this.props.height }/>&emsp;
                    Фон&nbsp;<ImagePicker
                        value={ getImageById(this.props.bg) }
                        images={ this.props.images }
                    />&emsp;
                    Цвет&nbsp;<ColorPicker
                        color={ this.props.color }
                        left
                    />
                </div>
                {/*<div className="widget-settings-line">*/}
                    {/*<ImagePicker*/}
                        {/*value={ getImageById(this.props.bg) }*/}
                        {/*images={ this.props.images }*/}
                    {/*/> &nbsp;Фон&emsp;*/}
                    {/*<ColorPicker*/}
                        {/*color={ this.props.color }*/}
                        {/*left*/}
                    {/*/> &nbsp;Цвет*/}
                {/*</div>*/}

                <Menu
                    onClick={this.handleChangeMenu}
                    selectedKeys={[this.state.current]}
                    mode="horizontal"
                    className="widget-settings-layers-picker"
                >
                    {
                        this.props.layers.map(
                            ({id, text}, index) => (
                                <Menu.Item key={id} className="widget-settings-layer">
                                    Слой { index + 1 }
                                </Menu.Item>
                            )
                        )
                    }
                    <Menu.Item key="add">
                        +
                    </Menu.Item>
                </Menu>

                <div className="widget-settings-conditions">
                    <YesNoCheckbox
                        onChange={(v)=>this.setState({q:v})}
                        label={"Рулетка крутится"}
                        value={this.state.q}
                    />
                </div>
                <div className="widget-settings-text">

                </div>

            </div>
        );
    }
}

export default Widget;