import React  from 'react';
import Roulette from './roulette';
import './styles.css';
import Window from "../window";
import { getImageById, getSoundById } from "../../store/helpers/relations";

const { remote, ipcRenderer } = window.require('electron');

class WindowRoulette extends Window {
    _remoteCalls = () => {
        const self = this;
        return {
            spin: (message, focus) => {
                if(focus) {
                    remote.getCurrentWindow().focus();
                }

                return self.spin && self.spin(message);
            }
        };
    };

    constructor(props) {
        super( props );

        remote.getCurrentWindow().on('close', () => {
            ipcRenderer.send('close-window', 'roulette');
        });
    }

    componentDidUpdate(prevProps, prevState) {
        const size = remote.getCurrentWindow().getBounds();
        if(
            size.width !== this.props.windows.roulette.width ||
            size.height !== this.props.windows.roulette.height
        ) {
            remote.getCurrentWindow().setSize(
                this.props.windows.roulette.width,
                this.props.windows.roulette.height,
                true
            );
        }
    }

    render() {
        const width =
            this.props.windows.roulette.width -
            (this.props.windows.roulette.paddingLeft + this.props.windows.roulette.paddingRight);
        const height = this.props.windows.roulette.height -
            (this.props.windows.roulette.paddingTop + this.props.windows.roulette.paddingBottom);

        return (
            <div className="app-roulette">
                <Roulette
                    width={ width }
                    height={ height }

                    cardWidth={ this.props.windows.roulette.cardWidth }
                    cardHeight={ this.props.windows.roulette.cardHeight }

                    paddingTop={ this.props.windows.roulette.paddingTop }
                    paddingRight={ this.props.windows.roulette.paddingRight }
                    paddingBottom={ this.props.windows.roulette.paddingBottom }
                    paddingLeft={ this.props.windows.roulette.paddingLeft }

                    color={ this.props.windows.roulette.color }
                    colorBronze={ this.props.windows.roulette.colorBronze }
                    colorSilver={ this.props.windows.roulette.colorSilver }
                    colorGold={ this.props.windows.roulette.colorGold }

                    getSpin={ (f) => this.spin = f }
                    showingTime={5}
                    speed={5}
                    variants={ this.props.tasks }
                    silverChance={ this.props.spinChances.silver }
                    goldChance={ this.props.spinChances.gold }
                    allowRepeat={ this.props.repeats.allow }
                    spinSound={ getSoundById(this.props.windows.roulette.sound.spin) }
                    bgImage={ getImageById(this.props.windows.roulette.images.bg) }
                    frameImage={ getImageById(this.props.windows.roulette.images.frame) }
                    goldImage={ getImageById(this.props.windows.roulette.images.gold) }
                    silverImage={ getImageById(this.props.windows.roulette.images.silver) }
                    bronzeImage={ getImageById(this.props.windows.roulette.images.bronze) }

                    currentState={ this.props.currentState }
                />
            </div>
        );
    }
}

export default WindowRoulette;
