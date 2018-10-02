import React, { Component } from 'react';
import { Upload, Icon, Button } from 'antd';
import './styles.css';
const { ipcRenderer } = window.require('electron');

class PreferencesTab extends Component {
    state = {};

    componentDidMount() {
        ipcRenderer.on('file-copied', (e, m) => m.type !== "sound" && this.setState({ ["loading_"+m.type]: false }))
    }

    handleChange(item) {
        return (file) => {
            this.setState({ ["loading_"+item]: true });
            const path = "img/" + file.name;
            this.props.onChange({[item]: path});
            ipcRenderer.send('copy-file', {
                path: file.path,
                name: path,
                type: item
            })
        };
    }

    clearPath(item) {
        return () => {
            this.props.onChange({[item]: ""});
        }
    }

    renderButton = (text, type) => (
        <div>
            <Icon type={this.state["loading_" + type]? 'loading': 'plus'} />
            <div className="ant-upload-text">{ text }</div>
        </div>
    );

    render() {

        return (
            <div className="preferences-tab">
                <div>
                    <span className="preferences-tab-title">
                        Фон:
                        {this.props.bgPath && !this.state.loading_bgPath &&
                            <Button
                                htmlType="button"
                                shape="circle"
                                icon="delete"
                                type="danger"
                                size="small"
                                onClick={ this.clearPath("bgPath") }
                            />
                        }
                    </span>
                    <Upload
                        name="bg"
                        listType="picture-card"
                        className="bg-image"
                        showUploadList={false}
                        customRequest={()=>null}
                        beforeUpload={this.handleChange('bgPath')}
                    >
                        {this.props.bgPath && !this.state.loading_bgPath?
                            <img src={this.props.bgPath} alt="bg" />
                            :
                            this.renderButton("Выбрать фон", "bgPath")
                        }
                    </Upload>
                </div>
                <div>
                    <span className="preferences-tab-title">
                        Рамка:
                        {this.props.framePath && !this.state.loading_framePath &&
                        <Button
                            htmlType="button"
                            shape="circle"
                            icon="delete"
                            type="danger"
                            size="small"
                            onClick={ this.clearPath("framePath") }
                        />
                        }
                    </span>
                    <Upload
                        name="frame"
                        listType="picture-card"
                        className="bg-image"
                        showUploadList={false}
                        customRequest={ ()=>null }
                        beforeUpload={ this.handleChange('framePath') }
                    >
                        {this.props.framePath && !this.state.loading_framePath?
                            <img src={this.props.framePath} alt="frame" />
                            :
                            this.renderButton("Выбрать рамку", "framePath")
                        }
                    </Upload>
                </div>
                <div>
                    <span className="preferences-tab-title">
                        Бронза:
                    </span>
                    <Upload
                        name="bronze"
                        listType="picture-card"
                        className="bg-image"
                        showUploadList={false}
                        customRequest={ ()=>null }
                        beforeUpload={ this.handleChange('bronzePath') }
                    >
                        {this.props.bronzePath && !this.state.loading_bronzePath?
                            <img src={this.props.bronzePath} alt="bronze" />
                            :
                            this.renderButton("Выбрать фон бронзы", "bronzePath")
                        }
                    </Upload>
                </div>
                <div>
                    <span className="preferences-tab-title">
                        Серебро:
                    </span>
                    <Upload
                        name="silver"
                        listType="picture-card"
                        className="bg-image"
                        showUploadList={false}
                        customRequest={ ()=>null }
                        beforeUpload={ this.handleChange('silverPath') }
                    >
                        {this.props.silverPath && !this.state.loading_silverPath?
                            <img src={this.props.silverPath} alt="silver" />
                            :
                            this.renderButton("Выбрать фон серебра", "silverPath")
                        }
                    </Upload>
                </div>
                <div>
                    <span className="preferences-tab-title">
                        Золото:
                    </span>
                    <Upload
                        name="gold"
                        listType="picture-card"
                        className="bg-image"
                        showUploadList={false}
                        customRequest={ ()=>null }
                        beforeUpload={ this.handleChange('goldPath') }
                    >
                        {this.props.goldPath && !this.state.loading_goldPath?
                            <img src={this.props.goldPath} alt="gold" />
                            :
                            this.renderButton("Выбрать фон золота", "goldPath")
                        }
                    </Upload>
                </div>
                <div>
                    <span className="preferences-tab-title">
                        Фон суммы:
                        {this.props.bgScorePath && !this.state.loading_bgScorePath &&
                        <Button
                            htmlType="button"
                            shape="circle"
                            icon="delete"
                            type="danger"
                            size="small"
                            onClick={ this.clearPath("bgScorePath") }
                        />
                        }
                    </span>
                    <Upload
                        name="score"
                        listType="picture-card"
                        className="bg-image"
                        showUploadList={false}
                        customRequest={ ()=>null }
                        beforeUpload={ this.handleChange('bgScorePath') }
                    >
                        {this.props.bgScorePath && !this.state.loading_bgScorePath?
                            <img src={this.props.bgScorePath} alt="score" />
                            :
                            this.renderButton("Выбрать фон суммы", "bgScorePath")
                        }
                    </Upload>
                </div>
            </div>
        );
    }
}

export default PreferencesTab;