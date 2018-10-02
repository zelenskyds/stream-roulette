import React, { Component, Fragment } from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import "./styles.css";

moment.locale("ru");

class UserSpinResults extends Component {
    constructor(props) {
        super( props );
        this.updater = setInterval(
            () => this.forceUpdate(),
            30000
        );
    }

    componentWillUnmount() {
        clearInterval(this.updater);
    }

    render() {
        let { results } = this.props;

        if(results.length > 5) {
            results = results.slice(results.length - 5);
        }

        return (
            <div className="user-spin-result">
                {results.length !== 0?
                    <Fragment>
                        <div className="user-spin-result-title">
                            Последние результаты
                        </div>
                        <div className="line header">
                            <div className="time">Время</div>
                            <div className="username">Никнейм</div>
                            <div className="result">Что выпало</div>
                        </div>
                        {
                            results.map(
                                userInfo => (
                                    <div key={+userInfo.time} className="line">
                                        <div className="time">{ moment(userInfo.time).fromNow() }</div>
                                        <div className="username">{ userInfo.username }</div>
                                        <div className="result">{ userInfo.spinResult }</div>
                                    </div>
                                )
                            )
                        }
                    </Fragment>
                    :
                    <div className="user-spin-result-title">
                        Результатов пока нет
                    </div>
                }
            </div>
        );
    }
}

export default UserSpinResults;