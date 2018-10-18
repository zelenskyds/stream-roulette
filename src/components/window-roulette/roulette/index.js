import React, { Component } from 'react';
import Variant from './variant/index';
import cn from 'classnames';
import random from '../../../services/random';
import './styles.css';
import render from '../../../services/render-dot';

class Roulette extends Component {
    state = {
        showing: false,
        offsetWidth: 0,
        startScroll: 0
    };

    container = null;
    lastResult = null;
    audio = null;

    cardMargin = 10;
    offsetInCards = 42;

    async scrollToLeft(px, pxPerMs=5) {
        return new Promise((resolve) => {
            let direction = 1;

            if(px < 0) {
                direction = -1;
            }

            let x = 0;
            const r = setInterval(() => {
                if(Math.abs(x + direction * pxPerMs) > Math.abs(px)) {
                    this.container.scrollBy({left: px - x});
                    clearInterval(r);
                    resolve(this.container.scrollLeft);
                } else {
                    this.container.scrollBy({left: direction * pxPerMs});
                }

                x = (x + direction * pxPerMs);
            }, 1);
        });
    }

    _spin = async () => {
        return new Promise((resolve)=> {
            setTimeout(
                async () => {
                    const rarityChance = random(0, 10000);
                    const normalizedGoldChance = (this.props.goldChance || 1) * 100;
                    const normalizedSilverChance = ( this.props.silverChance || 10 ) * 100 + normalizedGoldChance;

                    let rarity;

                    const haveGold = this.props.variants.filter( v => v.rarity === "gold" ).length !== 0;
                    const haveSilver = this.props.variants.filter( v => v.rarity === "silver" ).length !== 0;
                    const haveBronze = this.props.variants.filter( v => v.rarity === "bronze" ).length !== 0;

                    if(!haveBronze && !haveSilver && !haveGold) {
                        resolve("No variants!");
                    }

                    if(rarityChance < normalizedGoldChance && haveGold) {
                        rarity = "gold";
                    } else if (rarityChance < normalizedSilverChance && haveSilver) {
                        rarity = "silver";
                    } else if (haveBronze){
                        rarity = "bronze";
                    } else {
                        resolve("No variants!");
                        return;
                    }

                    let variants;
                    let variantIndex;
                    let variantRealIndex;

                    const compare = v => v === variants[variantIndex];

                    while(true) {
                        variants = this.props.variants.filter( v => v.rarity === rarity );
                        variantIndex = random(0, variants.length - 1);
                        // variantRealIndex = this.props.variants.length + 2 + this.props.variants.findIndex( v => v === variants[variantIndex] );
                        variantRealIndex = this.props.variants.findIndex( compare );

                        if(this.state.allowRepeat || this.lastResult !== variantRealIndex || variants.length === 1) {
                            break
                        }
                    }

                    if(!this.state.allowRepeat) {
                        this.lastResult = variantRealIndex;
                    }

                    const cardWidth = this.props.cardWidth + this.cardMargin*2;
                    const offsetInPx = cardWidth * this.offsetInCards + this.state.offsetWidth - this.state.startScroll;
                    const fakeOffset = random(5, cardWidth - 5);

                    const offsetToSpin =
                        offsetInPx + cardWidth * variantRealIndex - this.props.width / 2 + fakeOffset;

                    // await this.scrollToLeft( offsetToSpin, 5 );
                    await this.scrollToLeft( offsetToSpin - 2000, 5 );
                    await this.scrollToLeft( 800, 4 );
                    await this.scrollToLeft( 600, 3 );
                    await this.scrollToLeft( 400, 2 );
                    await this.scrollToLeft( 200, 1 );

                    if(fakeOffset > cardWidth / 2) {
                        setTimeout(
                            async () => {
                                await this.scrollToLeft( cardWidth / 2 - fakeOffset, 1 );
                                resolve(variants[variantIndex]);
                            },
                            500
                        )
                    } else {
                        await this.scrollToLeft( cardWidth / 2 - fakeOffset, 1 );
                        resolve(variants[variantIndex]);
                    }

                },
                700
            );
        });
    };

