import React from "react";
import arrowTop from '../images/icons/arrow-top.svg';
import headerLogo from '../images/icons/header-logo.svg';
import { Link } from 'react-router-dom';

export default function Footer() {


    return (
        <>
            <footer class="footer">
                <div class="container">
                    <div class="footer__inner">
                        <div class="footer__item-copy">
                            <a class="footer__up-top" href="#up-top"><img src={arrowTop}
                                alt="arrow icon" /></a>
                            <a class="header__logo" href="#">
                                <img src={headerLogo} alt="icon logo" />
                            </a>
                            <p class="footer__item-text">
                                © ООО СК «АПШЕРОН»
                                Все права защищены. 2010-2020
                            </p>
                            <ul class="footer__links">
                                <li class="footer__item-link">
                                    <a href="#">
                                        Пользовательское соглашение
                                    </a>
                                </li>
                                <li class="footer__item-link">
                                    <a href="#">
                                        Карта сайта
                                    </a>
                                </li>
                                <li class="footer__item-link">
                                    <a href="#">
                                        Политика конфиденциальности
                                    </a>
                                </li>
                            </ul>

                        </div>
                        <ul class="footer__item-links">
                            <li class="footer__item-list">
                                <a class="footer__items-link" href="#">О ресторане</a>
                            </li>
                            <li class="footer__item-list">
                                <Link to='/delivery'>
                                    <p class="footer__items-link" href="#">Условия доставки</p>
                                </Link>
                            </li>
                            <li class="footer__item-list">
                                <a class="footer__items-link" href="#">Возврат товара</a>
                            </li>
                            <li class="footer__item-list">
                                <Link to='/stock'>
                                    <p class="footer__items-link" href="#">Акции</p>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </footer>
        </>
    )
}