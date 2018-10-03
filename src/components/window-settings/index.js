import React, { Component } from 'react';
import { Tabs, Upload, Button, Icon } from 'antd';
import MainTab from './components/main-tab';
import SettingsControls from "./components/settings-controls";
import './styles.css';
import PreferencesTab from "./components/preferences-tab";
import TasksTab from "./components/tasks-tab";

const TabPane = Tabs.TabPane;
const { ipcRenderer } = window.require('electron');

class WindowSettings extends Component {
    constructor(props) {
        super( props );

        const soundPath = localStorage.getItem("soundPath");
        const soundName = localStorage.getItem("soundName");

        this.state = {
            donationToken: localStorage.getItem("donationToken"),
            donatePayToken: localStorage.getItem("donatePayToken"),
            bgPath: localStorage.getItem("bgPath"),
            bgScorePath: localStorage.getItem("bgScorePath"),
            framePath: localStorage.getItem("framePath"),
            bronzePath: localStorage.getItem("bronzePath"),
            silverPath: localStorage.getItem("silverPath"),
            goldPath: localStorage.getItem("goldPath"),
            silverChance: localStorage.getItem("silverChance"),
            goldChance: localStorage.getItem("goldChance"),
            tasks: JSON.parse(localStorage.getItem('tasks')),
            amountFunction: localStorage.getItem("amountFunction"),
            amountFunctionA: localStorage.getItem("amountFunctionA"),
            startAmountForSpin: localStorage.getItem("startAmountForSpin"),
            allowRepeat: localStorage.getItem("allowRepeat") === "true",
            discountTime: localStorage.getItem("discountTime"),
            discountDuration: localStorage.getItem("discountDuration"),
            discountChance: localStorage.getItem("discountChance"),
            rouletteWindowWidth: +localStorage.getItem("rouletteWindowWidth"),
            soundList: soundPath? [{
                uid: '1',
                name: soundName,
                url: soundPath,
            }]: [],
            settingChanged: false,
        };
    }

    handleSave = () => {
        localStorage.setItem("donationToken", this.state.donationToken);
        localStorage.setItem("donatePayToken", this.state.donatePayToken);
        localStorage.setItem("bgPath", this.state.bgPath);
        localStorage.setItem("bgScorePath", this.state.bgScorePath);
        localStorage.setItem("framePath", this.state.framePath);
        localStorage.setItem("bronzePath", this.state.bronzePath);
        localStorage.setItem("silverPath", this.state.silverPath);
        localStorage.setItem("goldPath", this.state.goldPath);
        localStorage.setItem("silverChance", this.state.silverChance);
        localStorage.setItem("goldChance", this.state.goldChance);
        localStorage.setItem("tasks", JSON.stringify(this.state.tasks));
        localStorage.setItem("amountFunction", this.state.amountFunction);
        localStorage.setItem("amountFunctionA", this.state.amountFunctionA);
        localStorage.setItem("startAmountForSpin", this.state.startAmountForSpin);
        localStorage.setItem("allowRepeat", this.state.allowRepeat);
        localStorage.setItem("discountTime", this.state.discountTime);
        localStorage.setItem("discountDuration", this.state.discountDuration);
        localStorage.setItem("discountChance", this.state.discountChance);
        localStorage.setItem("rouletteWindowWidth", this.state.rouletteWindowWidth);

        localStorage.setItem("soundPath", this.state.soundList.length === 1? this.state.soundList[0].url: "");
        localStorage.setItem("soundName", this.state.soundList.length === 1? this.state.soundList[0].name: "");

        const newSettings = { ...this.state };
        delete newSettings.settingChanged;

        ipcRenderer.send('settings-changed', newSettings);

        this.setState({
            settingChanged: false
        })
    };

    handleDonationTokenChange = ({ target: { value } }) => {
        this.setState({
            donationToken: value,
            settingChanged: true
        })
    };

    handleSilverChanceChange = (value) => {
        this.setState({
            silverChance: value,
            settingChanged: true
        })
    };

    handleGoldChanceChange = (value) => {
        this.setState({
            goldChance: value,
            settingChanged: true
        })
    };

    handleChangePreferences = (changes) => {
        this.setState({
            ...changes,
            settingChanged: true
        });
    };

