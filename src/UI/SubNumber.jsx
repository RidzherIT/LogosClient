import React, { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { Context } from "..";


export default observer(function SubNumber({ id }) {
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
        <div className="subnumber__wrapper">
            <span onClick={decr} className="subnumber__decr">-</span>
            <span className="subnumber__num">{store.products.find(elem => elem.id == id).value}</span>
            <span onClick={incr} className="subnumber__incr">+</span>
        </div>
    )
})