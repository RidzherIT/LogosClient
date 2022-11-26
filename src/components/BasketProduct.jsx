import React, { useContext } from "react";
import basketDel from '../images/icons/basket-del.svg';
import SubNumber from "../UI/SubNumber";
import { observer } from 'mobx-react-lite';
import { Context } from "..";
export default observer(function BasketProduct({ id, img, title, desc, sale }) {
    const { store } = useContext(Context);
    const obj = {
        id: id
    }
    const deleteProduct = () => {
        store.setProductsDelete(obj);
        store.setValueProducts();
        store.setSaleUpdate();
    }
    return (
        <>
            <div class="basket__item">
                <img class="basket__item-img" src={img} alt="basket product img" />
                <div class="basket__item-box">
                    <h4 class="basket__item-title">{title}</h4>
                    <p class="basket__item-text">
                        {desc}
                    </p>
                </div>
                <SubNumber id={id} />
                <p class="basket__item-price">{sale} ₽</p>
                <button onClick={deleteProduct} class="basket__item-btn">
                    <img src={basketDel} alt="del basket prodcut icon" />
                </button>
            </div>
        </>
    )
})