    spin = async (message) => {

        await this.setState({
            showing: true,
            donate: message
        });

        this.audio && this.audio.play();
        const variant = await this._spin();

        if(this.audio) {
            this.audio.pause();
            this.audio.currentTime = 0;
        }

        return new Promise((resolve)=> {
            setTimeout(
                async () => {
                    await this.setState({ showing: false });
                    setTimeout(
                        () => this.container.scroll(this.state.startScroll, 0),
                        702
                    );
                    resolve({
                        ...variant,
                        text: render(
                            variant.text,
                            {
                                donate: this.state.donate
                            }
                        ),
                    });
                },
                (this.props.showingTime || 5) * 1000
            )
        });
    };

    componentDidMount() {
        this.props.getSpin && this.props.getSpin( this.spin );
    }

    renderVariants() {
        if(this.props.variants.length === 0) {
            return [
                <Variant
                    key={ 0 }
                    width={ this.props.cardWidth }
                    height={ this.props.cardHeight }
                    text={ "Добавте задания в настройках" }
                    bgImage={ this.props.bronzePath }
                    bgColor={ this.props.colorBronze }
                />,
            ]
        }

        let preVariants = [...this.props.variants.slice(this.props.variants.length - 2)];
        while(preVariants.length < this.offsetInCards) {
            preVariants = [ ...preVariants, ...this.props.variants ]
        }

        preVariants = preVariants.slice(0, this.offsetInCards);

        const variants = [...preVariants, ...this.props.variants, ...this.props.variants.slice(0, 2)];
        return variants.map(
            (variant, index) => (
                <Variant
                    width={ this.props.cardWidth }
                    height={ this.props.cardHeight }
                    key={ index }
                    bgColor={ this.props['color' + variant.rarity.toUpperCase()[0] + variant.rarity.slice(1)] }
                    text={
                        render(
                            variant.text,
                            {
                                donate: this.state.donate
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
    }

    onResize = () => {
        if(!this.container) {
            return
        }

        const twoCardWidth = (this.props.cardWidth + this.cardMargin*2) * 2;
        const offsetForFirstCard = (this.props.width - this.props.cardWidth - this.cardMargin*2) / 2;
        if(twoCardWidth > offsetForFirstCard) {
            const startScroll = twoCardWidth - offsetForFirstCard;
            this.container.scroll(startScroll, 0);
            this.setState({
                offsetWidth: 0,
                startScroll
            })
        } else {
            this.container.scroll(0, 0);
            this.setState({
                offsetWidth: offsetForFirstCard - twoCardWidth,
                startScroll: 0
            })
        }
    };

    containerRef = (div) => {
        this.container = div;
        this.onResize();
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
                        ref={ a => this.audio = a }
                        src={ 'file://' + this.props.spinSound.path }
                    />
                }
                <div
                    style={{
                        width: this.props.width,
                        height: this.props.height,
                        paddingTop: this.props.paddingTop,
                        paddingRight: this.props.paddingRight,
                        paddingBottom: this.props.paddingBottom,
                        paddingLeft: this.props.paddingLeft,
                    }}
                    className={cn("roulette", { 'show': this.state.showing })}
                >
                    {this.props.bgImage &&
                        <img className="background-image"
                             src={ 'file://' + this.props.bgImage.path }
                             alt="bg"
                        />
                    }
                    <div
                        ref={ this.containerRef }
                        className="container"
                        style={{
                            paddingTop: (this.props.height - this.props.cardHeight) / 2
                        }}
                    >
                        <div
                            className="roulette-offset"
                            style={{
                                width: this.state.offsetWidth
                            }}
                        />
                        { this.renderVariants() }
                    </div>
                    <div
                        className="roulette-pointer"
                        style={{
                            width: this.props.cardWidth,
                            height: this.props.cardHeight,
                            left: this.props.paddingLeft + (this.props.width - this.props.cardWidth) / 2,
                            top: this.props.paddingTop + (this.props.height - this.props.cardHeight) / 2,
                            // top: `calc(50% - ${this.props.cardHeight / 2}px)`
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