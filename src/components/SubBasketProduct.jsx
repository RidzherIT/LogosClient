import React, { useContext } from "react";
import { observer } from 'mobx-react-lite';
import { Context } from "..";

export default observer(function SubBasketProduct({ id, title, sale, img, desc }) {
    const { store } = useContext(Context);
    const add = () => {
        const obj = {
            id: id,
            title: title,
            desc: desc,
            sale: +sale,
            sum: +sale,
            value: 1,
            img: `https://zany-ruby-shrimp-belt.cyclic.app/${img}`
        }
        store.setProductsAdd(obj);
        store.setValueProducts();
        store.setSaleUpdate();
    }
    return (
        <>
            <div class="basket__add-item">
                <img src={`https://zany-ruby-shrimp-belt.cyclic.app/${img}`} alt="basket product img" />
                <h5 class="basket__add-item__title">{title}</h5>
                {!store.products.find(elem => elem.id == id) && <button onClick={add} class="basket__add-item__btn">Добавить</button>}
                {store.products.find(elem => elem.id == id) && <p className="basket__add-item__price">Добавлено</p>}
                <p class="basket__add-item__price">{sale} ₽</p>
            </div>
        </>
    )
})