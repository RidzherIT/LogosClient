import React, { useEffect } from "react";
import ProductWrapper from "../components/ProductWrapper";
import mapDelivery from '../images/map-delivery.png';
import $ from 'jquery';

export default function Delivery() {
    useEffect(() => {
        $('.delivery__item-title').on('click', function () {
            $(this).next().slideToggle();
        });

        $('.delivery__item-title').on('click', function () {
            $(this).toggleClass('delivery__item-title--active');
        });
    }, [])
    return (
        <>
            <ProductWrapper>
                <h3 class="delivery__title title" id="prod-3">Условия доставки</h3>
                <div class="delivery__content">
                    <div class="delivery__items">
                        <div class="delivery__item-title">
                            У наших курьеров всегда должна быть сдача!
                        </div>
                        <div class="delivery__item-text">
                            Мы очень внимательно следим за качеством нашей работы, поэтому, если у вас будут какие-либо
                            замечания или предложения, то обязательно сообщайте их нам
                        </div>
                        <div class="delivery__item-title">
                            Вам что-то не довезли?
                        </div>
                        <div class="delivery__item-text">
                            Мы очень внимательно следим за качеством нашей работы, поэтому, если у вас будут какие-либо
                            замечания или предложения, то обязательно сообщайте их нам
                        </div>
                        <div class="delivery__item-title">
                            Не понравился продукт?
                        </div>
                        <div class="delivery__item-text">
                            Мы очень внимательно следим за качеством нашей работы, поэтому, если у вас будут какие-либо
                            замечания или предложения, то обязательно сообщайте их нам
                        </div>
                        <div class="delivery__item-title">
                            Оплата Visa, MasterCard и МИР
                        </div>
                        <div class="delivery__item-text">
                            Мы очень внимательно следим за качеством нашей работы, поэтому, если у вас будут какие-либо
                            замечания или предложения, то обязательно сообщайте их нам
                        </div>
                        <div class="delivery__item-title">
                            Реквизиты
                        </div>
                        <div class="delivery__item-text">
                            Мы очень внимательно следим за качеством нашей работы, поэтому, если у вас будут какие-либо
                            замечания или предложения, то обязательно сообщайте их нам
                        </div>
                    </div>
                    <img class="delivery__map" src={mapDelivery} alt="map img" />
                </div>
                <div class="delivery__timejob">
                    <div class="delivery__timejob-box">
                        <p class="delivery__timejob-text">
                            <span>
                                График работы доставки:
                            </span>
                            с 10:00-21:00
                        </p>
                        <p class="delivery__timejob-text">
                            <span>
                                График работы кафе:
                            </span>
                            с 08:00-21:00
                        </p>
                    </div>
                    <span>Минимальный заказ:</span>
                    <p class="delivery__timejob-text">
                        Бесплатная доставка пешим курьером при сумме заказа от 400 ₽
                        Доставка оператором такси от любой суммы заказа - по тарифам
                        перевозчика.
                    </p>
                </div>
            </ProductWrapper>
        </>
    )
}