import React, { Component } from 'react';
import Variant from './variant/index';
import cn from 'classnames';
import random from '../../../services/random';
import './styles.css';

class Roulette extends Component {
    state = {
        showing: false,
        bgError: false,
        frameError: false
    };

    container = null;
    lastResult = null;
    cardWidth = 170;
    rouletteWindowWidth = +localStorage.getItem("rouletteWindowWidth");
    rouletteWidth = this.rouletteWindowWidth - 80;
    offsetInCards = 42;
    offsetInPx = this.offsetInCards * this.cardWidth;
    audio = null;

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
                    this.container.scroll(0, 0);
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

                    const fakeOffset = random(5, this.cardWidth - 5);

                    const offsetToSpin = this.offsetInPx + this.cardWidth * variantRealIndex - this.rouletteWidth / 2 + fakeOffset;

                    await this.scrollToLeft( offsetToSpin - 2000, 5 );
                    await this.scrollToLeft( 800, 4 );
                    await this.scrollToLeft( 600, 3 );
                    await this.scrollToLeft( 400, 2 );
                    await this.scrollToLeft( 200, 1 );

                    if(fakeOffset > this.cardWidth / 2) {
                        setTimeout(
                            async () => {
                                await this.scrollToLeft( this.cardWidth / 2 - fakeOffset, 1 );
                                resolve(variants[variantIndex]);
                            },
                            500
                        )
                    } else {
                        await this.scrollToLeft( this.cardWidth / 2 - fakeOffset, 1 );
                        resolve(variants[variantIndex]);
                    }

                },
                700
            );
        });
    };

    spin = async () => {
        await this.setState({ showing: true });

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
                        () => this.container.scroll(0, 0),
                        702
                    );
                    resolve(variant);
                },
                (this.props.showingTime || 5) * 1000
            )
        });
    };

    clearError() {
        this.setState({
            frameError: false,
            bgError: false
        });
    }

    componentDidMount() {
        this.props.getSpin && this.props.getSpin(() => this.spin());
        this.props.getClearError && this.props.getClearError(() => this.clearError());
    }

    handleBgError = () => {
        this.setState({
            bgError: true
        });
    };

    handleFrameError = () => {
        this.setState({
            frameError: true
        });
    };

    renderVariants() {
        if(this.props.variants.length === 0) {
            return [
                <Variant key={ 0 } text={ "Добавте задания в настройках" } bgPath={ this.props.bgPaths["bronze"] }/>,
                <Variant key={ 1 } text={ "Добавте задания в настройках" } bgPath={ this.props.bgPaths["silver"] }/>,
                <Variant key={ 2 } text={ "Добавте задания в настройках" } bgPath={ this.props.bgPaths["gold"] }/>,
            ]
        }

        let preVariants = [...this.props.variants.slice(this.props.variants.length - 2)];
        while(preVariants.length < this.offsetInCards) {
            preVariants = [ ...preVariants, ...this.props.variants ]
        }

        preVariants = preVariants.slice(0, this.offsetInCards);

        const variants = [...preVariants, ...this.props.variants, ...this.props.variants.slice(0, 2)];
        return variants.map(
            (variant, index) => <Variant key={ index } text={ variant.text } bgPath={ this.props.bgPaths[variant.rarity] }/>
        )
    }

    render() {
        return (
            <div className="frame">
                {this.props.soundPath &&
                    <audio loop ref={ a => this.audio = a } src={this.props.soundPath}/>
                }
                <div
                    style={{
                        width: this.rouletteWidth
                    }}
                    className={cn("roulette", { 'show': this.state.showing })}
                >
                    {!this.state.bgError &&
                        <img onError={this.handleBgError}
                             className="background-image"
                             src={ this.props.bgPaths['bg'] }
                             alt="bg"
                        />
                    }
                    <div ref={ div => this.container = div } className="container">
                        { this.renderVariants() }
                    </div>
                    {!this.state.frameError &&
                        <img
                            onError={this.handleFrameError}
                            className="frame-image"
                            src={ this.props.bgPaths['frame'] }
                            alt="frame"
                        />
                    }
                </div>
            </div>
        );
    }
}

export default Roulette;