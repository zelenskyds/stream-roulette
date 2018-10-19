import React, { Component } from 'react';
import { Card, Icon } from "antd";
import rarityRus from "../rarity";
import AddTask from "../add-task";

class CardTask extends Component {
    state = {
        editing: false
    };

    render() {
        const { task, onDelete, onSave } = this.props;
        const { editing } = this.state;

        if (editing) {
            return <AddTask { ...task } isEditing={ editing } onClose={ () => this.setState({editing: false}) }
                            onSave={ onSave }/>
        }
        return (
            <Card
                style={ {
                    width: '30%',
                    height: 165
                } }
                actions={ [
                    <Icon onClick={ () => this.setState({editing: true}) } type="edit"/>,
                    <Icon onClick={ onDelete } type="delete"/>
                ] }
            >
                <div className="task-card-container">
                    <div>
                        { task.text }
                    </div>
                    <a className="rarity-chooser">{ rarityRus[ task.rarity ] }</a>
                </div>
            </Card>
        );
    }
}

export default CardTask;
