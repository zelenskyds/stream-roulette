import React, { Component } from 'react';
import cn from 'classnames';

import './styles.css';

class YesNoCheckbox extends Component {
    handleClick = () => {
        if(!this.props.onChange) {
            return;
        }

        if(this.props.value === null) {
            this.props.onChange(true)
        } else if (this.props.value === true) {
            this.props.onChange(false)
        } else if (this.props.value === false) {
            this.props.onChange(null)
        }
    };

    render() {
        return (
            <label
                className="yes-no-checkbox"
                onClick={ this.handleClick }
            >
                <span
                    className={cn("yes-no-checkbox-box", {
                        "state-null":  this.props.value === null,
                        "state-true":  this.props.value === true,
                        "state-false":  this.props.value === false,
                    })}
                />
                { this.props.label }
            </label>

        );
    }
}

export default YesNoCheckbox;