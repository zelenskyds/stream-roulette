import React, { Component, Fragment } from 'react';
import { Button, Card, Dropdown, Icon, Input } from 'antd';
import RarityMenu from "../rarity-menu";
import rarityRus from '../rarity';

import './styles.css';


class AddTask extends Component {
    constructor(props) {
        super( props );

        this.state = {
            isEditing: props.isEditing,
            rarity: props.rarity || "bronze",
            text: props.text || ""
        };
    }


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
        this.props.onClose? this.props.onClose(): this.handleCancel();
        this.props.onSave({
            id: this.props.id || Date.now(),
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
        let isEditing;
        if(this.props.isEditing !== undefined) {
            isEditing = this.props.isEditing;
        } else {
            isEditing = this.state.isEditing;
        }

        if(isEditing) {
            return (
                <Card
                    style={{
                        width: '30%',
                        height: 165
                    }}
                    actions={[
                        <Icon onClick={this.handleSave} type="save" />,
                        <Icon onClick={this.props.onClose || this.handleCancel} type="close" />
                    ]}
                >
                    <Fragment>
                        <div
                            className={"card-task-input"}
                        >
                            <Input.TextArea
                                value={ this.state.text }
                                onChange={ this.handleChangeText }
                            />
                        </div>
                        <Dropdown
                            trigger={['click']}
                            overlay={
                                <RarityMenu
                                    choosen={["bronze"]}
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
                    width: "30%",
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