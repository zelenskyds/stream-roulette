import React from 'react';
import './styles.css';

const Variant = ({ text, bgImage, bgColor, width, height }) => (
    <div
        className="variant"
        style={{
            backgroundColor: bgColor,
            width,
            height
        }}
    >
        { bgImage && <img src={ 'file://' + bgImage.path } alt="bgRarity"/> }
        <span>
            { text }
        </span>
    </div>
);

export default Variant;
