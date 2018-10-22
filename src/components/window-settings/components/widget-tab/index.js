import React, { Component } from 'react';
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
                                id={ widget.id }
                                layers={ widget.layers }

                                actions={ this.props.actions }
                                onChange={ this.props.onChange }
                                onUpdate={ this.props.onUpdate }
                            />
                        )
                    )
                }
            </TabContainer>
        );
    }
}

export default WidgetTab;