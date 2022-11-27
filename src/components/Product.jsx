import React, { useContext } from "react";
import MainNumber from "../UI/MainNumber";
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from "..";
export default observer(function Product({ idProduct, title, weight, sale, img, desc }) {
    const { store } = useContext(Context);
    const add = () => {
        const obj = {
            id: idProduct,
            title: title,
            desc: desc,
            sale: +sale,
            sum: +sale,
            value: 1,
            img: `https://server-logos.onrender.com/${img}`
        }
        store.setProductsAdd(obj);
        store.setValueProducts();
        store.setSaleUpdate();
    }
    return (
        <>
            <div class="products-slider__item">
                <Link to={`/cardProduct/${idProduct}`}>
                    <img class="products-slider__img" src={`https://server-logos.onrender.com/${img}`} alt="product img" />
                </Link>
                <div class="products-slider__box">
                    <div class="products-slider-boxx">
                        <h5 class="products-slider__title">{title}</h5>
                        <span class="products-slider__weight">Вес: {weight} г</span>
                    </div>
                    <p class="products-slider__text">
                        {desc}
                    </p>
                    <div class="products-slider-boxx">
                        {store.products.find(elem => elem.id == idProduct) && <MainNumber sale={sale} id={idProduct} />}
                        {!store.products.find(elem => elem.id == idProduct) && <>
                            <span class="products-slider__price">{sale} ₽</span>
                            <button onClick={add} class="products-slider__cart">В корзину</button>
                        </>}
                    </div>
                </div>
                {store.products.find(elem => elem.id == idProduct) && <span className="product__count">{store.products.find(elem => elem.id == idProduct).value}</span>}
            </div>
        </>
    )
})