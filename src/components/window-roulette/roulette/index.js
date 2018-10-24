import React, { Component } from 'react';
import Variant from './variant/index';
import random from '../../../services/random';
import render from '../../../services/render-dot';
import './styles.css';

function sleep(duration) {
    let resolve;
    const promise = new Promise( (r) => resolve = r );
    setTimeout(
        resolve,
        duration * 1000
    );
    return promise;
}

function play(sound) {
    sound && sound.play()
}

function stop(sound) {
    if(sound) {
        sound.pause();
        sound.currentTime = 0;
    }
}

class Roulette extends Component {
    state = {
        showing: false,
        startScroll: 0,
        duration: 0
    };

    lastResult = null;

    startCardOffset = 2;
    cardMargin = 10;
    offsetInCards = 0;

    async _spin() {
        const goldTasks = this.props.variants.filter( v => v.rarity === "gold" );
        const silverTasks = this.props.variants.filter( v => v.rarity === "silver" );
        const bronzeTasks = this.props.variants.filter( v => v.rarity === "bronze" );

        if(goldTasks.length === 0 && silverTasks.length === 0 && bronzeTasks.length === 0) {
            return "No variants!";
        }

        const normalizedGoldChance =
            goldTasks.length > 0?
                Math.ceil(this.props.goldChance * 100 / goldTasks.length)
                :
                0;

        const normalizedSilverChance =
            silverTasks.length > 0?
                Math.ceil(this.props.silverChance * 100 / silverTasks.length)
                :
                0;

        const normalizedBronzeChance =
            bronzeTasks.length > 0?
                Math.ceil(( 100 - this.props.goldChance - this.props.silverChance ) * 100 / bronzeTasks.length)
                :
                0;

        const maxChance =
            normalizedGoldChance * goldTasks.length +
            normalizedSilverChance * silverTasks.length +
            normalizedBronzeChance * bronzeTasks.length;

        let variantIndex;
        while(true) {
            const taskChance = random(1, maxChance);
            let currentChance = 0;
            for(variantIndex = 0; variantIndex <  this.props.variants.length; variantIndex++) {
                const { rarity } = this.props.variants[variantIndex];

                if(rarity === 'bronze') {
                    currentChance += normalizedBronzeChance;
                } else if(rarity === 'silver') {
                    currentChance += normalizedSilverChance;
                } else {
                    currentChance += normalizedGoldChance;
                }

                if(taskChance <= currentChance) {
                    break;
                }
            }

            if(!this.state.allowRepeat && this.lastResult !== variantIndex) {
                this.lastResult = variantIndex;
                break;
            }
        }

        const cardWidth = this.props.cardWidth + this.cardMargin*2;
        const offsetInPx = cardWidth * this.offsetInCards;
        const fakeOffset = random(15, cardWidth - 15);

        const offsetToSpin = offsetInPx + cardWidth * variantIndex - this.props.width / 2;

        play(this.refs.spinSound);
        await this.scrollContainer(offsetToSpin + fakeOffset, this.props.spinning.duration);
        stop(this.refs.spinSound);

        await this.scrollContainer(offsetToSpin + cardWidth / 2, 0.5, 0.5, 'linear');

        return this.props.variants[variantIndex];
    };

    spin = async (message) => {

        await this.setState({
            donate: message
        });

        await this.toggleRoulette(
            this.props.appearance.duration
        );

        const variant = await this._spin();

        await this.toggleRoulette(
            this.props.appearance.duration,
            this.props.appearance.delay || 5
        );

        await this.setState({
            scroll: this.state.startScroll
        });

        return ({
            ...variant,
            text: render(
                variant.text,
                {
                    donate: this.state.donate
                }
            ),
        });
    };

    createRouletteTransitionPromise() {
        this._rouletteTransitionPromise = new Promise( (resolve) => this._resolveRouletteTransition = resolve );
    }

    createContainerTransitionPromise() {
        this._containerTransitionPromise = new Promise( (resolve) => this._resolveContainerTransition = resolve );
    }

    async scrollContainer(offset, duration=10, delay=0, func='cubic-bezier(0, 0, 0, 1)') {
        this.createContainerTransitionPromise();

        await this.setState({
            duration,
            delay,
            func,
            scroll: offset
        });

        await this._containerTransitionPromise;

        await this.setState({
            duration: 0,
        });
    }

    getAppearanceStyles() {
        switch(this.props.appearance.animation) {
            case 'scale-x':
                return {
                    transform: this.state.showing? 'scaleX(1)': 'scaleX(0)'
                };
            case 'scale-y':
                return {
                    transform: this.state.showing? 'scaleY(1)': 'scaleY(0)'
                };
            case 'scale-xy':
                return {
                    transform: this.state.showing? 'scale(1)': 'scale(0)'
                };
            case 'opacity':
                return {
                    opacity: this.state.showing? 1: 0
                };
            case 'slide-up':
                return {
                    transform: this.state.showing? 'translateY(0)': 'translateY(-100%)'
                };
            case 'slide-down':
            default:
                return {
                    transform: this.state.showing? 'translateY(0)': 'translateY(100%)'
                }
        }
    }

    async toggleRoulette(duration=0.5, delay=0) {
        this.createRouletteTransitionPromise();
        if(delay) {
            await sleep(delay);
        }
        play(this.refs.appearanceSound);
        await this.setState({
            showing: !this.state.showing,
            // toggleDelay: delay,
            toggleDuration: duration
        });
        await this._rouletteTransitionPromise;
        stop(this.refs.appearanceSound);

        if(delay !== 0) {
            await this.setState({
                toggleDelay: 0
            });
        }
    }

