import React, { useContext, useState } from "react";
import buy from '../images/icons/buy.svg';
import calling from '../images/icons/calling.svg';
import search from '../images/icons/search.svg';
import headerLogo from '../images/icons/header-logo.svg';
import basketIcon from '../images/icons/cart-popup.svg';
import { useEffect } from "react";
import $ from 'jquery';
import addIcon from '../images/icons/add.svg';
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { Context } from "..";

export default observer(function Header() {
    const { store } = useContext(Context);
    const [basket, setBasket] = useState(false);
    const showBasket = () => {
        setBasket(true);
    }
    const hideBasket = () => {
        setBasket(false);
    }
    useEffect(() => {
        $(function () {

            $('.menu__btn').on('click', function () {
                $('.header__menu').toggleClass('header__menu--active')
            });
        })
        const inputFunc = (function decorator() {
            let bool = false;
            return function () {
                const input = document.querySelector('.header__input');
                const inputWrapper = document.querySelector('.header__adress');
                inputWrapper.addEventListener('click', () => {
                    if (bool) return;
                    bool = !bool;
                    if (bool) {
                        input.focus()
                    }
                });
                input.addEventListener('blur', () => {
                    bool = !bool;

                })
            }
        })();
        inputFunc();

    }, [])
    return (
        <>
            {basket &&
                <>
                    <div class="popup">
                        <div class="popup__body">
                            <div class="popup__content">
                                <span onClick={hideBasket} class="popup__close">
                                    <img src={addIcon} alt="add icon" />
                                </span>
                                <img class="popup__img" src={basketIcon} alt="cart img" />
                                <p class="popup__title">КОРЗИНА ПУСТАЯ</p>
                                <Link to='/'>
                                    <p onClick={hideBasket} class="popup__link">Посмотреть меню</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
            }
            <header class="header">
                <div class="container">
                    <div class="header__inner">
                        <button class="menu__btn">
                            <span>МЕНЮ</span>
                        </button>
                        <ul class="header__menu">
                            <li class="header__menu-item">
                                <a class="header__menu-link" href="#">Холодные закуски</a>
                            </li>
                            <li class="header__menu-item">
                                <a class="header__menu-link" href="#">Горячие закуски</a>
                            </li>
                            <li class="header__menu-item">
                                <a class="header__menu-link" href="#">Мясные блюда</a>
                            </li>
                            <li class="header__menu-item">
                                <a class="header__menu-link" href="#">Супы</a>
                            </li>
                            <li class="header__menu-item">
                                <a class="header__menu-link" href="#">Рыбные блюда</a>
                            </li>
                            <li class="header__menu-item">
                                <a class="header__menu-link" href="#">Гриль меню</a>
                            </li>
                            <li class="header__menu-item">
                                <a class="header__menu-link" href="#">Фирменные блюда</a>
                            </li>
                            <li class="header__menu-item">
                                <a class="header__menu-link" href="#">Напитки</a>
                            </li>
                        </ul>
                        <Link to='/'>
                            <img className="header__logo" src={headerLogo} alt="icon logo" />
                        </Link>
                        <div class="header__adress">
                            <input class="header__input" type="text" placeholder="Введите адрес доставки" />
                            <button class="header__btn">
                                <img src={search} alt="search icon" />
                            </button>
                        </div>
                        {!store.auth && <>
                            <div class="header__contacts header__contacts--margin">
                                <div class="header__contacts-box">
                                    <p class="header__text">
                                        Контакты:
                                    </p>
                                    <a class="header__phone" href="tel:+79175105759">
                                        <div class="header__phone-calling">
                                            <img src={calling} alt="calling icon" />
                                        </div>
                                        +7 (917) 510-57-59
                                    </a>
                                </div>
                            </div>
                        </>}
                        {store.auth && <>
                            <span className="margin-auto">
                                <Link to='/adminPanel'>
                                    <p className="admin__btn">Админ <br />Панель</p>
                                </Link>
                            </span>
                            <span className="margin-auto">
                                <Link to='/auth'>
                                    <p className="admin__btn">Выход<br /> админа</p>
                                </Link>
                            </span>
                        </>}
                        {store.products.length == 0 && <>
                            <span onClick={showBasket} class="header__cart">
                                <img src={buy} alt="" />
                                Корзина
                                <div class="header__line"></div>
                                <span class="header__cart-num">{store.valueProducts}</span>
                            </span>
                        </>}
                        {store.products.length != 0 && <>
                            <Link to='/basket'>
                                <span class="header__cart">
                                    <img src={buy} alt="" />
                                    Корзина
                                    <div class="header__line"></div>
                                    <span class="header__cart-num">{store.valueProducts}</span>
                                </span>
                            </Link>
                        </>}
                    </div>
                </div>
            </header>
        </>
    )
})