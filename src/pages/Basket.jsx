import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import BasketProduct from "../components/BasketProduct";
import ProductWrapper from "../components/ProductWrapper";
import SubBasketProduct from "../components/SubBasketProduct";
import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';
export default observer(function Basket() {
    const { store } = useContext(Context);
    const navigate = useNavigate();
    const [randomProduct, setRandomProduct] = useState([])
    const getRandom = async () => {
        const res = await fetch('https://server-logos.onrender.com/product/getRandom');
        const json = await res.json();
        setRandomProduct(prev => [...prev, ...json])
    }
    useEffect(() => {
        if (store.products.length == 0) navigate('/')
    }, [store.products.length])
    useEffect(() => {
        getRandom();
    }, [])
    return (
        <>

            {store.products.length != 0 && <>
                <ProductWrapper>
                    <div class="container-basket" >
                        <div class="basket__box">
                            <Link to='/'>
                                <p class="basket__link">к выбору блюда</p>
                            </Link>
                            <h3 class="basket__title title">
                                КОРЗИНА
                                <span class="basket__span">(в корзине {store.valueProducts} ед. товаров)</span>
                            </h3>
                        </div>
                        <div class="basket__inner">
                            {store.products.map(elem => <div key={elem.id}>
                                <BasketProduct id={elem.id} sale={elem.sale} title={elem.title} desc={elem.desc} img={elem.img} />
                            </div>)}
                        </div>
                        <div class="basket__add">
                            <h3 class="basket__add-title">ДОБАВИТЬ К ЗАКАЗУ</h3>
                            <div class="basket__add-inner">
                                {randomProduct.map(elem => <div key={elem.id}>
                                    <SubBasketProduct desc={elem.description} title={elem.title} id={elem.id} img={elem.img} sale={elem.sale} />
                                </div>)}
                            </div>
                        </div>
                        <div class="place-order">
                            <div class="place-order__item">
                                <p class="place-order__price">
                                    Итого: <span>{store.sale.sale} ₽ </span>
                                </p>
                                <p class="place-order__text">
                                    До бесплатной доставки не хватет:<span>{store.sale.min} ₽</span>
                                </p>
                                <p class="place-order__text">
                                    Минимальная сума заказа {store.sale.free} ₽
                                </p>
                            </div>
                            <div class="place-order__box">
                                <Link to='/customer'>
                                    <p class="place-order__link contacts__phone-booking">Оформить заказ</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </ProductWrapper>
            </>}
        </>
    )
})