    onRouletteMoved = () => {
        this._resolveRouletteTransition && this._resolveRouletteTransition();
    };

    onContainerScrolled = (event) => {
        event.stopPropagation();
        this._resolveContainerTransition && this._resolveContainerTransition();
    };

    componentDidMount() {
        this.onResize();

        this.refs.roulette.addEventListener('transitionend', this.onRouletteMoved);
        this.refs.container.addEventListener('transitionend', this.onContainerScrolled);

        this.props.getSpin && this.props.getSpin( this.spin );

        if(this.props.spinSound) {
            this.refs.spinSound.volume = this.props.spinSound.volume;
        }

        if(this.props.appearanceSound) {
            this.refs.appearanceSound.volume = this.props.appearanceSound.volume;
        }
    }

    componentWillUnmount() {
        this.refs.roulette.removeEventListener('transitionend', this.onRouletteMoved);
        this.refs.container.removeEventListener('transitionend', this.onContainerScrolled);
    }

    renderVariants() {
        if(this.props.variants.length === 0) {
            return [
                <Variant
                    key={ 0 }
                    textOffset={ this.props.textOffset }
                    width={ this.props.cardWidth }
                    height={ this.props.cardHeight }
                    text={ "Добавьте задания в настройках" }
                    bgImage={ this.props.bronzePath }
                    bgColor={ this.props.colorBronze }
                />,
            ]
        }

        let preVariants = [...this.props.variants.slice(this.props.variants.length - this.startCardOffset)];
        while(preVariants.length < (this.props.spinning.cards || 200)) {
            preVariants = [ ...preVariants, ...this.props.variants ]
        }

        this.offsetInCards = preVariants.length;

        const variants = [...preVariants, ...this.props.variants, ...this.props.variants.slice(0, this.startCardOffset)];
        return variants.map(
            (variant, index) => (
                <Variant
                    textOffset={ this.props.textOffset }
                    width={ this.props.cardWidth }
                    height={ this.props.cardHeight }
                    key={ index }
                    bgColor={ this.props['color' + variant.rarity.toUpperCase()[0] + variant.rarity.slice(1)] }
                    text={
                        render(
                            variant.text,
                            {
                                donate: this.state.donate,
                                money: this.props.money,
                                discount: this.props.discount,
                                state: this.props.currentState.state,
                            }
                        )
                    }
                    bgImage={ this.props[variant.rarity + 'Image'] }
                />
            )
        )
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.cardWidth !== prevProps.cardWidth || this.props.width !== prevProps.width) {
            this.onResize();
        }

        if(this.props.spinSound) {
            if(this.refs.spinSound.volume !== this.props.spinSound.volume) {
                this.refs.spinSound.volume = this.props.spinSound.volume;
            }
        }

        if(this.props.appearanceSound) {
            if(this.refs.appearanceSound.volume !== this.props.appearanceSound.volume) {
                this.refs.appearanceSound.volume = this.props.appearanceSound.volume;
            }
        }
    }

    onResize = () => {
        const startCardOffsetInPx = (this.props.cardWidth + this.cardMargin*2) * this.startCardOffset;
        const offsetForFirstCard = (this.props.width - this.props.cardWidth - this.cardMargin*2) / 2;
        const startScroll = startCardOffsetInPx - offsetForFirstCard;

        this.setState({
            scroll: startScroll,
            startScroll
        })
    };

    render() {
        return (
            <div className="frame">
                <div
                    style={{
                        backgroundColor: this.props.color,
                        borderColor: this.props.color,
                    }}
                    className="bg-color"
                />
                {this.props.spinSound &&
                    <audio
                        loop
                        ref="spinSound"
                        src={ 'file://' + this.props.spinSound.path }
                    />
                }
                {this.props.appearanceSound &&
                    <audio
                        loop
                        ref="appearanceSound"
                        src={ 'file://' + this.props.appearanceSound.path }
                    />
                }
                <div
                    ref="roulette"
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                        transitionDelay: this.state.toggleDelay + 's',
                        transitionDuration: (this.state.toggleDuration || 0.5) + 's',
                        paddingTop: this.props.paddingTop,
                        paddingRight: this.props.paddingRight,
                        paddingBottom: this.props.paddingBottom,
                        paddingLeft: this.props.paddingLeft,
                        ...this.getAppearanceStyles()
                    }}
                    className="roulette"
                >
                    {this.props.bgImage &&
                        <img
                            className="background-image"
                             src={ 'file://' + this.props.bgImage.path }
                             alt="bg"
                        />
                    }
                    <div
                        ref="container"
                        className="container"
                        style={{
                            transitionDuration: this.state.duration + 's',
                            transitionTimingFunction: this.state.func,
                            transitionDelay: this.state.delay + 's',
                            // right: this.state.scroll,
                            transform: `translateX(${-this.state.scroll}px)`,
                            paddingTop: (this.props.height - this.props.cardHeight) / 2
                        }}
                    >
                        { this.renderVariants() }
                    </div>
                    <div
                        className="overflow-hider"
                        style={{
                            borderStyle: 'solid',
                            borderColor: this.props.color,
                            borderTopWidth: this.props.paddingTop,
                            borderRightWidth: this.props.paddingRight,
                            borderBottomWidth: this.props.paddingBottom,
                            borderLeftWidth: this.props.paddingLeft,
                        }}
                    />
                    <div
                        className="roulette-pointer"
                        style={{
                            left: this.props.width / 2 + this.props.paddingLeft - 2
                        }}
                    />
                    {this.props.frameImage &&
                        <img
                            className="frame-image"
                            src={ 'file://' + this.props.frameImage.path }
                            alt="frame"
                        />
                    }
                </div>
            </div>
        );
    }
}

export default Roulette;