import React, { Component } from 'react';
import { Input, InputNumber, Select, Checkbox } from 'antd';
import { Scrollbars } from 'react-custom-scrollbars';

import './styles.css';

const Option = Select.Option;


class MainTab extends Component {
    handleChangeAmountFunction = (key) => {
        this.props.onChangeAmountFunction({ amountFunction: key })
    };

    handleChangeAmountFunctionA = ({ target: { value } }) => {
        this.props.onChangeAmountFunction({ amountFunctionA: value })
    };

    render() {
        return (
            <div className="main-tab">
                <Scrollbars universal>
                    <div className="main-tab-container">
                        <b>Токены</b>
                        <Input
                            value={ this.props.donationToken }
                            onChange={ this.props.onDonationTokenChange }
                            addonBefore="Donation Alerts"
                            placeholder="Токен"
                            type="password"
                        />

                        <b>Шансы выпадения</b>
                        <div>
                            Золота &nbsp;
                            <InputNumber
                                value={ this.props.goldChance }
                                onChange={ this.props.onGoldChanceChange }
                                addonBefore="Шанс золота"
                                addonAfter="%"
                                placeholder="От 0.1 до 10"
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                                step={0.1}
                                min={0.1}
                                max={10}
                                required
                            />
                        </div>
                        <div>
                            Серебра &nbsp;
                            <InputNumber
                                value={ this.props.silverChance }
                                onChange={ this.props.onSilverChanceChange }
                                placeholder="От 1 до 25"
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                                min={1}
                                max={25}
                            />
                        </div>

                        <b>Настройки суммы для запуска рулетки</b>
                        <div>
                            Начать с &nbsp;
                            <InputNumber
                                value={ this.props.startAmountForSpin }
                                onChange={ this.props.onStartAmountForSpinChange }
                                formatter={value => `${value}₽`}
                                parser={value => value.replace('₽', '')}
                                min={1}
                            />
                        </div>
                        <div className="main-tab-line">
                            <span className="main-tab-line-label">После вращения &nbsp;</span>
                            <Input
                                value={ this.props.amountFunctionA }
                                onChange={ this.handleChangeAmountFunctionA }
                                addonBefore={
                                    <Select defaultValue={ this.props.amountFunction } onChange={ this.handleChangeAmountFunction }>
                                        <Option value="multiply">умножить в</Option>
                                        <Option value="add">прибавить</Option>
                                    </Select>
                                }
                                type="number"
                            />
                        </div>

                        <b>Скидка</b>
                        <div>
                            Шанс &nbsp;
                            <InputNumber
                                value={ this.props.discountChance }
                                onChange={ (value) => this.props.onDiscountChange({ discountChance: value }) }
                                formatter={value => `${value}%`}
                                parser={value => value.replace('%', '')}
                                min={1}
                            />
                        </div>
                        <div>
                            Раз в &nbsp;
                            <InputNumber
                                value={ this.props.discountTime }
                                onChange={ (value) => this.props.onDiscountChange({ discountTime: value }) }
                                min={1}
                            />&nbsp; мин.
                        </div>
                        <div>
                            Продолжительность &nbsp;
                            <InputNumber
                                value={ this.props.discountDuration }
                                onChange={ (value) => this.props.onDiscountChange({ discountDuration: value }) }
                                min={1}
                            />&nbsp; мин.
                        </div>

                        <b>Другое</b>
                        <div className="main-tab-line">
                            <Checkbox
                                checked={ this.props.allowRepeat }
                                onChange={ this.props.onAllowRepeatChange }
                            >
                                Разрешить заданиям выпадать подряд
                            </Checkbox>
                        </div>
                        <div className="main-tab-line">
                            Ширина окна рулетки &nbsp;
                            <InputNumber
                                value={ this.props.rouletteWindowWidth }
                                onChange={ this.props.onRouletteWindowWidthChange }
                                min={250}
                            />&nbsp; пикселей.
                        </div>
                        Нужно переоткрыть окно рулетки, при изменении его ширины!
                    </div>
                </Scrollbars>
            </div>
        );
    }
}

export default MainTab;