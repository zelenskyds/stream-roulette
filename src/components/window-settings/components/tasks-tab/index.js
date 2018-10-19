import React, { Component } from 'react';
import AddTask from "./components/add-task";
import TabContainer from "../tab-container";
import CardTask from "./components/card-task";

import './styles.css';

class TasksTab extends Component {
    handleSave = (task) => {
        this.props.onChange(this.props.actions.addTask(task));
    };

    handleUpdate = (task) => {
        this.props.onChange(this.props.actions.updateTask(task));
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
                                <CardTask
                                    onSave={ this.handleUpdate }
                                    onDelete={ this.handleDelete(task.id) }
                                    key={task.id}
                                    task={task}
                                />
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