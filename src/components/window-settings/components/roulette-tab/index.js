import React from 'react';
import { InputNumber, Select } from 'antd';
import ColorPicker from "./components/color-picker";
import TabContainer from "../tab-container";
import ImagePicker from "./components/image-picker";
import { getImageById } from "../../../../store/helpers/relations";
import Arrow from "./components/arrow";
import './styles.css';

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
    colorGold,
    sounds,
    spinSound,
    appearanceSound,
    rouletteSpin,
    rouletteAppearance,
    textOffset
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
                            min={ 0 }
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
                            min={ 0 }
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
                            min={ 0 }
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
                            min={ 0 }
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
                            defaultColor={ color }
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
                                    defaultColor={ colorBronze }
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
                                    defaultColor={ colorSilver }
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
                                    defaultColor={ colorGold }
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="roulette-tab-section">
                <div className="roulette-tab-section-line">
                    Смещение текста от верхнего края &nbsp;
                    <InputNumber
                        onChange={
                            (textOffset) => onChange(actions.updateWindows({
                                roulette: {
                                    textOffset
                                }
                            }))
                        }
                        min={0}
                        defaultValue={textOffset || 0}
                    />
                </div>
            </div>

            <div className="roulette-tab-section">
                <div className="roulette-tab-section-header">
                    Появление/скрытие рулетки
                </div>
                <div className="roulette-tab-section-line">
                    Анимация &nbsp;
                    <Select
                        className="roulette-tab-section-select"
                        onSelect={
                            (key) => onChange(actions.updateRouletteAppearance({
                                animation: key
                            }))
                        }
                        defaultValue={rouletteAppearance.animation || "slide-down"}
                    >
                        <Option value="slide-down">смещение снизу вверх</Option>
                        <Option value="slide-up">выезжание сверху сверху вниз</Option>
                        <Option value="opacity">изменение прозрачности</Option>
                        <Option value="scale-x">горизонтальное увеличение</Option>
                        <Option value="scale-y">вертикальное увеличение</Option>
                        <Option value="scale-xy">увеличение из точки</Option>
                    </Select>
                </div>
                <div className="roulette-tab-section-line">
                    Продолжительность анимации &nbsp;
                    <InputNumber
                        onChange={
                            (duration) => onChange(actions.updateRouletteAppearance({
                                duration
                            }))
                        }
                        min={0.1}
                        defaultValue={rouletteAppearance.duration || 0.5}
                    />
                </div>
                <div className="roulette-tab-section-line">
                    Время до скрытия &nbsp;
                    <InputNumber
                        onChange={
                            (delay) => onChange(actions.updateRouletteAppearance({
                                delay
                            }))
                        }
                        min={0.1}
                        defaultValue={rouletteAppearance.delay || 5}
                    />
                </div>
                <div className="roulette-tab-section-line">
                    Звук &nbsp;
                    <Select
                        className="roulette-tab-section-select"
                        onSelect={
                            (key) => onChange(actions.updateRouletteSounds({
                                appearance: key
                            }))
                        }
                        defaultValue={spinSound}
                    >
                        <Option value={ null }>Нет</Option>
                        {
                            sounds.map(
                                sound => (
                                    <Option
                                        key={ sound.id }
                                        value={ sound.id }
                                    >
                                        { sound.name }
                                    </Option>
                                )
                            )
                        }
                    </Select>
                </div>
            </div>

            <div className="roulette-tab-section">
                <div className="roulette-tab-section-header">
                    Вращение рулетки
                </div>
                <div className="roulette-tab-section-line">
                    Количество прокрученных карточек &nbsp;
                    <InputNumber
                        onChange={
                            (cards) => onChange(actions.updateRouletteSpin({
                                cards
                            }))
                        }
                        min={1}
                        defaultValue={rouletteSpin.cards || 200}
                    />
                </div>
                <div className="roulette-tab-section-line">
                    Продолжительность вращения &nbsp;
                    <InputNumber
                        onChange={
                            (duration) => onChange(actions.updateRouletteSpin({
                                duration
                            }))
                        }
                        min={0.1}
                        defaultValue={rouletteSpin.duration || 10}
                    />
                </div>
                <div className="roulette-tab-section-line">
                    Звук&nbsp;
                    <Select
                        className="roulette-tab-section-select"
                        onSelect={
                            (key) => onChange(actions.updateRouletteSounds({
                                spin: key
                            }))
                        }
                        defaultValue={spinSound}
                    >
                        <Option value={ null }>Нет</Option>
                        {
                            sounds.map(
                                sound => (
                                    <Option
                                        key={ sound.id }
                                        value={ sound.id }
                                    >
                                        { sound.name }
                                    </Option>
                                )
                            )
                        }
                    </Select>
                </div>
            </div>
        </div>
    </TabContainer>
);
export default RouletteTab;