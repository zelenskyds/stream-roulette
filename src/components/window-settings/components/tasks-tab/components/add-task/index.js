import React, { Component, Fragment } from 'react';
import { Button, Card, Dropdown, Icon, Input } from 'antd';
import RarityMenu from "../rarity-menu";
import rarityRus from '../rarity';

import './styles.css';


class AddTask extends Component {
    state = {
        isEditing: false,
        rarity: "bronze",
        text: ""
    };

    setEditing = () => {
        this.setState({
            isEditing: true
        })
    };

    handleChangeRarity = ({ key }) => {
        this.setState({
            rarity: key
        })
    };

    handleCancel = () => {
        this.setState({
            isEditing: false,
            rarity: "bronze",
            text: ""
        })
    };

    handleSave = () => {
        this.handleCancel();
        this.props.onSave({
            rarity: this.state.rarity,
            text: this.state.text
        });
    };

    handleChangeText = ({ target: { value } }) => {
        this.setState({
            text: value
        })
    };

    render() {
        if(this.state.isEditing) {
            return (
                <Card
                    style={{
                        width: '45%',
                        height: 165
                    }}
                    actions={[
                        <Icon onClick={this.handleSave} type="save" />,
                        <Icon onClick={this.handleCancel} type="delete" />
                    ]}
                >
                    <Fragment>
                        <div>
                            <Input.TextArea
                                value={ this.state.text }
                                onChange={ this.handleChangeText }
                            />
                        </div>
                        <Dropdown
                            trigger={['click']}
                            overlay={
                                <RarityMenu
                                    choosen={"bronze"}
                                    onChange={ this.handleChangeRarity }
                                />
                            }
                        >
                            <a className="rarity-chooser">{rarityRus[this.state.rarity]}<Icon type="caret-down"/></a>
                        </Dropdown>
                    </Fragment>
                </Card>
            )
        }

        return (
            <Button
                style={{
                    width: "45%",
                    height: 165
                }}
                htmlType="button"
                type="dashed"
                onClick={this.setEditing}
            >
                <Icon type={'plus'} />
                <div>Добавить задание</div>
            </Button>
        );
    }
}

export default AddTask;