import React, { Component } from 'react';

import io from 'socket.io-client';
import './styles.css';
import UserSpinResults from "./components/user-spin-results";
import Controls from "./components/controls";
import random from "../../services/random";
import DonatePay from "../../services/donatepay-api";

const { ipcRenderer } = window.require('electron');

class WindowControls extends Component {
    isDiscount = false;
    spinning = null;
    amount = 0;
    discountSumEarned = 0;
    discountInterval = null;
    discountTime = +localStorage.getItem("discountTime") || 15;
    discountDuration = +localStorage.getItem("discountDuration") || 1;
    discountChance = +localStorage.getItem("discountChance");
    amountForSpin = +localStorage.getItem("startAmountForSpin") || 300;
    amountFunction = localStorage.getItem("amountFunction") || "add";
    amountFunctionA = +localStorage.getItem("amountFunctionA") || 100;
    rouletteWindowWidth = +localStorage.getItem("rouletteWindowWidth") || 930;

    state = {
        isRouletteShow: false,
        isRouletteSpinning: false,
        results: []
    };

    constructor(...args) {
        super(...args);

        this.initDonationSystems();
        this.initSettings();
    }

    initSettings() {
        if(localStorage.getItem("isSettingInstalled") === "true") {
            return null;
        }

        localStorage.setItem("donationToken", "");
        localStorage.setItem("donatePayToken", "");
        localStorage.setItem("bgPath", "");
        localStorage.setItem("bgScorePath", "");
        localStorage.setItem("framePath", "");
        localStorage.setItem("bronzePath", "img/bronze.jpg");
        localStorage.setItem("silverPath", "img/silver.jpg");
        localStorage.setItem("goldPath", "img/gold.jpg");
        localStorage.setItem("silverChance", "10");
        localStorage.setItem("goldChance", "1");
        localStorage.setItem('tasks', "[]");
        localStorage.setItem("amountFunction", "add");
        localStorage.setItem("amountFunctionA", "100");
        localStorage.setItem("startAmountForSpin", "300");
        localStorage.setItem("allowRepeat", "false");
        localStorage.setItem("discountTime", "15");
        localStorage.setItem("discountDuration", "1");
        localStorage.setItem("discountChance", "50");
        localStorage.setItem("rouletteWindowWidth", "930");
        localStorage.setItem("soundPath", "sound/spinning.mp3");
        localStorage.setItem("soundName", "spinning.mp3");

        localStorage.setItem("isSettingInstalled", "true");
    }

    componentDidMount() {
        ipcRenderer.on('roulette-opened', () => {
            this.setState({
                isRouletteShow: true
            });
        });

        ipcRenderer.on('roulette-closed', () => {
            this.setState({
                isRouletteShow: false
            });
        });

        ipcRenderer.on('roulette-spinned', (event, message) => {
            this.resolve && this.resolve(message);
        });

        ipcRenderer.on('settings-changed', (event, message) => {
            if(message.donationToken) {
                this.initDonationAlert(message.donationToken);
            }

            if(message.donatePayToken) {
                this.initDonatePay(message.donatePayToken);
            }

            if(message.amountFunction) {
                this.amountFunction = localStorage.getItem("amountFunction");
            }

            if(message.amountFunctionA) {
                this.amountFunctionA = +localStorage.getItem("amountFunctionA");
            }

            if(this.discountTime || this.discountChance !== undefined || this.discountDuration) {
                clearInterval(this.discountInterval);

                this.discountTime = +localStorage.getItem("discountTime");
                this.discountDuration = +localStorage.getItem("discountDuration");
                this.discountChance = +localStorage.getItem("discountChance");

                this.discountInterval = setInterval(
                    () => this.makeDiscount(),
                    this.discountTime * 60000
                );
            }

            if(message.rouletteWindowWidth) {
                this.rouletteWindowWidth = +message.rouletteWindowWidth;
            }
        });

        this.discountInterval = setInterval(
            () => this.makeDiscount(),
            this.discountTime * 60000
        );
    }

