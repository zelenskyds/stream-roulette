import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import './styles.css';
import AddTask from "./components/add-task";
import rarityRus from './components/rarity';
import { Scrollbars } from 'react-custom-scrollbars';


class TasksTab extends Component {

    handleSave = (task) => {
        this.props.addTask(task);
    };

    handleDelete(id) {
        return () => this.props.deleteTask(id)
    }

    render() {
        return (
            <div className="tasks-tab">
                <Scrollbars universal>
                    <div className="tasks-tab-card-container">
                        {
                            this.props.tasks.map(
                                task => (
                                    <Card
                                        key={task.id}
                                        style={{
                                            width: '45%',
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
                </Scrollbars>
            </div>
        );
    }
}

export default TasksTab;