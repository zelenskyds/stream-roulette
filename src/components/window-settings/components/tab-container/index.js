import React from 'react';
import { Scrollbars } from "react-custom-scrollbars";
import './styles.css';

const TabContainer = ({ children, width }) => (
    <div className="tab-container">
        <Scrollbars universal>
            <div className="tab-container-inner" style={{ paddingRight: `calc(100% - ${width})`}}>
                { children }
            </div>
        </Scrollbars>
    </div>
);

export default TabContainer;