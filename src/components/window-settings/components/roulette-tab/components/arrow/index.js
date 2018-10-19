import React from 'react';
import cn from 'classnames';
import './style.css';

const Arrow = ({vertical, horizontal, length, className}) => {
    return (
        <div
            className={cn("arrow", { vertical, horizontal }, className)}
            style={horizontal? {width: length}: {height: length}}
        />
    );
};

export default Arrow;
