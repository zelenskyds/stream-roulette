import React, { Component, Fragment } from 'react';
import './styles.css';

const { ipcRenderer } = window.require('electron');

class WindowScore extends Component {
    state = {
        amount: 0,
        discount: false,
        showDiscount: false,
        bgError: false,
        bgPath: localStorage.getItem("bgScorePath") || ""
    };

    interval = null;

    componentDidMount() {
        ipcRenderer.on('donate', (event, message) => {
            this.setState(message);

            if(message.discount && !this.interval) {
                this.setState({ showDiscount: true });
                this.interval = setInterval(
                    () => this.setState({ showDiscount: !this.state.showDiscount }),
                    2000
                )
            } else if(!message.discount && this.interval) {
                clearInterval(this.interval);
                this.setState({ showDiscount: false });
                this.interval = null;
            }
        });

        ipcRenderer.on("settings-changed", () => {
            this.setState({
                bgPath: localStorage.getItem("bgScorePath"),
                bgError: false
            });
        });
    }

    onBgError = () => {
        this.setState({
            bgError: true
        });
    };

    render() {
        return (
            <div className="window-score">
                {!this.state.bgError &&
                    <img
                        onError={this.onBgError}
                        className="window-score-bg"
                        src={this.state.bgPath}
                        alt="bg"
                    />
                }
                <span className="scoreboard">
                    {this.state.showDiscount?
                        <span>Скидка 50%</span>
                        :
                        <Fragment>
                            <span>О</span>
                            <span>с</span>
                            <span>т</span>
                            <span>а</span>
                            <span>л</span>
                            <span>о</span>
                            <span>с</span>
                            <span>ь</span>
                            <span>&nbsp;</span>
                            <span>{this.state.amount}</span>
                            <b>₽</b>
                        </Fragment>
                    }
                </span>
            </div>
        );
    }
}

export default WindowScore;