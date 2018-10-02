import React, { Component } from 'react';

import Roulette from './roulette';
import './styles.css';

const { ipcRenderer } = window.require('electron');

class WindowRoulette extends Component {

    constructor(...args) {
        super(...args);

        this.state = {
            bgPath: localStorage.getItem("bgPath"),
            framePath: localStorage.getItem("framePath"),
            bronzePath: localStorage.getItem("bronzePath"),
            silverPath: localStorage.getItem("silverPath"),
            goldPath: localStorage.getItem("goldPath"),
            silverChance: +localStorage.getItem("silverChance"),
            goldChance: +localStorage.getItem("goldChance"),
            tasks: JSON.parse(localStorage.getItem('tasks')),
            allowRepeat: localStorage.getItem("allowRepeat") === "true",
            soundPath: localStorage.getItem("soundPath")
        };
    }

    componentDidMount() {
        ipcRenderer.on("spin-roulette", async (event) => {
            const result = await this.spinRoulette();
            event.sender.send("roulette-spinned", result);
        });

        ipcRenderer.on("settings-changed", async () => {
            this.clearError();
            this.setState({
                bgPath: localStorage.getItem("bgPath"),
                framePath: localStorage.getItem("framePath"),
                bronzePath: localStorage.getItem("bronzePath"),
                silverPath: localStorage.getItem("silverPath"),
                goldPath: localStorage.getItem("goldPath"),
                silverChance: localStorage.getItem("silverChance"),
                goldChance: localStorage.getItem("goldChance"),
                tasks: JSON.parse(localStorage.getItem('tasks') || "[]"),
                allowRepeat: localStorage.getItem("allowRepeat") === "true",
                soundPath: localStorage.getItem("soundPath") || ""
            });
        });
    }

    render() {
        return (
            <div className="app-roulette">
                <Roulette
                    getSpin={ (f) => this.spinRoulette = f }
                    getClearError={ (f) => this.clearError = f }
                    showingTime={5}
                    speed={5}
                    variants={this.state.tasks}
                    silverChance={this.state.silverChance}
                    goldChance={this.state.goldChance}
                    allowRepeat={this.state.allowRepeat}
                    soundPath={this.state.soundPath}
                    bgPaths={{
                        bg: this.state.bgPath,
                        frame: this.state.framePath,
                        bronze: this.state.bronzePath,
                        silver: this.state.silverPath,
                        gold: this.state.goldPath,
                    }}
                />
            </div>
        );
    }
}

export default WindowRoulette;
