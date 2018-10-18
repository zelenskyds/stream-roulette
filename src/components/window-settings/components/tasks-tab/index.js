import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import AddTask from "./components/add-task";
import rarityRus from './components/rarity';
import TabContainer from "../tab-container";
import './styles.css';

class TasksTab extends Component {

    handleSave = (task) => {
        this.props.onChange(this.props.actions.addTask(task));
    };

    handleDelete(id) {
        return () => this.props.onChange(this.props.actions.removeTask({ id }));
    }

    render() {
        return (
            <TabContainer>
                <div className="tasks-tab-card-container">
                    {
                        this.props.tasks.map(
                            task => (
                                <Card
                                    key={task.id}
                                    style={{
                                        width: '30%',
                                        height: 165
                                    }}
                                    actions={[
                                        //<Icon onClick={this.handleSave} type="edit" />,
                                        <Icon onClick={this.handleDelete(task.id)} type="delete" />
                                    ]}
                                >
                                    <div className="task-card-container">
                                        <div>
                                            {task.text}
                                        </div>
                                        <a className="rarity-chooser">{rarityRus[task.rarity]}</a>
                                    </div>
                                </Card>
                            )
                        )
                    }
                    <AddTask onSave={ this.handleSave }/>
                </div>
            </TabContainer>
        );
    }
}

export default TasksTab;