import React from 'react';
import io from 'socket.io-client';
import './styles.css';
import UserSpinResults from "./components/user-spin-results";
import Controls from "./components/controls";
import random from "../../services/random";
import { spinRoulette } from "../../services/remote";
import DonatePay from "../../services/donatepay-api";
import { openWindow, closeWindow } from "../../services/window";
import Window from "../window";

class WindowControls extends Window {
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

    constructor(...args) {
        super(...args);

        this.initDonationSystems();
    }

    componentDidMount() {

        // this.discountInterval = setInterval(
        //     () => this.makeDiscount(),
        //     this.discountTime * 60000
        // );
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
                    // ipcRenderer.send("donate", { amount: this.amountForSpin - this.amount, discount: false });
                }
            },
            this.discountDuration * 60000
        );

        // ipcRenderer.send("donate", { amount: Math.ceil((this.amountForSpin - this.amount) / 2), discount: true });
    }

    calculateNewAmountForSpin() {
        switch (this.props.money.func) {
            case "add":
                return this.props.money.amountForSpin + this.props.money.funcA;
            case "multiply":
                return Math.ceil(this.props.money.amountForSpin * this.props.money.funcA);
            default:
                return this.props.money.amountForSpin;
        }
    }

    handleDonate = async (message) => {
        if(!this.props.currentState.isOpened.roulette) {
            return;
        }

        const { money: { earned, amount } } = this.props.currentState;
        const { updateEarned, updateCurrentAmount } = this.props;

        if( this.isDiscount ) {
            const mod = (this.amountForSpin - this.amount) / 2 - this.discountSumEarned;
            if( message.amount < mod ) {
                this.discountSumEarned += message.amount;
                // ipcRenderer.send("donate", { amount: (this.amountForSpin - this.amount) / 2 - this.discountSumEarned, discount: true });
                return;
            } else {
                this.amount += this.discountSumEarned;
                this.discountSumEarned = 0;
            }
        } else if( (earned + message.amount) < amount ) {
            updateEarned(earned + message.amount);
            return;
        }

        updateEarned(0);
        updateCurrentAmount(this.calculateNewAmountForSpin());

        if(this.spinning) {
            await this.spinning;
        }

        this.spinning = this.spinRoulette(message);
    };

    initDonationAlert(token) {
        if(!token) {
            return
        }

        if(this.socket) {
            this.socket.disconnect();
        }

        this.socket = io("socket.donationalerts.ru:3001");
        this.socket.emit('add-user', {token, type: "minor"});
        this.socket.on('donation', async (json) => {
            await this.handleDonate(JSON.parse(json));
        });
    }

    initDonatePay(token) {
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
        this.initDonationAlert(this.props.tokens.donationAlert);
        this.initDonatePay(this.props.tokens.donatePay);
    }

    spinRoulette(message, focus) {
        return spinRoulette(message, focus).then(
            (result) => this.props.addSpinResult({ username: message.username, text: result.text, time: new Date() })
        )
    }

    handleSpinClick = () => {
        this.spinning = this.spinRoulette({ username: 'стример' }, true);
    };

    render() {
        return (
            <div className="app-controls">
                <UserSpinResults results={ this.props.currentState.spinResults }/>
                <Controls
                    isSpinning={ this.props.currentState.isRouletteSpinning }
                    isRouletteShow={ this.props.currentState.isOpened.roulette }
                    onRunClick={ () => { openWindow('roulette'); openWindow(1) } }
                    onCloseClick={ () => closeWindow('roulette') }
                    onSpinClick={ this.handleSpinClick }
                    onSettingClick={ () => openWindow('settings') }
                />
            </div>
        );
    }
}

export default WindowControls;
