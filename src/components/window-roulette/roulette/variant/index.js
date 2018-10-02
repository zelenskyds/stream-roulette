import React from 'react';
import './styles.css';

const Variant = ({ text, bgPath }) => (
    <div className={ "variant" }>
        <img src={ bgPath } alt="bgRarity"/>
        <span>
            { text }
        </span>
    </div>
);

export default Variant;
