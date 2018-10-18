import React from 'react';
import { Button, Icon, Upload } from "antd";

const ImagePreview = (props) => (
    <div className="image-preview">
        <span className="image-tab-title">
            { props.name || " " }
            { props.path &&
                <Button
                    htmlType="button"
                    shape="circle"
                    icon="delete"
                    type="danger"
                    size="small"
                    onClick={ () => props.onRemove(props.id) }
                />
            }
        </span>
        <Upload
            name={ props.path }
            listType="picture-card"
            className="bg-image"
            showUploadList={ false }
            customRequest={ () => null }
            beforeUpload={ (file) => props.onChange( file, props.id ) }
        >
            { props.path && !props.loading ?
                <img src={ 'file://' + props.path } alt={ props.path }/>
                :
                <div>
                    <Icon type={ props.loading ? 'loading' : 'plus' }/>
                    <div className="ant-upload-text">Добавить картинку</div>
                </div>
            }
        </Upload>
    </div>
);

export default ImagePreview;