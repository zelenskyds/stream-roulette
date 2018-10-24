import React from 'react';
import './styles.css';

const Variant = ({ text, bgImage, bgColor, width, height, textOffset }) => (
    <div
        className="variant"
        style={{
            backgroundColor: bgColor,
            width,
            height
        }}
    >
        { bgImage && <img src={ 'file://' + bgImage.path } alt="bgRarity"/> }
        <span
            style={{ marginTop: textOffset }}
        >
            { text }
        </span>
    </div>
);

export default Variant;
