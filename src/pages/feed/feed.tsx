import React from 'react';
import appStyle from "../../components/app/app.module.css";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import OrderFeed from '../../components/order-feed/order-feed';
import InfoFeed from '../../components/info-feed/info-feed';

export function Feed() {
    return (
        <div className={appStyle.wrapper}>
            <DndProvider backend={HTML5Backend}>
                <OrderFeed />
                <InfoFeed />
            </DndProvider>
        </div>
    );
}