import React, { useEffect, useState } from "react";
import { Link, useHref } from 'react-router-dom';
import $ from 'jquery';
export default function ProductWrapper({ children }) {
    const [list, setList] = useState(false);
    const path = useHref();
    useEffect(() => {

        if (path == '/') setList(false);
        if (path != '/') setList(true);
        $('.products__items').ready(function () {
            $(".products__item-link").click(function () {
                $(".products__item-link").removeClass('products__item-link--active');
                $(this).toggleClass('products__item-link--active');
            });
        });
        $(function () {
            $("a.products__item-link, .footer__up-top").click(function () {
                $("html, body").animate({
                    scrollTop: $($(this).attr("href")).offset().top - 50
                }, {
                    duration: 500,
                    easing: "swing"
                });
                return false;
            });
        });
    }, [])
    console.log(list);
    return (
        <>
            <section className="products">
                <div className="container">
                    <div class="products__items-wrapper">

                        {!list && <>
                            <ul class="products__items">
                                <li class="products__item">
                                    <a class="products__item-link products__item-link--active" href="#prod-1">
                                        Холодные
                                        закуски
                                    </a>
                                </li>
                                <li class="products__item">
                                    <a class="products__item-link" href="#prod-2">Горячие закуски</a>
                                </li>
                                <li class="products__item">
                                    <a class="products__item-link" href="#prod-3">Мясные блюда</a>
                                </li>
                                <li class="products__item">
                                    <a class="products__item-link" href="#prod-4">Супы</a>
                                </li>
                                <li class="products__item">
                                    <a class="products__item-link" href="#prod-5">Рыбные блюда</a>
                                </li>
                                <li class="products__item">
                                    <a class="products__item-link" href="#prod-6">Гриль меню</a>
                                </li>
                                <li class="products__item">
                                    <a class="products__item-link" href="#prod-7">Фирменные блюда</a>
                                </li>
                                <li class="products__item">
                                    <a class="products__item-link" href="#prod-8">Напитки</a>
                                </li>
                            </ul>
                        </>}
                        {list && <>
                            <ul class="products__items">
                                <li class="products__item">
                                    <Link to='/'>
                                        <p class="products__item-link products__item-link--active" >
                                            Холодные
                                            закуски
                                        </p>
                                    </Link>

                                </li>
                                <li class="products__item">
                                    <Link to='/'>
                                        <p class="products__item-link">Горячие закуски</p>
                                    </Link>

                                </li>
                                <li class="products__item">
                                    <Link to='/'>
                                        <p class="products__item-link">Мясные блюда</p>
                                    </Link>

                                </li>
                                <li class="products__item">
                                    <Link to='/'>
                                        <p class="products__item-link">Супы</p>
                                    </Link>

                                </li>
                                <li class="products__item">
                                    <Link to='/'>
                                        <p class="products__item-link">Рыбные блюда</p>
                                    </Link>

                                </li>
                                <li class="products__item">
                                    <Link to='/'>
                                        <p class="products__item-link" >Гриль меню</p>
                                    </Link>

                                </li>
                                <li class="products__item">
                                    <Link to='/'>
                                        <p class="products__item-link">Фирменные блюда</p>
                                    </Link>

                                </li>
                                <li class="products__item">
                                    <Link>
                                        <p class="products__item-link">Напитки</p>
                                    </Link>

                                </li>
                            </ul>
                        </>}

                    </div>
                    {children}
                </div>
            </section>
        </>
    )
}