    makeDiscount() {
        this.isDiscount = random(1, 100) <= (this.discountChance >= 0? this.discountChance: 50);

        if(!this.isDiscount) {
            return;
        }

        setTimeout(
            () => {
                if(this.isDiscount) {
                    this.isDiscount = false;
                    this.amount += this.discountSumEarned;
                    ipcRenderer.send("donate", { amount: this.amountForSpin - this.amount, discount: false });
                }
            },
            this.discountDuration * 60000
        );

        ipcRenderer.send("donate", { amount: Math.ceil((this.amountForSpin - this.amount) / 2), discount: true });
    }

    calculateNewAmountForSpin() {
        switch (this.amountFunction) {
            case "add":
                return this.amountForSpin + this.amountFunctionA;
            case "multiply":
                return Math.ceil(this.amountForSpin * this.amountFunctionA);
            default:
                return this.amountForSpin;
        }
    }

    handleDonate = async (message) => {
        if(!this.state.isRouletteShow) {
            return;
        }

        if( this.isDiscount ) {
            const mod = (this.amountForSpin - this.amount) / 2 - this.discountSumEarned;
            if( message.amount < mod ) {
                this.discountSumEarned += message.amount;
                ipcRenderer.send("donate", { amount: (this.amountForSpin - this.amount) / 2 - this.discountSumEarned, discount: true });
                return;
            } else {
                this.amount += this.discountSumEarned;
                this.discountSumEarned = 0;
            }
        } else if( (this.amount + message.amount) < this.amountForSpin  ) {
            this.amount += message.amount;
            ipcRenderer.send("donate", { amount: this.amountForSpin - this.amount, discount: false });
            return;
        }

        this.amount = 0;
        this.amountForSpin = this.calculateNewAmountForSpin();
        ipcRenderer.send("donate", { amount: this.amountForSpin, discount: false });

        if(this.spinning) {
            await this.spinning;
        }

        this.spinRoulette(message);
    };

    initDonationAlert(token) {
        token = token || localStorage.getItem("donationToken");

        if(!token) {
            return
        }

        if(this.socket) {
            this.socket.disconnect();
        }

        this.socket = io("socket.donationalerts.ru:3001");
        this.socket.emit('add-user', {token, type: "minor"}); //SOopGRRQeEKk1F4pYH8x
        this.socket.on('donation', async (json) => {
            await this.handleDonate(JSON.parse(json));
        });
    }

    initDonatePay(token) {
        token = token || localStorage.getItem("donatePayToken");

        if(!token) {
            return
        }

        if(this.donatePay) {
            this.donatePay.clear();
        }

        this.donatePay = new DonatePay(token);

        this.donatePay.onDonate( this.handleDonate );
    }

    initDonationSystems() {
        this.initDonationAlert();
        this.initDonatePay();
    }

    spinRoulette = (message) => {
        this.setState({
            isRouletteSpinning: true
        });
        ipcRenderer.send('spin-roulette', { reason: message.reason || "donate" });
        return this.spinning = new Promise(
                (resolve)=> this.resolve = resolve
            )
            .then( (spinResult) => {
                this.spinning = null;
                this.resolve = null;
                this.setState({
                    isRouletteSpinning: false
                });

                if(spinResult.status === "error") {
                    return;
                }

                this.setState({
                    results: [
                        ...this.state.results,
                        { username: message.username, spinResult: spinResult.text, time: new Date() }
                    ]
                })
            });
    };

    render() {
        return (
            <div className="app-controls">
                <UserSpinResults results={ this.state.results }/>
                <Controls
                    isSpinning={ this.state.isRouletteSpinning }
                    isRouletteShow={this.state.isRouletteShow}
                    onRunClick={ () => ipcRenderer.send('open-roulette', {
                        amount: Math.ceil((this.amountForSpin - this.amount) / (this.isDiscount? 2: 1)),
                        discount: this.isDiscount,
                        width: this.rouletteWindowWidth
                    }) }
                    onCloseClick={ () => ipcRenderer.send('close-roulette') }
                    onSpinClick={ () => this.spinRoulette({ username: 'стример', reason: 'button-clicked' }) }
                    onSettingClick={ () => ipcRenderer.send('open-settings') }
                />
            </div>
        );
    }
}

export default WindowControls;
