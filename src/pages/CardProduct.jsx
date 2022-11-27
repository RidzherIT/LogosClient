import React, { useState, useContext } from "react";
import Contacts from "../components/Contacts";
import ListProduct from "../components/ListProduct";
import ProductWrapper from "../components/ProductWrapper";
import { useEffect } from "react";
import UpdateProduct from "./UpdateProduct";
import MainNumber from "../UI/MainNumber";
import { useParams, Link } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Context } from "..";
export default observer(function CardProduct() {
    const { id } = useParams();

    useEffect(() => {
        getProduct()
    }, [id])
    const getProduct = async () => {
        const data = {
            id: +id
        }
        const res = await fetch('https://zany-ruby-shrimp-belt.cyclic.app/product/getOne', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
        const json = await res.json()
        setProduct({ ...json.rows[0] })
    }
    const [product, setProduct] = useState({});
    const [updateModal, setUpdateModal] = useState(false);
    const changeModal = (bool) => {
        setUpdateModal(bool);
    }
    const { store } = useContext(Context);
    const add = () => {
        const obj = {
            id: +product.id,
            title: product.title,
            desc: product.description,
            sale: +product.sale,
            sum: +product.sale,
            value: 1,
            img: `https://zany-ruby-shrimp-belt.cyclic.app/${product.img}`
        }
        store.setProductsAdd(obj);
        store.setValueProducts();
        store.setSaleUpdate();
    }
    return (
        <>
            {updateModal && <UpdateProduct id={id} func={changeModal} />}
            <ProductWrapper>
                <Link to='/'>
                    <p class="product-card__goback">Вернуться назад</p>
                </Link>
                <div class="product-card__inner">

                    <img class="product-card__img" src={`https://zany-ruby-shrimp-belt.cyclic.app/${product.img}`} alt="product-card img" />
                    <div class="product-card__item">
                        {store.products.find(elem => elem.id == product.id) && <span className="product__count">{store.products.find(elem => elem.id == product.id).value}</span>}
                        {store.auth && <button onClick={() => changeModal(true)} className="admin__btn">Изменить товар/Удалить</button>}
                        <h4 class="product-card__title">
                            {product.title}
                        </h4>

                        <p class="product-card__text">
                            {product.description}
                        </p>
                        <p class="product-card__weight">Вес: {product.weight} г</p>
                        <div class="product-card__box">
                            {store.products.find(elem => elem.id == product.id) && <MainNumber sale={product.sale} id={product.id} />}
                            {!store.products.find(elem => elem.id == product.id) && <>
                                <span class="products-slider__price">{product.sale} ₽</span>
                                <button onClick={add} class="products-slider__cart">В корзину</button>
                            </>}
                        </div>
                        <div class="product-card__list-box">
                            <ul class="product-card__list">

                                <li class="product-card__list-item">Белки</li>
                                <li class="product-card__list-item">Жиры</li>
                                <li class="product-card__list-item">Углеводы</li>
                                <li class="product-card__list-item">Ккал</li>
                                <li class="product-card__list-item">Вес</li>
                            </ul>
                        </div>
                        <div class="product-card__list-boxx">
                            <ul class="product-card__list">
                                <li class="product-card__list-item">{product.protein}</li>
                                <li class="product-card__list-item">{product.fat}</li>
                                <li class="product-card__list-item">{product.carb}</li>
                                <li class="product-card__list-item product-card__list-item--padding">{product.kcal}</li>
                                <li class="product-card__list-item">{product.weight} г</li>
                            </ul>
                        </div>

                    </div>

                </div>
                <ListProduct title={'с этим товаром покупают'} idList={0} />
            </ProductWrapper>
            <Contacts />
        </>
    )
})