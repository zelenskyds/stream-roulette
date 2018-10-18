import React, { Component } from 'react';
import { Card, Icon } from 'antd';
import TabContainer from "../tab-container";
import Widget from "./components/widget";

import './styles.css';

class WidgetTab extends Component {
    render() {
        return (
            <TabContainer>
                {
                    this.props.widgets.map(
                        (widget) => (
                            <Widget
                                name={ widget.name }
                                color={ widget.color}
                                images={ this.props.images }
                                bg={ widget.bg }
                                width={ widget.width }
                                height={ widget.height }
                                key={ widget.id }
                                layers={ widget.layers }
                            />
                        )
                    )
                }
            </TabContainer>
        );
    }
}

export default WidgetTab;