    handleSaveTask = (task) => {
        this.setState({
            tasks: [...this.state.tasks, { ...task, id: Date.now() }],
            settingChanged: true
        });
    };

    handleDeleteTask = (id) => {
        const index = this.state.tasks.findIndex( t => t.id === id );
        const tasks = [...this.state.tasks];
        tasks.splice(index, 1);
        this.setState({
            tasks,
            settingChanged: true
        });
    };

    handleChangeAmountFunction = ({ amountFunction, amountFunctionA }) => {
        const changes = {
            settingChanged: true
        };

        if(amountFunction) {
            changes.amountFunction = amountFunction;
        }

        if(amountFunctionA !== undefined) {
            changes.amountFunctionA = amountFunctionA;
        }

        this.setState(changes);
    };

    handleStartAmountForSpinChange = (value) => {
        this.setState({
            startAmountForSpin: value,
            settingChanged: true
        });
    };

    handleAllowRepeatChange = ({ target: { checked } }) => {
        this.setState({
            allowRepeat: checked,
            settingChanged: true
        })
    };

    handleDiscountChange = (discountChanges) => {
        this.setState({
            ...discountChanges,
            settingChanged: true
        })
    };

    handleRouletteWindowWidthChange = (width) => {
        this.setState({
            rouletteWindowWidth: width,
            settingChanged: true
        })
    };

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

    handleDonatePayTokenChange = ({ target: { value } }) => {
        this.setState({
            donatePayToken: value,
            settingChanged: true
        })
    };

    render() {
        return (
            <div className="window-settings">
                <div className="tabs-container">
                    <Tabs defaultActiveKey="main" size="small">
                        <TabPane tab="Общее" key="main">
                            <MainTab
                                amountFunction={ this.state.amountFunction }
                                amountFunctionA={ this.state.amountFunctionA }
                                startAmountForSpin={ this.state.startAmountForSpin }
                                onStartAmountForSpinChange={ this.handleStartAmountForSpinChange }
                                onChangeAmountFunction={ this.handleChangeAmountFunction }
                                donationToken={ this.state.donationToken }
                                onDonationTokenChange={ this.handleDonationTokenChange }
                                silverChance={ this.state.silverChance }
                                goldChance={ this.state.goldChance }
                                onSilverChanceChange={ this.handleSilverChanceChange }
                                onGoldChanceChange={ this.handleGoldChanceChange }
                                onAllowRepeatChange={ this.handleAllowRepeatChange }
                                allowRepeat={ this.state.allowRepeat }
                                onDiscountChange={ this.handleDiscountChange }
                                discountTime={ this.state.discountTime }
                                discountDuration={ this.state.discountDuration }
                                discountChance={ this.state.discountChance }
                                rouletteWindowWidth={ this.state.rouletteWindowWidth }
                                onRouletteWindowWidthChange={ this.handleRouletteWindowWidthChange }
                                donatePayToken={ this.state.donatePayToken }
                                onDonatePayTokenChange={ this.handleDonatePayTokenChange }
                            />
                        </TabPane>
                        <TabPane tab="Вид" key="preferences">
                            <PreferencesTab
                                bgPath={ this.state.bgPath }
                                bgScorePath={ this.state.bgScorePath }
                                framePath={ this.state.framePath }
                                bronzePath={ this.state.bronzePath }
                                silverPath={ this.state.silverPath }
                                goldPath={ this.state.goldPath }
                                onChange={ this.handleChangePreferences }
                            />
                        </TabPane>
                        <TabPane tab="Звуки" key="sound">
                            <Upload
                                fileList={this.state.soundList}
                                onChange={this.handleAudioChange}
                                beforeUpload={()=>false}>
                                <Button>
                                    <Icon type="caret-right" /> Выбрать звук прокрутки
                                </Button>
                            </Upload>
                        </TabPane>
                        <TabPane tab="Задания" key="tasks">
                            <TasksTab
                                tasks={ this.state.tasks }
                                addTask={ this.handleSaveTask }
                                deleteTask={ this.handleDeleteTask }
                            />
                        </TabPane>
                    </Tabs>
                </div>
                <SettingsControls
                    settingChanged={ this.state.settingChanged }
                    onSave={ this.handleSave }
                />
            </div>
        );
    }
}

export default WindowSettings;