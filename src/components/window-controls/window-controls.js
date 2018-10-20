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
import { Button } from "antd";
import updateApplication from '../../services/update-application';

class WindowControls extends Window {
    spinning = null;
    discountInterval = null;

    constructor(...args) {
        super(...args);

        this.initDonationSystems();
    }

    componentDidUpdate(prevProps, prevState) {
        const { roulette } = this.props.currentState.isOpened;
        const { roulette: roulettePrev } = prevProps.currentState.isOpened;

        if(roulette && roulettePrev !== roulette) {
            clearInterval(this.discountInterval);
            this.discountInterval = setInterval(
                () => this.makeDiscount(),
                this.props.discount.time * 60000
            );
        } else if(!roulette && roulettePrev !== roulette) {
            clearInterval(this.discountInterval);
        }
    }

    makeDiscount() {
        const isDiscount = random(1, 100) <= this.props.discount.chance;

        if(!isDiscount) {
            return;
        }

        this.props.updateCurrentState({
            discount: true
        });

        setTimeout(
            () => {
                if(this.props.currentState.state.discount) {
                    this.props.updateCurrentState({
                        discount: false
                    });
                    const { money: { earned, discountEarned } } = this.props.currentState;
                    this.props.updateEarned(earned + discountEarned);
                    this.props.updateDiscountEarned(0);
                }
            },
            this.props.discount.duration * 60000
        );
    }

    calculateNewAmountForSpin() {
        switch (this.props.money.func) {
            case "add":
                return this.props.currentState.money.amount + this.props.money.funcA;
            case "multiply":
                return Math.ceil(this.props.currentState.money.amount * this.props.money.funcA);
            default:
                return this.props.money.startAmountForSpin;
        }
    }

    handleDonate = async (message) => {
        if(!this.props.currentState.isOpened.roulette) {
            return;
        }

        const { money: { earned, amount, discountEarned } } = this.props.currentState;
        const { updateEarned, updateCurrentAmount, updateDiscountEarned } = this.props;

        if( this.props.currentState.state.discount ) {
            const mod = Math.ceil((amount - earned) * this.props.discount.value) - discountEarned;
            if( message.amount < mod ) {
                updateDiscountEarned(discountEarned + message.amount);
                return;
            } else {
                updateDiscountEarned(0);
                this.props.updateCurrentState({
                    discount: false
                });
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

        this.socket = io("http://socket.donationalerts.ru:3001");
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
            return this.donatePay.update(token);
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
                {
                    this.props.system.needUpdate &&
                        <Button
                            style={{
                                borderRadius: 0
                            }}
                            disabled={this.props.system.updating}
                            htmlType="button"
                            type="primary"
                            icon={!this.props.system.updating? 'arrow-up': 'loading'}
                            onClick={updateApplication}
                        >
                            { !this.props.system.updating ?
                                `Обновить до версии ${this.props.system.next}`
                                :
                                "Обновление..."
                            }
                        </Button>
                }
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
