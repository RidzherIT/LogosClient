import React, { useContext } from "react";
import { Context } from "..";
import { observer } from 'mobx-react-lite'


export default observer(function MainNumber({ sale, id }) {
    const { store } = useContext(Context);
    const obj = {
        id: id
    }
    const decr = () => {

        store.setProductsDecr(obj);
        store.setValueProducts();
        store.setSaleUpdate();
    }
    const incr = () => {

        store.setProductsIncr(obj);
        store.setValueProducts();
        store.setSaleUpdate();
    }
    return (
        <>
            <span onClick={decr} className="mainnumber__decr">-</span>
            <span className="mainnumber__sale">{sale}</span>
            <span onClick={incr} className="mainnumber__incr">+</span>
        </>
    )
})