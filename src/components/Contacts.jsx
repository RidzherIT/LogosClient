import React from "react";
import facebook from '../images/icons/facebook.svg';
import vk from '../images/icons/vk.svg';
import youtube from '../images/icons/youtube.svg';
import instagram from '../images/icons/instagram.svg';

export default function Contacts() {
    return (
        <>
            <div class="contacts">
                <div class="container">
                    <div class="contacts__inner">
                        <div class="contacts__box">
                            <h3 class="contacts__title">КОНТАКТЫ</h3>
                            <div class="wrapper-gradient">
                                <div class="contacts__info">
                                    <span>Наш адрес:</span>
                                    <a class="contacts__adress" href="#">
                                        МО, городской округ Красногорск, село Ильинкое,
                                        Экспериментальная улица, 10
                                    </a>
                                    <span>Наша почта:</span>
                                    <a class="contacts__mail" href="mailto: auto.wash@gmail.com">
                                        auto.wash@gmail.com
                                    </a>
                                </div>
                            </div>
                            <div class="contacts__phone-box">
                                <a href="#" class="contacts__phone-booking">
                                    ЗАБРОНИРОВАТЬ СТОЛ
                                </a>
                                <a href="#" class="contacts__moica contacts__phone-booking">
                                    ЗАПИСАТЬСЯ НА МОЙКУ
                                </a>
                                <a href="#" class="contacts__marshrut contacts__phone-booking">
                                    ПРОЛОЖИТЬ МАРШРУТ
                                </a>
                                <div>
                                    <a href="tel:+79175105759" class="contacts__phone-number">
                                        +7 (917) 510-57-59
                                    </a>
                                    <span>Звоните или оставляйте заявку</span>
                                </div>
                            </div>
                            <div class="contacts__social-box">
                                <p class="contacts__social-text">
                                    Мы в соц сетях:
                                </p>
                                <ul class="contacts__social-list">
                                    <li class="contacts__social-item">
                                        <a class="contacts__social-link" href="#">
                                            <img src={facebook} alt="facebook icon" />
                                        </a>
                                    </li>
                                    <li class="contacts__social-item">
                                        <a class="contacts__social-link" href="#">
                                            <img src={vk} alt="vk icon" />
                                        </a>
                                    </li>
                                    <li class="contacts__social-item">
                                        <a class="contacts__social-link" href="#">
                                            <img src={youtube} alt="youtube icon" />
                                        </a>
                                    </li>
                                    <li class="contacts__social-item">
                                        <a class="contacts__social-link" href="#">
                                            <img src={instagram} alt="instagram icon" />
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}