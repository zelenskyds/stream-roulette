import React from 'react';
import { InputNumber, Select } from 'antd';
import ColorPicker from "./components/color-picker";
import TabContainer from "../tab-container";
import './styles.css';
import ImagePicker from "./components/image-picker";
import { getImageById } from "../../../../store/helpers/relations";
import Arrow from "./components/arrow";

const { Option } = Select;
//width="65%"
const RouletteTab = ({
    color,
    actions,
    onChange,
    images,
    rouletteImages,
    rouletteWindowWidth,
    rouletteWindowHeight,
    rouletteWindowPaddingTop,
    rouletteWindowPaddingRight,
    rouletteWindowPaddingBottom,
    rouletteWindowPaddingLeft,
    cardWidth,
    cardHeight,
    colorBronze,
    colorSilver,
    colorGold
}) => (
    <TabContainer>
        <div className="roulette-tab">
            <div>
                <span>
                    Ширина окна рулетки
                </span>
                <InputNumber
                    defaultValue={ rouletteWindowWidth }
                    onChange={
                        (value) => onChange( actions.updateWindows( {
                            roulette: { width: value }
                        } ) )
                    }
                    min={ 250 }
                />
                <span>
                    пикселей. Высота окна рулетки
                </span>
                <InputNumber
                    defaultValue={ rouletteWindowHeight }
                    onChange={
                        (value) => onChange( actions.updateWindows( {
                            roulette: { height: value }
                        } ) )
                    }
                    min={ 250 }
                />
                <span>
                    пикселей.
                </span>
            </div>
            <div className="roulette-tab-window-container">
                <div className="roulette-tab-window">
                    <div className="roulette-tab-arrow padding-left">
                        <InputNumber
                            defaultValue={ rouletteWindowPaddingLeft }
                            onChange={
                                (value) => onChange( actions.updateWindows( {
                                    roulette: { paddingLeft: value }
                                } ) )
                            }
                            min={ 1 }
                        />
                        <Arrow horizontal length={83}/>
                    </div>
                    <div className="roulette-tab-arrow padding-top">
                        <Arrow vertical length={45}/>
                        <InputNumber
                            defaultValue={ rouletteWindowPaddingTop }
                            onChange={
                                (value) => onChange( actions.updateWindows( {
                                    roulette: { paddingTop: value }
                                } ) )
                            }
                            min={ 1 }
                        />
                    </div>
                    <div className="roulette-tab-arrow padding-right">
                        <InputNumber
                            defaultValue={ rouletteWindowPaddingRight }
                            onChange={
                                (value) => onChange( actions.updateWindows( {
                                    roulette: { paddingRight: value }
                                } ) )
                            }
                            min={ 1 }
                        />
                        <Arrow horizontal length={83}/>
                    </div>
                    <div className="roulette-tab-arrow padding-bottom">
                        <Arrow vertical length={45}/>
                        <InputNumber
                            defaultValue={ rouletteWindowPaddingBottom }
                            onChange={
                                (value) => onChange( actions.updateWindows( {
                                    roulette: { paddingBottom: value }
                                } ) )
                            }
                            min={ 1 }
                        />
                    </div>
                    <div className="roulette-tab-control bg">
                        <ImagePicker
                            defaultValue={ getImageById(rouletteImages.bg) }
                            images={ images }
                            onChange={
                                (value) => onChange( actions.updateRouletteImages( {
                                    bg: value && value.id
                                } ) )
                            }
                        />
                        &nbsp; Фон рулетки
                    </div>
                    <div className="roulette-tab-control color">
                        Цвет окна &nbsp;
                        <ColorPicker
                            onChange={
                                (color) => onChange( actions.updateWindows( {
                                    roulette: {
                                        color
                                    }
                                } ) )
                            }
                            color={ color }
                        />
                    </div>
                    <div className="roulette-tab-control frame">
                        <ImagePicker
                            defaultValue={ getImageById(rouletteImages.frame) }
                            images={ images }
                            onChange={
                                (value) => onChange( actions.updateRouletteImages( {
                                    frame: value && value.id
                                } ) )
                            }
                        />
                        &nbsp; Рамка рулетки
                    </div>
                    <div className="roulette-tab-inner">
                        <div className="roulette-tab-control card-bg">
                            <div>
                                <ImagePicker
                                    defaultValue={ getImageById(rouletteImages.bronze) }
                                    images={ images }
                                    onChange={
                                        (value) => onChange( actions.updateRouletteImages( {
                                            bronze: value && value.id
                                        } ) )
                                    }
                                />
                                &nbsp; Фон бронзы
                            </div>
                            <div>
                                <ImagePicker
                                    defaultValue={ getImageById(rouletteImages.silver) }
                                    images={ images }
                                    onChange={
                                        (value) => onChange( actions.updateRouletteImages( {
                                            silver: value && value.id
                                        } ) )
                                    }
                                />
                                &nbsp; Фон серебра
                            </div>
                            <div>
                                <ImagePicker
                                    defaultValue={ getImageById(rouletteImages.gold) }
                                    images={ images }
                                    onChange={
                                        (value) => onChange( actions.updateRouletteImages( {
                                            gold: value && value.id
                                        } ) )
                                    }
                                />
                                &nbsp; Фон золота
                            </div>
                        </div>

                        <div className="roulette-tab-arrow card-width">
                            <InputNumber
                                defaultValue={ cardWidth }
                                onChange={
                                    (value) => onChange( actions.updateWindows( {
                                        roulette: { cardWidth: value }
                                    } ) )
                                }
                                min={ 1 }
                            />
                            {/*<Arrow horizontal length={92}/>*/}
                        </div>
                        <div className="roulette-tab-card">
                            <div className="roulette-tab-arrow card-height">
                                <Arrow vertical length={92}/>
                                <InputNumber
                                    defaultValue={ cardHeight }
                                    onChange={
                                        (value) => onChange( actions.updateWindows( {
                                            roulette: { cardHeight: value }
                                        } ) )
                                    }
                                    min={ 1 }
                                />
                            </div>
                        </div>
                        <div className="roulette-tab-control card-color">
                            <div>
                                Цвет бронзы &nbsp;
                                <ColorPicker
                                    onChange={
                                        (colorBronze) => onChange( actions.updateWindows( {
                                            roulette: {
                                                colorBronze
                                            }
                                        } ) )
                                    }
                                    color={ colorBronze }
                                />
                            </div>
                            <div>
                                Цвет серебра &nbsp;
                                <ColorPicker
                                    onChange={
                                        (colorSilver) => onChange( actions.updateWindows( {
                                            roulette: {
                                                colorSilver
                                            }
                                        } ) )
                                    }
                                    color={ colorSilver }
                                />
                            </div>
                            <div>
                                Цвет золота &nbsp;
                                <ColorPicker
                                    onChange={
                                        (colorGold) => onChange( actions.updateWindows( {
                                            roulette: {
                                                colorGold
                                            }
                                        } ) )
                                    }
                                    color={ colorGold }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </TabContainer>
);
export default RouletteTab;