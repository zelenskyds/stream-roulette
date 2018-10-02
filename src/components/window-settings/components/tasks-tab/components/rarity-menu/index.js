import React from 'react';
import { Menu } from "antd";

const RarityMenu = ({ choosen, onChange }) => {
    return (
        <Menu defaultSelectedKeys={choosen} onSelect={ onChange }>
            <Menu.Item key="bronze">Бронза</Menu.Item>
            <Menu.Item key="silver">Серебро</Menu.Item>
            <Menu.Item key="gold">Золото</Menu.Item>
        </Menu>
    );
};

export default RarityMenu;
