import React from 'react';
import { Checkbox, Input, InputNumber, Select } from 'antd';
import TabContainer from "../tab-container";

import './styles.css';

const Option = Select.Option;

const MainTab = (props) => (
    <TabContainer width="65%">
        <div className="group">
            <b>Токены</b>
            <Input
                defaultValue={ props.donationAlert }
                onChange={
                    ({ target: { value } }) => props.onChange( props.actions.updateToken( {
                        donationAlert: value
                    } ) )
                }
                addonBefore="Donation Alerts"
                placeholder="Токен"
                type="password"
            />
            <Input
                defaultValue={ props.donatePay }
                onChange={
                    ({ target: { value } }) => props.onChange( props.actions.updateToken( {
                        donatePay: value
                    } ) )
                }
                addonBefore="Donate Pay"
                placeholder="Токен"
                type="password"
            />
        </div>

        <div className="group">
            <b>Шансы выпадения</b>
            <div>
                Золота &nbsp;
                <InputNumber
                    defaultValue={ props.goldChance }
                    onChange={
                        (value) => props.onChange( props.actions.updateSpinChances( {
                            gold: value
                        } ) )
                    }
                    addonBefore="Шанс золота"
                    addonAfter="%"
                    placeholder="От 0.1 до 10"
                    formatter={ value => `${value}%` }
                    parser={ value => value.replace( '%', '' ) }
                    step={ 0.1 }
                    min={ 0.1 }
                    max={ 10 }
                    required
                />
            </div>
            <div>
                Серебра &nbsp;
                <InputNumber
                    defaultValue={ props.silverChance }
                    onChange={
                        (value) => props.onChange( props.actions.updateSpinChances( {
                            silver: value
                        } ) )
                    }
                    placeholder="От 1 до 25"
                    formatter={ value => `${value}%` }
                    parser={ value => value.replace( '%', '' ) }
                    min={ 1 }
                    max={ 25 }
                />
            </div>
        </div>

        <div className="group">
            <b>Настройки суммы для запуска рулетки</b>
            <div>
                Начать с &nbsp;
                <InputNumber
                    defaultValue={ props.startAmountForSpin }
                    onChange={
                        (value) => props.onChange( props.actions.updateMoney( {
                            startAmountForSpin: value
                        } ) )
                    }
                    formatter={ value => `${value}₽` }
                    parser={ value => value.replace( '₽', '' ) }
                    min={ 1 }
                />
            </div>
            <div className="main-tab-line">
                <span className="main-tab-line-label">После вращения &nbsp;</span>
                <Input
                    defaultValue={ props.amountFunctionA }
                    onChange={
                        ({ target: { value } }) => props.onChange( props.actions.updateMoney( {
                            funcA: value
                        } ) )
                    }
                    addonBefore={
                        <Select
                            defaultValue={ props.amountFunction }
                            onChange={
                                (value) => props.onChange( props.actions.updateMoney( {
                                    func: value
                                } ) )
                            }
                        >
                            <Option value="multiply">умножить в</Option>
                            <Option value="add">прибавить</Option>
                        </Select>
                    }
                    type="number"
                />
            </div>
        </div>

        <div className="group">
            <b>Скидка</b>
            <div>
                Шанс &nbsp;
                <InputNumber
                    defaultValue={ props.discountChance }
                    onChange={
                        (value) => props.onChange( props.actions.updateDiscount( {
                            chance: value
                        } ) )
                    }
                    formatter={ value => `${value}%` }
                    parser={ value => value.replace( '%', '' ) }
                    min={ 1 }
                />
            </div>
            <div>
                Раз в &nbsp;
                <InputNumber
                    defaultValue={ props.discountTime }
                    onChange={
                        (value) => props.onChange( props.actions.updateDiscount( {
                            time: value
                        } ) )
                    }
                    min={ 1 }
                />&nbsp; мин.
            </div>
            <div>
                Продолжительность &nbsp;
                <InputNumber
                    defaultValue={ props.discountDuration }
                    onChange={
                        (value) => props.onChange( props.actions.updateDiscount( {
                            duration: value
                        } ) )
                    }
                    min={ 1 }
                />&nbsp; мин.
            </div>
        </div>

        <div className="group">
            <b>Другое</b>
            <div className="main-tab-line">
                <Checkbox
                    defaultChecked={ props.allowRepeat }
                    onChange={
                        ({ target: { checked } }) => props.onChange( props.actions.updateRepeats( {
                            allow: checked
                        } ) )
                    }
                >
                    Разрешить заданиям выпадать подряд
                </Checkbox>
            </div>
        </div>
    </TabContainer>
);


export default MainTab;