import React, { Component } from 'react';
import ImagePreview from "./components/image-preview";
import './styles.css';
import TabContainer from "../tab-container";

class PreferencesTab extends Component {
    handleImageChange = ({path, name}, id) => {
        let action;
        if(id === undefined) {
            action = this.props.actions.addImage({
                path,
                name,
                id: Date.now()
            })
        } else {
            action = this.props.actions.updateImage({
                path,
                name,
                id
            })
        }

        action.payload.loading = true;
        action.meta = {
            copy: true,
            type: 'img'
        };

        this.props.onChange(action);
    };

    handleImageRemove = (id) => {
        this.props.onChange(this.props.actions.removeImage({
            id
        }));
    };

    render() {
        return (
            <TabContainer>
                <div className="image-tab">
                    { this.props.images &&
                        this.props.images.map(
                            image => (
                                <ImagePreview
                                    onChange={ this.handleImageChange }
                                    onRemove={ this.handleImageRemove }
                                    path={ image.path }
                                    name={ image.name }
                                    loading={ image.loading }
                                    id={ image.id }
                                    key={ image.id }
                                />
                            )
                        )
                    }

                    <ImagePreview
                        onChange={ this.handleImageChange }
                    />
                </div>
            </TabContainer>
        );
    }
}

export default PreferencesTab;