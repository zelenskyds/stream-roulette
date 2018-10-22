import React, { Component } from 'react';
import { Tabs } from 'antd';
import MainTab from './components/main-tab';
import SettingsControls from "./components/settings-controls";
import ImageTab from "./components/image-tab";
import RouletteTab from "./components/roulette-tab";
import TasksTab from "./components/tasks-tab";
import deepmerge from 'deepmerge';
import SoundTab from "./components/sound-tab";
import WidgetTab from "./components/widget-tab";

import './styles.css';

const { TabPane } = Tabs;
const { ipcRenderer } = window.require('electron');

class WindowSettings extends Component {
    actions = {};
    state = {};

    handleAudioChange = ({ file }) => {
        if(file.status === "removed") {
            this.setState({
                soundList: [],
                settingChanged: true
            });
        } else {
            const path = "sound/" + file.name;
            ipcRenderer.send('copy-file', {
                path: file.path,
                name: path,
                type: "sound"
            });

            this.setState({
                soundList: [{
                    uid: "1",
                    name: file.name,
                    url: path
                }],
                settingChanged: true
            });
        }
    };

    handleChange = (action) => {
        this.props.dispatch({
            ...action,
            meta: {
                ...action.meta,
                save: true
            }
        });
    };

    handleUpdate = (action) => {
        if(this.actions[action.type]) {
            this.actions[action.type] = {
                type: action.type,
                payload: deepmerge(this.actions[action.type].payload, action.payload)
            };
        } else {
            this.actions[action.type] = action;
        }

        this.setState({
            settingChanged: true,
        });
    };

    handleSave = () => {
        const actionArray = Object.values(this.actions);
        const lastIndex = actionArray.length - 1;
        let currentIndex = 0;

        for(const action of actionArray) {
            if(currentIndex !== lastIndex) {
                this.props.dispatch(action);
            } else {
                this.props.dispatch({
                    ...action,
                    meta: {
                        save: true
                    }
                });
            }
            currentIndex++;
        }

        this.setState({
            settingChanged: false
        })
    };

    render() {
        return (
            <div className="window-settings">
                <div className="tabs-container">
                    <Tabs
                        defaultActiveKey="main"
                        tabPosition="left"
                    >
                        <TabPane tab="Общее" key="main">
                            <MainTab
                                actions={ this.props.actions }
                                onChange={ this.handleUpdate }

                                donationAlert={ this.props.tokens.donationAlert }
                                donatePay={ this.props.tokens.donatePay }

                                goldChance={ this.props.spinChances.gold }
                                silverChance={ this.props.spinChances.silver }

                                startAmountForSpin={ this.props.money.startAmountForSpin }
                                amountFunction={ this.props.money.func }
                                amountFunctionA={ this.props.money.funcA }

                                discountChance={ this.props.discount.chance }
                                discountTime={ this.props.discount.time }
                                discountDuration={ this.props.discount.duration }

                                allowRepeat={ this.props.repeats.allow }
                            />
                        </TabPane>
                        <TabPane tab="Изображения" key="image">
                            <ImageTab
                                actions={ this.props.actions }
                                onChange={ this.handleChange }
                                images={ this.props.assets.images }
                            />
                        </TabPane>
                        <TabPane tab="Звуки" key="sound">
                            <SoundTab
                                actions={ this.props.actions }
                                onChange={ this.handleChange }
                                sounds={ this.props.assets.sounds }
                            />
                        </TabPane>
                        <TabPane tab="Рулетка" key="roulette">
                            <RouletteTab
                                actions={ this.props.actions }
                                onChange={ this.handleUpdate }

                                images={ this.props.assets.images }
                                rouletteImages={ this.props.windows.roulette.images }

                                color={ this.props.windows.roulette.color }
                                colorBronze={ this.props.windows.roulette.colorBronze }
                                colorSilver={ this.props.windows.roulette.colorSilver }
                                colorGold={ this.props.windows.roulette.colorGold }

                                rouletteWindowWidth={ this.props.windows.roulette.width }
                                rouletteWindowHeight={ this.props.windows.roulette.height }
                                rouletteWindowPaddingTop={ this.props.windows.roulette.paddingTop }
                                rouletteWindowPaddingRight={ this.props.windows.roulette.paddingRight }
                                rouletteWindowPaddingBottom={ this.props.windows.roulette.paddingBottom }
                                rouletteWindowPaddingLeft={ this.props.windows.roulette.paddingLeft }

                                cardWidth={ this.props.windows.roulette.cardWidth }
                                cardHeight={ this.props.windows.roulette.cardHeight }

                                sounds={ this.props.assets.sounds }
                                spinSound={ this.props.windows.roulette.sound.spin }
                            />
                        </TabPane>
                        <TabPane tab="Виджеты" key="widgets">
                            <WidgetTab
                                widgets={ this.props.windows.widgets }
                                images={ this.props.assets.images }

                                actions={ this.props.actions }
                                onChange={ this.handleChange }
                                onUpdate={ this.handleUpdate }
                            />
                        </TabPane>
                        <TabPane tab="Задания" key="tasks">
                            <TasksTab
                                tasks={ this.props.tasks }
                                actions={ this.props.actions }
                                onChange={ this.handleChange }
                            />
                        </TabPane>
                    </Tabs>
                </div>
                <SettingsControls
                    show={ true }
                    settingChanged={ this.state.settingChanged }
                    onSave={ this.handleSave }
                />
            </div>
        );
    }
}

export default WindowSettings;